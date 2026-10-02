// FILE PATH: src/pages/Shop.tsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCountry } from '../contexts/CountryContext';
import { useCart } from '../contexts/CartContext';
import { useShop } from '@/hooks/useShop';
import { ApiProduct, productImageUrl, formatPrice } from '@/lib/api';

const NIGERIA_SLIDES = [
  { image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=90', tag: 'Construction Materials', headline: 'Build Nigeria\'s\nFuture Stronger', sub: 'Premium cement, steel rods and structural materials — delivered to your site.', cta: 'Shop Now', category: 'construction-materials' },
  { image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=90', tag: 'Oil & Gas Supplies', headline: 'Industrial-Grade\nOil & Gas Equipment', sub: 'ANSI/ISO certified PPE, safety gear and field supplies for Nigerian operations.', cta: 'Shop Now', category: 'oil-gas-supplies' },
  { image: 'https://images.unsplash.com/photo-1497435334941-8c899a9bd0d0?w=1600&q=90', tag: 'General Commerce', headline: 'Power Solutions\nFor Every Business', sub: 'Inverters, generators and solar systems — reliable power for Nigerian enterprises.', cta: 'Shop Now', category: 'general-commerce' },
];

const CANADA_SLIDES = [
  { image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1600&q=90', tag: 'Mining Equipment', headline: 'Precision Tools\nFor Canadian Mining', sub: 'Diamond core bits, hydraulic splitters and GPR systems for demanding operations.', cta: 'Shop Now', category: 'ca-mining-equipment' },
  { image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=90', tag: 'Industrial Supplies', headline: 'Heavy-Duty\nIndustrial Equipment', sub: 'Air compressors, welding machines and industrial supplies for Canadian workshops.', cta: 'Shop Now', category: 'ca-industrial' },
];

// ── Hero Slider ───────────────────────────────────────────────────────────────
const HeroSlider = ({
  slides,
  onCategoryClick,
}: {
  slides: typeof NIGERIA_SLIDES;
  onCategoryClick: (cat: string) => void;
}) => {
  const [current, setCurrent] = useState<number>(0);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    timer.current = setInterval(() => setCurrent(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer.current);
  }, [slides.length]);

  const s = slides[current];

  return (
    <div className="relative h-[480px] md:h-[560px] overflow-hidden bg-gray-900">
      <img src={s.image} alt={s.tag} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-700"/>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"/>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="inline-block bg-[#E02020] text-white text-xs font-bold px-3 py-1 uppercase tracking-widest mb-4 font-montserrat">{s.tag}</span>
          <h1 className="font-montserrat font-black text-4xl md:text-6xl text-white leading-tight mb-4 whitespace-pre-line">{s.headline}</h1>
          <p className="font-poppins text-white/80 text-base md:text-lg max-w-xl mb-8">{s.sub}</p>
          <button
            onClick={() => onCategoryClick(s.category)}
            className="bg-[#E02020] text-white font-montserrat font-bold px-8 py-4 text-sm uppercase tracking-widest hover:bg-[#c01a1a] transition-colors">
            {s.cta} →
          </button>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i: number) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/40'}`}/>
        ))}
      </div>
    </div>
  );
};

// ── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({ product }: { product: ApiProduct }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState<boolean>(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock_status !== 'in_stock') return;
    setAdding(true);
    addToCart(product);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <Link to={`/shop/product/${product.id}`}
      className="group bg-white border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative overflow-hidden bg-gray-50" style={{ paddingBottom: '68%' }}>
        <img
          src={productImageUrl(product.image_path)}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { (e.target as HTMLImageElement).src = 'https://xpolaservices.com/assets/no-image.png'; }}
        />
        {product.featured === 1 && (
          <span className="absolute top-3 left-3 bg-[#E02020] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider font-montserrat">Featured</span>
        )}
        {product.stock_status === 'out_of_stock' && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-widest">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[10px] font-bold text-[#E02020] uppercase tracking-widest font-poppins mb-1">{product.category_name ?? ''}</p>
        <p className="font-montserrat font-bold text-gray-900 text-sm leading-snug mb-2 line-clamp-2 flex-1">{product.name}</p>
        {product.rating > 0 && (
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star: number) => (
              <svg key={star} className={`w-3 h-3 ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
            <span className="text-[10px] text-gray-400 font-poppins">({product.reviews})</span>
          </div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-auto min-w-0">
          <span className="min-w-0 font-montserrat font-extrabold text-gray-900 text-sm sm:text-base leading-tight break-words">
            {formatPrice(product.price, product.currency)}
          </span>
          <button
            onClick={handleAdd}
            disabled={product.stock_status !== 'in_stock' || adding}
            className={`w-full sm:w-auto font-montserrat font-bold text-[10px] sm:text-xs px-3 py-2 uppercase tracking-wide transition-all flex-shrink-0 whitespace-nowrap ${
              product.stock_status !== 'in_stock'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : adding
                ? 'bg-green-500 text-white'
                : 'bg-[#E02020] text-white hover:bg-[#c01a1a]'
            }`}>
            {adding ? '✓ Added' : '+ Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

// ── Main Shop Page ────────────────────────────────────────────────────────────
export default function Shop() {
  const { currentData } = useCountry();
  const country = currentData.code as 'NG' | 'CA';
  const isNigeria = country === 'NG';

  const {
    products, categories, loading, error, pagination,
    page, setPage,
    search, setSearch,
    selectedCategory, setSelectedCategory,
    sortBy, setSortBy,
    showInStock, setShowInStock,
    hasFilters, clearFilters,
  } = useShop(country);

  const slides = isNigeria ? NIGERIA_SLIDES : CANADA_SLIDES;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar/>

      <div className="pt-[72px]">
        <HeroSlider
          slides={slides}
          onCategoryClick={(cat: string) => {
            setSelectedCategory(cat);
            window.scrollTo({ top: 400, behavior: 'smooth' });
          }}
        />
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-montserrat font-black text-2xl md:text-3xl text-gray-900 uppercase tracking-widest">
              {isNigeria ? '🇳🇬 Nigeria Shop' : '🇨🇦 Canada Shop'}
            </h2>
            {pagination && <p className="font-poppins text-sm text-gray-400 mt-1">{pagination.total} products</p>}
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="font-poppins text-sm text-[#E02020] hover:underline">
              Clear all filters
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0 space-y-6">
            <div>
              <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Search</p>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search products…"
                className="w-full px-3 py-2 border border-gray-200 text-sm font-poppins focus:outline-none focus:border-[#E02020] transition-colors"
              />
            </div>

            <div>
              <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Category</p>
              <div className="space-y-1">
                <button
                  onClick={() => { setSelectedCategory(''); setPage(1); }}
                  className={`w-full text-left font-poppins text-sm px-2 py-1.5 transition-colors ${!selectedCategory ? 'text-[#E02020] font-semibold' : 'text-gray-600 hover:text-[#E02020]'}`}>
                  All Categories
                </button>
                {categories.map(c => (
                  <button key={c.id}
                    onClick={() => { setSelectedCategory(c.slug); setPage(1); }}
                    className={`w-full text-left font-poppins text-sm px-2 py-1.5 transition-colors ${selectedCategory === c.slug ? 'text-[#E02020] font-semibold' : 'text-gray-600 hover:text-[#E02020]'}`}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-montserrat font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Sort By</p>
              <select
                value={sortBy}
                onChange={e => { setSortBy(e.target.value as typeof sortBy); setPage(1); }}
                className="w-full px-3 py-2 border border-gray-200 text-sm font-poppins focus:outline-none focus:border-[#E02020] bg-white">
                <option value="newest">Newest</option>
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showInStock}
                onChange={e => { setShowInStock(e.target.checked); setPage(1); }}
                className="w-4 h-4 accent-[#E02020]"
              />
              <span className="font-poppins text-sm text-gray-600">In Stock Only</span>
            </label>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i: number) => (
                  <div key={i} className="bg-white border border-gray-100 animate-pulse">
                    <div className="bg-gray-100" style={{ paddingBottom: '68%' }}/>
                    <div className="p-4 space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-1/3"/>
                      <div className="h-3 bg-gray-100 rounded"/>
                      <div className="h-3 bg-gray-100 rounded w-2/3"/>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="font-poppins text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-[#E02020] text-white font-montserrat font-bold px-6 py-3 text-sm uppercase tracking-widest hover:bg-[#c01a1a] transition-colors">
                  Retry
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-poppins text-gray-500 mb-2">No products found.</p>
                {hasFilters && (
                  <button onClick={clearFilters} className="font-poppins text-sm text-[#E02020] hover:underline">
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {products.map((p: ApiProduct) => <ProductCard key={p.id} product={p}/>)}
                </div>

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                  <div className="flex justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(prev => Math.max(1, prev - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-200 font-montserrat font-bold text-xs uppercase tracking-widest text-gray-600 hover:border-[#E02020] hover:text-[#E02020] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      ← Prev
                    </button>
                    {Array.from({ length: pagination.last_page }, (_: unknown, i: number) => i + 1)
                      .filter((pageNum: number) => Math.abs(pageNum - page) <= 2)
                      .map((pageNum: number) => (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 font-montserrat font-bold text-xs border transition-colors ${
                            page === pageNum
                              ? 'bg-[#E02020] text-white border-[#E02020]'
                              : 'border-gray-200 text-gray-600 hover:border-[#E02020] hover:text-[#E02020]'
                          }`}>
                          {pageNum}
                        </button>
                      ))}
                    <button
                      onClick={() => setPage(prev => Math.min(pagination.last_page, prev + 1))}
                      disabled={page === pagination.last_page}
                      className="px-4 py-2 border border-gray-200 font-montserrat font-bold text-xs uppercase tracking-widest text-gray-600 hover:border-[#E02020] hover:text-[#E02020] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                      Next →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
