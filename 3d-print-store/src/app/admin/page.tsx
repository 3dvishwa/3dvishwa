'use client';

import Link from 'next/link';
import { ShieldCheck, ShoppingCart, Users, MessageSquare, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const quickLinks = [
    {
      title: 'View Orders',
      description: 'Manage store orders, update statuses, and download shipping labels.',
      href: '/admin/view-orders',
      icon: ShoppingCart,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    },
    {
      title: 'View Users',
      description: 'Browse registered customers, profiles, and delivery addresses.',
      href: '/admin/view-users',
      icon: Users,
      color: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    },
    {
      title: 'View Enquiries',
      description: 'Check customer support messages and general inquiries.',
      href: '/admin/view-enquiries',
      icon: MessageSquare,
      color: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 font-['Inter',sans-serif]">
      {/* Welcome Banner */}
      <div className="bg-[#FFFFFF] rounded-[24px] border border-[#E8E8E5] p-8 sm:p-10 mb-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-[20px] bg-[#8FAE8A]/10 text-[#8FAE8A] border border-[#8FAE8A]/20">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-[#2F2F2F] tracking-tight font-['Manrope',sans-serif]">
              Welcome Back, Admin! 👋
            </h1>
            <p className="text-[#6E6E6E] text-sm mt-1">
              Here is what is happening across your 3DVishwa store today. Manage orders, users, and client enquiries quickly.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#2F2F2F] font-['Manrope',sans-serif] mb-4">Quick Navigation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <Link
                key={idx}
                href={link.href}
                className="group bg-[#FFFFFF] rounded-[24px] border border-[#E8E8E5] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#8FAE8A] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center border mb-4 ${link.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2F2F2F] group-hover:text-[#8FAE8A] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-[#6E6E6E] text-xs mt-2 leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-semibold text-[#8FAE8A] gap-1 group-hover:translate-x-1 transition-transform">
                  Open panel <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}