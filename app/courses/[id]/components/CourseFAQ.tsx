"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronRight, HelpCircle, Target, CheckCircle2 } from 'lucide-react';
import { CourseStats } from './types';

interface FAQItem {
  question: string;
  answer: string;
}

interface CourseFAQProps {
  courseTitle: string;
  stats: CourseStats;
}

export default function CourseFAQ({ stats }: CourseFAQProps) {
  const faqs: FAQItem[] = [
    {
      question: "What skills will I gain from this course?",
      answer: "You'll gain both theoretical knowledge and practical skills. This includes understanding core concepts, applying best practices, working with real-world scenarios, and developing problem-solving abilities. The course includes interactive lessons and exercises to reinforce your learning."
    },
    {
      question: "How will this course help my career?",
      answer: "This course will enhance your professional profile by adding valuable skills to your resume. You'll be able to showcase completed projects, demonstrate your expertise through practical exercises, and gain the confidence to take on more challenging roles. The knowledge gained will make you more competitive in your field."
    },
    {
      question: "What projects or outcomes can I expect?",
      answer: "By the end of this course, you'll have completed multiple hands-on exercises, quizzes, and practical assignments. You'll have a portfolio of work that demonstrates your understanding and application of the concepts covered. These can serve as evidence of your skills for employers or clients."
    },
    {
      question: "Is this course suitable for beginners?",
      answer: "Yes, this course is designed to take you from the basics to advanced concepts. The structured modules start with fundamental concepts and gradually build up to more complex topics, making it suitable for learners at various levels."
    },
    {
      question: "How long will it take to complete the course?",
      answer: `The course is self-paced, allowing you to learn at your own speed. With ${stats.sections} sections and ${stats.lessons} lessons, you can complete it based on your schedule. The course is designed for thorough learning, so take the time you need to fully understand each concept.`
    }
  ];

  const achievements = [
    "Comprehensive understanding of core concepts and principles",
    "Practical skills that you can apply immediately in real-world scenarios",
    "Confidence to tackle complex challenges and solve problems effectively",
    "Ability to build projects and demonstrate your expertise",
    "Portfolio of completed exercises and assignments",
    "Enhanced professional profile with valuable skills for your resume",
    "Problem-solving abilities through hands-on practice",
    "Knowledge that makes you more competitive in your field"
  ];

  const [expandedFAQs, setExpandedFAQs] = useState<Set<number>>(new Set());

  const toggleFAQ = (index: number) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedFAQs(newExpanded);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - FAQ */}
          <div>
            <div className="space-y-2">
              {faqs.map((faq, index) => {
                const isExpanded = expandedFAQs.has(index);
                
                return (
                  <Card key={index} className="border-2 hover:border-primary/20 transition-colors">
                    <CardContent className="p-0">
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1 text-left">
                          <span className="font-semibold text-sm">{faq.question}</span>
                        </div>
                        <div className="flex-shrink-0 ml-4">
                          {isExpanded ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 border-t bg-muted/30">
                          <p className="pt-4 text-muted-foreground leading-relaxed text-sm">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Side - What You Achieve */}
          <div>
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">What You Achieve From This Course</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  By completing this course, you will gain:
                </p>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

