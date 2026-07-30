'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

interface Address {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    mobile?: string;
}

interface User {
    id: string;
    name?: string;
    email?: string;
    mobile?: string;
    userType?: string;
    addresses?: Address[];
}

export default function ViewUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const urlBase = process.env.NEXT_PUBLIC_BACKEND_URL || '/api';

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${urlBase}/admin/users`);
                const data = await res.json();
                if (!data.ok) throw new Error(data.error || 'Failed to fetch users');
                setUsers(data.users || []);
            } catch (err: any) {
                console.error("Error fetching users:", err);
                toast.error('Failed to load users');
                setUsers([]);
            }
        };
        fetchUsers();
    }, [urlBase]);

    const getMobile = (user: User) => {
        if (user.mobile && user.mobile.trim() !== '') return user.mobile;
        if (user.addresses && user.addresses.length > 0) {
            for (let addr of user.addresses) {
                if (addr.phone && addr.phone.trim() !== '') return addr.phone;
                if (addr.mobile && addr.mobile.trim() !== '') return addr.mobile;
            }
        }
        return "Not Provided";
    };

    return (
        <div className="w-full max-w-full overflow-hidden px-2 sm:px-4 py-8 font-['Inter',sans-serif]">
            <h2 className="text-2xl font-extrabold text-[#2F2F2F] tracking-tight font-['Manrope',sans-serif] mb-6">View Users</h2>

            {users.length === 0 ? (
                <div className="bg-[#FFFFFF] rounded-[20px] border border-[#E8E8E5] p-10 text-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    <p className="text-[#6E6E6E] text-sm">No users found.</p>
                </div>
            ) : (
                <div className="bg-[#FFFFFF] rounded-[20px] border border-[#E8E8E5] shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs table-fixed">
                        <thead>
                            <tr className="bg-[#FAFAF8] border-b border-[#E8E8E5] font-semibold text-[#6E6E6E] uppercase tracking-wider">
                                <th className="p-3 w-40">Name</th>
                                <th className="p-3 w-48">Email</th>
                                <th className="p-3 w-32">Mobile</th>
                                <th className="p-3 w-28">User Type</th>
                                <th className="p-3 w-64">Addresses</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8E8E5] text-[#6E6E6E]">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-[#FAFAF8]/50 transition-colors align-top">
                                    <td className="p-3 font-semibold text-[#2F2F2F] break-words">{u.name || "—"}</td>
                                    <td className="p-3 break-all font-mono text-[11px]">{u.email || "—"}</td>
                                    <td className="p-3 text-[11px] font-medium text-[#2F2F2F]">{getMobile(u)}</td>
                                    <td className="p-3 text-[11px]">
                                        <span className="bg-[#FAFAF8] border border-[#E8E8E5] px-2 py-1 rounded-[8px] font-semibold text-[#2F2F2F]">
                                            {u.userType || "User"}
                                        </span>
                                    </td>
                                    <td className="p-3 text-[11px] leading-tight">
                                        {Array.isArray(u.addresses) && u.addresses.length > 0 ? (
                                            <ul className="space-y-1.5">
                                                {u.addresses.map((addr, idx) => (
                                                    <li key={idx} className="border-b border-[#E8E8E5]/60 pb-1 last:border-0 last:pb-0">
                                                        <div>{addr.street || "—"}</div>
                                                        <div>{addr.city || "—"}, {addr.state || "—"} – {addr.zip || "—"}</div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span className="text-[#6E6E6E]/60">No addresses</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}