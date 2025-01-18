import CategoryCard from '../components/CategoryCard';

export default function Home() {
  const categories: Array<{ id: number; [key: string]: any }> = JSON.parse(localStorage.getItem('categories') || '[]');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gray-900">
        <img
          src="https://media-private.canva.com/rly-I/MAGcEjrly-I/1/p.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJWF6QO3UH4PAAJ6Q%2F20250117%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250117T222550Z&X-Amz-Expires=83647&X-Amz-Signature=d78c49fecaec9d56c9e6eb1319072c48572bfc94ec6fb0ab2b61c53d6acfdcf6&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Sat%2C%2018%20Jan%202025%2021%3A39%3A57%20GMT"
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
          {categories.map((category: { id: number; [key: string]: any }) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
