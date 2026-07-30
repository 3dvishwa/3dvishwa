'use client';

import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Pencil, Save, X, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function InventoryManagement() {
    const [products, setProducts] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactionsLimit, setTransactionsLimit] = useState<any>(10);

    // WHICH ROW IS BEING EDITED
    const [editingRow, setEditingRow] = useState<string | null>(null);

    // EDITING DATA FOR SELECTED ROW
    const [editData, setEditData] = useState<any>(null);

    const [newTransaction, setNewTransaction] = useState({
        date: '',
        type: 'Sales',
        productType: '',
        productName: '',
        quantity: 1,
        amount: 0,
    });

    // --- Reports states ---
    const [reportType, setReportType] = useState('Sales');
    const [reportPeriod, setReportPeriod] = useState('Week');
    const [reportMonth, setReportMonth] = useState(''); // format 'YYYY-MM'
    const [reportYear, setReportYear] = useState(new Date().getFullYear().toString());
    const [reportData, setReportData] = useState<any[]>([]);
    const [reportTotal, setReportTotal] = useState(0);

    const [availableMonths, setAvailableMonths] = useState<string[]>([]);
    const [availableYears, setAvailableYears] = useState<string[]>([]);

    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL || '/api';

    // Fetch products
    useEffect(() => {
        fetch(`${urlBase}/admin/inventory`)
            .then(res => res.json())
            .then(data => setProducts(data.products || []))
            .catch(err => {
                console.error(err);
                toast.error('Failed to load inventory products');
            })
            .finally(() => setLoadingProducts(false));
    }, [urlBase]);

    // Fetch transactions from backend API
    useEffect(() => {
        const fetchTransactionsData = async () => {
            try {
                const res = await fetch(`${urlBase}/admin/inventory/transactions`);
                const data = await res.json();
                const apiTransactions = data.transactions || [];

                const sorted = apiTransactions.sort(
                    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                setTransactions(sorted);
            } catch (err) {
                console.error('Error loading transactions:', err);
                toast.error('Failed to load transactions');
                setTransactions([]);
            } finally {
                setLoadingTransactions(false);
            }
        };

        fetchTransactionsData();
    }, [urlBase]);

    // Derive available months & years whenever transactions change
    useEffect(() => {
        if (!transactions || transactions.length === 0) {
            setAvailableMonths([]);
            setAvailableYears([new Date().getFullYear().toString()]);
            return;
        }

        const monthsSet = new Set<string>();
        const yearsSet = new Set<string>();

        transactions.forEach(t => {
            if (!t.date) return;
            const d = new Date(t.date);
            if (isNaN(d.getTime())) return;
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            const key = `${y}-${String(m).padStart(2, '0')}`;
            monthsSet.add(key);
            yearsSet.add(String(y));
        });

        const monthsArr = Array.from(monthsSet).sort((a, b) => (a < b ? 1 : -1));
        const yearsArr = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a));

        setAvailableMonths(monthsArr);
        setAvailableYears(yearsArr);

        if (!reportMonth && monthsArr.length) setReportMonth(monthsArr[0]);
        if (!yearsArr.includes(reportYear)) setReportYear(yearsArr[0] || new Date().getFullYear().toString());
    }, [transactions]); // eslint-disable-line react-hooks/exhaustive-deps

    const displayedTransactions =
        transactionsLimit === 'All'
            ? transactions
            : transactions.slice(0, Number(transactionsLimit));

    // Add new transaction
    const handleAddTransaction = async () => {
        const { date, type, productType, productName, quantity, amount } = newTransaction;

        if (!date || !productType || !productName || !quantity || amount == null) {
            toast.error('Please fill all required fields');
            return;
        }

        const payload = {
            type,
            date,
            productType,
            productName,
            quantity: Number(quantity),
            price: Number(amount),
        };

        const loadingToast = toast.loading('Adding transaction...');
        try {
            const res = await fetch(`${urlBase}/admin/inventory/transactions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!data.ok) throw new Error(data.error || 'Failed to add transaction');

            setTransactions(prev =>
                [data.transaction, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );

            setNewTransaction({
                date: '',
                type: 'Sales',
                productType: '',
                productName: '',
                quantity: 1,
                amount: 0,
            });
            toast.success('Transaction added successfully', { id: loadingToast });
        } catch (err: any) {
            toast.error('Error adding transaction: ' + err.message, { id: loadingToast });
        }
    };

    // Update transaction
    const handleUpdateTransaction = async (id: string, updatedData: any) => {
        const loadingToast = toast.loading('Updating transaction...');
        try {
            const res = await fetch(`${urlBase}/admin/inventory/transactions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();

            if (!data.ok) throw new Error(data.error || 'Failed to update transaction');

            setTransactions(prev =>
                prev
                    .map(t => (t.id === id ? data.transaction : t))
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            );

            setEditingRow(null);
            setEditData(null);
            toast.success('Transaction updated successfully', { id: loadingToast });
        } catch (err: any) {
            toast.error('Error updating transaction: ' + err.message, { id: loadingToast });
        }
    };

    // Delete transaction
    const handleDeleteTransaction = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this transaction?')) return;

        const loadingToast = toast.loading('Deleting transaction...');
        try {
            const res = await fetch(`${urlBase}/admin/inventory/transactions/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (!data.ok) throw new Error(data.error || 'Failed to delete transaction');

            setTransactions(prev => prev.filter(t => t.id !== id));
            toast.success('Transaction deleted successfully', { id: loadingToast });
        } catch (err: any) {
            toast.error('Error deleting transaction: ' + err.message, { id: loadingToast });
        }
    };

    // Download PDF (All transactions)
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text('Inventory Transactions Report', 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [['Date', 'Type', 'Product Type', 'Product Name', 'Qty', 'Price (₹)', 'Total (₹)']],
            body: transactions.map(t => {
                const price = Number(t.price || t.price === 0 ? t.price : 0);
                const qty = Number(t.quantity || 0);
                return [
                    t.date ? new Date(t.date).toLocaleDateString() : '-',
                    t.type || '-',
                    t.productType || '-',
                    t.productName || '-',
                    qty,
                    `₹${price.toFixed(2)}`,
                    `₹${(qty * price).toFixed(2)}`
                ];
            }),
            styles: { fontSize: 10 },
        });

        doc.save('Inventory_Transactions_Report.pdf');
        toast.success('PDF downloaded successfully');
    };

    // Filter helper function used by generateReport and downloadReportPDF
    const getFilteredReportTransactions = () => {
        if (!transactions.length) return [];

        const now = new Date();
        return transactions.filter(t => {
            if (t.type !== reportType) return false;
            const tDate = new Date(t.date);
            if (isNaN(tDate.getTime())) return false;

            if (reportPeriod === 'Week') {
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                weekStart.setHours(0, 0, 0, 0);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                weekEnd.setHours(23, 59, 59, 999);
                return tDate >= weekStart && tDate <= weekEnd;
            } else if (reportPeriod === 'Month') {
                if (!reportMonth) return false;
                const [y, mon] = reportMonth.split('-');
                return tDate.getFullYear() === Number(y) && (tDate.getMonth() + 1) === Number(mon);
            } else if (reportPeriod === 'Year') {
                if (!reportYear) return false;
                return tDate.getFullYear() === Number(reportYear);
            }
            return false;
        }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    // Generate report
    const generateReport = () => {
        const filtered = getFilteredReportTransactions();
        if (filtered.length === 0) {
            setReportData([]);
            setReportTotal(0);
            toast.error('No transactions for the selected period.');
            return;
        }

        const data = filtered.map(t => {
            const qty = Number(t.quantity || 0);
            const price = Number(t.price || 0);
            return {
                date: t.date ? new Date(t.date).toLocaleDateString() : '-',
                productType: t.productType || '-',
                productName: t.productName || '-',
                quantity: qty,
                total: qty * price,
            };
        });

        const totalForPeriod = data.reduce((sum, r) => sum + r.total, 0);

        setReportData(data);
        setReportTotal(totalForPeriod);
        toast.success('Report generated successfully');
    };

    // Download PDF for the specific generated report period
    const downloadReportPDF = () => {
        const filtered = getFilteredReportTransactions();
        if (filtered.length === 0) {
            toast.error('No report data available to download.');
            return;
        }

        let periodLabel = reportPeriod;
        if (reportPeriod === 'Month' && reportMonth) {
            const [y, mon] = reportMonth.split('-');
            const monthName = new Date(Number(y), Number(mon) - 1).toLocaleString('default', { month: 'long' });
            periodLabel = `${monthName} ${y}`;
        } else if (reportPeriod === 'Year') {
            periodLabel = reportYear;
        }

        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`${reportType} Report (${periodLabel})`, 14, 20);

        autoTable(doc, {
            startY: 30,
            head: [['Date', 'Product Type', 'Product Name', 'Quantity', 'Total (₹)']],
            body: filtered.map(t => {
                const qty = Number(t.quantity || 0);
                const price = Number(t.price || 0);
                return [
                    t.date ? new Date(t.date).toLocaleDateString() : '-',
                    t.productType || '-',
                    t.productName || '-',
                    qty,
                    `₹${(qty * price).toFixed(2)}`
                ];
            }),
            styles: { fontSize: 10 },
        });

        // Add total summary row info at the bottom
        const totalAmount = filtered.reduce((sum, t) => sum + (Number(t.quantity || 0) * Number(t.price || 0)), 0);
        const finalY = (doc as any).lastAutoTable.finalY || 40;
        doc.setFontSize(12);
        doc.text(`Total for ${periodLabel}: ₹${totalAmount.toFixed(2)}`, 14, finalY + 10);

        doc.save(`${reportType}_Report_${periodLabel.replace(/\s+/g, '_')}.pdf`);
        toast.success('Report PDF downloaded successfully');
    };

    return (
        <div className="w-full max-w-full overflow-hidden px-2 sm:px-4 py-8 font-['Inter',sans-serif] space-y-8">
            <h2 className="text-2xl font-extrabold text-[#2F2F2F] tracking-tight font-['Manrope',sans-serif] mb-6">Inventory Management</h2>

            {/* Add Transaction Section */}
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <h3 className="text-lg font-bold text-[#2F2F2F]">Add Transaction</h3>

                <div className="flex flex-wrap gap-3 items-end">
                    <select
                        value={newTransaction.type}
                        onChange={e =>
                            setNewTransaction({ ...newTransaction, type: e.target.value })
                        }
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs font-semibold text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A]"
                    >
                        <option value="Sales">Sales</option>
                        <option value="Purchase">Purchase</option>
                    </select>

                    <input
                        type="date"
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A] w-36"
                        value={newTransaction.date}
                        onChange={e =>
                            setNewTransaction({ ...newTransaction, date: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Product Type"
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A] w-36"
                        value={newTransaction.productType}
                        onChange={e =>
                            setNewTransaction({ ...newTransaction, productType: e.target.value })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Product Name"
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A] w-64"
                        value={newTransaction.productName}
                        onChange={e =>
                            setNewTransaction({ ...newTransaction, productName: e.target.value })
                        }
                    />

                    <input
                        type="number"
                        min={1}
                        placeholder="Qty"
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A] w-24"
                        value={newTransaction.quantity}
                        onChange={e =>
                            setNewTransaction({ ...newTransaction, quantity: Number(e.target.value) })
                        }
                    />

                    <input
                        type="number"
                        min={0}
                        placeholder="Amount (₹)"
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A] w-32"
                        value={newTransaction.amount}
                        onChange={e =>
                            setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })
                        }
                    />

                    <button
                        onClick={handleAddTransaction}
                        className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                        Add
                    </button>

                    <button
                        onClick={downloadPDF}
                        className="bg-[#2F2F2F] hover:bg-black text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                        Download PDF
                    </button>
                </div>
            </div>

            {/* Transactions Table Controls */}
            <div className="flex items-center justify-between">
                <div className="text-xs text-[#6E6E6E]">
                    Showing <span className="font-semibold text-[#2F2F2F]">{displayedTransactions.length}</span> of{' '}
                    <span className="font-semibold text-[#2F2F2F]">{transactions.length}</span> transactions
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-xs font-medium text-[#6E6E6E]">View first:</label>
                    <select
                        value={transactionsLimit}
                        onChange={(e) => setTransactionsLimit(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-1.5 rounded-[10px] text-xs font-semibold text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A]"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value="All">All</option>
                    </select>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-[#FFFFFF] rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs table-fixed">
                    <thead className="bg-[#FAFAF8] border-b border-[#E8E8E5] font-semibold text-[#6E6E6E] uppercase tracking-wider">
                        <tr>
                            <th className="p-3 w-28">Date</th>
                            <th className="p-3 w-28">Type</th>
                            <th className="p-3 w-36">Product Type</th>
                            <th className="p-3 w-56">Product Name</th>
                            <th className="p-3 w-16 text-center">Qty</th>
                            <th className="p-3 w-28 text-right">Price (₹)</th>
                            <th className="p-3 w-28 text-right">Total (₹)</th>
                            <th className="p-3 w-20 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-[#E8E8E5] text-[#6E6E6E]">
                        {displayedTransactions.map((t) => {
                            const isEditing = editingRow === t.id;

                            return (
                                <tr key={t.id} className="hover:bg-[#FAFAF8]/50 transition-colors align-top">
                                    <td className="p-3 text-[11px]">
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                value={editData?.date?.slice(0, 10) || ""}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, date: e.target.value })
                                                }
                                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-1 rounded-[8px] text-[11px] w-full"
                                            />
                                        ) : (
                                            t.date ? new Date(t.date).toLocaleDateString() : '-'
                                        )}
                                    </td>

                                    <td className="p-3 text-[11px]">
                                        {isEditing ? (
                                            <select
                                                value={editData?.type || ""}
                                                onChange={(e) =>
                                                    setEditData({ ...editData, type: e.target.value })
                                                }
                                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-1 rounded-[8px] text-[11px] w-full font-semibold"
                                            >
                                                <option value="Sales">Sales</option>
                                                <option value="Purchase">Purchase</option>
                                            </select>
                                        ) : (
                                            <span className="font-semibold text-[#2F2F2F]">{t.type}</span>
                                        )}
                                    </td>

                                    <td className="p-3 text-[11px] break-words">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData?.productType || ""}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        productType: e.target.value,
                                                    })
                                                }
                                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-1 rounded-[8px] text-[11px] w-full"
                                            />
                                        ) : (
                                            t.productType
                                        )}
                                    </td>

                                    <td className="p-3 text-[11px] font-semibold text-[#2F2F2F] break-words">
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData?.productName || ""}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        productName: e.target.value,
                                                    })
                                                }
                                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-1 rounded-[8px] text-[11px] w-full"
                                            />
                                        ) : (
                                            t.productName
                                        )}
                                    </td>

                                    <td className="p-3 text-center text-[11px]">
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={editData?.quantity || ""}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        quantity: Number(e.target.value),
                                                    })
                                                }
                                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-1 rounded-[8px] text-[11px] w-full text-center"
                                            />
                                        ) : (
                                            t.quantity
                                        )}
                                    </td>

                                    <td className="p-3 text-right text-[11px]">
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                value={editData?.price || ""}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        price: Number(e.target.value),
                                                    })
                                                }
                                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-1 rounded-[8px] text-[11px] w-full text-right"
                                            />
                                        ) : (
                                            `₹${(Number(t.price) || 0).toFixed(2)}`
                                        )}
                                    </td>

                                    <td className="p-3 text-right font-bold text-[#2F2F2F] text-[11px]">
                                        ₹{((Number(t.quantity) || 0) * (Number(t.price) || 0)).toFixed(2)}
                                    </td>

                                    <td className="p-3 text-center">
                                        {isEditing ? (
                                            <div className="flex justify-center gap-1.5">
                                                <button
                                                    onClick={() => handleUpdateTransaction(t.id, editData)}
                                                    title="Save"
                                                >
                                                    <Save className="w-4 h-4 text-emerald-600 hover:text-emerald-700" />
                                                </button>

                                                <button
                                                    onClick={() => {
                                                        setEditingRow(null);
                                                        setEditData(null);
                                                    }}
                                                    title="Cancel"
                                                >
                                                    <X className="w-4 h-4 text-rose-600 hover:text-rose-700" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingRow(t.id);
                                                        setEditData({ ...t });
                                                    }}
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4 text-[#8FAE8A] hover:text-[#7FA66A]" />
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteTransaction(t.id)}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-rose-500 hover:text-rose-700" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Reports Section */}
            <h3 className="text-xl font-bold text-[#2F2F2F] font-['Manrope',sans-serif] mt-8 mb-4">Reports</h3>
            <div className="bg-[#FFFFFF] p-6 rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex flex-wrap gap-3 items-center">
                    <label className="text-xs font-semibold text-[#2F2F2F]">Type:</label>
                    <select
                        value={reportType}
                        onChange={e => setReportType(e.target.value)}
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs font-semibold text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A]"
                    >
                        <option value="Sales">Sales</option>
                        <option value="Purchase">Purchase</option>
                    </select>

                    <label className="text-xs font-semibold text-[#2F2F2F]">Period:</label>
                    <select
                        value={reportPeriod}
                        onChange={e => setReportPeriod(e.target.value)}
                        className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs font-semibold text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A]"
                    >
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                    </select>

                    {reportPeriod === 'Month' && (
                        <>
                            <label className="text-xs font-semibold text-[#2F2F2F]">Month:</label>
                            <select
                                value={reportMonth}
                                onChange={e => setReportMonth(e.target.value)}
                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs font-semibold text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A]"
                            >
                                {availableMonths.map(m => {
                                    const [y, mon] = m.split('-');
                                    const monthName = new Date(Number(y), Number(mon) - 1).toLocaleString('default', { month: 'long' });
                                    return <option key={m} value={m}>{monthName} {y}</option>;
                                })}
                            </select>
                        </>
                    )}

                    {reportPeriod === 'Year' && (
                        <>
                            <label className="text-xs font-semibold text-[#2F2F2F]">Year:</label>
                            <select
                                value={reportYear}
                                onChange={e => setReportYear(e.target.value)}
                                className="border border-[#E8E8E5] bg-[#FAFAF8] p-2 rounded-[10px] text-xs font-semibold text-[#2F2F2F] focus:outline-none focus:border-[#8FAE8A]"
                            >
                                {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </>
                    )}

                    <button
                        onClick={generateReport}
                        className="bg-[#8FAE8A] hover:bg-[#7FA66A] text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                        Generate Report
                    </button>

                    {reportData.length > 0 && (
                        <button
                            onClick={downloadReportPDF}
                            className="bg-[#2F2F2F] hover:bg-black text-white px-4 py-2 rounded-[14px] text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                        >
                            Download Report PDF
                        </button>
                    )}
                </div>

                {reportData.length > 0 ? (
                    <div className="bg-[#FFFFFF] rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-x-auto mt-4">
                        <table className="w-full border-collapse text-left text-xs table-fixed">
                            <thead className="bg-[#FAFAF8] border-b border-[#E8E8E5] font-semibold text-[#6E6E6E] uppercase tracking-wider">
                                <tr>
                                    <th className="p-3 w-32">Date</th>
                                    <th className="p-3 w-40">Product Type</th>
                                    <th className="p-3 w-64">Product Name</th>
                                    <th className="p-3 w-24 text-center">Quantity</th>
                                    <th className="p-3 w-32 text-right">Total (₹)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#E8E8E5] text-[#6E6E6E]">
                                {reportData.map((r, idx) => (
                                    <tr key={idx} className="hover:bg-[#FAFAF8]/50 transition-colors">
                                        <td className="p-3 text-[11px]">{r.date}</td>
                                        <td className="p-3 text-[11px] break-words">{r.productType}</td>
                                        <td className="p-3 text-[11px] font-semibold text-[#2F2F2F] break-words">{r.productName}</td>
                                        <td className="p-3 text-center text-[11px]">{r.quantity}</td>
                                        <td className="p-3 text-right font-bold text-[#2F2F2F] text-[11px]">₹{r.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                                <tr className="bg-[#FAFAF8] font-bold text-[#2F2F2F]">
                                    <td className="p-3 text-right" colSpan={4}>Total for {reportPeriod}:</td>
                                    <td className="p-3 text-right">₹{reportTotal.toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-xs text-[#6E6E6E]/60 mt-2">No transactions for the selected period.</p>
                )}
            </div>
        </div>
    );
}