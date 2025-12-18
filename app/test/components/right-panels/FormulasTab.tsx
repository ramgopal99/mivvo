"use client";

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, BookOpen, Calculator } from 'lucide-react';
import { getFormulasForModule, hasSpecificFormulas } from '../../loaders/aptitudeModuleLoader';
import { Formula } from '../../modules/aptitude/module2/formulas';

// Generate dynamic description based on formula categories
const getModuleDescription = (moduleId: number, formulas: Formula[]) => {
  if (!hasSpecificFormulas(moduleId)) {
    return `General aptitude formulas - Showing comprehensive collection for Module ${moduleId}`;
  }

  // Extract unique categories from the formulas
  const categories = [...new Set(formulas.map(f => f.category))];

  // Create a readable description from categories
  const categoryDescriptions: Record<string, string> = {
    'mixed-fractions': 'Mixed fractions',
    'sign-rules': 'Sign rules',
    'approximation': 'Approximation techniques',
    'algebra': 'Algebra',
    'geometry': 'Geometry',
    'statistics': 'Statistics',
    'percentage': 'Percentages',
    'interest': 'Interest calculations',
    'number-classification': 'Number classification',
    'number-theory': 'Number theory',
    'combinatorics': 'Combinatorics',
    'computer-science': 'Computer science',
    'analysis': 'Analysis',
    'order-of-operations': 'Order of operations',
    'fractions': 'Fractions',
    'decimals': 'Decimals',
    'powers-exponents': 'Powers and exponents',
    'roots': 'Roots',
    'surds': 'Surds',
    'indices': 'Indices',
    'identities': 'Algebraic identities'
  };

  const readableCategories = categories
    .map(cat => categoryDescriptions[cat] || cat.replace(/-/g, ' '))
    .join(', ');

  return `Formulas specific to Module ${moduleId} - ${readableCategories}`;
};

interface FormulasTabProps {
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
}

const FormulasTab = ({ selectedTopic }: FormulasTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Determine which formulas to show based on current module
  const formulas: Formula[] = useMemo(() => {
    if (selectedTopic) {
      return getFormulasForModule(selectedTopic.moduleId);
    }
    // Default fallback - use module 2 formulas
    return getFormulasForModule(2);
  }, [selectedTopic]);

  const currentModule = selectedTopic?.moduleId || 1;
  const hasModuleSpecificFormulas = hasSpecificFormulas(currentModule);
  const moduleDescription = getModuleDescription(currentModule, formulas);

  const filteredFormulas = formulas.filter((formula: Formula) => {
    const matchesSearch = formula.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formula.formula.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formula.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
                {filteredFormulas.map((formula: Formula, index: number) => (
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