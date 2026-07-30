"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Plus, Trash2, Edit3, Sparkles } from "lucide-react";

export default function AddOrEditProduct() {
    const [mode, setMode] = useState("add");
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [templateId, setTemplateId] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const categories = [
        "Lithophanes",
        "Aura Lamp",
        "Moon Lamp",
        "Keychain",
        "Name Plate",
        "Miniatures",
        "Desktop Decor",
        "Planters and Vase",
        "Everyday Essentials",
    ];

    const defaultDescription = {
        about: "",
        productInfo: {
            "Style/Colour": "",
            "Item Shape": "",
            "Theme": "",
            "Occasion": "",
            "Pattern": "",
            "Mounting Type": "",
            "Frame Type": "",
            "Other Features": "",
            "Number of Items": "",
            "Whats Included": "",
        },
        measurements: {
            "Item Dimensions": "",
            "Item Weight": "",
            "Unit Count": "",
        },
        brandInfo: {
            "Brand Name": "",
            "Target Audience": "",
            "Country of Origin": "",
            "Manufacturer": "",
            "Item Type": "",
        },
        materials: {
            "Frame Material": "",
            "Back Material": "",
            "Customisations": "",
        },
    };

    const [form, setForm] = useState({
        productId: "",
        name: "",
        category: "",
        description: defaultDescription,
    });

    const [productImages, setProductImages] = useState<File[]>([]);
    const [variants, setVariants] = useState<any[]>([
        {
            variantId: "",
            size: "",
            shape: "",
            backlit: "",
            pricePaise: "",
            dimensions: { length: "", width: "", height: "", diameter: "" },
            weightGrams: "",
            images: [],
        },
    ]);

    const [loading, setLoading] = useState(false);

    const urlBase = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

    // Fetch products
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios
            .get(`${urlBase}/admin/products`)
            .then((res) => setProducts(res.data.products || []))
            .catch((err) => {
                console.error("❌ Failed to fetch products:", err);
                toast.error("Failed to load products list");
            });
    };

    // Load product for editing
    useEffect(() => {
        if (mode === "edit" && selectedProductId) {
            const loadingToast = toast.loading("Loading product details...");
            axios
                .get(`${urlBase}/admin/products/${selectedProductId}`)
                .then((res) => {
                    const p = res.data.product;
                    if (!p) return;
                    setForm({
                        productId: p.productId,
                        name: p.name,
                        category: p.category || "",
                        description: p.description || defaultDescription,
                    });
                    setVariants((p.variants || []).map((v: any) => ({ ...v, images: [] })));
                    toast.success("Product loaded successfully", { id: loadingToast });
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Failed to load product details", { id: loadingToast });
                });
        }
    }, [mode, selectedProductId, urlBase]);

    // Load template for new product
    useEffect(() => {
        if (mode === "add" && templateId) {
            const selected = products.find((p: any) => p.productId === templateId);
            if (!selected) return;
            setForm({
                productId: "",
                name: selected.name,
                category: selected.category || "",
                description: selected.description || defaultDescription,
            });
            setVariants((selected.variants || []).map((v: any) => ({ ...v, images: [] })));
            toast.success("Template loaded successfully!");
        }
    }, [mode, templateId, products]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleNestedChange = (section: string, key: string, value: string) =>
        setForm({
            ...form,
            description: {
                ...form.description,
                [section]: { ...(form.description as any)[section], [key]: value }
            },
        });

    const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setForm({ ...form, description: { ...form.description, about: e.target.value } });

    const handleProductImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setProductImages(Array.from(e.target.files));
        }
    };

    const handleVariantChange = (index: number, field: string, value: string) => {
        const newVariants = [...variants];
        newVariants[index][field] = value;
        setVariants(newVariants);
    };

    const handleDimensionChange = (index: number, dim: string, value: string) => {
        const newVariants = [...variants];
        newVariants[index].dimensions[dim] = value;
        setVariants(newVariants);
    };

    const handleVariantImages = (index: number, files: FileList | null) => {
        if (files) {
            const newVariants = [...variants];
            newVariants[index].images = Array.from(files);
            setVariants(newVariants);
        }
    };

    const addVariant = () =>
        setVariants([
            ...variants,
            {
                variantId: "",
                size: "",
                shape: "",
                backlit: "",
                pricePaise: "",
                dimensions: { length: "", width: "", height: "", diameter: "" },
                weightGrams: "",
                images: [],
            },
        ]);

    const deleteVariant = (index: number) => {
        if (variants.length === 1) {
            toast.error("At least one variant is required.");
            return;
        }
        const newVariants = [...variants];
        newVariants.splice(index, 1);
        setVariants(newVariants);
        toast.success("Variant removed");
    };

    const resetForm = () => {
        setForm({ productId: "", name: "", category: "", description: defaultDescription });
        setVariants([
            {
                variantId: "",
                size: "",
                shape: "",
                backlit: "",
                pricePaise: "",
                dimensions: { length: "", width: "", height: "", diameter: "" },
                weightGrams: "",
                images: [],
            },
        ]);
        setProductImages([]);
        setTemplateId("");
        setSelectedProductId("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const loadingToast = toast.loading(mode === "edit" ? "Updating product..." : "Adding product...");

        try {
            const formData = new FormData();
            formData.append("productId", form.productId);
            formData.append("name", form.name);
            formData.append("category", form.category);
            formData.append("description", JSON.stringify(form.description));
            productImages.forEach((file) => formData.append("productImages", file));
            formData.append("variants", JSON.stringify(variants));
            variants.forEach((v, idx) =>
                v.images.forEach((file: File) => formData.append(`variantImages_${idx}`, file))
            );

            if (mode === "edit") {
                await axios.put(
                    `${urlBase}/admin/products/${form.productId}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                toast.success("Product updated successfully!", { id: loadingToast });
            } else {
                await axios.post(`${urlBase}/admin/products`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Product added successfully!", { id: loadingToast });
                resetForm();
            }

            fetchProducts();
        } catch (err: any) {
            console.error(err);
            toast.error("Failed to submit product: " + (err.response?.data?.error || err.message), { id: loadingToast });
        }
        setLoading(false);
    };

    const handleDeleteClick = () => {
        if (!selectedProductId) return;
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsDeleteModalOpen(false);
        setLoading(true);
        const loadingToast = toast.loading("Deleting product...");
        try {
            await axios.delete(
                `${urlBase}/admin/products/${selectedProductId}`
            );
            toast.success("Product deleted successfully!", { id: loadingToast });
            resetForm();
            fetchProducts();
        } catch (err: any) {
            console.error(err);
            toast.error("Failed to delete product.", { id: loadingToast });
        }
        setLoading(false);
    };

    const inputClass =
        "w-full px-3 py-2 border border-[#E8E8E5] bg-[#FAFAF8] rounded-[10px] text-xs text-[#2F2F2F] shadow-sm focus:ring-2 focus:ring-[#8FAE8A] focus:outline-none";

    return (
        <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 py-8 font-['Inter',sans-serif] space-y-8">
            <h2 className="text-2xl font-extrabold text-[#2F2F2F] tracking-tight font-['Manrope',sans-serif] mb-6">
                Add / Edit Product Catalog
            </h2>

            {/* Mode Selector */}
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                    <div className="w-44">
                        <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Mode</label>
                        <select
                            value={mode}
                            onChange={(e) => {
                                setMode(e.target.value);
                                resetForm();
                            }}
                            className={inputClass}
                        >
                            <option value="add">➕ Add Product</option>
                            <option value="edit">✏️ Edit Product</option>
                        </select>
                    </div>

                    {mode === "add" && (
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Use Template</label>
                            <select
                                value={templateId}
                                onChange={(e) => setTemplateId(e.target.value)}
                                className={inputClass}
                            >
                                <option value="">-- Select Template --</option>
                                {products.map((p: any) => (
                                    <option key={p.productId} value={p.productId}>
                                        {p.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {mode === "edit" && (
                        <div className="flex-1 min-w-[200px] flex items-end gap-3">
                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Select Product</label>
                                <select
                                    value={selectedProductId}
                                    onChange={(e) => setSelectedProductId(e.target.value)}
                                    className={inputClass}
                                >
                                    <option value="">-- Select Product to Edit --</option>
                                    {products.map((p: any) => (
                                        <option key={p.productId} value={p.productId}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedProductId && (
                                <button
                                    type="button"
                                    onClick={handleDeleteClick}
                                    disabled={loading}
                                    className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-[10px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap h-[34px]"
                                >
                                    Delete Product
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <h3 className="text-lg font-bold text-[#2F2F2F]">General Information</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Product ID</label>
                            <input
                                type="text"
                                name="productId"
                                value={form.productId}
                                onChange={handleChange}
                                placeholder="e.g. litho-square"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Product Name"
                                required
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Category</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className={inputClass}
                            >
                                <option value="">-- Select Category --</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">About Product</label>
                        <textarea
                            placeholder="Description / About"
                            value={form.description.about}
                            onChange={handleAboutChange}
                            className={inputClass}
                            rows={3}
                        />
                    </div>
                </div>

                {/* Description Sections */}
                <div className="grid md:grid-cols-2 gap-4">
                    {(["productInfo", "measurements", "brandInfo", "materials"] as const).map((section) => (
                        <div key={section} className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                            <h3 className="font-bold text-[#2F2F2F] capitalize">{section.replace(/([A-Z])/g, ' $1')}</h3>
                            <div className="space-y-2">
                                {Object.entries((form.description as any)[section] || {}).map(([key, val]) => (
                                    <div key={key}>
                                        <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-0.5">{key}</label>
                                        <input
                                            type="text"
                                            placeholder={key}
                                            value={(val as string) || ""}
                                            onChange={(e) => handleNestedChange(section, key, e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Images */}
                <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                    <h3 className="text-lg font-bold text-[#2F2F2F]">Main Product Images</h3>
                    <input type="file" multiple onChange={handleProductImages} className="block w-full text-xs text-[#6E6E6E] file:mr-4 file:py-2 file:px-4 file:rounded-[10px] file:border-0 file:text-xs file:font-semibold file:bg-[#8FAE8A] file:text-white hover:file:bg-[#7FA66A] cursor-pointer" />
                </div>

                {/* Variants */}
                <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-[#2F2F2F]">Variants</h3>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                            <Plus className="w-4 h-4" /> Add Variant
                        </button>
                    </div>

                    {variants.map((v, idx) => (
                        <div key={idx} className="border border-[#E8E8E5] bg-[#FAFAF8] p-4 rounded-[14px] space-y-3 relative">
                            <div className="grid md:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Variant ID</label>
                                    <input
                                        type="text"
                                        placeholder="Variant ID"
                                        value={v.variantId}
                                        onChange={(e) => handleVariantChange(idx, "variantId", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Size</label>
                                    <input
                                        type="text"
                                        placeholder="Size"
                                        value={v.size}
                                        onChange={(e) => handleVariantChange(idx, "size", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Shape</label>
                                    <input
                                        type="text"
                                        placeholder="Shape"
                                        value={v.shape}
                                        onChange={(e) => handleVariantChange(idx, "shape", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Backlit Option</label>
                                    <select
                                        value={v.backlit}
                                        onChange={(e) => handleVariantChange(idx, "backlit", e.target.value)}
                                        className={inputClass}
                                    >
                                        <option value="">Select Backlit Option</option>
                                        <option value="warm">Warm</option>
                                        <option value="rgb">RGB</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Price (in paise)</label>
                                    <input
                                        type="number"
                                        placeholder="Price Paise"
                                        value={v.pricePaise}
                                        onChange={(e) => handleVariantChange(idx, "pricePaise", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Weight (grams)</label>
                                    <input
                                        type="number"
                                        placeholder="Weight (grams)"
                                        value={v.weightGrams}
                                        onChange={(e) => handleVariantChange(idx, "weightGrams", e.target.value)}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {(["length", "width", "height", "diameter"] as const).map((dim) => (
                                    <div key={dim}>
                                        <label className="block text-[10px] font-semibold text-[#6E6E6E] mb-1 capitalize">{dim}</label>
                                        <input
                                            type="number"
                                            placeholder={dim}
                                            value={v.dimensions[dim]}
                                            onChange={(e) => handleDimensionChange(idx, dim, e.target.value)}
                                            className={inputClass}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Variant Images</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => handleVariantImages(idx, e.target.files)}
                                    className="block w-full text-xs text-[#6E6E6E] file:mr-4 file:py-1.5 file:px-3 file:rounded-[10px] file:border-0 file:text-xs file:font-semibold file:bg-[#2F2F2F] file:text-white hover:file:bg-black cursor-pointer"
                                />
                            </div>

                            <div className="text-right pt-2">
                                <button
                                    type="button"
                                    onClick={() => deleteVariant(idx)}
                                    className="bg-rose-500 hover:bg-rose-600 text-white px-3 py-1 rounded-[10px] text-xs font-semibold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete Variant
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#8FAE8A] hover:bg-[#7FA66A] text-white p-3 rounded-[14px] shadow-sm transition-all text-center font-semibold text-sm cursor-pointer disabled:opacity-50"
                >
                    {loading ? "Submitting..." : mode === "edit" ? "Update Product" : "Add Product"}
                </button>
            </form>

            {/* Modern Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
                    <div className="bg-[#FFFFFF] w-full max-w-md p-6 rounded-[20px] border border-[#E8E8E5] shadow-2xl space-y-4">
                        <h3 className="text-lg font-bold text-[#2F2F2F]">Confirm Deletion</h3>
                        <p className="text-xs text-[#6E6E6E] leading-relaxed">
                            Are you sure you want to delete product <span className="font-semibold text-[#2F2F2F]">{selectedProductId}</span>? This action cannot be undone and will remove it from the catalog.
                        </p>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="px-4 py-2 bg-[#FAFAF8] hover:bg-[#E8E8E5] text-[#2F2F2F] rounded-[10px] text-xs font-semibold border border-[#E8E8E5] transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-[10px] text-xs font-semibold shadow-sm transition-all cursor-pointer"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}