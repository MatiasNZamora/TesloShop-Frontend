'use server'

import { auth } from "../../auth.config";
import { Size } from "../../interfaces";
import type { Address } from '../../interfaces/addres.interface';
import { prisma } from "../../lib/prisma";


interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size
};

export const placeOrder = async( productIds:ProductToOrder[], address:Address ) => {

    const session = await auth();
    const userId = session.user.id;
    
    // verificar session de usuario
    if(!userId) {
        return {
            ok: false,
            message: 'No hay session de usuario'
        }
    }

    // obtener la informacion de los products
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map( p => p.productId )
            }
        }
    });

    // calcular los montos 
    const itemsInOrder = productIds.reduce( (count, product ) => count + product.quantity, 0 );

    // totales tax, subtotal, total
    const { subTotal, tax, total } = productIds.reduce(( totals, item ) => {
        
        const productQuantity = item.quantity;
        const product = products.find( product => product.id === item.productId );

        if( !product ) throw new Error(` ${item.productId} no existe - 500 `);

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.21;
        totals.total += subTotal * 1.21;

        return totals;
    }, { subTotal: 0, tax: 0, total: 0 })

    // crear la transaccion de base de datos

    const prismaTx = await prisma.$transaction( async(tx) => {
        // 1. Actualizar el stock de los productos basado en lo que se esta llevando.
        const order = await tx.order.create({
            data: {
                userId: userId,
                itemsInOrder: itemsInOrder,
                subTotal: subTotal,
                tax: tax,
                total: total,

                OrderItem: {
                    createMany: {
                        data: productIds.map( p => ({
                            quantity: p.quantity,
                            productId: p.productId,
                            size: p.size,
                            price: products.find( product => product.id === p.productId)?.price
                        }))
                    }
                }
            }
        })
        // validar si el precio es 0 lanzar un error 



        // 2. Crear la Orden - Encabezado y detalle.



        // 3. Crear la direccion de la orden.

        const { country, rememberAddress, ...restAddress } = address;
        const orderAddress = await tx.orderAddress.create({
            data: {
                orderId: order.id,
                ...restAddress,
                countryId: country,
            }
        });


        return {
            order: order,
            orderAddress: orderAddress,
            updatedProducts: [],
        }

    });

};