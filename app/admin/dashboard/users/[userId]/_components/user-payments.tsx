import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserPayment {
  description: string
  amount: number
  date: string
}

interface UserPaymentsProps {
  payments: UserPayment[]
  totalIncome: number
}

export function UserPayments({ payments, totalIncome }: UserPaymentsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payment History</CardTitle>
        <CardDescription>
          Payment transactions made by this user
        </CardDescription>
      </CardHeader>
      <CardContent>
        {payments && payments.length > 0 ? (
          <div className="space-y-2">
            {payments.map((payment, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-gray-500">Date: {new Date(payment.date).toLocaleDateString()}</p>
                </div>
                <Badge variant="outline">₹{payment.amount}</Badge>
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center font-medium">
                <span>Total Income from User:</span>
                <span className="text-lg">₹{totalIncome || 0}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No payment history</p>
        )}
      </CardContent>
    </Card>
  )
}
