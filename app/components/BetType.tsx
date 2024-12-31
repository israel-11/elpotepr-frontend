import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { VisualBucket } from './VisualBucket'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface BetTypeProps {
  id: string;
  titulo: string;
  descripcion: string;
  opciones: { id: string; descripcion: string }[]; // Cambiar a un array de objetos
  entrada: number;
  premio_max: number;
  monto_acumulado: number;
  estado?: boolean;
  onBetConfirmed: (betId: string, option: string, amount: number, maxPrize: number) => void;
  onBetCancelled: (betId: string) => void;
}

export function BetType({ 
  id,
  titulo, 
  descripcion, 
  opciones, 
  entrada, 
  premio_max, 
  monto_acumulado,
  estado = false,
  onBetConfirmed,
  onBetCancelled
}: BetTypeProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [confirmedOption, setConfirmedOption] = useState<string | null>(null)

  // TODO: Backend Integration Points:
  // 1. Subscribe to real-time updates for current entries
  // useEffect(() => {
  //   const socket = new WebSocket('wss://your-backend/bet-updates');
  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.betId === id) {
  //       // Update current entries
  //     }
  //   };
  //   return () => socket.close();
  // }, [id]);


  const handleBet = (option: string) => {
    if (!confirmedOption) {
      setSelectedOption(option)
    }
  }

  const confirmBet = () => {
    if (selectedOption) {
      setConfirmedOption(selectedOption)
      onBetConfirmed(id, selectedOption, entrada, premio_max)
    }
  }

  const cancelBet = () => {
    setConfirmedOption(null)
    setSelectedOption(null)
    onBetCancelled(id)
  }

  return (
    <Card className="w-full mb-8 border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-primary">{titulo}</CardTitle>
        <CardDescription>{descripcion}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Alert className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Importante</AlertTitle>
          <AlertDescription>
            En caso de juego suspendido, todos los potes serán reembolsados.
          </AlertDescription>
        </Alert>
        <VisualBucket 
          entryFee={entrada}
          maxPrize={premio_max}
          currentAmount={monto_acumulado}
          maxAmount={premio_max}
          isClosed={estado === 'cerrado'}

        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {opciones.map((opcion) => (
            <Button
              key={opcion.id} // Usar el ID único del objeto
              onClick={() => handleBet(opcion.id)} // Usar la propiedad "descripcion"
              variant={confirmedOption === opcion.descripcion ? "default" : (selectedOption === opcion.descripcion ? "secondary" : "outline")}
              className="w-full"
              disabled={estado === 'cerrado' || confirmedOption !== null}
            >
              {opcion.descripcion} {/* Mostrar la descripción de la opción */}
            </Button>
          ))}
        </div>

        {selectedOption && !confirmedOption && (
          <div className="mt-4">
            <Button onClick={confirmBet} className="w-full bg-primary hover:bg-primary/90">
              Confirmar Pote: {selectedOption}
            </Button>
          </div>)}
        {confirmedOption && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary/10">
                Cambiar Pote
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Estás seguro que quieres cambiar tu pote?</DialogTitle>
                <DialogDescription>
                  Tu pote actual es: {confirmedOption}
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {}}>Cancelar</Button>
                <Button onClick={cancelBet} className="bg-primary hover:bg-primary/90">Confirmar Cambio</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}

