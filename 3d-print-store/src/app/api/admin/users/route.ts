import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function GET() {
    try {
        const snapshot = await adminDb.collection('users').get();

        const users = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ ok: true, users }, { status: 200 });
    } catch (error: any) {
        console.error('Error fetching admin users via Admin SDK:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to fetch users' }, { status: 500 });
    }
}