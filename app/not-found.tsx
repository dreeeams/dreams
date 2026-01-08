import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="border-4 border-black p-12 bg-brand text-white mb-8">
          <h1 className="text-9xl font-nostalgic mb-4">404</h1>
          <p className="text-2xl font-bold mb-2">PAGE NOT FOUND</p>
        </div>

        <div className="space-y-6">
          <p className="text-lg text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-black text-white border-2 border-black px-8 py-3 font-bold hover:bg-brand hover:border-brand transition-colors"
            >
              ← GO HOME
            </Link>
            <Link
              href="/#contact"
              className="bg-white text-black border-2 border-black px-8 py-3 font-bold hover:bg-gray-100 transition-colors"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
