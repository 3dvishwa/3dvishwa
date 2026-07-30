import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET() {
    try {
        const snapshot = await adminDb.collection('enquiries').orderBy('createdAt', 'desc').get();

        const enquiries = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ ok: true, enquiries }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching admin enquiries via Admin SDK:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to fetch enquiries' }, { status: 500 });
    }
}