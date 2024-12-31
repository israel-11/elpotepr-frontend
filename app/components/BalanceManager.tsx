import Cookies from 'js-cookie';
import { Button } from "@/components/ui/Button";

export function BalanceManager() {
  const handleClick = async () => {
    try {
      const accountId = Cookies.get('account_id'); // Leer el ID de la cuenta desde las cookies

      if (!accountId) {
        console.error("No se encontró el accountId en las cookies");
        alert("Por favor, inicia sesión para manejar tu balance.");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/stripe/express-dashboard-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId }),
      });

      if (!response.ok) {
        throw new Error("Error al obtener el enlace del Express Dashboard");
      }

      const { url } = await response.json();
      if (!url) {
        throw new Error("La respuesta del servidor no contiene un enlace válido.");
      }

      console.log("Redirigiendo a:", url);
      window.location.href = url; // Redirigir al usuario
    } catch (error) {
      console.error(error.message);
      alert("Ocurrió un problema al manejar tu balance. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Button as="a" onClick={handleClick} variant="outline">
      Manejar Balance
    </Button>
  );
}
