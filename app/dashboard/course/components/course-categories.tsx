'use client';

import { useState } from 'react';
import { Course } from '../types';
import { CourseCard } from './course-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Grid3X3, BookOpen, Code, Database, Palette, Server, Briefcase } from 'lucide-react';

interface CourseCategoriesProps {
  courses: Course[];
}

type CategoryType = 'All' | 'Web Development' | 'Mobile Development' | 'Data Science' | 'Machine Learning' | 'Design' | 'DevOps' | 'Security' | 'Business';

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Web Development': Code,
  'Mobile Development': BookOpen,
  'Data Science': Database,
  'Machine Learning': Server,
  'Design': Palette,
  'DevOps': Server,
  'Security': Briefcase,
  'Business': Briefcase,
};

export function CourseCategories({ courses }: CourseCategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  // Get unique categories from courses
  const categories: CategoryType[] = [
    'All',
    ...Array.from(new Set(courses.flatMap(course => course.tags)))
      .filter(tag => ['Web Development', 'Mobile Development', 'Data Science', 'Machine Learning', 'Design', 'DevOps', 'Security', 'Business'].includes(tag))
  ] as CategoryType[];

  // Filter courses by selected category
  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter(course => course.tags.includes(selectedCategory));

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Web Development': 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
      'Mobile Development': 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
      'Data Science': 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
      'Machine Learning': 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
      'Design': 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
      'DevOps': 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200',
      'Security': 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
      'Business': 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
  };


  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Browse by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category] || BookOpen;
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : getCategoryColor(category)
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category}
                {category !== 'All' && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {courses.filter(course => course.tags.includes(category)).length}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold">
            {selectedCategory === 'All' ? 'All Courses' : selectedCategory}
          </h4>
          <p className="text-muted-foreground">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Grid3X3 className="w-4 h-4" />
          Grid View
        </Badge>
      </div>

      {/* Course Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No courses found in {selectedCategory}
          </h3>
          <p className="text-muted-foreground">
            Try selecting a different category or check back later for new courses.
          </p>
        </div>
      )}
    </div>
  );
}
