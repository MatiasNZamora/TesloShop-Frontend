'use client';

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "../../../../../components";
import type { Product, Size, CartProduct } from "@/interfaces";
import { useCartStore } from "@/store";

interface props {
    product: Product;
};


const AddToCart = ({product}: props) => {
    
    const  addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined> ();
    const [quantity, setQuantity] = useState<number> (1);
    const [posted, setPosted] = useState(false);

    const addToCart = () => {
        setPosted(true);
        if(!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            title: product.title,
            image: product.images[0],
            price: product.price,
            size:size,
            quantity:quantity,
            slug: product.slug,
        };

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    };

    return (
        <>
            {/* mensaje de error  */}
            {
                posted && !size && (            
                    <span className="mt-2 text-red-500 fade-in">
                        Debe de seleccionar una talla* 
                    </span>
                )
            }

            {/* selector de tallas,cantidad y boton de cart  */}
            <SizeSelector
                selectedSize={size}
                availableSize={product?.sizes}
                onSizeChanged={ size => setSize(size) }
            />

            {/* selector de cantidad  */}
            <QuantitySelector 
                quantity={quantity} 
                onQuantityChanged={ quantity => setQuantity(quantity) }
            />

            {/* boton de cart  */}
            <button 
                className="btn-primary my-5"
                onClick={ addToCart }
            > 
                Agregar al carrito 
            </button>

        </>
    )
};

export default AddToCart;
