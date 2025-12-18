"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, BookOpen, Target } from 'lucide-react';
import CalculatorTab from './aptitude/CalculatorTab';
import FormulasTab from './aptitude/FormulasTab';
import PracticeTab from './aptitude/PracticeTab';

const AptitudeRightPanel = () => {
  const [activeTab, setActiveTab] = useState('formulas');

  return (
    <div className="h-full bg-background flex flex-col">
      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-muted/30 rounded-lg border border-border/50 shadow-sm">
          <TabsTrigger
            value="formulas"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all duration-200 hover:bg-background/50"
          >
            <BookOpen className="w-5 h-5 text-green-600" />
            <span>Formulas</span>
          </TabsTrigger>
          <TabsTrigger
            value="calculator"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all duration-200 hover:bg-background/50"
          >
            <Calculator className="w-5 h-5 text-blue-600" />
            <span>Calculator</span>
          </TabsTrigger>
          <TabsTrigger
            value="practice"
            className="flex flex-col sm:flex-row items-center gap-2 py-3 px-4 text-xs sm:text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all duration-200 hover:bg-background/50"
          >
            <Target className="w-5 h-5 text-purple-600" />
            <span>Practice</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <div className="flex-1 overflow-hidden">
          <TabsContent value="formulas" className="h-full m-0">
            <FormulasTab />
          </TabsContent>

          <TabsContent value="calculator" className="h-full m-0">
            <CalculatorTab />
          </TabsContent>

          <TabsContent value="practice" className="h-full m-0">
            <PracticeTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};




export default AptitudeRightPanel;