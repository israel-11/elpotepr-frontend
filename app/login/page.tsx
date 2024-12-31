"use client"; // Necesario para usar hooks en este componente

import { useEffect, useState } from "react";

export default function Login() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const redirectToLogin = async () => {
        setErrorMessage("printing url "+process.env.NEXT_PUBLIC_BACKEND_URL+"...")

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
          credentials: "include", // Asegura que las cookies se envíen
          method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            setErrorMessage("URL recibida del backend:"+data.url);
            if (data.url) {
              window.location.href = data.url;
            } else {
              setErrorMessage("No se recibió un enlace válido para la redirección.");
            }
          } else {
            setErrorMessage("Hubo un error al redirigirte. Intenta nuevamente.");
          }
          
      } catch (error) {
        setErrorMessage("Error al redirigir al login de Stripe:"+error);
        setErrorMessage("Hubo un problema al conectarte con el servidor. Intenta nuevamente más tarde.");
      }
    };

    redirectToLogin();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        {errorMessage ? (
          <div className="text-red-600">{errorMessage}</div>
        ) : (
          <div className="text-gray-600">Redirigiéndote al Dashboard de Stripe...</div>
        )}
      </div>
    </div>
  );
}

