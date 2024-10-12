const http = require("http");
const fs = require('fs');
const path = require('path');

function getDirCont(currPath) {
    return fs.readdirSync(currPath).map((item) => {
        const itemPath = path.join(currPath, item);
        return { name: item, path: itemPath, isDirectory: fs.lstatSync(itemPath).isDirectory() };
    });
}

function readDir(currPath, dirContents, parentPath) {
    let html = `
    <h1>Directory : ${currPath}</h1>
    <ul>
    ${dirContents.map(item => {
        if (item.isDirectory) {
            return `<li><a href="/?path=${encodeURIComponent(item.path)}">[DIR] ${item.name}</a></li>`;
        } else {
            // Create a link to view the file
            return `<li><a href="/file?path=${encodeURIComponent(item.path)}">[FILE] ${item.name}</a></li>`;
        }
    }).join('')}
    </ul>
    ${currPath !== __dirname ? `<a href="/?path=${encodeURIComponent(parentPath)}">Go Back</a>` : ''}
    `;
    return html;
}

function readFile(filePath, res) {
    // Check if the file exists and read it
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Could not read file</h1>');
        } else {
            // Display file contents
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h1>File: ${filePath}</h1>
                <pre>${data}</pre>
                <a href="/">Back to directory</a>
            `);
        }
    });
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const currPath = url.searchParams.get('path') || __dirname;

    if (pathname === '/file') {
        readFile(currPath, res);
    } else {
        const parentPath = path.dirname(currPath);

        try {
            const dirContents = getDirCont(currPath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(readDir(currPath, dirContents, parentPath));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Something Went Wrong</h1>');
        }
    }
});

server.listen(3000, () => {
    console.log('Server listening at http://localhost:3000');
});
