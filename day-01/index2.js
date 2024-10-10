let fs = require('fs');

let args = process.argv.slice(2);
let operation = args[0];

let fileName, fileContent, fileDirectory;

if (['read', 'write', 'append', 'delete'].includes(operation)) {
    fileName = args[1];
    if (operation === 'write' || operation === 'append') {
        fileContent = args[2];
    }
} else if (operation === 'list') {
    fileDirectory = args[1] || '.'; // Default to current directory if no argument provided
}

switch (operation) {
    case 'read':
        fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                console.log(`Something went wrong: ${err}`);
            } else {
                console.log(data);
            }
        });
        break;

    case 'write':
        fs.writeFile(fileName, fileContent, (err) => {
            if (err) {
                console.log(`Error writing to file: ${err}`);
            } else {
                console.log(`Successfully wrote to ${fileName}`);
            }
        });
        break;

    case 'append':
        fs.appendFile(fileName, fileContent, (err) => {
            if (err) {
                console.log(`Error appending to file: ${err}`);
            } else {
                console.log(`Successfully appended to ${fileName}`);
            }
        });
        break;

    case 'delete':
        fs.unlink(fileName, (err) => {
            if (err) {
                console.log(`Error deleting file: ${err}`);
            } else {
                console.log(`Successfully deleted ${fileName}`);
            }
        });
        break;

    case 'list':
        fs.readdir(fileDirectory, (err, files) => {
            if (err) {
                console.log(`Error reading directory: ${err}`);
            } else {
                console.log(`Files in directory '${fileDirectory}':\n${files.join('\n')}`);
            }
        });
        break;

    default:
        console.log("Invalid operation. Use 'read', 'write', 'append', 'delete', or 'list'.");
}
