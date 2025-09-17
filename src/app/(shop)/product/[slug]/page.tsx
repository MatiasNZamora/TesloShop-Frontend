export const revalidate = 1209600; // 14 days

import { notFound } from "next/navigation";
import { getProductBySlug } from "../../../../actions";
import { Metadata, ResolvingMetadata } from "next";
import AddToCart from "./ui/AddToCart";
import { titleFont } from "../../../../config/fonts";
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from "../../../../components";

interface Props {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata( { params }: Props, parent: ResolvingMetadata ): Promise<Metadata> {
    const slug = (await params).slug
    const product = await getProductBySlug(slug);

    return {
        title: (product?.title ?? 'Producto no encontrado'),
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Producto no encontrado',
            description: product?.description ?? '',
            images:[`/products/${product?.images[1]}`],
        }
    };
};


export default async function ProductBySlugPage({ params }: Props) {

    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!slug) notFound();
    if (!product) notFound();

    return (
        <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">

            {/* slideshow movil */}
            <ProductMobileSlideShow
                title={product?.title ?? ''}
                images={product?.images ?? []}
                className="block md:hidden"
            />

            {/* slideshow de escritorio */}
            <div className="col-span-1 md:col-span-2" >
                <ProductSlideShow
                    title={product?.title ?? ''}
                    images={product?.images ?? []}
                    className="hidden md:block"
                />
            </div>

            {/* details  */}
            <div className="col-span-1 px-5">

                <StockLabel slug={slug} />

                <h1 className={`${titleFont.className} antialiased font-bold text-3xl`}> {product?.title} </h1>
                <p className="text-lg mb-5">${product?.price}</p>

                {/* selector de tallas,cantidad y boton de cart  */}
                <AddToCart product={product}  />

                {/* description  */}
                <h3 className="font-bold text-sm"> Descripciòn </h3>
                <p className="font-light"> {product?.description} </p>

            </div>

        </div>
    );
}