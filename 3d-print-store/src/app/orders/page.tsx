'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useAuth } from '@/lib/AuthContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { motion, Variants } from 'framer-motion';
import Head from 'next/head';
import { Package, Truck, CheckCircle2, Clock, Download, MapPin, Sparkles, X, ChevronDown } from 'lucide-react';

export default function ViewOrders() {
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const stages = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    // --- Fetch Orders ---
    useEffect(() => {
        if (!user) return;
        setLoadingOrders(true);

        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snap) => {
            const list = snap.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .sort((a: any, b: any) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));

            setOrders(list);
            setLoadingOrders(false);
        });

        return () => unsubscribe();
    }, [user]);

    const formatDate = (ts: any) => {
        if (!ts) return 'N/A';
        const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
        return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    };

    const calcEstimatedDelivery = (order: any) => {
        if (!order.createdAt) return 'N/A';
        const baseDate = order.createdAt.seconds
            ? new Date(order.createdAt.seconds * 1000)
            : new Date(order.createdAt);

        if (order.status === 'Delivered') {
            const deliveredEvent = order.statusHistory?.find((h: any) => h.status === 'Delivered');
            const deliveredDate = deliveredEvent?.updatedAt
                ? new Date(deliveredEvent.updatedAt.seconds * 1000)
                : baseDate;
            return `Delivered on: ${deliveredDate.toLocaleDateString()}`;
        }

        const estDate = new Date(baseDate);
        estDate.setDate(estDate.getDate() + 5);
        return `Estimated Delivery: ${estDate.toLocaleDateString()}`;
    };

    // --- Generate Invoice PDF ---
    const generateInvoicePDF = (order: any) => {
        if (!order) return alert('Please select an order first.');

        const doc = new jsPDF();
        const leftMargin = 14;
        let y = 20;

        doc.setFontSize(22);
        doc.text('Invoice - 3D Vishwa', leftMargin, y);
        y += 10;

        doc.setFontSize(12);
        const orderDate = order.createdAt?.seconds
            ? new Date(order.createdAt.seconds * 1000)
            : new Date(order.createdAt || Date.now());
        doc.text(`Order ID: ${order.id}`, leftMargin, y);
        y += 6;
        doc.text(`Order Date: ${orderDate.toLocaleDateString()}`, leftMargin, y);
        y += 10;

        const addr = order.customer?.address || {};
        doc.setFontSize(14);
        doc.text('Ship To:', leftMargin, y);
        y += 6;

        const addressLines = [
            addr.name,
            `${addr.line1 || ''} ${addr.line2 || ''}`.trim(),
            [addr.city, addr.state].filter(Boolean).join(', ') + (addr.pincode ? ` - ${addr.pincode}` : ''),
            addr.mobile ? `Mobile: ${addr.mobile}` : '',
            addr.landmark ? `Landmark: ${addr.landmark}` : '',
        ].filter(Boolean);

        doc.setFontSize(12);
        addressLines.forEach((line) => {
            doc.text(line, leftMargin, y);
            y += 6;
        });

        const tableRows = order.items.map((i: any) => {
            const unit = (i.pricePaise || 0) / 100;
            return [i.name || '', i.size || '-', i.qty, unit.toFixed(2), (unit * i.qty).toFixed(2)];
        });

        autoTable(doc, {
            startY: y + 4,
            head: [['Product', 'Size', 'Qty', 'Unit (₹)', 'Total (₹)']],
            body: tableRows,
            styles: { fontSize: 11 },
            headStyles: { fillColor: [63, 91, 67], textColor: 255 },
            margin: { left: leftMargin },
        });

        const total = (order.amountPaise / 100).toFixed(2);
        const finalY = (doc as any).lastAutoTable.finalY + 10;
        doc.setFontSize(14);
        doc.text(`Total Amount: ₹${total}`, leftMargin, finalY);
        doc.text('Thank you for choosing 3D Vishwa!', leftMargin, finalY + 10);

        doc.save(`Invoice_${order.id}.pdf`);
    };

    // --- Stepper Component ---
    const HorizontalStepper = ({ history = [] }: { history: any[] }) => {
        return (
            <div className="flex items-center justify-between mt-8 relative">
                {stages.map((stage, idx) => {
                    const done = history.findIndex((h) => h.status.toLowerCase() === stage.toLowerCase()) >= 0;
                    const time = history.find((h) => h.status === stage)?.updatedAt;
                    const nextDone = history.findIndex((h) => stages.indexOf(h.status) > idx) >= 0;
                    const label =
                        idx === 0 && done && ['pending', 'processing', 'processed'].includes(stage.toLowerCase())
                            ? 'Order Placed'
                            : stage;

                    return (
                        <div key={stage} className="flex-1 relative flex flex-col items-center">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm z-10 font-bold text-xs
                                ${done ? 'bg-[#3F5B43] text-white' : 'bg-[#FFFDF9] text-[#65554D] border border-[#ECE2D3]'}`}
                            >
                                {done ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                            </div>
                            <span className="text-xs mt-2 font-bold text-[#3E312C] text-center">{label}</span>
                            {time && (
                                <span className="text-[10px] text-[#65554D] mt-0.5">{formatDate(time)}</span>
                            )}
                            {idx < stages.length - 1 && (
                                <div
                                    className={`absolute top-4 left-1/2 w-full h-[2px] -translate-x-1/2 ${nextDone ? 'bg-[#3F5B43]' : 'bg-[#ECE2D3]'
                                        }`}
                                ></div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    // --- Animation Variants ---
    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
        }),
    };

    // --- Loading / Empty States ---
    if (loadingOrders)
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-[#65554D] text-sm font-medium animate-pulse">Loading your orders...</p>
            </div>
        );

    if (!user)
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <p className="text-[#65554D] text-sm font-medium">Please log in to view your orders.</p>
            </div>
        );

    if (orders.length === 0)
        return (
            <div className="max-w-[1280px] mx-auto py-20 text-center space-y-4 font-sans">
                <div className="w-16 h-16 bg-[#FCF8F3] border border-[#ECE2D3] text-[#3F5B43] rounded-[20px] flex items-center justify-center mx-auto shadow-sm">
                    <Package className="w-8 h-8" />
                </div>
                <h1 className="text-2xl font-extrabold text-[#3E312C] tracking-tight">No Orders Found</h1>
                <p className="text-[#65554D] text-sm max-w-sm mx-auto">You haven't placed any 3D printing orders yet. Explore our catalog to get started!</p>
            </div>
        );

    return (
        <>
            <Head>
                <title>My Orders | 3D Vishwa</title>
                <meta
                    name="description"
                    content="Track your 3D Vishwa orders, download invoices, and monitor delivery progress in real time."
                />
            </Head>

            <main className="max-w-[1280px] mx-auto py-8 space-y-8 font-sans text-[#3E312C]">
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" /> Account Dashboard
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">
                        My <span className="text-[#7B8F63]">Orders</span>
                    </h1>
                </div>

                <div className="space-y-6">
                    {orders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={idx}
                            className="glass-card rounded-[24px] p-6 sm:p-8 space-y-6"
                        >
                            {/* Order Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#ECE2D3]">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#65554D] block mb-1">Order Reference</span>
                                    <h2 className="font-extrabold text-[#3E312C] text-base sm:text-lg">
                                        {order.items?.length > 1
                                            ? `${order.items[0].name} + ${order.items.length - 1} more`
                                            : order.items[0]?.name || 'Custom 3D Print'}
                                    </h2>
                                    <p className="text-xs text-[#65554D] mt-1">
                                        Placed on: <span className="font-medium text-[#3E312C]">{formatDate(order.createdAt)}</span>
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span
                                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered'
                                            ? 'bg-[#7B8F63]/10 text-[#3F5B43] border border-[#7B8F63]/20'
                                            : order.status === 'Shipped'
                                                ? 'bg-[#B8724A]/10 text-[#B8724A] border border-[#B8724A]/20'
                                                : order.status === 'Processing'
                                                    ? 'bg-[#7B8F63]/10 text-[#3F5B43] border border-[#7B8F63]/20'
                                                    : 'bg-[#FFFDF9] text-[#65554D] border border-[#ECE2D3]'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                    <button
                                        className="btn-secondary px-4 py-2 text-xs font-semibold cursor-pointer active:scale-95"
                                        onClick={() => setSelectedOrder(order)}
                                    >
                                        Track Order
                                    </button>
                                </div>
                            </div>

                            {/* Estimated Delivery Notice */}
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#3F5B43] bg-[#7B8F63]/10 border border-[#7B8F63]/20 px-4 py-2.5 rounded-[16px] w-fit">
                                <Clock className="w-4 h-4 text-[#3F5B43]" />
                                {calcEstimatedDelivery(order)}
                            </div>

                            {/* Items */}
                            <div className="bg-[#FCF8F3] p-5 rounded-[20px] border border-[#ECE2D3] space-y-3">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-[#65554D]">Order Items</h3>
                                <ul className="space-y-2 text-sm text-[#65554D]">
                                    {order.items.map((item: any, i: number) => {
                                        const unit = (item.pricePaise || 0) / 100;
                                        return (
                                            <li key={i} className="flex justify-between items-center text-xs sm:text-sm">
                                                <span className="font-semibold text-[#3E312C]">
                                                    {item.name} {item.size && <span className="text-[#65554D] font-normal">({item.size})</span>}
                                                </span>
                                                <div className="flex items-center gap-6 text-[#65554D]">
                                                    <span>Qty: {item.qty}</span>
                                                    <span className="font-bold text-[#3E312C]">₹{(unit * item.qty).toFixed(2)}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Address details collapsible */}
                            <details className="group bg-[#FCF8F3] p-4 rounded-[20px] border border-[#ECE2D3]">
                                <summary className="cursor-pointer font-bold text-xs uppercase tracking-wider text-[#3E312C] flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-[#3F5B43]" /> Delivery Address
                                    </span>
                                    <ChevronDown className="w-4 h-4 text-[#65554D] group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="mt-3 pt-3 border-t border-[#ECE2D3] text-xs sm:text-sm text-[#65554D] space-y-1">
                                    <p className="font-bold text-[#3E312C]">{order.customer?.address?.name || 'N/A'}</p>
                                    <p>
                                        {[order.customer?.address?.line1, order.customer?.address?.line2]
                                            .filter(Boolean)
                                            .join(', ')}
                                    </p>
                                    <p>
                                        {[order.customer?.address?.city, order.customer?.address?.state]
                                            .filter(Boolean)
                                            .join(', ')}{' '}
                                        {order.customer?.address?.pincode && `- ${order.customer.address.pincode}`}
                                    </p>
                                    <p className="text-[#65554D] pt-1">Mobile: <span className="font-medium text-[#3E312C]">{order.customer?.address?.mobile || 'N/A'}</span></p>
                                    {order.customer?.address?.landmark && (
                                        <p className="text-[#65554D]">Landmark: <span className="font-medium text-[#3E312C]">{order.customer.address.landmark}</span></p>
                                    )}
                                </div>
                            </details>

                            {/* Stepper + Invoice Actions */}
                            <div className="pt-2">
                                <HorizontalStepper
                                    history={order.statusHistory || [{ status: order.status, updatedAt: order.createdAt }]}
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <button
                                    className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold shadow-md active:scale-95 cursor-pointer"
                                    onClick={() => generateInvoicePDF(order)}
                                >
                                    <Download className="w-4 h-4" /> Download Invoice PDF
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Track Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-[#3E312C]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card rounded-[24px] p-6 sm:p-8 w-full max-w-lg relative space-y-6"
                    >
                        <button
                            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-[#FCF8F3] border border-[#ECE2D3] flex items-center justify-center text-[#65554D] hover:text-[#3E312C] transition-colors cursor-pointer"
                            onClick={() => setSelectedOrder(null)}
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#65554D] block mb-1">Live Tracking</span>
                            <h2 className="text-xl font-extrabold text-[#3E312C]">
                                Order #{selectedOrder.id.slice(0, 8)}...
                            </h2>
                        </div>
                        <HorizontalStepper
                            history={
                                selectedOrder.statusHistory || [
                                    { status: selectedOrder.status, updatedAt: selectedOrder.createdAt },
                                ]
                            }
                        />
                        <div className="p-4 bg-[#7B8F63]/10 rounded-[20px] border border-[#7B8F63]/20 flex items-center gap-3">
                            <Truck className="w-5 h-5 text-[#3F5B43] shrink-0" />
                            <p className="text-xs font-semibold text-[#3F5B43]">
                                {calcEstimatedDelivery(selectedOrder)}
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
}