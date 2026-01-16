'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLocalhost, setIsLocalhost] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if running on localhost
    const hostname = window.location.hostname;
    const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
    setIsLocalhost(isLocal);

    // Redirect if not localhost
    if (!isLocal) {
      router.push('/');
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mock authentication - just store a flag in localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);

    // Redirect to dashboard
    router.push('/dashboard');
  };

  if (!isLocalhost) {
    return (
      <div className="min-h-screen bg-background-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">This page is only accessible on localhost.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-nostalgic mb-2">DREAM STUDIO</h1>
            <p className="text-sm text-gray-600">Admin Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold mb-2">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="••••••••"
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-brand text-white border-4 border-black font-bold hover:bg-black transition-colors"
            >
              LOGIN
            </motion.button>
          </form>

          {/* Info */}
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>Development Mode - No backend connection</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
