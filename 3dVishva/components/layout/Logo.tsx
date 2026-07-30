import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center">
            <Image
                src="/logo.png"
                alt="3DVishwa Software Solutions"
                width={220}
                height={70}
                priority
                className="
                h-14
                w-auto
                object-contain
                "
            />
        </Link>
    );
}