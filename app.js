const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDirectory = path.join(__dirname, "public");
const port = Number(process.env.PORT) || 3000;

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

const server = http.createServer((request, response) => {
  const requestedPath = decodeURIComponent(request.url.split("?")[0]);
  const relativePath = requestedPath === "/" ? "index.html" : requestedPath.slice(1);
  const filePath = path.resolve(publicDirectory, relativePath);

  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const extension = path.extname(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extension] || "application/octet-stream"
    });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`Task Manager is running at http://localhost:${port}`);
});