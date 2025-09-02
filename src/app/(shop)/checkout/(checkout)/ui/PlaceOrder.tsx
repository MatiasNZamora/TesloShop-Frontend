'use client';

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAdressStore, useCartStore } from "../../../../../store";
import { currencyFormat, sleep } from "../../../../../utils";
import { placeOrder } from "../../../../../actions";

export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAdressStore(state => state.address);

    const itemsInCart = useCartStore(state => state.getSummaryInformation().itemsInCart);
    const subTotal = useCartStore(state => state.getSummaryInformation().subTotal);
    const tax = useCartStore(state => state.getSummaryInformation().tax);
    const total = useCartStore(state => state.getSummaryInformation().total);

    const cart = useCartStore( state => state.cart );

    useEffect(() => {
        setLoaded(true)
    }, []);

    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);
        // await sleep(2);

        const productsToOrder = cart.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }))

        console.log({address, productsToOrder});

        const res = await placeOrder(productsToOrder, address)
        console.log({res});

        setIsPlacingOrder(false);
    };

    if(!loaded) {
        return <p> Cargando ...</p>
    }

    return (
        <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mt-2 font-bold"> Dirección de entrega </h2>
            <div className="mb-10">
                <p className="text-xl"> {address.firstName} {address.lastName} </p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p>{address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p>Tel: {address.phone}</p>
            </div>

            {/* divisor  */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2"> Resumen de orden </h2>
            <div className="grid grid-cols-2">

                <span>No. Productos</span>
                <span className="text-right"> { itemsInCart  === 1 ? '1 producto' : `${itemsInCart} productos` } </span>

                <span>Subtotal</span>
                <span className="text-right"> { currencyFormat(subTotal) } </span>

                <span>Inpuestos (21%)</span>
                <span className="text-right"> { currencyFormat(tax) } </span>

                <span className="text-2xl mt-5">Total: </span>
                <span className="text-right text-2xl mt-5"> { currencyFormat(total) } </span>

            </div>

            <div className="mt-5 mb-2 w-full">

                <p className="mb-5">
                    {/* disclaimer */}
                    <span className="text-xs">Al hacer clic en &quot;Confirmar orden&quot; aceptas nuestros términos y condiciones</span>
                </p>

                {/* <p className="text-red-500">
                    Error de creacion.
                </p> */}

                <button 
                    // href="/orders/123"
                    onClick={ onPlaceOrder }
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disable': isPlacingOrder,
                        })
                    }
                >
                    Crear Orden
                </button>
            </div>

        </div>
    )
};