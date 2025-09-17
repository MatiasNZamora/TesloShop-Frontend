import { redirect } from 'next/navigation';
import { ProductForm } from './ProductForm';
import { Title } from '../../../../../components';
import { getCategories, getProductBySlug } from '../../../../../actions';

interface Props {
    params: Promise<{
        slug: string;
    }>;
};

export default async function ProductPage({ params }: Props) {

    const { slug } = await params;

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ]);


    // Todo: new
    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'

    return (
        <>
            <Title title={title} />

            <ProductForm product={product ?? {}} categories={categories} />
        </>
    );
};