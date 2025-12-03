import readline from 'readline';
import { add, subtract, multiply, divide } from './my-website/src/utils/calculator.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function runCalculatorCLI() {
    try {
        const num1Str = await askQuestion("Enter the first number: ");
        const num1 = parseFloat(num1Str);

        if (isNaN(num1)) {
            console.log("Invalid input. Please enter a valid number.");
            rl.close();
            return;
        }

        const num2Str = await askQuestion("Enter the second number: ");
        const num2 = parseFloat(num2Str);

        if (isNaN(num2)) {
            console.log("Invalid input. Please enter a valid number.");
            rl.close();
            return;
        }

        const operation = await askQuestion("Choose an operation (+, -, *, /): ");

        let result;
        switch (operation) {
            case '+':
                result = add(num1, num2);
                break;
            case '-':
                result = subtract(num1, num2);
                break;
            case '*':
                result = multiply(num1, num2);
                break;
            case '/':
                result = divide(num1, num2);
                break;
            default:
                console.log("Invalid operation. Please choose from +, -, *, /.");
                rl.close();
                return;
        }

        console.log(`Result: ${num1} ${operation} ${num2} = ${result}`);

    } catch (error) {
        console.error(error.message);
    } finally {
        rl.close();
    }
}

// Only run the calculator if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runCalculatorCLI();
}

export { runCalculatorCLI };
