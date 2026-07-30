import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json({ ok: false, error: 'Status is required' }, { status: 400 });
        }

        const orderRef = adminDb.collection('orders').doc(id);
        const orderSnap = await orderRef.get();

        if (!orderSnap.exists) {
            return NextResponse.json({ ok: false, error: 'Order not found' }, { status: 404 });
        }

        const currentData = orderSnap.data() || {};
        const existingHistory = currentData.statusHistory || [];

        const newHistoryItem = {
            status,
            updatedAt: new Date().toISOString(),
        };

        await orderRef.update({
            status,
            statusHistory: [...existingHistory, newHistoryItem],
            updatedAt: new Date().toISOString(),
        });

        return NextResponse.json({ ok: true, message: 'Order status updated successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating order status:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to update status' }, { status: 500 });
    }
}