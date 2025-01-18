import CategoryCard from '../components/CategoryCard';

export default function Home() {
  const categories = JSON.parse(localStorage.getItem('categories') || '[]');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1588858865445-60fe9a3f2221"
          alt="ICON STICKERING"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">ICON STICKERING</h1>
            <p className="text-xl">Professional Stickering & Wrapping Services</p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}