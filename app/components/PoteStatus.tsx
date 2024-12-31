import { Check, Lock } from 'lucide-react'

interface PoteStatusProps {
  isOpen: boolean
}

export function PoteStatus({ isOpen }: PoteStatusProps) {
  return (
    <div className={`inline-flex items-center px-2 py-1 rounded-full ${isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {isOpen ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Abierto</span>
        </>
      ) : (
        <>
          <Lock className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">Cerrado</span>
        </>
      )}
    </div>
  )
}

