import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        // 1. Try fetching products from Firestore
        const snapshot = await adminDb.collection('inventoryProducts').get();
        let products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // 2. If Firestore is empty, fallback to reading catalog.json from public folder
        if (products.length === 0) {
            try {
                const filePath = path.join(process.cwd(), 'public', 'catalog.json');
                if (fs.existsSync(filePath)) {
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const jsonData = JSON.parse(fileContents);
                    products = (jsonData.products || []).map((p: any) => ({
                        ...p,
                        id: String(p.id),
                    }));
                }
            } catch (fileErr) {
                console.error('Error reading local catalog.json:', fileErr);
            }
        }

        return NextResponse.json({ ok: true, products }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching inventory products:', error);

        // Fallback if Firestore connection throws an error
        try {
            const filePath = path.join(process.cwd(), 'public', 'catalog.json');
            if (fs.existsSync(filePath)) {
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const jsonData = JSON.parse(fileContents);
                const products = (jsonData.products || []).map((p: any) => ({
                    ...p,
                    id: String(p.id),
                }));
                return NextResponse.json({ ok: true, products }, { status: 200 });
            }
        } catch (e) {
            // ignore
        }

        return NextResponse.json({ ok: false, error: error.message || 'Failed to fetch products' }, { status: 500 });
    }
}