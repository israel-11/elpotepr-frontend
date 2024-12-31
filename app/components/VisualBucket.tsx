import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

interface VisualBucketProps {
  entryFee: number
  maxPrize: number
  currentAmount: number
  maxAmount: number
  isClosed: boolean
}

export function VisualBucket({ entryFee, maxPrize, currentAmount, maxAmount, isClosed }: VisualBucketProps) {
  const percentage = (currentAmount / maxAmount) * 100

  return (
    <Card className={`w-full ${isClosed ? 'bg-gray-100' : 'bg-white'}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-primary">Entrada: ${entryFee}</h3>
          <p className="text-lg font-bold text-primary">Premio máximo: ${maxPrize}</p>
        </div>
        <div className="relative h-16 bg-secondary/30 rounded-lg overflow-hidden">
          <motion.div
            className={`absolute bottom-0 left-0 right-0 ${isClosed ? 'bg-gray-400' : 'bg-primary'}`}
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-0 left-0 right-0 h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-lg font-bold text-white drop-shadow-lg">
              ${maxAmount}
            </span>
          </motion.div>
        </div>
        {isClosed && (
          <p className="text-center text-red-500 font-bold mt-2">CERRADO</p>
        )}
      </CardContent>
    </Card>
  )
}

