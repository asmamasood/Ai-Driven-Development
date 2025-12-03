import assert from 'assert';
import sinon from 'sinon';
import { runCalculatorCLI } from './cli.js';
import readline from 'readline';

describe('Calculator CLI (runCalculatorCLI)', () => {
    let stubQuestion;
    let stubConsoleLog;
    let stubConsoleError;
    let stubRlClose;

    beforeEach(() => {
        stubQuestion = sinon.stub(readline.Interface.prototype, 'question');
        stubConsoleLog = sinon.stub(console, 'log');
        stubConsoleError = sinon.stub(console, 'error');
        stubRlClose = sinon.stub(readline.Interface.prototype, 'close');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should correctly calculate and display result for valid inputs (addition)', async () => {
        stubQuestion.onFirstCall().callsArgWith(1, '10'); // First number
        stubQuestion.onSecondCall().callsArgWith(1, '5'); // Second number
        stubQuestion.onThirdCall().callsArgWith(1, '+'); // Operation

        await runCalculatorCLI();

        assert.ok(stubConsoleLog.calledWith('Result: 10 + 5 = 15'));
    });

    it('should display an error for invalid first number input', async () => {
        stubQuestion.onFirstCall().callsArgWith(1, 'abc'); // Invalid first number

        await runCalculatorCLI();

        assert.ok(stubConsoleLog.calledWith('Invalid input. Please enter a valid number.'));
    });

    it('should display an error for invalid second number input', async () => {
        stubQuestion.onFirstCall().callsArgWith(1, '10'); // First number
        stubQuestion.onSecondCall().callsArgWith(1, 'xyz'); // Invalid second number

        await runCalculatorCLI();

        assert.ok(stubConsoleLog.calledWith('Invalid input. Please enter a valid number.'));
    });

    it('should display an error for invalid operation input', async () => {
        stubQuestion.onFirstCall().callsArgWith(1, '10'); // First number
        stubQuestion.onSecondCall().callsArgWith(1, '5'); // Second number
        stubQuestion.onThirdCall().callsArgWith(1, 'x'); // Invalid operation

        await runCalculatorCLI();

        assert.ok(stubConsoleLog.calledWith('Invalid operation. Please choose from +, -, *, /.'));
    });

    it('should display an error for division by zero', async () => {
        stubQuestion.onFirstCall().callsArgWith(1, '10'); // First number
        stubQuestion.onSecondCall().callsArgWith(1, '0'); // Second number
        stubQuestion.onThirdCall().callsArgWith(1, '/'); // Operation

        await runCalculatorCLI();

        assert.ok(stubConsoleError.calledWith('Division by zero is not allowed.'));
    });
});
