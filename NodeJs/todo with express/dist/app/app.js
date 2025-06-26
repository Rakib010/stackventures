"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todosRoute_1 = require("./todos/todosRoute");
const app = (0, express_1.default)();
//json data parse kore object nie jay (middleware)
app.use(express_1.default.json());
app.use('/', todosRoute_1.todosRouter);
/* app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Todos App')
}) */
app.get('/', (req, res, next) => {
    console.log({
        url: req.url,
        method: req.method,
        header: req.header
    });
    next();
}, (req, res, next) => {
    try {
        res.send("welcome to Todo App");
    }
    catch (error) {
        next(error);
    }
});
app.get('/error', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('Welcome to error er duniya');
    }
    catch (error) {
        next(error);
    }
}));
// upor er jodi kono error na dhuko tahole eita dora porbe 
app.use((req, res, next) => {
    res.status(404).json({ message: "Route Not Found" });
});
// global error handling 
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});
exports.default = app;
/*
* server - server handing like - starting,closing error handling of server, only related to server
* app file - routing,handle,middleware,route related error
* app folder - app business logic handing like create read update delete, database related works
*/ 
