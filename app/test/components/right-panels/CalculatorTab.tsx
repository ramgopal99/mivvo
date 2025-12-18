"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Divide, Plus, Minus, X, Zap, Calculator } from 'lucide-react';

const CalculatorTab = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(`${parseFloat(newValue.toFixed(7))}`);
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const expression = `${previousValue} ${operation} ${inputValue}`;
      const newValue = calculate(previousValue, inputValue, operation);
      const result = parseFloat(newValue.toFixed(7));
      setDisplay(result.toString());
      addToHistory(expression, result.toString());
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    clear();
    setHistory([]);
  };


  const addToHistory = (expression: string, result: string) => {
    const newEntry = `${expression} = ${result}`;
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]); // Keep last 10 entries
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  return (
    <div className="h-full flex flex-col p-4 space-y-4 overflow-y-auto">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-600" />
            Professional Calculator
          </CardTitle>
          <p className="text-sm text-muted-foreground">Advanced calculator with calculation history</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-muted/50 p-4 rounded-lg border shadow-inner">
            <div className="text-right text-4xl font-mono min-h-[4rem] flex items-center justify-end font-bold text-foreground overflow-x-auto">
              {display}
            </div>
            {operation && previousValue !== null && (
              <div className="text-right text-sm text-muted-foreground mt-1">
                {previousValue} {operation}
              </div>
            )}
          </div>

          {/* Main Keypad */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1: AC, C, ÷, × */}
            <Button
              onClick={clearAll}
              variant="destructive"
              className="h-14 text-base font-semibold"
              title="Clear All"
            >
              AC
            </Button>
            <Button
              onClick={clear}
              variant="secondary"
              className="h-14 text-base font-semibold"
              title="Clear"
            >
              C
            </Button>
            <Button
              onClick={() => inputOperation('÷')}
              variant="secondary"
              className="h-14 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              title="Divide"
            >
              <Divide className="w-6 h-6" />
            </Button>
            <Button
              onClick={() => inputOperation('×')}
              variant="secondary"
              className="h-14 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              title="Multiply"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Row 2: 7, 8, 9, - */}
            <Button onClick={() => inputNumber('7')} variant="outline" className="h-14 text-xl font-semibold" title="7">7</Button>
            <Button onClick={() => inputNumber('8')} variant="outline" className="h-14 text-xl font-semibold" title="8">8</Button>
            <Button onClick={() => inputNumber('9')} variant="outline" className="h-14 text-xl font-semibold" title="9">9</Button>
            <Button
              onClick={() => inputOperation('-')}
              variant="secondary"
              className="h-14 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              title="Subtract"
            >
              <Minus className="w-6 h-6" />
            </Button>

            {/* Row 3: 4, 5, 6, + */}
            <Button onClick={() => inputNumber('4')} variant="outline" className="h-14 text-xl font-semibold" title="4">4</Button>
            <Button onClick={() => inputNumber('5')} variant="outline" className="h-14 text-xl font-semibold" title="5">5</Button>
            <Button onClick={() => inputNumber('6')} variant="outline" className="h-14 text-xl font-semibold" title="6">6</Button>
            <Button
              onClick={() => inputOperation('+')}
              variant="secondary"
              className="h-14 text-base font-semibold bg-orange-500 hover:bg-orange-600 text-white"
              title="Add"
            >
              <Plus className="w-6 h-6" />
            </Button>

            {/* Row 4: 1, 2, 3, = */}
            <Button onClick={() => inputNumber('1')} variant="outline" className="h-14 text-xl font-semibold" title="1">1</Button>
            <Button onClick={() => inputNumber('2')} variant="outline" className="h-14 text-xl font-semibold" title="2">2</Button>
            <Button onClick={() => inputNumber('3')} variant="outline" className="h-14 text-xl font-semibold" title="3">3</Button>
            <Button
              onClick={performCalculation}
              className="h-14 text-base font-semibold bg-green-600 hover:bg-green-700 text-white row-span-2"
              title="Equals"
            >
              <Zap className="w-6 h-6" />
            </Button>

            {/* Row 5: 0 (span 2), . */}
            <Button onClick={() => inputNumber('0')} variant="outline" className="col-span-2 h-14 text-xl font-semibold" title="0">0</Button>
            <Button onClick={inputDecimal} variant="outline" className="h-14 text-xl font-semibold" title="Decimal">.</Button>
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Recent Calculations</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {history.map((entry, index) => (
                  <div key={index} className="text-xs font-mono bg-muted/30 p-2 rounded text-muted-foreground">
                    {entry}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculatorTab;