# Simple Calculator

This is a simple command-line calculator built with Node.js, supporting basic arithmetic operations: addition, subtraction, multiplication, and division.

## Features

*   Performs addition, subtraction, multiplication, and division.
*   Handles invalid numeric input gracefully.
*   Handles invalid operation input gracefully.
*   Prevents division by zero.

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system.

### Installation

1.  Clone the repository (or create the files manually if you're following along):

    ```bash
    # If you have a git repo
    git clone <repository-url>
    cd <repository-name>
    # If you're creating files locally, navigate to your project directory
    ```

2.  Install the project dependencies (Mocha and Sinon for testing):

    ```bash
    npm install
    ```

## Usage

To run the calculator:

```bash
node calculator.js
```

The calculator will then prompt you to enter the first number, the second number, and the desired operation.

### Example

```
$ node calculator.js
Enter the first number: 10
Enter the second number: 5
Choose an operation (+, -, *, /): +
Result: 10 + 5 = 15
```

## Running Tests

This project uses Mocha for unit testing and Sinon for mocking CLI interactions. To run all tests:

```bash
npx mocha
```

This will execute both `calculator.test.js` (for arithmetic functions) and `calculator-cli.test.js` (for CLI interaction and error handling).

## Project Structure

*   `calculator.js`: Contains the core arithmetic functions and the `runCalculator` CLI logic.
*   `calculator.test.js`: Contains unit tests for the `add`, `subtract`, `multiply`, and `divide` functions.
*   `calculator-cli.test.js`: Contains tests for the `runCalculator` function, specifically covering user input and error handling through CLI interactions.
*   `package.json`: Manages project metadata and dependencies.
*   `package-lock.json`: Records the exact dependency tree.

