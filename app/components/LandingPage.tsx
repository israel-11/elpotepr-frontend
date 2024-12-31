"use client"

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [activeParticipants, setActiveParticipants] = useState(0);

  useEffect(() => {
    // Simular actualización de participantes activos
    const interval = setInterval(() => {
      setActiveParticipants(Math.floor(Math.random() * 100) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-semibold mb-2">Bienvenido a las Apuestas</h1>
        <p className="text-xl">¡Participa y gana grandes premios!</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg mb-4 cursor-pointer"
      >
        Explorar Potes Activos
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg mb-8 cursor-pointer"
      >
        Leer Reglas
      </motion.div>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="bg-blue-800 rounded-full p-4 shadow-lg"
      >
        <p className="text-2xl font-bold">{activeParticipants} participantes activos ahora!</p>
      </motion.div>

      <div className="absolute top-4 left-4">
        <img src="/placeholder.svg?height=50&width=50" alt="Logo del Evento" className="w-12 h-12" />
      </div>
    </div>
  );
}

