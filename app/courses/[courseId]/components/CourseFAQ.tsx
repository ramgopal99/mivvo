"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CourseStats } from './index';

interface CourseFAQProps {
  courseTitle: string;
  stats: CourseStats;
}

export default function CourseFAQ({ courseTitle, stats }: CourseFAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenItems(newOpen);
  };

  const faqs = [
    {
      question: `How long does it take to complete the ${courseTitle} course?`,
      answer: `The course duration depends on your learning pace and prior experience. With ${stats.lessons} lessons across ${stats.sections} modules, most students complete it within a few weeks when dedicating regular study time.`
    },
    {
      question: "Do I need any prior experience?",
      answer: "No prior experience is required. The course is designed for beginners and builds progressively from fundamental concepts to advanced topics."
    },
    {
      question: "What happens after I complete the course?",
      answer: "Upon completion, you'll receive a certificate and have mastered the skills taught in this course. You can apply your knowledge immediately or continue with advanced courses in our curriculum."
    },
    {
      question: "Can I access the course on mobile devices?",
      answer: "Yes! The course platform is fully responsive and works seamlessly on mobile devices, tablets, and desktop computers."
    },
    {
      question: "Is there a certificate upon completion?",
      answer: "Yes, you'll receive a course completion certificate that you can add to your resume, LinkedIn profile, or portfolio to showcase your achievement."
    },
    {
      question: "What if I get stuck on a topic?",
      answer: "Each lesson includes detailed explanations and examples. You can also revisit previous lessons or use our assistant for additional help."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know about the course
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openItems.has(index);

          return (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span className="font-medium text-foreground pr-4">
                  {faq.question}
                </span>
                <div className="flex-shrink-0">
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6">
                  <div className="border-t border-border pt-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
