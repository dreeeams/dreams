'use client';

import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-nostalgic mb-2">SETTINGS</h1>
        <p className="text-gray-600">Configure your dashboard preferences</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-4 border-black p-12 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="text-6xl mb-4">⚙️</div>
        <h2 className="text-2xl font-bold mb-2">Settings Panel</h2>
        <p className="text-gray-600">Coming soon...</p>
      </motion.div>
    </div>
  );
}
