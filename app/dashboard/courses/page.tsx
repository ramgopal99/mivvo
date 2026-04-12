"use client";

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PaymentDialog } from '@/components/payment-dialog';
import { COURSE_LIST_PRICE_MULTIPLIER } from '@/config/site';

interface Course {
  id: string;
  courseId: string;
  displayName: string;
  description?: string;
  image?: string | null;
  price: number;
  modules: Array<{
    id: string;
    title: string;
    order: number;
  }>;
  showCodeEditor?: boolean;
  monacoLanguage?: string;
  codeDisplayName?: string;
  aiAssistantName?: string;
  aiAssistantDescription?: string;
  userProgress?: {
    completedItems: number;
    totalItems: number;
    progressPercentage: number;
    isEnrolled: boolean;
  };
}


export default function CoursePage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState<Course | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseSelect = (courseId: string) => {
    router.push(`/dashboard/courses/${courseId}`);
  };

  const handleEnrollCourse = async (course: Course) => {
    // Open payment dialog
    setSelectedCourseForPayment(course);
    setPaymentDialogOpen(true);
  };


  const handlePaymentInitiate = async (paymentData: { name: string; mobile: string; amount: string }) => {
    if (!selectedCourseForPayment) return;

    setIsProcessingPayment(true);
    try {
      const response = await fetch('/api/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: paymentData.name,
          mobile: paymentData.mobile,
          amount: paymentData.amount,
          paymentType: 'COURSE_PURCHASE',
          courseId: selectedCourseForPayment.courseId,
          courseName: selectedCourseForPayment.displayName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to PhonePe payment page
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl;
        } else {
          alert('Payment URL not received. Please try again.');
        }
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Failed to initiate payment. Please try again.');
    } finally {
      setIsProcessingPayment(false);
      setPaymentDialogOpen(false);
      setSelectedCourseForPayment(null);
    }
  };

  // Separate enrolled and non-enrolled courses
  const enrolledCourses = courses.filter(course => course.userProgress?.isEnrolled);
  const nonEnrolledCourses = courses.filter(course => !course.userProgress?.isEnrolled);
  const exploreCourses = nonEnrolledCourses.slice(0, 4); // Show only 4 courses in explore section

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Enrolled Courses Section */}
        {enrolledCourses.length > 0 && (
          <div className="mb-8 md:mb-12">
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Your Enrolled Courses
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Continue learning with your enrolled courses
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.courseId}
                  className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                  onClick={() => handleCourseSelect(course.courseId)}
                >
                  <CardHeader className="text-center pb-3 md:pb-4">
                    <div className="relative overflow-hidden rounded-lg h-24 md:h-32 bg-gradient-to-br from-primary/10 to-primary/5 mb-3 md:mb-4">
                      {course.image ? (
                        <Image
                          src={course.image}
                          alt={course.displayName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-primary/30" />
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl md:text-2xl capitalize">
                      {course.displayName}
                    </CardTitle>
                    <CardDescription className="text-sm md:text-base">
                      {course.showCodeEditor
                        ? `Learn ${course.displayName.toLowerCase()} programming with interactive coding exercises`
                        : `Learn ${course.displayName.toLowerCase()} with comprehensive exercises and practice questions`
                      }
                      {course.codeDisplayName && (
                        <span className="block text-xs md:text-sm text-muted-foreground mt-1">
                          Includes {course.codeDisplayName} code editor and {course.aiAssistantName || 'AI assistant'}
                        </span>
                      )}
                      <div className="mt-2 md:mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">Progress</span>
                          <span className="text-xs font-medium text-primary">
                            {course.userProgress?.progressPercentage || 0}%
                          </span>
                        </div>
                        <Progress value={course.userProgress?.progressPercentage || 0} className="h-1.5 md:h-2" />
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button
                      size="lg"
                      className="w-full cursor-pointer text-sm md:text-base h-auto py-3 px-4 whitespace-normal break-words leading-tight"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseSelect(course.courseId);
                      }}
                    >
                      <span className="block text-center">
                        Continue {course.displayName} Course
                      </span>
                    </Button>
                    {course.showCodeEditor && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        🖥️ Interactive coding • 🤖 AI assistant • 📚 {course.modules?.length || 0} modules
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Explore More Courses Section */}
        <div className="mb-8 md:mb-12">
          <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Explore Courses
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Discover new skills and expand your knowledge
              </p>
            </div>
            <Button
              size="lg"
              variant="outline"
              onClick={() => router.push('/courses')}
              className="px-4 md:px-6 py-2 cursor-pointer self-start sm:self-auto"
            >
              View All Courses
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreCourses.map((course) => (
              <Card
                key={course.courseId}
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50"
                onClick={() => handleCourseSelect(course.courseId)}
              >
                <CardHeader className="text-center pb-3 md:pb-4">
                  <div className="relative overflow-hidden rounded-lg h-24 md:h-32 bg-gradient-to-br from-primary/10 to-primary/5 mb-3 md:mb-4">
                    {course.image ? (
                      <Image
                        src={course.image}
                        alt={course.displayName}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 md:w-12 md:h-12 text-primary/30" />
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl md:text-2xl capitalize">
                    {course.displayName}
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base">
                    {course.showCodeEditor
                      ? `Learn ${course.displayName.toLowerCase()} programming with interactive coding exercises`
                      : `Learn ${course.displayName.toLowerCase()} with comprehensive exercises and practice questions`
                    }
                    {course.codeDisplayName && (
                      <span className="block text-xs md:text-sm text-muted-foreground mt-1">
                        Includes {course.codeDisplayName} code editor and {course.aiAssistantName || 'AI assistant'}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mb-3 md:mb-4">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {course.price > 0 && (
                        <span className="text-base md:text-lg text-muted-foreground line-through">
                          ₹{Math.round(course.price * COURSE_LIST_PRICE_MULTIPLIER)}
                        </span>
                      )}
                      <span className="text-xl md:text-2xl font-bold text-primary">
                        ₹{course.price}
                      </span>
                      <span className="text-xs text-muted-foreground">(you pay)</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 cursor-pointer text-sm md:text-base py-3 md:py-2 px-4 md:px-3 h-auto md:h-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/courses/${course.courseId}`);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      size="lg"
                      className="flex-1 cursor-pointer text-sm md:text-base py-3 md:py-2 px-4 md:px-3 h-auto md:h-10"
                      disabled={isProcessingPayment && selectedCourseForPayment?.courseId === course.courseId}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnrollCourse(course);
                      }}
                    >
                      {isProcessingPayment && selectedCourseForPayment?.courseId === course.courseId
                        ? 'Processing...'
                        : 'Buy Now'
                      }
                    </Button>
                  </div>
                  {course.showCodeEditor && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      🖥️ Interactive coding • 🤖 AI assistant • 📚 {course.modules?.length || 0} modules
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        title={`Enroll in ${selectedCourseForPayment?.displayName || 'Course'}`}
        description="Enter your details to proceed with course enrollment payment"
        amount={selectedCourseForPayment?.price?.toString() || '0'}
        onPaymentInitiate={handlePaymentInitiate}
        isProcessing={isProcessingPayment}
      />
    </div>
  );
}