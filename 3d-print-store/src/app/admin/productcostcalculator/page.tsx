"use client";

import React, { useState } from "react";
import Head from "next/head";
import {
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Card,
    IconButton,
    Divider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { toast } from "react-hot-toast";

const ProductCostCalculator = () => {
    const [filamentCostPerKg, setFilamentCostPerKg] = useState(700);
    const [powerCostPerHr, setPowerCostPerHr] = useState(10);
    const [extraTolerance, setExtraTolerance] = useState(10);
    const [profitMargin, setProfitMargin] = useState(25);
    const [taxRate, setTaxRate] = useState(18);
    const [packagingCost, setPackagingCost] = useState(100);

    const [parts, setParts] = useState([
        { materialWeight: 0, materialLength: 0, printHours: 0, printMinutes: 0 },
    ]);

    const [electronics, setElectronics] = useState([
        { name: "Component 1", cost: 150 },
    ]);

    const [results, setResults] = useState<any>(null);

    const parseNum = (v: any) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : 0;
    };

    const handleAddPart = () =>
        setParts((prev) => [
            ...prev,
            { materialWeight: 0, materialLength: 0, printHours: 0, printMinutes: 0 },
        ]);

    const handleUpdatePart = (index: number, field: string, value: any) =>
        setParts((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: parseNum(value) };
            return copy;
        });

    const handleRemovePart = (index: number) =>
        setParts((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

    const handleAddElectronics = () =>
        setElectronics((prev) => [...prev, { name: "", cost: 0 }]);

    const handleUpdateElectronics = (index: number, field: string, value: any) =>
        setElectronics((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: field === "cost" ? parseNum(value) : value };
            return copy;
        });

    const handleRemoveElectronics = (index: number) =>
        setElectronics((prev) => (prev.length > 1 ? prev.filter((_, i) => i !== index) : prev));

    const calculateCost = () => {
        const costPerGram = parseNum(filamentCostPerKg) / 1000;
        const totalMaterialWeight = parts.reduce((sum, p) => sum + parseNum(p.materialWeight), 0);
        const adjustedWeight = totalMaterialWeight * (1 + parseNum(extraTolerance) / 100);
        const filamentCost = adjustedWeight * costPerGram;

        const totalPrintHours = parts.reduce(
            (sum, p) => sum + parseNum(p.printHours) + parseNum(p.printMinutes) / 60,
            0
        );
        const powerCost = totalPrintHours * parseNum(powerCostPerHr);

        const electronicsCost = electronics.reduce((sum, e) => sum + parseNum(e.cost), 0);

        const baseCost =
            filamentCost + powerCost + electronicsCost + parseNum(packagingCost);
        const profit = baseCost * (parseNum(profitMargin) / 100);
        const subtotal = baseCost + profit;
        const tax = subtotal * (parseNum(taxRate) / 100);
        const total = subtotal + tax;

        setResults({
            adjustedWeight: adjustedWeight.toFixed(2),
            filamentCost: filamentCost.toFixed(2),
            powerCost: powerCost.toFixed(2),
            electronicsCost: electronicsCost.toFixed(2),
            baseCost: baseCost.toFixed(2),
            profit: profit.toFixed(2),
            tax: tax.toFixed(2),
            total: total.toFixed(2),
        });

        toast.success("Cost calculated successfully!");
    };

    const inputClass =
        "w-full px-3 py-2 border border-[#E8E8E5] bg-[#FAFAF8] rounded-[10px] text-xs text-[#2F2F2F] shadow-sm focus:ring-2 focus:ring-[#8FAE8A] focus:outline-none";

    return (
        <>
            <Head>
                <title>Product Cost Calculator | 3D Vishwa</title>
                <meta name="description" content="Calculate estimated product cost for 3D printed items" />
            </Head>

            <div className="w-full max-w-full overflow-hidden px-2 sm:px-4 py-8 font-['Inter',sans-serif] space-y-8">
                <h2 className="text-2xl font-extrabold text-[#2F2F2F] tracking-tight font-['Manrope',sans-serif] mb-6">
                    General Product Cost Calculator
                </h2>

                <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Filament Cost (₹/kg)</label>
                            <input
                                className={inputClass}
                                type="number"
                                value={filamentCostPerKg}
                                onChange={(e) => setFilamentCostPerKg(parseNum(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Power Cost (₹/hr)</label>
                            <input
                                className={inputClass}
                                type="number"
                                value={powerCostPerHr}
                                onChange={(e) => setPowerCostPerHr(parseNum(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Material Tolerance (%)</label>
                            <input
                                className={inputClass}
                                type="number"
                                value={extraTolerance}
                                onChange={(e) => setExtraTolerance(parseNum(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <h3 className="text-lg font-bold text-[#2F2F2F]">Parts</h3>
                    {parts.map((part, i) => (
                        <div key={i} className="border border-[#E8E8E5] bg-[#FAFAF8] p-4 rounded-[14px] my-2">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                                <div className="sm:col-span-3">
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Material (g)</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        value={part.materialWeight}
                                        onChange={(e) => handleUpdatePart(i, "materialWeight", e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-3">
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Length (m)</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        value={part.materialLength}
                                        onChange={(e) => handleUpdatePart(i, "materialLength", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-2">
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Hours</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        value={part.printHours}
                                        onChange={(e) => handleUpdatePart(i, "printHours", e.target.value)}
                                    />
                                </div>
                                <div className="col-span-6 sm:col-span-2">
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Minutes</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        value={part.printMinutes}
                                        onChange={(e) => handleUpdatePart(i, "printMinutes", e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-2 flex justify-end sm:justify-center pt-2 sm:pt-6">
                                    <button
                                        onClick={() => handleRemovePart(i)}
                                        className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-[10px] transition-all cursor-pointer"
                                        aria-label={`Remove part ${i + 1}`}
                                    >
                                        <Delete className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAddPart}
                        className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                        <Add className="w-4 h-4" /> Add Part
                    </button>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <h3 className="text-lg font-bold text-[#2F2F2F]">Electronics</h3>
                    {electronics.map((el, i) => (
                        <div key={i} className="border border-[#E8E8E5] bg-[#FAFAF8] p-4 rounded-[14px] my-2">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                                <div className="sm:col-span-6">
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Component Name</label>
                                    <input
                                        className={inputClass}
                                        value={el.name}
                                        onChange={(e) => handleUpdateElectronics(i, "name", e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-4">
                                    <label className="block text-[11px] font-semibold text-[#6E6E6E] mb-1">Cost (₹)</label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        value={el.cost}
                                        onChange={(e) => handleUpdateElectronics(i, "cost", e.target.value)}
                                    />
                                </div>
                                <div className="sm:col-span-2 flex justify-end sm:justify-center pt-2 sm:pt-6">
                                    <button
                                        onClick={() => handleRemoveElectronics(i)}
                                        className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-[10px] transition-all cursor-pointer"
                                        aria-label={`Remove component ${i + 1}`}
                                    >
                                        <Delete className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={handleAddElectronics}
                        className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                        <Add className="w-4 h-4" /> Add Component
                    </button>
                </div>

                <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Packaging Cost (₹)</label>
                            <input
                                className={inputClass}
                                type="number"
                                value={packagingCost}
                                onChange={(e) => setPackagingCost(parseNum(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">Profit Margin (%)</label>
                            <input
                                className={inputClass}
                                type="number"
                                value={profitMargin}
                                onChange={(e) => setProfitMargin(parseNum(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-[#2F2F2F] mb-1">GST/Tax (%)</label>
                            <input
                                className={inputClass}
                                type="number"
                                value={taxRate}
                                onChange={(e) => setTaxRate(parseNum(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={calculateCost}
                        className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-6 py-3 rounded-[14px] text-sm font-semibold shadow-sm transition-all cursor-pointer"
                    >
                        Calculate Total Cost
                    </button>
                </div>

                {results && (
                    <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-3">
                        <h3 className="text-lg font-bold text-[#2F2F2F] mb-2">💰 Cost Breakdown</h3>
                        <hr className="border-[#E8E8E5] my-2" />
                        <p className="text-xs text-[#6E6E6E]">Adjusted Filament Weight: <span className="font-semibold text-[#2F2F2F]">{results.adjustedWeight} g</span></p>
                        <p className="text-xs text-[#6E6E6E]">Filament Cost: <span className="font-semibold text-[#2F2F2F]">₹{results.filamentCost}</span></p>
                        <p className="text-xs text-[#6E6E6E]">Power Cost: <span className="font-semibold text-[#2F2F2F]">₹{results.powerCost}</span></p>
                        <p className="text-xs text-[#6E6E6E]">Electronics Cost: <span className="font-semibold text-[#2F2F2F]">₹{results.electronicsCost}</span></p>
                        <p className="text-xs text-[#6E6E6E]">Packaging Cost: <span className="font-semibold text-[#2F2F2F]">₹{packagingCost}</span></p>
                        <p className="text-xs text-[#6E6E6E] pt-1">Base Cost: <span className="font-semibold text-[#2F2F2F]">₹{results.baseCost}</span></p>
                        <p className="text-xs text-[#6E6E6E]">Profit: <span className="font-semibold text-[#2F2F2F]">₹{results.profit}</span></p>
                        <p className="text-xs text-[#6E6E6E]">Tax (GST): <span className="font-semibold text-[#2F2F2F]">₹{results.tax}</span></p>
                        <hr className="border-[#E8E8E5] my-2" />
                        <h4 className="text-base font-extrabold text-[#2F2F2F]">Total Estimated Cost: ₹{results.total}</h4>
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductCostCalculator;