import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VisualBucket } from './VisualBucket'
import { Check } from 'lucide-react'

interface BetBucket {
  id: string;
  entry: number;
  limit: number;
  currentAmount: number;
  isOpen: boolean;
}

interface BetOptionProps {
  option: string;
  buckets: BetBucket[];
  isSelected: boolean;
  onSelect: (option: string) => void;
}

export function BetOption({ option, buckets, isSelected, onSelect }: BetOptionProps) {
  const [selectedBucket, setSelectedBucket] = useState<string | null>(null)
  const [betAmount, setBetAmount] = useState<string>('')

  const handleBet = (bucketId: string) => {
    console.log(`Apuesta de $${betAmount} realizada en el bucket ${bucketId} para ${option}`)
    onSelect(option)
    setSelectedBucket(null)
    setBetAmount('')
  }

  const calculatePotentialWin = (bucket: BetBucket) => {
    const amount = parseFloat(betAmount) || 0
    const totalInBucket = bucket.currentAmount + amount
    return totalInBucket
  }

  return (
    <Card className={`w-full mb-8 ${isSelected ? 'border-green-500' : ''}`}>
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center">
          {option}
          {isSelected && <Check className="ml-2 text-green-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {buckets.map((bucket) => (
            <motion.div
              key={bucket.id}
              whileHover={{ scale: bucket.isOpen ? 1.05 : 1 }}
              className="space-y-4"
            >
              <VisualBucket {...bucket} />
              {bucket.isOpen && !isSelected && (
                selectedBucket === bucket.id ? (
                  <div className="space-y-2">
                    <Label htmlFor={`bet-amount-${bucket.id}`}>Monto de la apuesta:</Label>
                    <Input
                      id={`bet-amount-${bucket.id}`}
                      type="number"
                      min={bucket.entry}
                      max={bucket.limit - bucket.currentAmount}
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                    />
                    <p className="text-sm text-gray-600">
                      Ganancia potencial: ${calculatePotentialWin(bucket).toFixed(2)}
                    </p>
                    <Button onClick={() => handleBet(bucket.id)} className="w-full">
                      Confirmar Apuesta
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setSelectedBucket(bucket.id)} className="w-full">
                    Apostar
                  </Button>
                )
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

