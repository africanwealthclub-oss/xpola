// FILE PATH: src/pages/ShopCategory.tsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCountry } from '../contexts/CountryContext';
import { useCart } from '../contexts/CartContext';
import { useShop } from '@/hooks/useShop';
import { ApiProduct, productImageUrl, formatPrice } from '@/lib/api';

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
    <Link
      to={`/shop/product/${product.id}`}
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
        <p className="font-montserrat font-bold text-gray-900 text-sm leading-snug mb-3 line-clamp-2 flex-1">{product.name}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-montserrat font-extrabold text-gray-900">{formatPrice(product.price, product.currency)}</span>
          <button
            onClick={handleAdd}
            disabled={product.stock_status !== 'in_stock' || adding}
            className={`font-montserrat font-bold text-xs px-3 py-2 uppercase tracking-wide transition-all flex-shrink-0 ${
              product.stock_status !== 'in_stock'
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : adding
                ? 'bg-green-500 text-white'
                : 'bg-[#E02020] text-white hover:bg-[#c01a1a]'
            }`}>
            {adding ? '✓' : '+ Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default function ShopCategory() {
  const { currentData } = useCountry();
  const country = currentData.code as 'NG' | 'CA';
  const [searchParams] = useSearchParams();
  const initCat = searchParams.get('category') ?? '';

  const {
    products, categories, loading, error, pagination,
    page, setPage,
    search, setSearch,
    selectedCategory, setSelectedCategory,
    sortBy, setSortBy,
    showInStock, setShowInStock,
    hasFilters, clearFilters,
  } = useShop(country);

  useEffect(() => {
    if (initCat) setSelectedCategory(initCat);
  }, []);

  const activeCat = categories.find(c => c.slug === selectedCategory);
  const shopPath  = country === 'NG' ? '/nigeria/shop' : '/canada/shop';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <Navbar/>
      <div className="pt-[72px] h-1 bg-[#E02020]"/>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-poppins text-xs text-gray-400 mb-6">
          <Link to={shopPath} className="hover:text-[#E02020] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-700 font-semibold">{activeCat?.name ?? 'All Categories'}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-montserrat font-black text-2xl md:text-3xl text-gray-900 uppercase tracking-widest">
              {activeCat?.name ?? 'All Products'}
            </h1>
            {pagination && <p className="font-poppins text-sm text-gray-400 mt-1">{pagination.total} products</p>}
          </div>
          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search…"
              className="px-3 py-2 border border-gray-200 text-sm font-poppins focus:outline-none focus:border-[#E02020] w-48"
            />
            <select
              value={sortBy}
              onChange={e => { setSortBy(e.target.value as typeof sortBy); setPage(1); }}
              className="px-3 py-2 border border-gray-200 text-sm font-poppins focus:outline-none focus:border-[#E02020] bg-white">
              <option value="newest">Newest</option>
              <option value="featured">Featured</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => { setSelectedCategory(''); setPage(1); }}
            className={`font-montserrat font-bold text-xs px-4 py-2 uppercase tracking-widest border transition-colors ${
              !selectedCategory
                ? 'bg-[#E02020] text-white border-[#E02020]'
                : 'border-gray-200 text-gray-600 hover:border-[#E02020] hover:text-[#E02020]'
            }`}>
            All
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => { setSelectedCategory(c.slug); setPage(1); }}
              className={`font-montserrat font-bold text-xs px-4 py-2 uppercase tracking-widest border transition-colors ${
                selectedCategory === c.slug
                  ? 'bg-[#E02020] text-white border-[#E02020]'
                  : 'border-gray-200 text-gray-600 hover:border-[#E02020] hover:text-[#E02020]'
              }`}>
              {c.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i: number) => (
              <div key={i} className="bg-white border border-gray-100 animate-pulse">
                <div className="bg-gray-100" style={{ paddingBottom: '68%' }}/>
                <div className="p-4 space-y-2">
                  <div className="h-2 bg-gray-100 rounded w-1/3"/>
                  <div className="h-3 bg-gray-100 rounded"/>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-20 font-poppins">{error}</p>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-poppins text-gray-500 mb-3">No products found.</p>
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
                  className="px-4 py-2 border border-gray-200 font-montserrat font-bold text-xs uppercase tracking-widest text-gray-600 hover:border-[#E02020] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
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
                          : 'border-gray-200 text-gray-600 hover:border-[#E02020]'
                      }`}>
                      {pageNum}
                    </button>
                  ))}
                <button
                  onClick={() => setPage(prev => Math.min(pagination.last_page, prev + 1))}
                  disabled={page === pagination.last_page}
                  className="px-4 py-2 border border-gray-200 font-montserrat font-bold text-xs uppercase tracking-widest text-gray-600 hover:border-[#E02020] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer/>
    </div>
  );
}