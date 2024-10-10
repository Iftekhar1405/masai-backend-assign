const crypto = require('crypto');

const args = process.argv.slice(2);
const operation = args[0];

let input, num1, num2, method;
if (operation === 'hash') {
    input = args[1];
} else {
    num1 = Number(args[1]);

    num2 = Number(args[2]);
}

function hashData(input) {
    return crypto.createHash('sha256').update(input).digest('hex');
}

switch (operation) {
    case 'hash':
        if (input) {
            console.log(`Hashed value: ${hashData(input)}`);
        } else {
            console.log("Please provide an input to hash");
        }
        break;

    case 'add':
        console.log(`Result: ${num1 + num2}`);
        break;

    case 'subtract':
        console.log(`Result: ${num1 - num2}`);
        break;

    case 'multiply':
        console.log(`Result: ${num1 * num2}`);
        break;

    case 'divide':
        if (num2 !== 0) {
            console.log(`Result: ${num1 / num2}`);
        } else {
            console.log("Error: Cannot divide by zero.");
        }
        break;

    default:
        console.log("Invalid operation. Use 'hash', 'add', 'subtract', 'multiply', or 'divide'.");
}
