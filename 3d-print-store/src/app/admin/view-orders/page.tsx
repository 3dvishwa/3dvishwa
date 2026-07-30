'use client';
import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import { toast } from 'react-hot-toast';
import { FileText, MapPin, Package, Calendar, Phone, Download } from 'lucide-react';
import logo from '../../../../public/logo.png';

interface OrderItem {
    name?: string;
    productId?: string;
    qty?: number;
    size?: string;
    variantId?: string;
    pricePaise?: number;
    names?: string[];
    images?: string[];
}

interface Order {
    id: string;
    status: string;
    createdAt?: any;
    customer?: {
        name?: string;
        address?: any;
    };
    deliveryAddress?: any;
    items?: OrderItem[];
    dimensions?: {
        length?: number;
        width?: number;
        height?: number;
    };
    weight?: number;
}

export default function ViewOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL || '/api';

    const statusOptions = [
        { label: 'Pending', value: 'Pending' },
        { label: 'Processing', value: 'Processing' },
        { label: 'Dispatched', value: 'Shipped' },
        { label: 'Delivered', value: 'Delivered' },
        { label: 'Cancelled', value: 'Cancelled' },
    ];

    const formatDate = (ts: any) => {
        if (!ts) return 'N/A';
        if (typeof ts === 'object' && ts._seconds !== undefined) {
            const ms = ts._seconds * 1000 + (ts._nanoseconds || 0) / 1e6;
            const date = new Date(ms);
            return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
        }
        const date = new Date(ts);
        return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`${urlBase}/admin/orders`);
                const data = await res.json();
                if (!data.ok) throw new Error(data.error || 'Failed to fetch orders');
                setOrders(data.orders || []);
            } catch (err: any) {
                console.error(err);
                toast.error('Failed to load orders');
                setOrders([]);
            }
        };
        fetchOrders();
    }, [urlBase]);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        setUpdatingOrderId(orderId);
        const loadingToast = toast.loading(`Updating status to "${newStatus}"...`);
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (!data.ok) throw new Error(data.error || 'Failed to update status');

            setOrders(prev =>
                prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
            );
            toast.success(`Order status updated to ${newStatus}`, { id: loadingToast });
        } catch (err: any) {
            toast.error('Failed to update status: ' + err.message, { id: loadingToast });
        } finally {
            setUpdatingOrderId(null);
        }
    };

    const handleDimensionChange = (orderId: string, field: string, value: string) => {
        setOrders(prev =>
            prev.map(o => {
                if (o.id !== orderId) return o;
                const dimensions = { ...(o.dimensions || {}), [field]: Number(value) };
                const updatedOrder: Order = {
                    ...o,
                    dimensions,
                };
                if (field === 'weight') {
                    updatedOrder.weight = Number(value);
                }
                return updatedOrder;
            })
        );
    };

    const generateStickerPDF = async (order: Order) => {
        const doc = new jsPDF();

        // Theme RGB Palette
        const primaryDark: [number, number, number] = [62, 49, 44];   // #3E312C
        const forestGreen: [number, number, number] = [63, 91, 67];   // #3F5B43
        const warmBg: [number, number, number] = [252, 248, 243];     // #FCF8F3
        const borderWarm: [number, number, number] = [236, 226, 211];  // #ECE2D3
        const mutedText: [number, number, number] = [101, 85, 77];    // #65554D

        try {
            const logoBase64 = await new Promise((resolve, reject) => {
                const img = new window.Image();
                img.src = (logo as any).src || logo;
                img.crossOrigin = 'anonymous';
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(img, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    } else {
                        reject(new Error('Canvas context failed'));
                    }
                };
                img.onerror = reject;
            });
            doc.addImage(logoBase64 as string, 'PNG', 150, 10, 40, 15);
        } catch (err) {
            console.warn('Logo not found:', err);
        }

        const addr = order.deliveryAddress || order.customer?.address || {};

        // SHIP TO Header & Details
        doc.setFontSize(10);
        doc.setTextColor(...forestGreen);
        doc.setFont('helvetica', 'bold');
        doc.text('SHIP TO:', 10, 15);

        doc.setTextColor(...primaryDark);
        doc.text(addr.name || 'Customer', 10, 22);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...mutedText);
        doc.text(addr.line1 || '', 10, 28);
        if (addr.line2) doc.text(addr.line2, 10, 34);
        if (addr.landmark) doc.text(addr.landmark, 10, 40);
        doc.text(`${addr.city || ''}, ${addr.state || ''}`, 10, 46);
        doc.text(`India - ${addr.pincode || ''}`, 10, 52);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryDark);
        doc.text(`Mob: ${addr.mobile || ''}`, 10, 58);

        // FROM Header & Details
        doc.setTextColor(...forestGreen);
        doc.text('FROM:', 120, 15);

        doc.setTextColor(...primaryDark);
        doc.text('3DVishwa - Pixel Printing Studio', 120, 22);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...mutedText);
        doc.text('Kashid Nagar, Pimple Gurav', 120, 28);
        doc.text('Pune 411061, Maharashtra, India', 120, 34);

        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...primaryDark);
        doc.text('Mob No.: +91 7276209570', 120, 40);

        // AutoTable Style Configuration for Organic Modern Theme
        const tableStyles = {
            headStyles: {
                fillColor: forestGreen,
                textColor: [255, 255, 255] as [number, number, number],
                fontStyle: 'bold' as const,
                fontSize: 9,
            },
            bodyStyles: {
                textColor: primaryDark,
                fontSize: 9,
            },
            alternateRowStyles: {
                fillColor: warmBg,
            },
            tableLineColor: borderWarm,
            tableLineWidth: 0.1,
        };

        // Table 1: Order Metadata
        autoTable(doc, {
            startY: 65,
            head: [['ORDER ID', 'DATE', 'STATUS']],
            body: [[order.id, formatDate(order.createdAt), order.status]],
            styles: tableStyles.bodyStyles,
            headStyles: tableStyles.headStyles,
            alternateRowStyles: tableStyles.alternateRowStyles,
            tableLineColor: tableStyles.tableLineColor,
            tableLineWidth: tableStyles.tableLineWidth,
        });

        // Table 2: Product Breakdown
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 8,
            head: [['Product', 'Qty', 'Size', 'Variant', 'Unit Price', 'Total']],
            body: (order.items || []).flatMap(item => {
                return Array.from({ length: item.qty || 1 }).map(() => [
                    item.name || 'Product',
                    1,
                    item.size || 'N/A',
                    item.variantId || 'N/A',
                    `₹${((item.pricePaise || 0) / 100).toFixed(2)}`,
                    `₹${((item.pricePaise || 0) / 100).toFixed(2)}`
                ]);
            }),
            styles: tableStyles.bodyStyles,
            headStyles: tableStyles.headStyles,
            alternateRowStyles: tableStyles.alternateRowStyles,
            tableLineColor: tableStyles.tableLineColor,
            tableLineWidth: tableStyles.tableLineWidth,
        });

        // Table 3: Package Dimensions & Weight
        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 8,
            head: [['Length (cm)', 'Width (cm)', 'Height (cm)', 'Weight']],
            body: [[
                order.dimensions?.length || 20,
                order.dimensions?.width || 20,
                order.dimensions?.height || 20,
                (order.weight || 350) >= 1000
                    ? ((order.weight || 350) / 1000).toFixed(2) + ' kg'
                    : (order.weight || 350) + ' g'
            ]],
            styles: tableStyles.bodyStyles,
            headStyles: tableStyles.headStyles,
            alternateRowStyles: tableStyles.alternateRowStyles,
            tableLineColor: tableStyles.tableLineColor,
            tableLineWidth: tableStyles.tableLineWidth,
        });

        // QR Code Generation
        try {
            const qrData = `
Order ID: ${order.id}
Name: ${addr.name}
City: ${addr.city}
Total: ₹${((
                    (order.items || []).reduce(
                        (s, p) => s + (p.qty || 1) * (p.pricePaise || 0),
                        0
                    )
                ) / 100).toFixed(2)}
            `.trim();
            const qrUrl = await QRCode.toDataURL(qrData, {
                color: {
                    dark: '#3E312C', // Matches theme text dark espresso
                    light: '#FCF8F3', // Matches theme background warm cream
                },
            });
            const qrSize = 36;
            const qrX = (doc.internal.pageSize.getWidth() - qrSize) / 2;
            const qrY = (doc as any).lastAutoTable.finalY + 10;
            doc.addImage(qrUrl, 'PNG', qrX, qrY, qrSize, qrSize);
        } catch (err) {
            console.error('QR generation failed:', err);
        }

        doc.save(`ShippingLabel_${order.id}.pdf`);
        toast.success('Shipping label downloaded successfully');
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto py-6 font-sans text-[#3E312C]">
            <h2 className="text-2xl font-extrabold tracking-tight mb-6 text-[#3E312C]">View Orders</h2>

            {orders.length === 0 ? (
                <div className="glass-card rounded-[20px] p-10 text-center">
                    <p className="text-[#65554D] text-sm">No orders found</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => {
                        const addr = order.deliveryAddress || order.customer?.address || {};
                        const totalPaise = (order.items || []).reduce(
                            (sum, i) => sum + (i.pricePaise || 0) * (i.qty || 1),
                            0
                        );

                        return (
                            <div key={order.id} className="glass-card rounded-[20px] p-5 border border-[#ECE2D3] bg-[#FFFDF9] space-y-4 shadow-sm">
                                {/* Header Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#ECE2D3]">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-sm text-[#3E312C]">
                                            {order.customer?.name || addr.name || 'Customer'}
                                        </span>
                                        <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-[#FCF8F3] border border-[#ECE2D3] text-[#65554D]">
                                            #{order.id}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5 text-xs text-[#65554D]">
                                            <Calendar className="w-3.5 h-3.5 text-[#3F5B43]" />
                                            {formatDate(order.createdAt)}
                                        </div>

                                        <select
                                            disabled={updatingOrderId === order.id}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className="border border-[#ECE2D3] bg-[#FCF8F3] rounded-[12px] px-3 py-1.5 text-xs font-semibold text-[#3E312C] focus:outline-none focus:border-[#7B8F63] cursor-pointer"
                                        >
                                            {statusOptions.map((s) => (
                                                <option key={s.value} value={s.value}>
                                                    {s.label}
                                                </option>
                                            ))}
                                        </select>

                                        {order.status === 'Shipped' && (
                                            <button
                                                className="btn-primary flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-[12px] cursor-pointer"
                                                onClick={() => generateStickerPDF(order)}
                                            >
                                                <Download className="w-3.5 h-3.5" /> Sticker
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Body Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                                    {/* Column 1: Delivery Address */}
                                    <div className="space-y-1.5 bg-[#FCF8F3]/60 p-3.5 rounded-[16px] border border-[#ECE2D3]">
                                        <div className="font-bold text-[#3E312C] flex items-center gap-1.5 text-xs">
                                            <MapPin className="w-3.5 h-3.5 text-[#3F5B43]" /> Shipping Address
                                        </div>
                                        <p className="text-[#65554D] leading-relaxed">
                                            {addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}<br />
                                            {addr.landmark ? `Landmark: ${addr.landmark}` : ''}<br />
                                            {addr.city}, {addr.state} - {addr.pincode}
                                        </p>
                                        {addr.mobile && (
                                            <p className="font-medium text-[#3E312C] flex items-center gap-1 pt-1">
                                                <Phone className="w-3 h-3 text-[#3F5B43]" /> {addr.mobile}
                                            </p>
                                        )}
                                    </div>

                                    {/* Column 2: Items & Files */}
                                    <div className="space-y-2 bg-[#FCF8F3]/60 p-3.5 rounded-[16px] border border-[#ECE2D3]">
                                        <div className="font-bold text-[#3E312C] flex items-center gap-1.5 text-xs">
                                            <Package className="w-3.5 h-3.5 text-[#3F5B43]" /> Items ({order.items?.length || 0})
                                        </div>
                                        <ul className="space-y-2 text-[#65554D]">
                                            {(order.items || []).map((item, idx) => {
                                                const firstFile = item.images?.[0];
                                                const isImage = firstFile?.match(/\.(jpeg|jpg|png|webp|gif)$/i);

                                                return (
                                                    <li key={idx} className="border-b border-[#ECE2D3]/60 last:border-b-0 pb-1.5 last:pb-0">
                                                        <div className="font-semibold text-[#3E312C] flex justify-between">
                                                            <span>{item.name || item.productId || 'Product'}</span>
                                                            <span className="text-[#3F5B43]">x{item.qty || 1}</span>
                                                        </div>
                                                        {(item.names || item.variantId) && (
                                                            <p className="text-[11px] text-[#65554D] italic mt-0.5">
                                                                Details: {Array.isArray(item.names) ? item.names.join(', ') : item.variantId || 'Standard'}
                                                            </p>
                                                        )}

                                                        {item.images && item.images.length > 0 && (
                                                            <div className="flex items-center gap-2 mt-1.5">
                                                                {isImage && (
                                                                    <img
                                                                        src={firstFile}
                                                                        alt="Preview"
                                                                        className="w-8 h-8 object-cover border border-[#ECE2D3] rounded-[6px]"
                                                                    />
                                                                )}
                                                                <div className="flex flex-wrap gap-1">
                                                                    {item.images.map((url, fIdx) => (
                                                                        <a
                                                                            key={fIdx}
                                                                            href={url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-[10px] font-semibold text-[#3F5B43] hover:underline bg-[#FFFDF9] px-2 py-0.5 rounded-full border border-[#ECE2D3]"
                                                                        >
                                                                            File {fIdx + 1}
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    {/* Column 3: Logistics Specs & Total */}
                                    <div className="space-y-3 bg-[#FCF8F3]/60 p-3.5 rounded-[16px] border border-[#ECE2D3] flex flex-col justify-between">
                                        <div>
                                            <div className="font-bold text-[#3E312C] flex items-center gap-1.5 text-xs mb-2">
                                                <FileText className="w-3.5 h-3.5 text-[#3F5B43]" /> Package Dimensions & Weight
                                            </div>

                                            <div className="grid grid-cols-4 gap-2">
                                                {['length', 'width', 'height'].map((field) => (
                                                    <div key={field}>
                                                        <label className="text-[10px] uppercase font-semibold text-[#65554D] block mb-0.5">
                                                            {field[0].toUpperCase()} (cm)
                                                        </label>
                                                        <input
                                                            type="number"
                                                            min={1}
                                                            value={order.dimensions?.[field as keyof typeof order.dimensions] || 20}
                                                            onChange={(e) => handleDimensionChange(order.id, field, e.target.value)}
                                                            className="w-full border border-[#ECE2D3] bg-[#FFFDF9] p-1.5 rounded-[8px] text-xs text-[#3E312C] focus:outline-none focus:border-[#7B8F63]"
                                                        />
                                                    </div>
                                                ))}
                                                <div>
                                                    <label className="text-[10px] uppercase font-semibold text-[#65554D] block mb-0.5">
                                                        Weight (g)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={order.weight || 350}
                                                        onChange={(e) => handleDimensionChange(order.id, 'weight', e.target.value)}
                                                        className="w-full border border-[#ECE2D3] bg-[#FFFDF9] p-1.5 rounded-[8px] text-xs text-[#3E312C] focus:outline-none focus:border-[#7B8F63]"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-2 border-t border-[#ECE2D3] flex items-center justify-between">
                                            <span className="font-bold text-[#65554D]">Total Amount:</span>
                                            <span className="text-base font-extrabold text-[#3F5B43]">
                                                ₹{(totalPaise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}