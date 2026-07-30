"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import QRCode from "qrcode";
import { toast } from "react-hot-toast";

export default function ShippingSticker() {
    const [form, setForm] = useState({
        name: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        pincode: "",
        mobile: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        remarks: "Prepaid",
    });

    const [productOptions, setProductOptions] = useState({
        drop1: "",
        drop2: "",
        drop3: "",
        drop4: "",
    });

    const [products, setProducts] = useState([
        { name: "", quantity: 1, unitPrice: 0 },
    ]);

    const [qrDataUrl, setQrDataUrl] = useState<any>(null);
    const [pdfBlobUrl, setPdfBlobUrl] = useState<any>(null);
    const [generating, setGenerating] = useState(false);
    const [printReady, setPrintReady] = useState(false);

    const inputClass =
        "w-full px-3 py-2 border border-[#E8E8E5] bg-[#FAFAF8] rounded-[10px] text-xs text-[#2F2F2F] shadow-sm focus:ring-2 focus:ring-[#8FAE8A] focus:outline-none";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProductOptions((prev) => {
            const updated = { ...prev, [name]: value };
            const productName = [
                updated.drop1,
                updated.drop2,
                updated.drop3,
                updated.drop4,
            ]
                .filter(Boolean)
                .join(" with ");

            const updatedProducts = [...products];
            updatedProducts[0].name = productName;
            setProducts(updatedProducts);

            return updated;
        });
    };

    const generateOrderId = () => {
        const today = new Date().toISOString().split("T")[0].replace(/-/g, "");
        return `${today}${form.pincode || "000000"}`;
    };

    const getTotal = (p: any) => p.quantity * p.unitPrice || 0;
    const getGrandTotal = () =>
        products.reduce((sum, p) => sum + getTotal(p), 0);

    const addProduct = () => {
        setProducts([...products, { name: "", quantity: 1, unitPrice: 0 }]);
    };

    const removeProduct = (index: number) => {
        const updated = [...products];
        updated.splice(index, 1);
        setProducts(updated);
    };

    const handleProductFieldChange = (index: number, field: string, value: string) => {
        const updated: any = [...products];
        updated[index][field] =
            field === "name" ? value : parseFloat(value) || 0;
        setProducts(updated);
    };

    const handleGenerate = async () => {
        if (!form.name || !form.mobile || !form.pincode) {
            toast.error("Please fill in recipient name, mobile, and pincode");
            return;
        }

        setGenerating(true);
        setPrintReady(false);
        const loadingToast = toast.loading("Generating shipping label PDF...");

        const today = new Date().toISOString().split("T")[0];
        const orderId = generateOrderId();

        const weightKg = (parseFloat(form.weight || "0") / 1000).toFixed(2);
        const dimensions = `${form.length || 0}×${form.width || 0}×${form.height || 0} cm`;
        const grandTotal = getGrandTotal();

        const qrText = `
SHIP TO:
${form.name}
${form.address1}
${form.address2}
${form.address3}
${form.city}, ${form.state}, India - ${form.pincode}
Mobile: ${form.mobile}
Order ID: ${orderId}
Weight: ${weightKg} KG
Dimensions: ${dimensions}
Remarks: ${form.remarks}
Date: ${today}
Total: INR ${grandTotal.toFixed(2)}
`.trim();

        try {
            const qrUrl = await QRCode.toDataURL(qrText);
            setQrDataUrl(qrUrl);

            const doc = new jsPDF();

            // ----------------------------------------------------
            // SHIP TO
            // ----------------------------------------------------
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("SHIP TO:", 10, 15);

            doc.setFont("helvetica", "normal");
            doc.text(form.name || "", 10, 22);
            doc.text(form.address1 || "", 10, 28);
            doc.text(form.address2 || "", 10, 34);
            doc.text(form.address3 || "", 10, 40);
            doc.text(`${form.city || ""}, ${form.state || ""}`, 10, 46);
            doc.text(`India - ${form.pincode || ""}`, 10, 52);

            doc.setFont("helvetica", "bold");
            doc.text(`Mob: ${form.mobile}`, 10, 58);

            // ----------------------------------------------------
            // FROM
            // ----------------------------------------------------
            doc.setFont("helvetica", "bold");
            doc.text("FROM:", 120, 15);
            doc.text("3dVishwa - Pixel Printing Studio", 120, 22);

            doc.setFont("helvetica", "normal");
            doc.text("Kashid Nagar, Pimple Gurav", 120, 28);
            doc.text("Pune 411061, Maharashtra, India", 120, 34);

            doc.setFont("helvetica", "bold");
            doc.text("Mob No.: +91 7276209570", 120, 40);

            // ----------------------------------------------------
            // Order Table
            // ----------------------------------------------------
            autoTable(doc, {
                startY: 62,
                head: [
                    ["ORDER ID", "WEIGHT", "DIMENSIONS", "DATE", "REMARKS"],
                ],
                body: [
                    [
                        orderId,
                        `${weightKg} KG`,
                        dimensions,
                        today,
                        form.remarks,
                    ],
                ],
                styles: { fontSize: 10 },
            });

            // ----------------------------------------------------
            // Products Table
            // ----------------------------------------------------
            autoTable(doc, {
                startY: (doc as any).lastAutoTable.finalY + 10,
                head: [["Product", "Qty", "Unit Price", "Total"]],
                body: products.map((p) => [
                    p.name || "-",
                    p.quantity,
                    Number(p.unitPrice).toFixed(2),
                    getTotal(p).toFixed(2),
                ]),
                foot: [["", "", "Grand Total", `INR ${grandTotal.toFixed(2)}`]],
            });

            // ----------------------------------------------------
            // QR Code
            // ----------------------------------------------------
            const qrSize = 40;
            const qrX = (doc.internal.pageSize.getWidth() - qrSize) / 2;
            const qrY = (doc as any).lastAutoTable.finalY + 10;

            doc.addImage(qrUrl, "PNG", qrX, qrY, qrSize, qrSize);

            const pdfBlob = doc.output("blob");
            const blobUrl = URL.createObjectURL(pdfBlob);
            setPdfBlobUrl(blobUrl);
            setPrintReady(true);

            doc.save(`ShippingLabel_${orderId}.pdf`);
            toast.success("Shipping label generated successfully!", { id: loadingToast });
        } catch (err: any) {
            console.error(err);
            toast.error("Error generating label: " + err.message, { id: loadingToast });
        } finally {
            setGenerating(false);
        }
    };

    const handlePrint = () => {
        if (!pdfBlobUrl) return;
        const win = window.open(pdfBlobUrl, "_blank");
        if (win) win.onload = () => win.print();
    };

    return (
        <div className="w-full max-w-full overflow-hidden px-2 sm:px-4 py-8 font-['Inter',sans-serif] space-y-8">
            <h2 className="text-2xl font-extrabold text-[#2F2F2F] tracking-tight font-['Manrope',sans-serif] mb-6">
                Shipping Label Generator (Admin)
            </h2>

            {/* Recipient Info */}
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="text-lg font-bold text-[#2F2F2F]">Recipient Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className={inputClass} name="name" placeholder="Recipient Name" onChange={handleChange} />
                    <input className={inputClass} name="address1" placeholder="Address Line 1" onChange={handleChange} />
                    <input className={inputClass} name="address2" placeholder="Address Line 2" onChange={handleChange} />
                    <input className={inputClass} name="address3" placeholder="Landmark" onChange={handleChange} />
                    <input className={inputClass} name="city" placeholder="City" onChange={handleChange} />
                    <input className={inputClass} name="state" placeholder="State" onChange={handleChange} />
                    <input className={inputClass} name="pincode" placeholder="Pincode" onChange={handleChange} />
                    <input className={inputClass} name="mobile" placeholder="Mobile" onChange={handleChange} />
                </div>
            </div>

            {/* Parcel Info */}
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="text-lg font-bold text-[#2F2F2F]">Parcel Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input className={inputClass} type="number" name="weight" placeholder="Weight (g)" onChange={handleChange} />
                    <div className="flex items-center gap-2">
                        <input className={inputClass} type="number" placeholder="Length (cm)" name="length" onChange={handleChange} />
                        <input className={inputClass} type="number" placeholder="Width (cm)" name="width" onChange={handleChange} />
                        <input className={inputClass} type="number" placeholder="Height (cm)" name="height" onChange={handleChange} />
                    </div>
                    <select className={inputClass} name="remarks" onChange={handleChange}>
                        <option value="Prepaid">Prepaid</option>
                        <option value="Postpaid">Postpaid</option>
                        <option value="COD">COD</option>
                    </select>
                </div>
            </div>

            {/* Product Options */}
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="text-lg font-bold text-[#2F2F2F]">Select Product</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select className={inputClass} name="drop1" onChange={handleProductChange}>
                        <option value="">Select Lithophane</option>
                        <option>160mm x 160mm round</option>
                        <option>160mm x 160mm heart</option>
                        <option>160mm x 160mm square</option>
                        <option>160mm x 120mm rectangle</option>
                    </select>

                    <select className={inputClass} name="drop2" onChange={handleProductChange}>
                        <option value="">Select Light</option>
                        <option>warm white backlit</option>
                        <option>rgb</option>
                        <option>backlit</option>
                    </select>

                    <select className={inputClass} name="drop3" onChange={handleProductChange}>
                        <option value="">Select Power Option</option>
                        <option>12V, 1A adapter</option>
                        <option>5V USB cable</option>
                    </select>

                    <select className={inputClass} name="drop4" onChange={handleProductChange}>
                        <option value="">Select Stand</option>
                        <option>round frame stand</option>
                        <option>rectangle frame stand</option>
                    </select>
                </div>
            </div>

            {/* Product List */}
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#2F2F2F]">Products</h3>
                    <button
                        className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                        onClick={addProduct}
                    >
                        ➕ Add Product
                    </button>
                </div>

                {products.map((product, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 border border-[#E8E8E5] bg-[#FAFAF8] p-4 rounded-[14px] items-center">
                        <input
                            className={inputClass}
                            placeholder="Product Name"
                            value={product.name}
                            onChange={(e) =>
                                handleProductFieldChange(index, "name", e.target.value)
                            }
                        />
                        <input
                            className={inputClass}
                            type="number"
                            placeholder="Qty"
                            value={product.quantity}
                            onChange={(e) =>
                                handleProductFieldChange(index, "quantity", e.target.value)
                            }
                        />
                        <input
                            className={inputClass}
                            type="number"
                            placeholder="Unit Price"
                            value={product.unitPrice}
                            onChange={(e) =>
                                handleProductFieldChange(index, "unitPrice", e.target.value)
                            }
                        />
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-xs text-[#2F2F2F]">
                                Total: INR {getTotal(product).toFixed(2)}
                            </span>

                            {products.length > 1 && (
                                <button
                                    className="px-2.5 py-1 bg-rose-500 hover:bg-rose-600 text-white rounded-[10px] text-xs font-semibold cursor-pointer"
                                    onClick={() => removeProduct(index)}
                                >
                                    ❌
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <h3 className="text-base font-bold text-[#2F2F2F] pt-2">
                    Grand Total: INR {getGrandTotal().toFixed(2)}
                </h3>
            </div>

            {/* Generate + Print */}
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                    <button
                        className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                        onClick={handleGenerate}
                        disabled={generating}
                    >
                        {generating ? "Generating..." : "Generate PDF"}
                    </button>

                    <button
                        className="bg-[#2F2F2F] hover:bg-black text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap disabled:opacity-50"
                        onClick={handlePrint}
                        disabled={!printReady}
                    >
                        Print PDF
                    </button>
                </div>

                {qrDataUrl && (
                    <div className="mt-6">
                        <h4 className="font-semibold text-xs text-[#6E6E6E] mb-2">QR Preview:</h4>
                        <img src={qrDataUrl} width={150} alt="QR Code Preview" className="border border-[#E8E8E5] rounded-[10px] p-2 bg-[#FAFAF8]" />
                    </div>
                )}
            </div>
        </div>
    );
}