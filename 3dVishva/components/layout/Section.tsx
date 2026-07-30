import { cn } from "@/lib/utils";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export default function Section({
    children,
    className,
}: Props) {
    return (
        <section className={cn("section-padding", className)}>
            {children}
        </section>
    );
}