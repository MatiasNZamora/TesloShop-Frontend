import type { CartProduct } from "../../interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Importo StateCreator para tipar correctamente el store con persist
import type { StateCreator } from "zustand";

interface State {
    cart: CartProduct[];

    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };
    getTotalItems: () => number;
    addProductToCart: ( product: CartProduct ) => void;
    updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
    removeProduct: ( product: CartProduct ) => void;
    cleanCart: () => void;
};

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            getTotalItems: () => {
                const {cart} = get();
                return cart.reduce( (total, item) => total + item.quantity, 0 );
            },

            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce((subTotal, product) => subTotal + (product.price * product.quantity), 0);
                const tax = subTotal * 0.21;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);;
                
                return {
                    subTotal,
                    tax,
                    total,
                    itemsInCart,
                };
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
        
                // 1. revisar si el producto existe en el carrito con la talla seleccionada 
                const productInCart = cart.some(
                    (item) => item.id === product.id && item.size === product.size
                );
        
                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                };
        
                // 2. existe el producto en el carrito, pero con una cantidad diferente
                const updatedCartProduct = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity };
                    }
                    return item;
                });
        
                set({ cart: updatedCartProduct });
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const updatedCartProduct = cart.map( item => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity };
                    }
                    return item;
                });
                set({ cart: updatedCartProduct });
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProduct = cart.filter( (item) => (item.id !== product.id || item.size !== product.size) );
                set({ cart: updatedCartProduct });
            },

            cleanCart: () => {
                set({ cart: [] });
            },

        }),
        {
            name: "Shopping-Cart",
        }
    )
);