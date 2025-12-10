"use client";

import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Code, 
  Target, 
  Bot, 
  StickyNote, 
  Award 
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Textual Course",
    description: "Learn through comprehensive text-based content designed for deep understanding"
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Coding Environment",
    description: "Practice with an integrated coding environment for hands-on experience"
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Practical Challenges",
    description: "Apply your knowledge with real-world challenges and exercises"
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI Instructor",
    description: "Get guidance and support from an AI-powered instructor"
  },
  {
    icon: <StickyNote className="w-6 h-6" />,
    title: "Take Notes",
    description: "Capture your thoughts and insights as you learn"
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Completion Certificate",
    description: "Earn a certificate upon completing the course"
  }
];

export default function CourseFeatures() {
  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Not your average course
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Built around a text-based interactive approach and packed with practical challenges, 
            this comprehensive course stands out with features that make it truly unique.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/20 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

