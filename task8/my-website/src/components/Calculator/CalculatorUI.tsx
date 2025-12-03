import React, { useState } from 'react';
import { add, subtract, multiply, divide } from '../../utils/calculator.js';
import styles from './CalculatorUI.module.css';

const CalculatorUI: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const handleNumberClick = (num: string) => {
    if (input === '0' && num !== '.') {
      setInput(num);
    } else {
      setInput(prev => prev + num);
    }
    setResult(null); // Clear result when new input starts
  };

  const handleOperationClick = (op: string) => {
    if (previousInput && currentOperation && input) {
      // If there's a pending operation, calculate intermediate result
      const calculated = performCalculation(
        parseFloat(previousInput),
        parseFloat(input),
        currentOperation
      );
      setPreviousInput(calculated.toString());
      setResult(calculated.toString());
    } else if (input) {
      setPreviousInput(input);
    }
    setCurrentOperation(op);
    setInput('0'); // Reset input for next number
  };

  const handleEqualsClick = () => {
    if (previousInput && currentOperation && input) {
      const calculated = performCalculation(
        parseFloat(previousInput),
        parseFloat(input),
        currentOperation
      );
      setResult(calculated.toString());
      setInput(calculated.toString()); // Set input to result for further operations
      setPreviousInput(null);
      setCurrentOperation(null);
    }
  };

  const handleClearClick = () => {
    setInput('0');
    setCurrentOperation(null);
    setPreviousInput(null);
    setResult(null);
  };

  const performCalculation = (num1: number, num2: number, op: string) => {
    try {
      switch (op) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return 0;
      }
    } catch (error) {
      return 'Error'; // Handle division by zero or other errors
    }
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.display}>
        <div className={styles.previousOperation}>{previousInput} {currentOperation}</div>
        <div className={styles.currentInput}>{result || input}</div>
      </div>
      <div className={styles.buttons}>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperationClick('/')} className={styles.operator}>÷</button>

        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperationClick('*')} className={styles.operator}>×</button>

        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleOperationClick('-')} className={styles.operator}>-</button>

        <button onClick={handleClearClick} className={styles.clear}>C</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={() => handleNumberClick('.')} className={styles.decimal}>.</button>
        <button onClick={() => handleOperationClick('+')} className={styles.operator}>+</button>

        <button onClick={handleEqualsClick} className={`${styles.equals} ${styles.spanTwo}`}>=</button>
      </div>
    </div>
  );
};

export default CalculatorUI;
