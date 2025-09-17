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

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user?.id;

    // verificar session de usuario
    if (!userId) {
        return {
            ok: false,
            message: 'No hay session de usuario'
        }
    }

    // obtener la informacion de los products
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });

    // calcular los montos 
    const itemsInOrder = productIds.reduce((count, product) => count + product.quantity, 0);

    // totales tax, subtotal, total
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if (!product) throw new Error(` ${item.productId} no existe - 500 `);

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.21;
        totals.total += subTotal * 1.21;

        return totals;
    }, { subTotal: 0, tax: 0, total: 0 })

    try {
        // crear la transaccion de base de datos
        const prismaTx = await prisma.$transaction(async (tx) => {

            // 1. Actualizar el stock de los productos basado en lo que se esta llevando.
            const updatedProductsPromises = products.map(async (product) => {

                //Acumular los valores
                const productQuantity = productIds.filter(
                    p => p.productId === product.id
                ).reduce((acc, item) => item.quantity + acc, 0);

                if (productQuantity === 0) throw new Error(`${product.id}, no tiene cantidad definida`);

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        // inStock: product.inStock - productQuantity // no hacer
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            // if( updatedProducts.some( product => product.inStock < 0 ) ) throw new Error(`${updatedProducts.find( product => product.inStock < 0 )?.id}, no tiene stock suficiente`);

            // verificar valores negativos en la existencia = no hay stock suficiente
            updatedProducts.forEach(product => {
                if (product.inStock < 0) throw new Error(`${product.title}, no tiene stock suficiente`);
            })

            // 2. Crear la orden - encabeza - detalles
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    itemsInOrder: itemsInOrder,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map((p) => ({
                                quantity: p.quantity,
                                productId: p.productId,
                                size: p.size,
                                price: products.find(product => product.id === p.productId)!.price
                            }))
                        }
                    }
                }
            })

            // const { country } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    countryId: address.country,
                    orderId: order.id,   
                    firstName: address.firstName,
                    lastName: address.lastName,
                    address: address.address,
                    address2: address.address2,
                    postalCode: address.postalCode,
                    city: address.city,
                    phone: address.phone,
                }
            });

            return {
                updatedProducts: updatedProducts,
                order: order,
                orderAddress: orderAddress,
            }

        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error.message || 'No se pudo crear la orden'
        }
    }
    
};