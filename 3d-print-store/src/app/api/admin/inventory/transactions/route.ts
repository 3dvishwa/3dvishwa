import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
import fs from 'fs';
import path from 'path';
export async function GET() {
    try {
        // 1. Fetch live data from Firestore
        const snapshot = await adminDb.collection('inventoryTransactions').get();
        const firestoreTransactions = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // 2. Read inventory.json
        let jsonTransactions: any[] = [];
        try {
            const filePath = path.join(process.cwd(), 'public', 'inventory.json');
            if (fs.existsSync(filePath)) {
                const fileContents = fs.readFileSync(filePath, 'utf8');
                const jsonData = JSON.parse(fileContents);
                jsonTransactions = (jsonData.transactions || []).map((t: any) => ({
                    ...t,
                    id: String(t.id),
                }));
            }
        } catch (fileErr) {
            console.error('Error reading local inventory.json:', fileErr);
        }

        // 3. Combine both (avoiding duplicate IDs if any)
        const existingIds = new Set(firestoreTransactions.map((t: any) => t.id));
        const uniqueJsonTransactions = jsonTransactions.filter((t: any) => !existingIds.has(t.id));
        const transactions = [...firestoreTransactions, ...uniqueJsonTransactions];

        return NextResponse.json({ ok: true, transactions }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching inventory transactions:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to fetch transactions' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, date, productType, productName, quantity, price } = body;

        if (!type || !date || !productType || !productName || quantity == null || price == null) {
            return NextResponse.json({ ok: false, error: 'Missing required transaction fields' }, { status: 400 });
        }

        const newDocRef = adminDb.collection('inventoryTransactions').doc();
        const transactionData = {
            type,
            date,
            productType,
            productName,
            quantity: Number(quantity),
            price: Number(price),
            createdAt: new Date().toISOString(),
        };

        await newDocRef.set(transactionData);

        return NextResponse.json({
            ok: true,
            transaction: {
                id: newDocRef.id,
                ...transactionData,
            }
        }, { status: 201 });
    } catch (error: any) {
        console.error('Error adding inventory transaction:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to add transaction' }, { status: 500 });
    }
}