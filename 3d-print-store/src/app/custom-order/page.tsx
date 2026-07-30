'use client';

import { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
  Upload,
  Sparkles,
  CheckCircle2,
  User,
  Mail,
  Phone,
  FileText,
  X,
  Image as ImageIcon,
  Box,
  Layers,
  Crown,
  Send
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function CustomOrderPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Lithophane',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const categories = [
    { id: 'Lithophane', label: 'Custom Lithophane', icon: ImageIcon, desc: 'Glowing photo lamps & frames' },
    { id: 'Keychain', label: 'Custom Keychain', icon: Layers, desc: 'Personalized names & logos' },
    { id: 'Idol', label: 'Idol / Sculpture', icon: Crown, desc: 'Devotional & resin statues' },
    { id: 'Other', label: 'Other 3D Model', icon: Box, desc: 'Engineering parts & CAD' },
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.description.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Uploading request & files...');

    try {
      let fileUrl = '';
      if (file) {
        const storageRef = ref(storage, `custom-orders/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'customOrders'), {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        category: form.category,
        description: form.description.trim(),
        fileUrl,
        fileName: file ? file.name : null,
        status: 'Pending Review',
        createdAt: serverTimestamp(),
      });

      toast.success('Custom request submitted!', { id: toastId });
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      toast.error('Failed to submit custom request. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setForm({
      name: '',
      email: '',
      phone: '',
      category: 'Lithophane',
      description: '',
    });
    setFile(null);
  };

  return (
    <div className="max-w-[1280px] mx-auto py-8 sm:py-12 px-4 sm:px-6 text-[#3E312C] font-sans">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider mb-3 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Bespoke 3D Fabrication
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#3E312C] tracking-tight mb-3">
          Request a Custom Design & Print
        </h1>
        <p className="text-[#65554D] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Upload reference photos, dimensions, or CAD files. Our studio engineers will review your specs and send an instant quote.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          /* Success Card */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 rounded-[28px] glass-card border border-[#ECE2D3] bg-[#FFFDF9] text-center space-y-5 max-w-2xl mx-auto shadow-xs"
          >
            <div className="w-16 h-16 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#3E312C]">Request Submitted!</h2>
            <p className="text-[#65554D] text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              We have received your custom request details and files. Our designers will review the parameters and email you back within 24 hours.
            </p>

            <div className="bg-[#FCF8F3] border border-[#ECE2D3] rounded-[20px] p-4 text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between border-b border-[#ECE2D3] pb-2">
                <span className="text-[#65554D] font-medium">Category:</span>
                <span className="font-bold text-[#3E312C]">{form.category}</span>
              </div>
              <div className="flex justify-between border-b border-[#ECE2D3] pb-2">
                <span className="text-[#65554D] font-medium">Contact:</span>
                <span className="font-bold text-[#3E312C]">{form.email}</span>
              </div>
              {file && (
                <div className="flex justify-between">
                  <span className="text-[#65554D] font-medium">Uploaded File:</span>
                  <span className="font-bold text-[#3F5B43] truncate max-w-[200px]">{file.name}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleReset}
              className="btn-secondary py-3 px-6 text-xs font-semibold cursor-pointer active:scale-95 transition-all mt-4"
            >
              Submit Another Custom Request
            </button>
          </motion.div>
        ) : (
          /* Form Section */
          <motion.form
            key="custom-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            onSubmit={handleSubmit}
            className="space-y-6 glass-card p-6 sm:p-10 lg:p-12 rounded-[28px] border border-[#ECE2D3] bg-[#FFFDF9] max-w-3xl mx-auto shadow-xs"
          >
            {/* Category Pills */}
            <div>
              <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-3">
                1. Select Creation Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = form.category === cat.id;
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => setForm({ ...form, category: cat.id })}
                      className={`p-3.5 rounded-[18px] border text-left transition-all cursor-pointer flex flex-col justify-between ${isSelected
                          ? 'bg-[#3F5B43] text-white border-[#3F5B43] shadow-xs'
                          : 'bg-[#FFFDF9] text-[#3E312C] border-[#ECE2D3] hover:border-[#7B8F63]'
                        }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-white' : 'text-[#3F5B43]'}`} />
                      <div>
                        <div className="text-xs font-bold">{cat.label}</div>
                        <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-white/80' : 'text-[#65554D]'}`}>
                          {cat.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Email Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] pl-11 pr-4 py-3.5 text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] pl-11 pr-4 py-3.5 text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                    placeholder="rahul@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                Phone / WhatsApp Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] pl-11 pr-4 py-3.5 text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                Design Vision & Dimensions <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-3.5 w-4 h-4 text-[#65554D]" />
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#FFFDF9] border border-[#ECE2D3] rounded-[16px] pl-11 pr-4 py-3.5 text-[#3E312C] text-xs sm:text-sm focus:outline-none focus:border-[#7B8F63] focus:ring-2 focus:ring-[#7B8F63]/20 transition-all resize-none"
                  placeholder="Describe dimensions (e.g., 15cm x 10cm), material preference, colors, text engravings, or specific 3D model requirements..."
                />
              </div>
            </div>

            {/* Drag and Drop File Upload */}
            <div>
              <label className="block text-xs font-bold text-[#65554D] uppercase tracking-wider mb-2">
                Upload Reference Image or 3D CAD File
              </label>

              {!file ? (
                <label
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-[20px] p-6 sm:p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${dragActive
                      ? 'border-[#3F5B43] bg-[#7B8F63]/10 scale-[0.99]'
                      : 'border-[#ECE2D3] hover:border-[#7B8F63] bg-[#FCF8F3]/60 hover:bg-[#FCF8F3]'
                    }`}
                >
                  <div className="p-3 rounded-full bg-[#FFFDF9] border border-[#ECE2D3] text-[#3F5B43] mb-2 shadow-xs">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-[#3E312C] text-center">
                    Drag and drop your file here, or <span className="text-[#3F5B43] underline">click to browse</span>
                  </span>
                  <span className="text-[11px] text-[#65554D] mt-1 text-center">
                    Supported: PNG, JPG, STL, OBJ, STEP, ZIP (Up to 50MB)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files && e.target.files[0] && setFile(e.target.files[0])}
                  />
                </label>
              ) : (
                <div className="p-4 rounded-[18px] bg-[#FCF8F3] border border-[#ECE2D3] flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-[12px] bg-[#FFFDF9] border border-[#ECE2D3] text-[#3F5B43] flex-shrink-0">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-[#3E312C] truncate">{file.name}</p>
                      <p className="text-[10px] text-[#65554D]">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="p-1.5 rounded-full hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting Request...' : 'Submit Custom Specification'}
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}