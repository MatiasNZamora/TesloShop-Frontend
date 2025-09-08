import Image from "next/image";
import { getOrderById } from "../../../../actions/order/get-order-by-id";
import { redirect } from "next/navigation";
import { currencyFormat } from "../../../../utils";
import { titleFont } from "../../../../config/fonts";
import { PaypalButton, Title } from "../../../../components";
import OrderStatus from "../../../../components/orders/OrderStatus";


interface Props {
    params: Promise<{
        id: string;
    }>
}

export default async function OrderByIdPage({ params }: Props) {

    const { id } = await params;

    // TODO: llamar el server action

    const { order, ok } = await getOrderById(id);

    if (!ok) { redirect('/'); }

    // console.log(JSON.stringify(order));
    // console.log({order});

    const address = order!.OrderAddress;


    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0 ">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Orden #${id.split('-').at(-1)}`} className={titleFont.className} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10" >

                    {/* cart  */}
                    <div className="flex flex-col mt-5">
                        <OrderStatus isPaid={ order.isPaid ?? false }/>

                        {/* Itmes */}
                        {
                            order.OrderItem.map(item => (
                                <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                                    <Image
                                        src={`/products/${item.product.ProductImage[0].url}`}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                        alt={item.product.title}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <p>{item.product.title}</p>
                                        <p>${item.price} x {item.quantity} </p>
                                        <p className="font-bold">Subtotal: ${currencyFormat(item.price * item.quantity)}</p>
                                        <button className="underline mt-3">
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* checkut - */}
                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mt-2 font-bold"> Dirección de entrega </h2>
                        <div className="mb-10">
                            <p className="text-xl"> {address.firstName} {address.lastName} </p>
                            <p>{address.address}</p>
                            <p>{address.address2}</p>
                            <p>{address.postalCode}</p>
                            <p>{address.city}, {address.countryId}</p>
                            <p>Tel: {address.phone}</p>
                        </div>

                        {/* divisor  */}
                        <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

                        <h2 className="text-2xl mb-2"> Resumen de orden </h2>
                        <div className="grid grid-cols-2">

                            <span>No. Productos</span>
                            <span className="text-right"> {order.itemsInOrder === 1 ? '1 producto' : `${order.itemsInOrder} productos`} </span>

                            <span>Subtotal</span>
                            <span className="text-right"> {currencyFormat(order.subTotal)} </span>

                            <span>Inpuestos (21%)</span>
                            <span className="text-right"> {currencyFormat(order.tax)} </span>

                            <span className="text-2xl mt-5">Total: </span>
                            <span className="text-right text-2xl mt-5"> {currencyFormat(order.total)} </span>

                        </div>

                        <div className="mt-5 mb-2 w-full">
                            {/* <div className={clsx("flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                                { 'bg-red-500': !order.isPaid, 'bg-green-700': order.isPaid })
                            }>
                                <IoCartOutline size={30} />
                                <span className="mx-2">
                                    {
                                        order.isPaid ? "Pagada" : "Pendiente de Pago"
                                    }
                                </span>
                            </div> */}

                            {/* lo remplazamos por un boton de paypal  */}
                            {
                                order.isPaid
                                ? ( <OrderStatus isPaid={ order.isPaid ?? false }/> ) 
                                : ( <PaypalButton orderId={order.id} amount={order.total} /> )
                            }

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}