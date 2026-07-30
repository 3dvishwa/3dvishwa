"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import toast, { Toaster } from "react-hot-toast";
import Head from "next/head";
import ProductJsonLd from "@/components/ProductJsonLd";
import {
  ShoppingCart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  Zap,
  Truck,
  RotateCcw,
  Award,
  Eye,
  Heart,
  Share2,
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { addItem } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [liveViewers, setLiveViewers] = useState(24);
  const [ordersCount, setOrdersCount] = useState(14);

  const touchStartX = useRef(0);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();

        if (data.ok) {
          const found = data.products.find((p: any) => p.productId === id);
          if (!found) return;

          setProduct(found);
          setSelectedVariant(found.variants?.[0]);
          setQuantity(1);

          const storedKey = `ordersCount_${found.productId}`;
          const storedData = localStorage.getItem(storedKey);
          const now = Date.now();

          if (storedData) {
            const { count, timestamp } = JSON.parse(storedData);
            if (now - timestamp < 24 * 60 * 60 * 1000) setOrdersCount(count);
            else {
              const newCount = Math.floor(Math.random() * 12) + 5;
              localStorage.setItem(
                storedKey,
                JSON.stringify({ count: newCount, timestamp: now })
              );
              setOrdersCount(newCount);
            }
          } else {
            const newCount = Math.floor(Math.random() * 12) + 5;
            localStorage.setItem(
              storedKey,
              JSON.stringify({ count: newCount, timestamp: now })
            );
            setOrdersCount(newCount);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;
    const interval = setInterval(
      () => setLiveViewers(Math.floor(Math.random() * 18) + 14),
      4000
    );
    return () => clearInterval(interval);
  }, [product]);

  const mergedImages = product
    ? [...(product.images || []), ...(selectedVariant?.images || [])]
    : [];

  useEffect(() => {
    if (!isPaused && mergedImages.length > 1) {
      const interval = setInterval(
        () => setCurrentImage((prev) => (prev + 1) % mergedImages.length),
        4000
      );
      return () => clearInterval(interval);
    }
  }, [isPaused, mergedImages]);

  const handleTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50)
      setCurrentImage((p) => (p === 0 ? mergedImages.length - 1 : p - 1));
    else if (delta < -50)
      setCurrentImage((p) => (p + 1) % mergedImages.length);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      productId: product.productId,
      name: product.name,
      pricePaise: selectedVariant.pricePaise,
      qty: quantity,
      variantId: selectedVariant.variantId,
      size: selectedVariant.size,
      images: mergedImages,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };

  if (!product)
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-4 border-[#3F5B43] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#65554D] text-xs font-semibold tracking-wide animate-pulse">Loading product details...</p>
      </div>
    );

  const aboutText = product.description?.about || "No description available.";
  const productInfo = product.description?.productInfo || {};
  const measurements = product.description?.measurements || {};
  const brandInfo = product.description?.brandInfo || {};
  const materials = product.description?.materials || {};

  const pageTitle = `${product.name} | 3DVishwa`;
  const metaDescription =
    aboutText.length > 155 ? aboutText.slice(0, 152) + "..." : aboutText;

  const priceVal = selectedVariant ? selectedVariant.pricePaise / 100 : 0;
  const mrpVal = priceVal * 1.5;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link
          rel="canonical"
          href={`https://3dvishwa.com/products/${product.productId}`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        {mergedImages[0] && (
          <meta
            property="og:image"
            content={
              mergedImages[0].startsWith("http")
                ? mergedImages[0]
                : `https://3dvishwa.com${mergedImages[0]}`
            }
          />
        )}
      </Head>

      <ProductJsonLd product={product} />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 py-8 font-sans text-[#3E312C]">
        <Toaster position="top-right" />

        {/* Clickable Breadcrumbs */}
        <nav className="text-xs text-[#65554D] mb-6 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#3F5B43] transition font-medium">Home</Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-[#3F5B43] transition font-medium">
            {product.category || "Catalog"}
          </Link>
          <span>&gt;</span>
          <span className="text-[#3E312C] font-bold truncate max-w-[200px] sm:max-w-md">{product.name}</span>
        </nav>

        {/* Main E-Commerce Box */}
        <div className="glass-card rounded-[28px] border border-[#ECE2D3] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden bg-[#FFFDF9]">

          {/* LEFT COLUMN: Sticky Image Gallery & Action Buttons */}
          <div className="lg:col-span-5 p-6 lg:p-8 lg:border-r border-[#ECE2D3] flex flex-col items-center">
            <div className="sticky top-24 w-full flex flex-col items-center space-y-5">

              {/* Main Image Container */}
              <div
                className="relative w-full aspect-square bg-[#FCF8F3] rounded-[24px] border border-[#ECE2D3] overflow-hidden group flex items-center justify-center p-4 shadow-xs"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={mergedImages[currentImage] || "/placeholder.png"}
                    alt={product.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="object-contain w-full h-full max-h-[420px] transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Floating Share / Wishlist buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#ECE2D3] text-[#3E312C] hover:text-[#3F5B43] hover:bg-white transition shadow-xs cursor-pointer"
                    title="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toast.success("Saved to wishlist!")}
                    className="p-2.5 rounded-full bg-[#FFFDF9]/90 backdrop-blur-md border border-[#ECE2D3] text-[#3E312C] hover:text-[#B8724A] hover:bg-white transition shadow-xs cursor-pointer"
                    title="Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                {mergedImages.length > 1 && (
                  <>
                    <button
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] p-2.5 rounded-full shadow-md border border-[#ECE2D3] text-[#3E312C] transition opacity-80 group-hover:opacity-100 cursor-pointer"
                      onClick={() =>
                        setCurrentImage((p) =>
                          p === 0 ? mergedImages.length - 1 : p - 1
                        )
                      }
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] p-2.5 rounded-full shadow-md border border-[#ECE2D3] text-[#3E312C] transition opacity-80 group-hover:opacity-100 cursor-pointer"
                      onClick={() =>
                        setCurrentImage((p) => (p + 1) % mergedImages.length)
                      }
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {mergedImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto w-full pb-2 no-scrollbar justify-start sm:justify-center">
                  {mergedImages.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`relative w-16 h-16 bg-[#FCF8F3] rounded-[16px] overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${i === currentImage
                          ? "border-[#3F5B43] shadow-sm ring-2 ring-[#3F5B43]/20"
                          : "border-[#ECE2D3] opacity-70 hover:opacity-100"
                        }`}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover p-1" />
                    </button>
                  ))}
                </div>
              )}

              {/* Dual Action Buttons */}
              <div className="grid grid-cols-2 gap-3 w-full pt-2">
                <button
                  onClick={handleAddToCart}
                  className="btn-secondary py-3.5 px-4 text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <ShoppingCart className="w-4 h-4 text-[#3F5B43]" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn-primary py-3.5 px-4 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-current" /> Buy Now
                </button>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: Product Details, Pricing, Variants, and Info Sections */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-6">

            {/* Title & Ratings */}
            <div className="space-y-3 border-b border-[#ECE2D3] pb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3F5B43] bg-[#7B8F63]/10 border border-[#7B8F63]/20 px-3 py-1 rounded-full inline-block">
                {product.category || "Uncategorized"}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#3E312C] leading-tight tracking-tight">
                {product.name}
              </h1>

              {/* Rating badge */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="bg-[#3F5B43] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                  4.8 <Star className="w-3.5 h-3.5 fill-current text-yellow-300" />
                </span>
                <span className="text-xs text-[#65554D] font-medium">1,428 Ratings & 184 Reviews</span>
                <span className="text-xs text-[#3F5B43] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Verified 3D Studio
                </span>
              </div>

              {/* Live viewers banner */}
              <div className="inline-flex items-center gap-2 text-xs text-[#B8724A] bg-[#B8724A]/10 border border-[#B8724A]/20 px-3.5 py-1.5 rounded-full mt-2 font-semibold">
                <Eye className="w-3.5 h-3.5 animate-pulse text-[#B8724A]" /> {liveViewers} viewing right now • {ordersCount} orders in last 24h
              </div>
            </div>

            {/* Pricing Section */}
            {selectedVariant && (
              <div className="space-y-1.5 border-b border-[#ECE2D3] pb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-[#3E312C]">
                    ₹{((selectedVariant.pricePaise / 100) * quantity).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm sm:text-base text-[#8C7A70] line-through font-medium">
                    ₹{(mrpVal * quantity).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-xs font-bold text-[#3F5B43] bg-[#7B8F63]/10 border border-[#7B8F63]/20 px-3 py-0.5 rounded-full">
                    33% OFF
                  </span>
                </div>
                <p className="text-xs text-[#65554D] font-medium">Inclusive of all taxes. Free shipping on prepaid orders across India.</p>
              </div>
            )}

            {/* Variant Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 border-b border-[#ECE2D3] pb-6">
                <span className="text-xs font-bold text-[#3E312C] uppercase tracking-wider block">
                  Select Size / Dimensions:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.variantId}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setQuantity(1);
                        setCurrentImage(0);
                      }}
                      className={`px-5 py-2.5 rounded-[14px] text-xs font-bold transition-all border cursor-pointer ${selectedVariant?.variantId === variant.variantId
                          ? "bg-[#3F5B43] text-white border-[#3F5B43] shadow-sm"
                          : "bg-[#FFFDF9] text-[#3E312C] border-[#ECE2D3] hover:border-[#7B8F63]"
                        }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 border-b border-[#ECE2D3] pb-6">
              <span className="text-xs font-bold text-[#3E312C] uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center border border-[#ECE2D3] rounded-[14px] bg-[#FFFDF9] overflow-hidden shadow-xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 bg-[#FCF8F3] hover:bg-[#ECE2D3] text-[#3E312C] font-bold text-xs border-r border-[#ECE2D3] cursor-pointer transition"
                >
                  –
                </button>
                <span className="px-5 text-xs font-bold text-[#3E312C]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 bg-[#FCF8F3] hover:bg-[#ECE2D3] text-[#3E312C] font-bold text-xs border-l border-[#ECE2D3] cursor-pointer transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2 border-b border-[#ECE2D3] pb-6">
              <div className="flex flex-col items-center text-center p-3 bg-[#FCF8F3] rounded-[16px] border border-[#ECE2D3]">
                <Truck className="w-5 h-5 text-[#3F5B43] mb-1.5" />
                <span className="text-[11px] font-bold text-[#3E312C]">Express Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-[#FCF8F3] rounded-[16px] border border-[#ECE2D3]">
                <RotateCcw className="w-5 h-5 text-[#3F5B43] mb-1.5" />
                <span className="text-[11px] font-bold text-[#3E312C]">Damage Protection</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-[#FCF8F3] rounded-[16px] border border-[#ECE2D3]">
                <ShieldCheck className="w-5 h-5 text-[#3F5B43] mb-1.5" />
                <span className="text-[11px] font-bold text-[#3E312C]">High Precision PLA</span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-[#FCF8F3] rounded-[16px] border border-[#ECE2D3]">
                <Award className="w-5 h-5 text-[#3F5B43] mb-1.5" />
                <span className="text-[11px] font-bold text-[#3E312C]">Crafted in Studio</span>
              </div>
            </div>

            {/* Sectioned Information Blocks */}
            <div className="space-y-6 pt-2">

              {/* Description Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-[#65554D] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Product Story & Description
                </h3>
                <p className="text-xs sm:text-sm text-[#3E312C] leading-relaxed whitespace-pre-line bg-[#FCF8F3] p-4 sm:p-5 rounded-[20px] border border-[#ECE2D3]">
                  {aboutText}
                </p>
              </div>

              {/* Specifications Table */}
              {Object.keys(productInfo).length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#65554D] uppercase tracking-wider">Specifications</h3>
                  <div className="border border-[#ECE2D3] rounded-[20px] overflow-hidden text-xs bg-[#FFFDF9] shadow-xs">
                    <div className="bg-[#FCF8F3] font-bold px-4 py-3 border-b border-[#ECE2D3] text-[#3E312C]">
                      General Information
                    </div>
                    {Object.entries(productInfo).map(([k, v]: [string, any], idx) => (
                      <div key={k} className={`grid grid-cols-3 px-4 py-3 border-b border-[#ECE2D3] last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FCF8F3]/50'}`}>
                        <span className="text-[#65554D] font-semibold col-span-1">{k}</span>
                        <span className="text-[#3E312C] font-bold col-span-2">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Measurements Table */}
              {Object.keys(measurements).length > 0 && (
                <div className="space-y-3">
                  <div className="border border-[#ECE2D3] rounded-[20px] overflow-hidden text-xs bg-[#FFFDF9] shadow-xs">
                    <div className="bg-[#FCF8F3] font-bold px-4 py-3 border-b border-[#ECE2D3] text-[#3E312C]">
                      Dimensions & Weight
                    </div>
                    {Object.entries(measurements).map(([k, v]: [string, any], idx) => (
                      <div key={k} className={`grid grid-cols-3 px-4 py-3 border-b border-[#ECE2D3] last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FCF8F3]/50'}`}>
                        <span className="text-[#65554D] font-semibold col-span-1">{k}</span>
                        <span className="text-[#3E312C] font-bold col-span-2">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Materials & Brand Info Table */}
              {(Object.keys(materials).length > 0 || Object.keys(brandInfo).length > 0) && (
                <div className="space-y-3">
                  <div className="border border-[#ECE2D3] rounded-[20px] overflow-hidden text-xs bg-[#FFFDF9] shadow-xs">
                    <div className="bg-[#FCF8F3] font-bold px-4 py-3 border-b border-[#ECE2D3] text-[#3E312C]">
                      Manufacturer & Materials
                    </div>
                    {Object.entries({ ...materials, ...brandInfo }).map(([k, v]: [string, any], idx) => (
                      <div key={k} className={`grid grid-cols-3 px-4 py-3 border-b border-[#ECE2D3] last:border-b-0 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#FCF8F3]/50'}`}>
                        <span className="text-[#65554D] font-semibold col-span-1">{k}</span>
                        <span className="text-[#3E312C] font-bold col-span-2">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Badge */}
            <div className="pt-6 border-t border-[#ECE2D3] flex flex-wrap items-center justify-between text-xs text-[#65554D] font-medium gap-2">
              <span>Sold & fulfilled by: <strong className="text-[#3E312C]">3DVishwa Official Studio</strong></span>
              <span className="flex items-center gap-1.5 text-[#3E312C] font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#3F5B43]" /> Handcrafted in Pune, India
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}