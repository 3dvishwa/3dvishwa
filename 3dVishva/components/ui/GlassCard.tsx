import { cn } from "../../lib/utils";

export default function GlassCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("glass p-8", className)}>
            {children}
        </div>
    );
}