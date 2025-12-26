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
      answer: `The course duration depends on your learning pace and prior experience. With ${stats.lessons} lessons across ${stats.sections} modules, most students complete it in 4-8 weeks when studying 2-3 hours per day.`
    },
    {
      question: "Do I need any prior programming experience?",
      answer: "While some basic programming knowledge is helpful, the course starts from fundamental concepts and builds up progressively. Even complete beginners can follow along with dedication."
    },
    {
      question: "What happens after I complete the course?",
      answer: "Upon completion, you'll have a solid foundation in the subject matter and practical skills. You can continue to the advanced courses or apply your knowledge to real-world projects."
    },
    {
      question: "Can I access the course on mobile devices?",
      answer: "Yes! The course is fully responsive and works seamlessly on mobile devices, tablets, and desktop computers."
    },
    {
      question: "Is there a certificate upon completion?",
      answer: "Yes, you'll receive a course completion certificate that you can add to your resume or LinkedIn profile to showcase your achievement."
    },
    {
      question: "What if I get stuck on an exercise?",
      answer: "Each exercise includes hints and detailed explanations. You can also access community forums or use the AI assistant for additional help."
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
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
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
