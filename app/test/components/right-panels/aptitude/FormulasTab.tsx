"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import formulas from '../../../modules/aptitude/module1/formulas';

const FormulasTab = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFormulas = formulas.filter((formula) => {
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
            <Search className="w-5 h-5 text-green-600" />
            Formula Library
          </CardTitle>
          <p className="text-sm text-muted-foreground">Comprehensive collection of mathematical and aptitude formulas</p>
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
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFormulas.map((formula, index) => (
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
              Showing {filteredFormulas.length} of {formulas.length} formulas
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FormulasTab;