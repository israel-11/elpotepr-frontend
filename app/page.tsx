// "use client"

// import { useState, useEffect, useRef } from 'react'
// import { motion } from 'framer-motion'
// import { BetType } from './components/BetType'
// import { MyBets } from './components/MyBets'
// import { BetsSummary } from './components/BetsSummary'
// import { BalanceManager } from './components/BalanceManager'

// // TODO: Backend Integration Points:
// // 1. Fetch bet types from API
// // const fetchBetTypes = async () => {
// //   const response = await fetch('/api/bet-types');
// //   const data = await response.json();
// //   setBetTypes(data);
// // };

// // 2. Fetch user's bets from API
// // const fetchMyBets = async () => {
// //   const response = await fetch('/api/my-bets');
// //   const data = await response.json();
// //   setMyBets(data);
// // };

// // 3. Initialize data on component mount
// // useEffect(() => {
// //   fetchBetTypes();
// //   fetchMyBets();
// // }, []);

// const sampleBetTypes = [
//   {
//     id: "1",
//     title: "¿Resultado de la Serie?",
//     description: "Predice el resultado final de la serie",
//     options: [
//       "Equipo Local en 3 juegos",
//       "Equipo Local en 4 juegos",
//       "Equipo Local en 5 juegos",
//       "Equipo Visitante en 3 juegos",
//       "Equipo Visitante en 4 juegos",
//       "Equipo Visitante en 5 juegos"
//     ],
//     entryFee: 20,
//     maxPrize: 100,
//     maxEntries: 5,
//     currentEntries: 3,
//     isClosed: false
//   },
//   {
//     id: "2",
//     title: "¿Quién será el MVP de la Serie?",
//     description: "Elige al jugador que crees que será el Jugador Más Valioso",
//     options: ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4", "Jugador 5"],
//     entryFee: 100,
//     maxPrize: 800,
//     maxEntries: 8,
//     currentEntries: 5,
//     isClosed: false
//   },
//   {
//     id: "3",
//     title: "¿Quién será el primer jugador en anotar?",
//     description: "Selecciona al jugador que anotará la primera carrera",
//     options: ["Jugador A", "Jugador B", "Jugador C", "Jugador D", "Jugador E"],
//     entryFee: 50,
//     maxPrize: 450,
//     maxEntries: 9,
//     currentEntries: 7,
//     isClosed: false
//   }
// ]

// const sampleMyBets = [
//   {
//     id: "1",
//     title: "¿Resultado de la Serie?",
//     option: "Equipo Local en 4 juegos",
//     amount: 20,
//     maxPrize: 100,
//     status: 'pending'
//   },
//   {
//     id: "2",
//     title: "¿Quién será el MVP de la Serie?",
//     option: "Jugador 3",
//     amount: 100,
//     maxPrize: 800,
//     status: 'pending'
//   }
// ]

// export default function Home() {
//   const [betTypes, setBetTypes] = useState(sampleBetTypes)
//   const [myBets, setMyBets] = useState(sampleMyBets)
//   const myBetsRef = useRef<HTMLDivElement>(null)

//   const handleBetConfirmed = async (betId: string, option: string, amount: number, maxPrize: number) => {
//     try {
//       // TODO: Send bet to backend
//       // const response = await fetch('/api/bets', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify({ betId, option, amount, maxPrize })
//       // });
//       // const data = await response.json();
      
//       const newBet = {
//         id: betId,
//         title: betTypes.find(bet => bet.id === betId)?.title || "",
//         option: option,
//         amount: amount,
//         maxPrize: maxPrize,
//         status: 'pending' as const
//       }
//       setMyBets(prevBets => [...prevBets, newBet])
//     } catch (error) {
//       console.error('Error confirming bet:', error);
//       // TODO: Show error message to user
//     }
//   }

//   const handleBetCancelled = async (betId: string) => {
//     try {
//       // TODO: Cancel bet in backend
//       // await fetch(`/api/bets/${betId}`, {
//       //   method: 'DELETE'
//       // });
      
//       setMyBets(prevBets => prevBets.filter(bet => bet.id !== betId))
//     } catch (error) {
//       console.error('Error cancelling bet:', error);
//       // TODO: Show error message to user
//     }
//   }

