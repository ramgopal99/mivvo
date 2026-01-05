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

interface ReferralsListProps {
  referrals: ReferralData[]
}

const ITEMS_PER_PAGE = 10

export function ReferralsList({ referrals }: ReferralsListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(referrals.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentReferrals = referrals.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Referral History</CardTitle>
        <CardDescription>
          Users who clicked your referral link ({referrals.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {referrals.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No referrals yet. Share your link to start earning!
          </p>
        ) : (
          <div className="space-y-4">
            {currentReferrals.map((referral, index) => {
              const referralAge = Date.now() - new Date(referral.createdAt).getTime()
              const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000
              const isActive = referralAge <= thirtyDaysMs
              const daysLeft = Math.max(0, Math.ceil((thirtyDaysMs - referralAge) / (24 * 60 * 60 * 1000)))

              const userNumber = startIndex + index + 1

              return (
                <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        Referred User {userNumber}
                      </Badge>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {referral.referralCode}
                      </code>
                      <Badge variant={isActive ? "default" : "secondary"}>
                        {isActive ? `Active (${daysLeft}d left)` : 'Expired'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {referral.sourceUrl || 'Direct link'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(referral.createdAt).toLocaleDateString()}
                      {referral.commissions.length > 0 && (
                        <span className="ml-2">
                          • Last commission: {new Date(referral.commissions[0].createdAt).toLocaleDateString()}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      ₹{referral.commissions.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {referral.commissions.length} commission{referral.commissions.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, referrals.length)} of {referrals.length} referrals
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
