import { initialData } from "./seed";
import { prisma } from '../lib/prisma';
import { countries } from "./seed-countries";

async function main(){


    // Borrar reguistros previos
    await Promise.all([
        await prisma.orderAddress.deleteMany(),
        await prisma.orderItem.deleteMany(),
        await prisma.order.deleteMany(),

        await prisma.userAddress.deleteMany(),
        await prisma.user.deleteMany(),
        await prisma.country.deleteMany(),

        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.category.deleteMany(),
    ])

    const { categories, products, users } = initialData;

    // crear los usuarios de prueba. 
    await prisma.user.createMany({
        data: users
    });

    // crear paises
    await prisma.country.createMany({
        data: countries
    });

    // Categorias
    const categoriesData = categories.map( category => ({ name: category }))

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce( ( map, category ) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>); // <string> = shirt, string=categoryID

    // Productos

    products.forEach( async (product) => {
        const { type, images, ...rest } = product;

        const dbproduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        // Imagenes 
        const imagesData = images.map( image => ({
            url: image,
            productId: dbproduct.id
        }));

        await prisma.productImage.createMany({
            data: imagesData
        });

    });

    
    console.log('Seed Executed');
};

(() => {
    if(process.env.NODE_ENV === 'production') return;
    main()
})();