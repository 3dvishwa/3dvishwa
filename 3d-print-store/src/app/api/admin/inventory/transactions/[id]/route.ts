import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const docRef = adminDb.collection('inventoryTransactions').doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ ok: false, error: 'Transaction not found' }, { status: 404 });
        }

        const updateData = {
            ...body,
            quantity: body.quantity !== undefined ? Number(body.quantity) : undefined,
            price: body.price !== undefined ? Number(body.price) : undefined,
            updatedAt: new Date().toISOString(),
        };

        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        await docRef.update(updateData);
        const updatedSnap = await docRef.get();

        return NextResponse.json({
            ok: true,
            transaction: {
                id: updatedSnap.id,
                ...updatedSnap.data(),
            }
        }, { status: 200 });
    } catch (error: any) {
        console.error('Error updating transaction:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to update transaction' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const docRef = adminDb.collection('inventoryTransactions').doc(id);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return NextResponse.json({ ok: false, error: 'Transaction not found' }, { status: 404 });
        }

        await docRef.delete();

        return NextResponse.json({ ok: true, message: 'Transaction deleted successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error deleting transaction:', error);
        return NextResponse.json({ ok: false, error: error.message || 'Failed to delete transaction' }, { status: 500 });
    }
}