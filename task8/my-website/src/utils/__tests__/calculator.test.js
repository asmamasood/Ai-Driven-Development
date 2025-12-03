import assert from 'assert';

import { add, subtract, multiply, divide } from '../calculator.js';

const calculator = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
};


describe('Calculator', () => {
    describe('Addition', () => {
        it('should return the sum of two positive numbers', () => {
            assert.strictEqual(calculator.add(10, 5), 15);
        });

        it('should return the sum of a negative and a positive number', () => {
            assert.strictEqual(calculator.add(-3, 7), 4);
        });

        it('should return the sum of two floating-point numbers', () => {
            assert.strictEqual(calculator.add(0.5, 0.2), 0.7);
        });

        it('should handle addition with zero', () => {
            assert.strictEqual(calculator.add(10, 0), 10);
            assert.strictEqual(calculator.add(0, 5), 5);
        });
    });

    describe('Subtraction', () => {
        it('should return the difference of two positive numbers', () => {
            assert.strictEqual(calculator.subtract(10, 5), 5);
        });

        it('should return a negative difference when subtracting a larger number', () => {
            assert.strictEqual(calculator.subtract(5, 10), -5);
        });

        it('should return the difference of two negative numbers', () => {
            assert.strictEqual(calculator.subtract(-8, -3), -5);
        });

        it('should handle subtraction with zero', () => {
            assert.strictEqual(calculator.subtract(10, 0), 10);
            assert.strictEqual(calculator.subtract(0, 5), -5);
        });
    });

    describe('Multiplication', () => {
        it('should return the product of two positive numbers', () => {
            assert.strictEqual(calculator.multiply(6, 4), 24);
        });

        it('should return a negative product when multiplying by a negative number', () => {
            assert.strictEqual(calculator.multiply(-2, 5), -10);
        });

        it('should return the product of floating-point numbers', () => {
            assert.strictEqual(calculator.multiply(1.5, 2), 3.0);
        });

        it('should handle multiplication by zero', () => {
            assert.strictEqual(calculator.multiply(10, 0), 0);
            assert.strictEqual(calculator.multiply(0, 5), 0);
        });
    });

    describe('Division', () => {
        it('should return the quotient of two positive numbers', () => {
            assert.strictEqual(calculator.divide(10, 2), 5);
        });

        it('should return a floating-point quotient', () => {
            assert.strictEqual(calculator.divide(7, 2), 3.5);
        });

        it('should return a negative quotient', () => {
            assert.strictEqual(calculator.divide(-9, 3), -3);
        });

        it('should throw an error when dividing by zero', () => {
            assert.throws(() => calculator.divide(10, 0), { message: 'Division by zero is not allowed.' });
        });
    });
});
