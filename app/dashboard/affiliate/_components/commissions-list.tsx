import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ReferralData {
  id: string
  referralCode: string
  sourceUrl: string
  convertedAt: string | null
  createdAt: string
  commissions: {
    id: string
    amount: number
    status: string
    courseTitle: string
    createdAt: string
  }[]
}

interface CommissionsListProps {
  referrals: ReferralData[]
}

const ITEMS_PER_PAGE = 10

export function CommissionsList({ referrals }: CommissionsListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Create a mapping of referral IDs to user numbers for consistent numbering
  const referralToUserMap = new Map<string, number>()
  referrals.forEach((referral, index) => {
    referralToUserMap.set(referral.id, index + 1)
  })

  // Flatten all commissions from all referrals
  const allCommissions = referrals.flatMap(referral =>
    referral.commissions.map(commission => ({
      ...commission,
      referralCode: referral.referralCode,
      referralId: referral.id,
      userNumber: referralToUserMap.get(referral.id) || 0,
    }))
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const totalPages = Math.ceil(allCommissions.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCommissions = allCommissions.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commission History</CardTitle>
        <CardDescription>
          Your earnings from referrals ({allCommissions.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {allCommissions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No commissions yet. Commissions are earned when referred users make purchases.
          </p>
        ) : (
          <div className="space-y-4">
            {currentCommissions.map((commission) => (
              <div key={commission.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="font-medium">{commission.courseTitle || 'Course Purchase'}</div>
                  <p className="text-sm text-muted-foreground">
                    Referred User {commission.userNumber} • Referral: {commission.referralCode}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(commission.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    ₹{commission.amount.toFixed(2)}
                  </div>
                  <Badge
                    variant={
                      commission.status === 'PAID' ? 'default' :
                      commission.status === 'PENDING' ? 'secondary' : 'destructive'
                    }
                  >
                    {commission.status}
                  </Badge>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, allCommissions.length)} of {allCommissions.length} commissions
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="w-8 h-8 p-0 cursor-pointer"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
