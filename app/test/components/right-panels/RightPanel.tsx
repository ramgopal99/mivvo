"use client";

import { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, BookOpen, Code } from 'lucide-react';
import CalculatorTab from './CalculatorTab';
import FormulasTab from './FormulasTab';
import CodingTab from './CodingTab';
import { getModulesWithFormulas, getFormulaModuleConfig } from '../../loaders/aptitudeModuleLoader';
import { COURSES } from '../../config/courses/registry';

// Formula availability checker - uses new dynamic formula configuration
const hasSpecificFormulas = (moduleId: number) => {
  return getFormulaModuleConfig(moduleId) !== undefined;
};

interface RightPanelProps {
  language?: string;
  selectedTopic?: { moduleId: number; subtopicId: string; title: string; moduleTitle: string } | null;
}

const RightPanel = ({ language = 'python', selectedTopic }: RightPanelProps) => {
  const course = COURSES[language] || COURSES.python;
  const currentModule = selectedTopic?.moduleId || 1;
  const moduleHasFormulas = hasSpecificFormulas(currentModule);
  const isAptitude = language === 'aptitude';
  const showCodeEditor = course.showCodeEditor;

  // Determine available tabs based on course configuration
  const availableTabs = useMemo(() => {
    const tabs = [];

    // Add coding tab if course supports code editor
    if (showCodeEditor) {
      tabs.push({ id: 'code', label: 'Code', icon: Code, color: 'text-blue-600' });
    }

    // For aptitude courses, only show tabs if module has formulas
    if (isAptitude && moduleHasFormulas) {
      // Add formulas tab
      tabs.unshift({ id: 'formulas', label: 'Formulas', icon: BookOpen, color: 'text-green-600' });

      // Add calculator tab for modules with formulas
      tabs.push({ id: 'calculator', label: 'Calculator', icon: Calculator, color: 'text-blue-600' });
    }

    return tabs;
  }, [showCodeEditor, isAptitude, moduleHasFormulas]);

  // Set initial active tab
  const getInitialTab = () => {
    if (showCodeEditor) return 'code';
    if (isAptitude && moduleHasFormulas) {
      return 'formulas';
    }
    return 'code'; // fallback
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Update active tab when configuration changes
  useEffect(() => {
    const newInitialTab = getInitialTab();
    if (!availableTabs.find(tab => tab.id === activeTab)) {
      setActiveTab(newInitialTab);
    }
  }, [availableTabs, activeTab]);

  // If no tabs available, show placeholder
  if (availableTabs.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Tools Available</h3>
          <p className="text-muted-foreground text-sm">
            {isAptitude && !moduleHasFormulas
              ? `Module ${currentModule} doesn't have formulas available. Switch to a different module to view formulas and tools.`
              : "This course doesn't have any interactive tools available."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className={`grid w-full h-auto p-1 bg-muted/30 rounded-lg border border-border/50 shadow-sm ${
          availableTabs.length === 1 ? 'grid-cols-1' :
          availableTabs.length === 2 ? 'grid-cols-2' :
          availableTabs.length === 3 ? 'grid-cols-3' : 'grid-cols-4'
        }`}>
          {availableTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex flex-col sm:flex-row items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all duration-200 hover:bg-background/50"
              >
                <IconComponent className={`w-5 h-5 ${tab.color}`} />
                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          {/* Coding Tab */}
          {showCodeEditor && (
            <TabsContent value="code" className="h-full m-0">
              <CodingTab language={language} />
            </TabsContent>
          )}

          {/* Aptitude Tabs */}
          {isAptitude && moduleHasFormulas && (
            <TabsContent value="formulas" className="h-full m-0">
              <FormulasTab selectedTopic={selectedTopic} />
            </TabsContent>
          )}

          {isAptitude && (
            <TabsContent value="calculator" className="h-full m-0">
              <CalculatorTab />
            </TabsContent>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default RightPanel;