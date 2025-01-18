import { useState } from 'react';
import { Category, Product } from '../types';
import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Admin() {
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const [newCategory, setNewCategory] = useState({
    name: '',
    image: '',
    description: ''
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    image: '',
    description: '',
    categoryId: ''
  });

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const category: Category = {
      id: editMode && selectedCategory ? selectedCategory.id : Date.now().toString(),
      ...newCategory
    };

    const updatedCategories = editMode && selectedCategory
      ? categories.map(c => c.id === selectedCategory.id ? category : c)
      : [...categories, category];

    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    resetCategoryForm();
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;

    const product: Product = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      ...newProduct,
      categoryId: selectedCategory.id
    };

    const updatedProducts = editingProduct
      ? products.map(p => p.id === editingProduct.id ? product : p)
      : [...products, product];

    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    resetProductForm();
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      image: product.image,
      description: product.description,
      categoryId: product.categoryId
    });
  };

  const resetProductForm = () => {
    setNewProduct({ name: '', image: '', description: '', categoryId: '' });
    setEditingProduct(null);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      image: category.image,
      description: category.description
    });
    setEditMode(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(c => c.id !== categoryId);
    const updatedProducts = products.filter(p => p.categoryId !== categoryId);
    
    setCategories(updatedCategories);
    setProducts(updatedProducts);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const resetCategoryForm = () => {
    setNewCategory({ name: '', image: '', description: '' });
    setSelectedCategory(null);
    setEditMode(false);
  };

  const filteredProducts = selectedCategory
    ? products
        .filter(product => product.categoryId === selectedCategory.id)
        .filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
      
      {/* Category Management Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editMode ? 'Edit Category' : 'Add New Category'}
        </h3>
        <form onSubmit={handleCategorySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={newCategory.image}
              onChange={(e) => setNewCategory({...newCategory, image: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              {editMode ? 'Update Category' : 'Add Category'}
            </button>
            {editMode && (
              <button
                type="button"
                onClick={resetCategoryForm}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Existing Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <div key={category.id} className="border rounded-lg p-4">
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h4 className="font-semibold">{category.name}</h4>
              <p className="text-sm text-gray-600 mb-4">{category.description}</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  Manage Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Management Section */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">
              Products for {selectedCategory.name}
            </h3>
            <button
              onClick={() => {
                setSelectedCategory(null);
                resetProductForm();
              }}
              className="text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>

          {/* Search Products */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          
          {/* Add/Edit Product Form */}
          <form onSubmit={handleProductSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={newProduct.image}
                onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={resetProductForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Products List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="border rounded-lg p-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <PencilIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4 mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}