'use client';

import Head from 'next/head';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Plus,
  Heart,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake,
  ArrowUpRight,
  Play
} from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { useWishlist } from '@/components/WishlistContext';
import toast, { Toaster } from 'react-hot-toast';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HomePage() {
  const cartContext = useCart();
  const addItem = cartContext?.addItem || cartContext?.addToCart;

  // Wishlist Context Integration
  const wishlistContext = useWishlist?.();
  const addToWishlist = wishlistContext?.addToWishlist;
  const removeFromWishlist = wishlistContext?.removeFromWishlist;
  const isInWishlist = wishlistContext?.isInWishlist;

  // ---------------- Data Fetching ----------------
  const { data: productData, error, isLoading } = useSWR(
    '/api/admin/products',
    fetcher,
    { revalidateOnFocus: false, revalidateOnReconnect: false, refreshInterval: 0 }
  );

  const products = productData?.products || [];
  const featuredProducts = products.slice(0, 6);

  // ---------------- Hero Carousel ----------------
  const heroSlides = [
    {
      title: 'Custom 3D Lithophane Lamps',
      subtitle: 'Turn precious memories into magical glowing art pieces with high-precision 3D fabrication.',
      img: '/hero-litho.png',
      link: '/products',
    },
    {
      title: 'Intricate 3D Figures & Statues',
      subtitle: 'Devotional deities, characters, and high-detail collectibles tailored for your space.',
      img: '/hero-figures.png',
      link: '/products',
    },
    {
      title: 'Bespoke Aura & Moon Lamps',
      subtitle: 'Stunning multi-color glowing decorative pieces built using eco-friendly polymers.',
      img: '/hero-frames.png',
      link: '/products',
    },
  ];

  const [currentHero, setCurrentHero] = useState(0);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    slideIntervalRef.current = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
  }, [heroSlides.length]);

  // ---------------- Animation Variants ----------------
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
    }),
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://3dvishwa.com/#organization',
        name: '3D Vishwa',
        alternateName: '3DVishwa',
        url: 'https://3dvishwa.com',
        logo: 'https://3dvishwa.com/logo.png',
        sameAs: [
          'https://www.instagram.com/3d_vishwa',
          'https://www.facebook.com/3dvishwa',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://3dvishwa.com/#website',
        url: 'https://3dvishwa.com',
        name: '3D Vishwa',
        publisher: { '@id': 'https://3dvishwa.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://3dvishwa.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>3D Vishwa (3DVishwa) | Custom 3D Prints & Personalized Gifts</title>
        <meta
          name="description"
          content="3D Vishwa (3DVishwa) — Custom 3D printed gifts, lithophanes, figures & more. High-quality prints, fast delivery, and easy customization."
        />
        <meta name="keywords" content="3D Vishwa, 3DVishwa, 3D printing, 3D prints, lithophane, 3D figures, 3D design, custom 3D" />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://3dvishwa.com/" />
        <link rel="alternate" href="https://3dvishwa.com/" />

        <meta property="og:title" content="3D Vishwa (3DVishwa) | Custom 3D Prints" />
        <meta property="og:description" content="Unique 3D printed gifts, lithophanes, and figures made by 3D Vishwa." />
        <meta property="og:image" content="/hero-litho.png" />
        <meta property="og:url" content="https://3dvishwa.com/" />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/favicon.ico" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="space-y-16 sm:space-y-24 py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto text-[#3E312C] font-sans">
        <Toaster position="top-right" />

        {/* ---------------- 2-Column Hero Section ---------------- */}
        <section className="glass-card rounded-[32px] border border-[#ECE2D3] overflow-hidden p-6 sm:p-12 lg:p-16 bg-[#FFFDF9]/90 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#7B8F63]/10 border border-[#7B8F63]/20 text-[#3F5B43] text-xs font-semibold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#3F5B43]" /> Sustainable 3D Studio
              </span>

              <div className="space-y-4 min-h-[140px]">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#3E312C] tracking-tight leading-[1.15]">
                  {heroSlides[currentHero].title}
                </h1>
                <p className="text-[#65554D] text-sm sm:text-base leading-relaxed font-medium">
                  {heroSlides[currentHero].subtitle}
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={heroSlides[currentHero].link}
                  className="btn-primary inline-flex items-center gap-2 font-semibold text-xs sm:text-sm py-3.5 px-6 shadow-md active:scale-95 cursor-pointer"
                >
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/custom-order"
                  className="btn-secondary inline-flex items-center gap-2 font-semibold text-xs sm:text-sm py-3.5 px-6 cursor-pointer"
                >
                  Custom Request
                </Link>
              </div>

              <div className="flex space-x-2.5 pt-4">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHero(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${currentHero === idx ? 'w-8 bg-[#3F5B43]' : 'w-2 bg-[#ECE2D3] hover:bg-[#7B8F63]'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-[24px] overflow-hidden bg-[#FCF8F3] border border-[#ECE2D3] flex items-center justify-center">
              {heroSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentHero ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={idx === currentHero}
                    className="object-contain p-6"
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ---------------- Featured Products Grid ---------------- */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#ECE2D3] pb-4">
            <div>
              <span className="text-xs font-bold text-[#7B8F63] uppercase tracking-wider">Curated Creations</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight mt-1">Featured Prints</h2>
            </div>
            <Link href="/products" className="btn-secondary inline-flex items-center gap-1.5 text-xs font-semibold py-2.5 px-4 self-start sm:self-auto">
              View Full Catalog <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse h-64 bg-[#FCF8F3] rounded-[24px] border border-[#ECE2D3]"></div>
              ))}
            </div>
          )}

          {!isLoading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6">
              {featuredProducts.map((product: any, idx: number) => {
                const minPricePaise = Math.min(
                  ...(product.variants?.map((v: any) => v.pricePaise) || [0])
                );
                const defaultVariant = product.variants?.[0];

                const isSaved = isInWishlist ? isInWishlist(product.productId) : false;

                const handleAddToCart = (e: React.MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!defaultVariant) {
                    toast.error("No variant available for this product");
                    return;
                  }

                  if (addItem) {
                    addItem({
                      productId: product.productId,
                      name: product.name,
                      pricePaise: defaultVariant.pricePaise,
                      qty: 1,
                      variantId: defaultVariant.variantId || 'default',
                      size: defaultVariant.size || '',
                      images: product.images || ['/placeholder.png'],
                    });
                    toast.success(`${product.name} added to cart!`);
                  }
                };

                const handleToggleWishlist = (e: React.MouseEvent) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (!addToWishlist || !removeFromWishlist) {
                    toast.success(isSaved ? "Removed from wishlist!" : "Saved to wishlist!");
                    return;
                  }

                  if (isSaved) {
                    removeFromWishlist(product.productId);
                  } else {
                    addToWishlist({
                      productId: product.productId,
                      name: product.name,
                      pricePaise: defaultVariant?.pricePaise || minPricePaise || 0,
                      image: product.images?.[0] || "/placeholder.png",
                      category: product.category,
                    });
                  }
                };

                return (
                  <motion.div
                    key={product.productId}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    variants={fadeUp}
                  >
                    <div className="glass-card organic-hover rounded-[20px] border border-[#ECE2D3] overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group bg-[#FFFDF9]/90 relative shadow-xs">

                      {/* Image Frame & Action Overlay */}
                      <div className="relative w-full aspect-square bg-[#FCF8F3] overflow-hidden p-3 border-b border-[#ECE2D3]/60">
                        <Link href={`/products/${product.productId}`} className="block relative w-full h-full">
                          <Image
                            src={product.images?.[0] || '/placeholder.png'}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        {/* Top-Right Wishlist Button */}
                        <div className="absolute top-2.5 right-2.5 z-20">
                          <button
                            type="button"
                            aria-label={isSaved ? "Remove from Wishlist" : "Add to Wishlist"}
                            className={`w-8 h-8 rounded-full border border-[#ECE2D3] flex items-center justify-center transition-all shadow-xs cursor-pointer ${isSaved
                                ? "bg-red-50 text-red-500 border-red-200"
                                : "bg-[#FFFDF9]/90 text-[#3E312C] hover:text-[#B8724A] hover:bg-white"
                              }`}
                            onClick={handleToggleWishlist}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                          </button>
                        </div>

                        {/* Desktop-Only Hover Overlay Button */}
                        <div className="hidden sm:block absolute inset-x-2.5 bottom-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
                          <button
                            type="button"
                            onClick={handleAddToCart}
                            className="btn-primary w-full py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-3.5 sm:p-4 flex flex-col flex-grow justify-between space-y-3">
                        <Link href={`/products/${product.productId}`}>
                          <h3 className="font-bold text-xs sm:text-sm text-[#3E312C] line-clamp-2 group-hover:text-[#3F5B43] transition-colors">
                            {product.name}
                          </h3>
                        </Link>

                        {/* Bottom Price & Mobile Quick Add Row */}
                        <div className="flex items-center justify-between pt-2 sm:pt-2.5 border-t border-[#ECE2D3]">
                          <div>
                            <span className="text-[9px] sm:text-[10px] font-bold text-[#65554D] uppercase tracking-wider block">Starts at</span>
                            <span className="text-[#3E312C] font-extrabold text-xs sm:text-sm">
                              ₹{(minPricePaise / 100).toLocaleString("en-IN")}
                            </span>
                          </div>

                          {/* Mobile-Only Touch Add to Cart Button */}
                          <button
                            type="button"
                            onClick={handleAddToCart}
                            aria-label={`Add ${product.name} to cart`}
                            className="sm:hidden p-2 rounded-full bg-[#3F5B43] text-white shadow-xs active:scale-90 transition-transform cursor-pointer flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* ---------------- Shop by Categories ---------------- */}
        <section className="space-y-8">
          <div className="border-b border-[#ECE2D3] pb-4">
            <span className="text-xs font-bold text-[#7B8F63] uppercase tracking-wider">Explore Options</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight mt-1">Shop by Category</h2>
          </div>

          {!isLoading && !error && (() => {
            const categoryMap: Record<string, string> = {};
            products.forEach((p: any) => {
              if (p.category && !categoryMap[p.category]) {
                categoryMap[p.category] = p.images?.[0] || '/placeholder.png';
              }
            });

            const categories = Object.entries(categoryMap);
            if (categories.length === 0) return <p className="text-center text-[#65554D]">No categories available.</p>;

            return (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categories.map(([category, img], idx) => (
                  <motion.div
                    key={category}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    variants={fadeUp}
                  >
                    <Link
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="relative group overflow-hidden rounded-[24px] glass-card border border-[#ECE2D3] organic-hover h-64 block bg-[#FFFDF9]"
                    >
                      <Image
                        src={img}
                        alt={category}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#3E312C]/85 via-[#3E312C]/20 to-transparent group-hover:from-[#3E312C]/90 transition-all duration-300" />
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <h3 className="text-[#FFFDF9] text-base sm:text-lg font-bold">{category}</h3>
                        <span className="text-[#E7DCC8] text-xs font-semibold flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                          Explore Category <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </section>

        {/* ---------------- Why Choose Us ---------------- */}
        <section className="glass-card p-8 sm:p-14 space-y-10 rounded-[32px] border border-[#ECE2D3] bg-[#FFFDF9]">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#7B8F63] uppercase tracking-wider">Unmatched Studio Quality</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">Why Choose 3DVishwa?</h2>
            <p className="text-[#65554D] text-xs sm:text-sm leading-relaxed">State-of-the-art 3D fabrication built on precision, sustainable polymers, and dedicated craftsmanship.</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={containerVariants}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-[#3F5B43]" />, title: 'High Precision Prints', text: 'Durable, premium PLA & resin printing with rigorous studio inspection.' },
              { icon: <Zap className="w-6 h-6 text-[#3F5B43]" />, title: 'Express Delivery', text: 'Fast, secure shipping across Pune and pan-India with live order tracking.' },
              { icon: <Sparkles className="w-6 h-6 text-[#3F5B43]" />, title: 'Bespoke Customization', text: 'Bring your custom photo lithophanes, keychains, and CAD designs to life.' },
              { icon: <HeartHandshake className="w-6 h-6 text-[#3F5B43]" />, title: 'Designer Support', text: 'Friendly designer assistance every step of the way for custom specifications.' },
            ].map(({ icon, title, text }, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i}
                className="flex flex-col items-start p-6 rounded-[22px] bg-[#FCF8F3] border border-[#ECE2D3] space-y-3"
              >
                <div className="p-3 bg-[#FFFDF9] rounded-[16px] border border-[#ECE2D3] shadow-xs">{icon}</div>
                <h3 className="font-extrabold text-[#3E312C] text-base">{title}</h3>
                <p className="text-[#65554D] text-xs leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ---------------- Instagram Testimonials ---------------- */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#7B8F63] uppercase tracking-wider">Social Proof</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#3E312C] tracking-tight">What Our Customers Say</h2>
            <p className="text-[#65554D] text-xs sm:text-sm max-w-md mx-auto">Watch real customer unboxing and custom 3D print experiences on Instagram!</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { id: 1, url: 'https://www.instagram.com/reel/DNDSSZdJ9Qe/', thumb: '/testimonials/thumb1.jpg' },
              { id: 2, url: 'https://www.instagram.com/reel/DNqIo8wy_aa/', thumb: '/testimonials/thumb2.jpg' },
              { id: 3, url: 'https://www.instagram.com/reel/DMiJqZ-CGGi/', thumb: '/testimonials/thumb3.jpg' },
            ].map(({ id, url, thumb }, idx) => (
              <motion.a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx}
                variants={fadeUp}
                className="relative block rounded-[24px] overflow-hidden glass-card border border-[#ECE2D3] organic-hover group aspect-[4/3] bg-[#FFFDF9]"
              >
                <Image
                  src={thumb}
                  alt={`Customer Testimonial ${id}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority={idx === 0}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#3E312C]/20 group-hover:bg-[#3E312C]/10 transition-colors">
                  <div className="w-12 h-12 bg-[#FFFDF9]/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-md text-[#3F5B43] transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <p className="text-center text-xs sm:text-sm text-[#65554D] font-medium pt-2">
            Join thousands of happy buyers. Follow us on{' '}
            <a href="https://www.instagram.com/3d_vishwa" target="_blank" rel="noopener noreferrer" className="text-[#3F5B43] hover:underline font-extrabold">
              Instagram (@3d_vishwa)
            </a>{' '}
            for daily creation showcases!
          </p>
        </section>

      </div>
    </>
  );
}