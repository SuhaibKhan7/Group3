"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importStar(require("ws"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const port = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
wss.on("connection", (ws) => {
    console.log("New connection established");
    ws.send(JSON.stringify({ type: "ack", message: "Websockets Connected" }));
    ws.on("message", (message) => {
        console.log("Message received from client:", message);
    });
    ws.on("error", (error) => {
        console.log("Error:", error.message);
    });
    ws.on("close", () => {
        console.log("Connection closed");
    });
});
app.post("/api/image-uploaded-event", (req, res) => {
    console.log("Image Event Received");
    const notification = {
        type: "new image notification",
        message: "New Image Uploaded",
    };
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.default.OPEN) {
            client.send(JSON.stringify(notification));
        }
    });
    res.status(200).send("Notification sent to WebSocket clients");
});
app.get("/", (req, res) => {
    res.send("Real-time Notification Server is running!");
});
server.listen(port, () => {
    console.log(`HTTP and WebSocket server listening on http://localhost:${port}`);
});
