'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Enquiry {
    id: string;
    name?: string;
    phone?: string;
    message?: string;
    createdAt?: any;
}

export default function ViewEnquiries() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL || '/api';

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
        const fetchEnquiries = async () => {
            try {
                const res = await fetch(`${urlBase}/admin/enquiries`);
                const data = await res.json();
                if (!data.ok) throw new Error(data.error || 'Failed to fetch enquiries');
                setEnquiries(data.enquiries || []);
            } catch (err: any) {
                console.error("Error fetching enquiries:", err);
                toast.error('Failed to load enquiries');
                setEnquiries([]);
            }
        };
        fetchEnquiries();
    }, [urlBase]);

    return (
        <div className="w-full max-w-full overflow-hidden px-2 sm:px-4 py-8 font-['Inter',sans-serif]">
            <h2 className="text-2xl font-extrabold text-[#2F2F2F] tracking-tight font-['Manrope',sans-serif] mb-6">View Enquiries</h2>
            {enquiries.length === 0 ? (
                <div className="bg-[#FFFFFF] rounded-[20px] border border-[#E8E8E5] p-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <p className="text-[#6E6E6E] text-sm">No enquiries found</p>
                </div>
            ) : (
                <div className="bg-[#FFFFFF] rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs table-fixed">
                        <thead>
                            <tr className="bg-[#FAFAF8] border-b border-[#E8E8E5] font-semibold text-[#6E6E6E] uppercase tracking-wider">
                                <th className="p-3 w-40">Name</th>
                                <th className="p-3 w-32">Phone</th>
                                <th className="p-3 w-96">Message</th>
                                <th className="p-3 w-44">Submitted At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E8E5] text-[#6E6E6E]">
                            {enquiries.map((e) => {
                                return (
                                    <tr key={e.id} className="hover:bg-[#FAFAF8]/50 transition-colors align-top">
                                        <td className="p-3 font-semibold text-[#2F2F2F] break-words">{e.name || '—'}</td>
                                        <td className="p-3 font-medium text-[#2F2F2F]">{e.phone || '—'}</td>
                                        <td className="p-3 text-[11px] leading-relaxed break-words whitespace-pre-wrap">{e.message || '—'}</td>
                                        <td className="p-3 text-[11px]">{formatDate(e.createdAt)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}