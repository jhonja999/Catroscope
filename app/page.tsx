"use client";

import React, { useState } from "react";
import CatHoroscopeForm from "@/components/cat-horoscope-form";
import { CatIcon, Star, Sparkles } from "lucide-react";

export default function Home() {
  const [showVictory, setShowVictory] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track if the page is "loading"

  // Function to handle the click event, show victory animation, and simulate page reload
  const handleClientClick = () => {
    setIsLoading(true); // Start loading
    setShowVictory(true); // Trigger victory animation

    // Simulate page reload after 2 seconds (adjust for animation duration)
    setTimeout(() => {
      setIsLoading(false); // End loading state
      setShowVictory(false); // Hide victory animation
      window.location.reload(); // Simulate page reload
    }, 3000); // Adjust the timeout as needed
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2d2536] to-[#32242f] dark:bg-gradient-to-b dark:from-[#2d2536] dark:to-[#32242f] relative overflow-hidden">
      {/* Fondo decorativo con estrellas */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Background Circles - Larger and more separated */}
        <div className="absolute top-16 left-16 w-48 h-48 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-28 right-28 w-64 h-64 bg-secondary/30 rounded-full blur-3xl animate-pulse"></div>

        {/* Estrellas flotantes */}
        {[...Array(12)].map((_, i) => (
          <Star
            key={i}
            className="relative text-yellow-400 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              width: `${Math.random() * 16 + 8}px`,
              height: `${Math.random() * 16 + 8}px`,
            }}
          />
        ))}
      </div>

      {/* Animación de Victoria */}
      {showVictory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="relative">
            <div className="absolute inset-0 animate-spin-slow">
              {[...Array(8)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-400"
                  style={{
                    transform: `rotate(${i * 45}deg) translateY(-100px)`,
                  }}
                />
              ))}
            </div>
            <CatIcon className="h-24 w-24 text-primary animate-bounce-custom fill-white" />
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black opacity-50 z-40 flex items-center justify-center">
          <div className="text-white text-xl z-40">Cargando...</div>
        </div>
      )}

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-16">
          {/* Encabezado con animación de entrada */}
          <div className="flex items-center space-x-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Button that triggers the refresh and victory animation */}
            <button onClick={handleClientClick}>
              <CatIcon className="h-14 w-14 text-primary hover:animate-wiggle text-white" />
            </button>
            <h1 className="text-5xl font-extrabold text-white tracking-wide transition-colors hover:text-primary/80">
              Horóscopo Gatuno
            </h1>
          </div>

          {/* Descripción con animación de desvanecimiento */}
          <p className="text-center text-lg text-gray-300 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            ¡Descubre los secretos del universo para tu compañero felino! Deja
            que las estrellas guíen las aventuras, siestas y momentos de juego
            de tu gatito con nuestras predicciones personalizadas.
          </p>

          {/* Formulario */}
          <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <CatHoroscopeForm />
          </div>

          {/* Frase inspiradora con animación de brillo */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
            <p>Cada gato merece su momento entre las estrellas.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
<footer className="relative bottom-0 w-full py-6 text-center">
  <div className="max-w-4xl mx-auto px-4 flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between mb-5">
    {/* Texto */}
    <div className="flex items-center space-x-4 flex-col md:flex-row">
      <p className="text-sm text-gray-400">
        Gracias Rocko, espero encontrarte.
      </p>
        <br/>
    </div>

    {/* Imagen */}
    <div className="w-24 h-24 md:w-32 md:h-32 mt-4 md:mt-0 mx-4">
      <img
        src="https://i.imgur.com/m7jOExj.jpeg"
        alt="Rocko"
        className="w-full h-full rounded-lg opacity-80"
      />
    </div>

    {/* Botón */}
    <div>
      <a
        href="https://www.buymeacoffee.com/jjrvm999u"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-2 mt-4 md:mt-0 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-400 transition duration-300"
      >
        Comprar un café ☕
      </a>
    </div>
  </div>
</footer>

    </main>
  );
}
