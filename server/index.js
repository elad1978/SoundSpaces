import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
/* ADD DATA TO DATABASE USE ONLY ONE TIME */
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* CONFIGURATION */
//fileURLToPath() - convert a file URL to a file path - needed when using the type:modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); //this is only when i use the type:modules
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet()); //It sets various HTTP headers to protect your app from well-known web vulnerabilities
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); //It provides detailed logging of HTTP requests like: method,URL,status code...
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register); //the reason we did'nt put this route in the routes is because we need to use the "upload" var of multer middleware
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000; //  5000 => this is a backup port
mongoose
  .connect(process.env.MONGO_URL, { dbName: "SoundSpacesDB" })
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
    /* ADD DATA TO DATABASE USE ONLY ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => {
    console.log("error", error);
  });
