'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductImage, QuantitySelector } from "../../../../components";
import { useCartStore } from "../../../../store";


const ProcutsInCart = () => {

    const [loaded, setLoaded] = useState(false);

    const updateProductQuantity = useCartStore( state => state.updateProductQuantity);
    const removeProduct = useCartStore( state => state.removeProduct);
    const productsInCart = useCartStore(state => state.cart);


    useEffect(() => {
        setLoaded(true);
    }, []);


    if (!loaded) return <p>Cargando...</p>;

    return (
        <>
            {
                productsInCart.map(product => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <ProductImage
                            src={ product.image }
                            width={100}
                            height={100}
                            style={{
                                width: '100px',
                                height: '100px'
                            }}
                            alt={product.title}
                            className="mr-5 rounded"
                        />

                        <div>
                            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
                                {product.size} - {product.title}
                            </Link>
                            <p>${product.price}</p>

                            <QuantitySelector 
                                quantity={ product.quantity || 1 }
                                onQuantityChanged={ (quantity) => { updateProductQuantity( product, quantity ) } }
                            />
                            
                            <button 
                                className="underline mt-3"
                                onClick={ () => removeProduct(product) }
                            >
                                Remover
                            </button>

                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default ProcutsInCart;