//   const scrollToMyBets = () => {
//     myBetsRef.current?.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 text-gray-900 py-8 px-4">
//       <motion.h1 
//         className="text-4xl font-bold text-center mb-8 text-primary"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         El Pote PR
//       </motion.h1>
//       <div className="max-w-7xl mx-auto">
//         <BalanceManager />
//         {betTypes.map((betType, index) => (
//           <motion.div
//             key={betType.id}
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//           >
//             <BetType 
//               {...betType} 
//               onBetConfirmed={handleBetConfirmed}
//               onBetCancelled={handleBetCancelled}
//             />
//           </motion.div>
//         ))}
//         <div ref={myBetsRef}>
//           <MyBets bets={myBets} />
//         </div>
//       </div>
//       <BetsSummary 
//         betsCount={myBets.length}
//         totalAmount={myBets.reduce((sum, bet) => sum + bet.amount, 0)}
//         onViewBetsClick={scrollToMyBets}
//       />
//     </main>
//   )
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BetType } from "./components/BetType";
import { MyBets } from "./components/MyBets";
import { BetsSummary } from "./components/BetsSummary";
import { BalanceManager } from "./components/BalanceManager";


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [betTypes, setBetTypes] = useState([]); // Inicializa como array vacío
  const [myBets, setMyBets] = useState([]); // Inicializa como array vacío
  const myBetsRef = useRef<HTMLDivElement>(null);
  const [myBalance, setMyBalance] = useState<number | null>(null);

  const handleBetConfirmed = async (betId: string, option: string, amount: number, maxPrize: number) => {
    try {
      // TODO: Send bet to backend
      // const response = await fetch('/api/bets', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ betId, option, amount, maxPrize })
      // });
      // const data = await response.json();

      //
      const createBet = async (betDetails) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/apuestas`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            credentials: "include", // Para enviar cookies (si es necesario)
            body: JSON.stringify(betDetails),
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error al crear la apuesta:", errorData.error);
            alert(errorData.error); // Manejo de errores en la UI
            return;
          }
      
          const data = await response.json();
          console.log("Apuesta creada exitosamente:", data);
          alert("¡Apuesta registrada exitosamente!");
        } catch (error) {
          console.error("Error de red:", error);
          alert("Hubo un error al intentar registrar la apuesta.");
        }
      };
      
      // Llamar a la función con los detalles de la apuesta
      createBet({
        usuario_id: 1, // Reemplaza con el ID del usuario autenticado
        pote_id: betId,   // ID del pote seleccionado
        opcion_id: option,  // ID de la opción seleccionada
        monto: amount,  // Monto de la apuesta
      });
      
      //
      
      const newBet = {
        id: betId,
        title: betTypes.find(bet => bet.id === betId)?.title || "",
        option: option,
        amount: amount,
        maxPrize: maxPrize,
        status: 'pending' as const
      }
      setMyBets(prevBets => [...prevBets, newBet])
    } catch (error) {
      console.error('Error confirming bet:', error);
      // TODO: Show error message to user
    }
  }

  const handleBetCancelled = async (betId: string) => {
    try {
      // TODO: Cancel bet in backend
      // await fetch(`/api/bets/${betId}`, {
      //   method: 'DELETE'
      // });
      
      setMyBets(prevBets => prevBets.filter(bet => bet.id !== betId))
    } catch (error) {
      console.error('Error cancelling bet:', error);
      // TODO: Show error message to user
    }
  }


  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/validate`, {
          credentials: "include",
        });

        if (response.status === 401) {
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url; // Redirige si hay URL
          } else {
            setError("No se pudo redirigir. Por favor, inténtalo más tarde.");
          }
          return;
        }

        const data = await response.json();
        setBetTypes(data.potes || []); // Asegura que sea un array
        setIsLoading(false);

        try {
          const stripe_account_id = data.user.accountId
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/${stripe_account_id}`, {
            credentials: "include",
          });
  
          const datosDeUsuario = await response.json();
          setMyBets(datosDeUsuario.apuestas || []); // Asegura que sea un array
          setMyBalance(datosDeUsuario.balance || 0);
          setIsLoading(false);
        } catch (error) {
          console.error("Error buscando mis apuestas:", error);
          setError("Hubo un problema al buscar mis apuestas.");
        }

      } catch (error) {
        console.error("Error validando sesión:", error);
        setError("Hubo un problema al validar la sesión.");
      }


    };

    validateSession();
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-8 px-4">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        El Pote PR
      </motion.h1>
      <div className="max-w-7xl mx-auto">
        <BalanceManager />
        {betTypes.length > 0 ? (
          betTypes.map((betType, index) => (
            <motion.div
              key={betType.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BetType {...betType}
              onBetConfirmed={handleBetConfirmed}
              onBetCancelled={handleBetCancelled}
              />

            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-600">No hay potes disponibles.</div>
        )}
        <div ref={myBetsRef}>
          <MyBets bets={myBets} />
        </div>
      </div>
      <BetsSummary
        betsCount={myBets.length}
        totalAmount={myBets.reduce((sum, bet) => sum + Number(bet.amount), 0)}
        onViewBetsClick={() => myBetsRef.current?.scrollIntoView({ behavior: "smooth" })}
        balance={myBalance}
      />
    </main>
  );
}
