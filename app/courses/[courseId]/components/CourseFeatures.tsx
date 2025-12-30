"use client";

export default function CourseFeatures() {
  const features = [
    {
      title: "Interactive Learning",
      description: "Engage with hands-on exercises and real-time feedback throughout your learning journey",
      icon: "🎯"
    },
    {
      title: "Structured Learning Path",
      description: "Follow a carefully designed curriculum that builds skills progressively from beginner to advanced",
      icon: "📈"
    },
    {
      title: "Comprehensive Curriculum",
      description: "Complete coverage of essential topics with practical applications and real-world examples",
      icon: "📚"
    },
    {
      title: "Practice & Assessment",
      description: "Reinforce your understanding with quizzes, assignments, and practical exercises",
      icon: "✨"
    },
    {
      title: "Lifetime Access",
      description: "Learn at your own pace with unlimited access to course materials and future updates",
      icon: "🔄"
    },
    {
      title: "AI Assistant Support",
      description: "Get instant help from our AI assistant when you need assistance with challenging topics",
      icon: "🤖"
    }
  ];

  return (
    <div className="bg-muted/30 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose Our Courses?
          </h2>
          <p className="text-muted-foreground">
            Comprehensive learning experience designed to accelerate your growth and career development
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-card border border-border hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
