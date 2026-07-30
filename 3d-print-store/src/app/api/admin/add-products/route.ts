import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'catalog.json');

function getCatalog() {
    if (!fs.existsSync(filePath)) {
        return { products: [] };
    }
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
}

function saveCatalog(data: any) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET() {
    try {
        const catalog = getCatalog();
        return NextResponse.json({ ok: true, products: catalog.products }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching catalog products:', error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const productId = formData.get('productId') as string;
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const descriptionJson = formData.get('description') as string;
        const variantsJson = formData.get('variants') as string;

        if (!productId || !name) {
            return NextResponse.json({ ok: false, error: 'Missing required product fields' }, { status: 400 });
        }

        const description = descriptionJson ? JSON.parse(descriptionJson) : {};
        const variants = variantsJson ? JSON.parse(variantsJson) : [];

        // Save main product images to public/images folder
        const productImages: string[] = [];
        const productFiles = formData.getAll('productImages');
        for (let i = 0; i < productFiles.length; i++) {
            const file = productFiles[i] as File;
            if (file && file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const fileName = `product_${productId}_${Date.now()}_${i}${path.extname(file.name)}`;
                const uploadDir = path.join(process.cwd(), 'public', 'images');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                fs.writeFileSync(path.join(uploadDir, fileName), buffer);
                productImages.push(`/images/${fileName}`);
            }
        }

        // Save variant images
        for (let idx = 0; idx < variants.length; idx++) {
            const variantFiles = formData.getAll(`variantImages_${idx}`);
            const variantImagePaths: string[] = [];
            for (let i = 0; i < variantFiles.length; i++) {
                const file = variantFiles[i] as File;
                if (file && file.size > 0) {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const fileName = `variant_${productId}_${idx}_${Date.now()}_${i}${path.extname(file.name)}`;
                    const uploadDir = path.join(process.cwd(), 'public', 'images');
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                    }
                    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
                    variantImagePaths.push(`/images/${fileName}`);
                }
            }
            if (variantImagePaths.length > 0) {
                variants[idx].images = variantImagePaths;
            }
        }

        const catalog = getCatalog();
        const newProduct = {
            productId,
            name,
            category,
            description,
            productImages,
            variants,
        };

        catalog.products.push(newProduct);
        saveCatalog(catalog);

        return NextResponse.json({ ok: true, product: newProduct }, { status: 201 });
    } catch (error: any) {
        console.error('Error adding catalog product:', error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}