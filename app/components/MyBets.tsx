import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle } from 'lucide-react'

interface Bet {
  id: string;
  title: string;
  option: string;
  amount: number;
  maxPrize: number;
  status: 'pending' | 'won' | 'lost';
}

interface MyBetsProps {
  bets: Bet[];
}

export function MyBets({ bets }: MyBetsProps) {
  if (bets.length === 0) {
    return (
      <Card className="w-full mb-8 border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-primary">Mis Potes</CardTitle>
          <CardDescription>Monitorea tus potes y resultados aquí</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="w-12 h-12 text-secondary mb-4" />
          <p className="text-lg font-medium text-primary">Aún no tienes potes activos</p>
          <p className="text-sm text-muted-foreground">Pon en algún pote para verlo aquí</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full mb-8 border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-primary">Mis Potes</CardTitle>
        <CardDescription>Monitorea tus potes y resultados aquí</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pote</TableHead>
              <TableHead>Opción</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Premio Máximo</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bets.map((bet) => (
              <TableRow key={bet.id}>
                <TableCell>{bet.title}</TableCell>
                <TableCell>{bet.option}</TableCell>
                <TableCell>${bet.amount}</TableCell>
                <TableCell>${bet.maxPrize}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${bet.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      bet.status === 'won' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'}`}>
                    {bet.status === 'pending' ? 'Pendiente' :
                     bet.status === 'won' ? 'Ganado' : 'Perdido'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

