import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public', 'catalog.json');

function getCatalog() {
    if (!fs.existsSync(filePath)) {
        return { products: [] };
    }
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContents);
        if (Array.isArray(data)) {
            return { products: data };
        }
        return { products: data.products || [] };
    } catch (e) {
        return { products: [] };
    }
}

function saveCatalog(products: any[]) {
    const data = { products };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const catalog = getCatalog();
        const product = catalog.products.find((p: any) => p.productId === id);

        if (!product) {
            return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
        }

        return NextResponse.json({ ok: true, product }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching product:', error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const formData = await request.formData();
        const name = formData.get('name') as string;
        const category = formData.get('category') as string;
        const descriptionJson = formData.get('description') as string;
        const variantsJson = formData.get('variants') as string;

        const description = descriptionJson ? JSON.parse(descriptionJson) : {};
        const variants = variantsJson ? JSON.parse(variantsJson) : [];

        const catalog = getCatalog();
        const index = catalog.products.findIndex((p: any) => p.productId === id);

        if (index === -1) {
            return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
        }

        // Keep existing images if no new ones are uploaded
        const productImages: string[] = catalog.products[index].images || [];
        const productFiles = formData.getAll('productImages');
        for (let i = 0; i < productFiles.length; i++) {
            const file = productFiles[i] as File;
            if (file && file.size > 0) {
                const buffer = Buffer.from(await file.arrayBuffer());
                const fileName = `${Date.now()}_${file.name}`;
                const uploadDir = path.join(process.cwd(), 'public', 'images');
                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                }
                fs.writeFileSync(path.join(uploadDir, fileName), buffer);
                productImages.push(`/images/${fileName}`);
            }
        }

        for (let idx = 0; idx < variants.length; idx++) {
            const variantFiles = formData.getAll(`variantImages_${idx}`);
            const variantImagePaths: string[] = variants[idx].images || [];
            for (let i = 0; i < variantFiles.length; i++) {
                const file = variantFiles[i] as File;
                if (file && file.size > 0) {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const fileName = `var_${Date.now()}_${idx}_${file.name}`;
                    const uploadDir = path.join(process.cwd(), 'public', 'images');
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                    }
                    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
                    variantImagePaths.push(`/images/${fileName}`);
                }
            }
            variants[idx].images = variantImagePaths;
        }

        const updatedProduct = {
            ...catalog.products[index],
            name,
            category,
            description,
            images: productImages,
            variants,
        };

        catalog.products[index] = updatedProduct;
        saveCatalog(catalog.products);

        return NextResponse.json({ ok: true, product: updatedProduct }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating product:', error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const catalog = getCatalog();
        const index = catalog.products.findIndex((p: any) => p.productId === id);

        if (index === -1) {
            return NextResponse.json({ ok: false, error: 'Product not found' }, { status: 404 });
        }

        catalog.products.splice(index, 1);
        saveCatalog(catalog.products);

        return NextResponse.json({ ok: true, message: 'Product deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting product:', error);
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
}