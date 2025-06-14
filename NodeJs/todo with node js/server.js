// Create Server
const http = require("http");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  //console.log(req.url, req.method);

  const url = new URL(req.url, `https://${req.headers.host}`);
  const pathname = url.pathname;
  //console.log(pathname);

  // get all todos (req.url = pathname)
  if (pathname === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
  // post todos
  else if (pathname === "/make-todos" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      const { name, gmail, country } = JSON.parse(data);
      //console.log(name, gmail, country);

      const createdAt = new Date().toLocaleString();

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      //console.log("all todos", allTodos);
      const parseAllTodos = JSON.parse(allTodos);
      //console.log("parse todos", parseAllTodos);

      //console.log(allTodos);
      parseAllTodos.push({ name, gmail, country, createdAt });

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.end(JSON.stringify({ name, gmail, country, createdAt }, null, 2));
    });

    //res.end("Todo Created");
  }
  // single data get
  else if (pathname === "/todo" && req.method === "GET") {
    const name = url.searchParams.get("name");
    //console.log(name);

    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(data);

    const todo = parseData.find((todo) => todo.name === name);

    const stringifyTodo = JSON.stringify(todo);

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(stringifyTodo);

    //res.end("single todo");
  }
  // update data (single data)
  else if (pathname === "/updated-todo" && req.method === "PATCH") {
    const name = url.searchParams.get("name");
    //console.log("name", name);

    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
      // console.log("chunk",data)
    });

    req.on("end", () => {
      const { gmail } = JSON.parse(data);
      //console.log('gmail',gmail)

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });

      const parseAllTodos = JSON.parse(allTodos);
      // console.log(parseAllTodos);

      const todoIndex = parseAllTodos.findIndex((todo) => todo.name === name);

      // console.log("index", todoIndex);

      parseAllTodos[todoIndex].gmail = gmail;

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.end(
        JSON.stringify(
          { name, gmail, createdAt: parseAllTodos[todoIndex].createdAt },
          null,
          2
        )
      );
    });
  }
  // delete data 
  else if (pathname === "/delete-todo" && req.method === "DELETE") {
    const name = url.searchParams.get("name");
    // console.log(data);

    const todo = fs.readFileSync(filePath, { encoding: "utf-8" });
    const todoParse = JSON.parse(todo);

    const findTodo = todoParse.find((todos) => todos.name === name);

    if (!findTodo) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Todo not found" }));
    }

    const deleteTodo = todoParse.filter((data) => data.name !== name);
    // console.log(deleteTodo);

    fs.writeFileSync(filePath, JSON.stringify(deleteTodo, null, 2), {
      encoding: "utf-8",
    });

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ deleteTodo }, null, 2));
  } else {
    res.end("Todo NoT Found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("server listening to port 5000");
});


/* if (req.url === "/todos" && req.method === "GET") {
  res.writeHead(200, { "content-type": "application/json" });
  // res.setHeader("content-type", "text/plan");
  // res.statusCode=201
  res.end(JSON.stringify(data));
}  */

/* URL {
  href: 'https://localhost:5000/todo?name=akib',
  origin: 'https://localhost:5000',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'localhost:5000',
  hostname: 'localhost',
  port: '5000',
  pathname: '/todo',
  search: '?name=akib',
  searchParams: URLSearchParams { 'name' => 'akib' },
  hash: ''
} */
