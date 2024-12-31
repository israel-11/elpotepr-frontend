"use client"

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Bucket {
  id: number;
  title: string;
  timeRemaining: number;
  totalAmount: number;
  isPopular: boolean;
}

export default function BucketView() {
  const [buckets, setBuckets] = useState<Bucket[]>([]);

  useEffect(() => {
    // Simular carga de datos de buckets
    setBuckets([
      { id: 1, title: "¿Quién gana el partido?", timeRemaining: 3600, totalAmount: 5000, isPopular: true },
      { id: 2, title: "¿Cuántos goles se marcarán?", timeRemaining: 7200, totalAmount: 3000, isPopular: false },
      { id: 3, title: "¿Habrá tarjeta roja?", timeRemaining: 5400, totalAmount: 2000, isPopular: true },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">Potes Activos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {buckets.map((bucket) => (
          <motion.div
            key={bucket.id}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden"
          >
            <h2 className="text-xl font-semibold mb-2">{bucket.title}</h2>
            <p className="text-gray-600 mb-2">
              Tiempo restante: {Math.floor(bucket.timeRemaining / 60)} minutos
            </p>
            <motion.p
              className="text-2xl font-bold text-blue-600"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ${bucket.totalAmount.toLocaleString()}
            </motion.p>
            {bucket.isPopular && (
              <motion.div
                className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-bl-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                Popular
              </motion.div>
            )}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: bucket.timeRemaining, ease: "linear" }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

