"use client";

export default function CourseFeatures() {
  const features = [
    {
      title: "Interactive Learning",
      description: "Engage with hands-on exercises and real-time feedback",
      icon: "🎯"
    },
    {
      title: "Progressive Unlocking",
      description: "Master concepts step-by-step with our structured approach",
      icon: "🔓"
    },
    {
      title: "Comprehensive Content",
      description: "From basics to advanced topics, learn everything you need",
      icon: "📚"
    },
    {
      title: "Practice Exercises",
      description: "Reinforce learning with MCQs and coding challenges",
      icon: "💻"
    }
  ];

  return (
    <div className="bg-muted/30 border-y border-border">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose This Course?
          </h2>
          <p className="text-muted-foreground">
            Designed for effective learning with modern teaching methodologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
