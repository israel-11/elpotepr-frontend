import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BetsSummaryProps {
  betsCount: number;
  totalAmount: number;
  balance: number;
  onViewBetsClick: () => void;
}

export function BetsSummary({ betsCount, totalAmount, onViewBetsClick, balance }: BetsSummaryProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsVisible(scrollPosition > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 0.5, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <p className="text-sm font-medium mb-2">Resumen de Potes</p>
              <p className="text-xs mb-1">Mi Balance: {balance}</p>
              <p className="text-xs mb-1">Potes activos: {betsCount}</p>
              <p className="text-xs mb-2">Total: ${totalAmount}</p>
              <Button size="sm" onClick={onViewBetsClick} className="bg-white text-primary hover:bg-white/90">Ver Mis Potes</Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

