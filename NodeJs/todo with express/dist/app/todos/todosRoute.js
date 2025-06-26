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
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = require("../../config/mongodb");
const mongodb_2 = require("mongodb");
exports.todosRouter = express_1.default.Router();
const filepath = path_1.default.join(__dirname, '../../../db/todo.json');
exports.todosRouter.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const result = yield collection.find({}).toArray();
    res.send({ message: 'Get data successfully', result });
}));
exports.todosRouter.post('/make-todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    yield collection.insertOne({
        title: title,
        description: description,
        priority: priority
    });
    const result = yield collection.find({}).toArray();
    res.json(result);
}));
exports.todosRouter.get('/todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const todoId = { _id: new mongodb_2.ObjectId(id) };
    const todos = yield collection.findOne(todoId);
    res.send(todos);
}));
exports.todosRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const todoId = { _id: new mongodb_2.ObjectId(id) };
    const todos = yield collection.deleteOne(todoId);
    res.send(todos);
}));
exports.todosRouter.put('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, priority } = req.body;
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const updatedTodo = {
        $set: { title, description, priority, }
    };
    const todos = yield collection.updateOne(filter, updatedTodo);
    res.send(todos);
}));
