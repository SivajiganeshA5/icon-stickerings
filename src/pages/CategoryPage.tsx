import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function CategoryPage() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = JSON.parse(localStorage.getItem('products') || '[]')
    .filter((product: any) => product.categoryId === id);
  const category = JSON.parse(localStorage.getItem('categories') || '[]')
    .find((cat: any) => cat.id === id);

  const filteredProducts = products.filter((product: any) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!category) {
    return <div className="container mx-auto px-6 py-12">Category not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8">{category.name}</h2>
      
      {/* Search Bar */}
      <div className="mb-8">
        <div className="max-w-md mx-auto">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No products found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}