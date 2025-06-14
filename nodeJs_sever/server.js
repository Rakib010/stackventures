const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const port = 5000;
const filePath = path.join(__dirname, "./db/product.json");

// Utility: Read JSON file and parse
const readProducts = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Utility: Write updated products array to JSON file
const writeProducts = (products) => {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), "utf-8");
};

// Utility: Send JSON response
const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

// Create server
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  //  GET all products
  if (pathname === "/products" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }

  //  POST a new product
  else if (pathname === "/product" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      const newProduct = JSON.parse(data);

      const products = readProducts();
      products.push(newProduct);

      writeProducts(products);
      sendResponse(res, 201, newProduct);
    });
  }

  // PATCH update product
  else if (pathname === "/update-product" && req.method === "PATCH") {
    const id = Number(url.searchParams.get("id"));
    let data = "";

    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      const updateData = JSON.parse(data);

      const products = readProducts();
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) {
        return sendResponse(res, 404, { message: "Product not found" });
      }

      products[index] = { ...products[index], ...updateData };
      writeProducts(products);

      sendResponse(res, 200, products[index]);
    });
  }

  // DELETE product by ID
  else if (pathname === "/delete-product" && req.method === "DELETE") {
    const id = Number(url.searchParams.get("id"));
    const products = readProducts();

    const found = products.find((p) => p.id === id);
    if (!found) {
      return sendResponse(res, 404, { message: "Product not found" });
    }

    const updated = products.filter((p) => p.id !== id);
    writeProducts(updated);

    sendResponse(res, 200, { message: "Deleted", deletedProduct: found });
  } else {
    sendResponse(res, 404, { message: "Route not found" });
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server running on ${port}`);
});
