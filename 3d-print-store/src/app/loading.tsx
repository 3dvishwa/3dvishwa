import { Layers } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 font-sans text-[#3E312C]">
            <div className="relative flex items-center justify-center">
                <div className="w-14 h-14 border-4 border-[#ECE2D3] border-t-[#3F5B43] rounded-full animate-spin" />
                <Layers className="w-6 h-6 text-[#3F5B43] absolute" />
            </div>

            <div className="text-center space-y-1">
                <p className="text-sm font-extrabold text-[#3E312C] tracking-tight">3DVishwa Studio</p>
                <p className="text-xs text-[#65554D] font-medium animate-pulse">Rendering 3D assets & parameters...</p>
            </div>
        </div>
    );
}