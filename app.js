import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import http from 'http';
import { Server } from "socket.io";
import errorHandler from './middleware/error.js';
import authRoutes from './routes/authRoutes.js';
import postRoute from './routes/postRoute.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

// Database connection
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
.then(() => console.log("DB connected"))
.catch((err) => console.log(err));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(mongoSanitize());
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "img-src": ["'self'", "https: data:"]
  }
}));
app.use(xss());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use(limiter);
app.use(hpp());

// Routes Middleware
app.use('/api', authRoutes);
app.use('/api', postRoute);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

export { io };

// Error Middleware
app.use(errorHandler);

// Port
const port = process.env.PORT || 9000;

io.on('connection', (socket) => {
  socket.on('comment', (msg) => {
    io.emit("new-comment", msg);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
