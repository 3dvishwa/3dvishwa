import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET() {
    try {
        const snapshot = await adminDb.collection('orders').orderBy('createdAt', 'desc').get();

        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ ok: true, orders }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching admin orders via Admin SDK:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to fetch orders' }, { status: 500 });
    }
}