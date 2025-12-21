"use client";

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, Calculator, Loader2 } from 'lucide-react';

// Database-compatible formula interface
interface CourseFormula {
  id: string;
  formulaId: string;
  category: string;
  name: string;
  formula: string;
  description: string;
  variables?: Array<{
    symbol: string;
    description: string;
  }>;
  order: number;
}

// Generate dynamic description based on formula categories
const getModuleDescription = (moduleId: number, formulas: CourseFormula[]) => {
  if (formulas.length === 0) {
    return `No formulas available for Module ${moduleId}`;
  }

  // Extract unique categories from the formulas
  const categories = [...new Set(formulas.map(f => f.category))];

  // Convert categories to readable format
  const readableCategories = categories
    .map(cat => cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()))
    .join(', ');

  return `Formulas for Module ${moduleId} - ${readableCategories}`;
};

interface FormulasTabProps {
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
  courseId?: string;
}

const FormulasTab = ({ selectedTopic, courseId = 'python' }: FormulasTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formulas, setFormulas] = useState<CourseFormula[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch formulas from database
  useEffect(() => {
    const fetchFormulas = async () => {
      try {
        setLoading(true);
        const currentModule = selectedTopic?.moduleId || 1;

        // Fetch course data to get formulas for the current module
        const response = await fetch(`/api/courses/${courseId}`);
        if (response.ok) {
          const courseData = await response.json();
          const moduleData = courseData.modules?.find((m: { order: number; formulas?: CourseFormula[] }) => m.order === currentModule);
          const moduleFormulas = moduleData?.formulas || [];
          setFormulas(moduleFormulas);
        } else {
          setFormulas([]);
        }
      } catch (error) {
        console.error('Error fetching formulas:', error);
        setFormulas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFormulas();
  }, [selectedTopic, courseId]);

  const currentModule = selectedTopic?.moduleId || 1;
  const hasModuleSpecificFormulas = formulas.length > 0;
  const moduleDescription = getModuleDescription(currentModule, formulas);

  const filteredFormulas = formulas.filter((formula: CourseFormula) => {
    const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formula.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formula.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="h-full flex flex-col p-4 space-y-4 overflow-hidden">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading formulas...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-hidden">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            {hasModuleSpecificFormulas ? (
              <>
                <Calculator className="w-5 h-5 text-orange-600" />
                Module {currentModule} Formulas
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5 text-green-600" />
                General Formulas
              </>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {moduleDescription}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search formulas by name, formula, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Formulas List - Point Wise */}
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {filteredFormulas.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No formulas found</p>
                <p className="text-sm">
                  {searchTerm ? 'Try adjusting your search terms' : `No formulas available for Module ${currentModule}`}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFormulas.map((formula: CourseFormula, index: number) => (
                  <div key={formula.id} className="flex gap-3 p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-200">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-foreground text-sm">{formula.name}</h4>
                      <div className="bg-muted/50 p-3 rounded-md border font-mono text-sm font-bold text-center shadow-sm">
                        {formula.formula}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{formula.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Results Count */}
          {filteredFormulas.length > 0 && (
            <div className="text-center text-sm text-muted-foreground border-t pt-4">
              Showing {filteredFormulas.length} of {formulas.length} {hasModuleSpecificFormulas ? `Module ${currentModule}` : 'General'} formulas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulasTab;