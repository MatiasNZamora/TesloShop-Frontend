import Link from "next/link";
import { titleFont } from "../../../../config/fonts";
import { Title } from "../../../../components";
import ProcutsInCart from "./ui/ProcutsInCart";
import {PlaceOrder} from "./ui/PlaceOrder";



export default function CheckoutPage() {

    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0 ">

            <div className="flex flex-col w-[1000px]">
                
                <Title title='Verificar Orden' className={ titleFont.className } />

                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >
                    
                    {/* cart  */}
                    <div className="flex flex-col mt-5">
                        <span className="text-xl"> Modificar Orden </span>
                        <Link href="/cart" className="underline mb-5" >
                            Editar Carrito
                        </Link>
                    
                        {/* Itmes */}
                        <ProcutsInCart />

                    </div>

                    {/* checkut - */}
                    <PlaceOrder /> 
                </div>  
            </div>
        </div>
    );
}