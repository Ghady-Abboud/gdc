import { Request, Response } from "express";
import sql from "../providers/db";
import { CreateToken, VerifyToken } from "./jwt";
import supabase from "../providers/supabase";

const express = require("express");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const port = 3001;
const app = express();
const cors = require("cors");
const multer = require("multer");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:4001",
    credentials: true,
  })
);

// Registering user
app.post("/auth/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // First check if user exists
    const user =
      await sql`SELECT user_id,username FROM userinfo WHERE username = ${username}`;

    if (user.length > 0) {
      return res.status(400).json({ Error: "User Already Exists" });
    } else {
      // If user doesn't exist, proceed with registration
      const hash = await bcrypt.hash(password, 15);
      await sql`
      INSERT INTO userinfo (username, password) VALUES (${username}, ${hash})
      `;

      res.status(200).json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    return res.status(400).json({ Error: err });
  }
});

// Login user
app.post("/auth/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await sql`SELECT * FROM userinfo WHERE username = ${username}`;
    if (user.length < 1) res.status(400).json({ Error: "User does not exist" });
    else {
      const dbPassword = user[0]["password"];

      bcrypt.compare(password, dbPassword).then(async (match: any) => {
        if (!match) res.status(400).json({ Error: "Incorrect Password" });
        else {
          const accessToken = CreateToken(user);
          res.cookie("access-token", accessToken, {
            maxAge: 60 * 60 * 24 * 30 * 1000,
            httpOnly: true,
            // ADD HTTPS IF PRODUCTION
            domain: "localhost", // Update If Deployed
            secure: true,
          });
          res.status(200).json({
            message: "User Logged In",
          });
        }
      });
    }
  } catch (err) {
    res.status(400).json({ Error: err });
  }
});

// Dashboard
app.get("/dashboard", VerifyToken, async (req: Request, res: Response) => {
  // Retrieve User Files
  if (req.authenticated) {
    try {
      const { user_id, username } = req.user;
      const { data, error } = await supabase.storage
        .from(`user-files`)
        .list(`${user_id}/${username}`);
      res.status(200).json({ data, username});
    } catch (err) {
      res.status(400).json({ Error: err });
    }
  } else {
    res.status(400).json({ message: "User Not Authenticated" });
  }
});

// Upload File to Bucket
const upload = multer(multer.memoryStorage());
app.post(
  "/dashboard/upload",
  VerifyToken,
  upload.single("file"),
  async (req: Request, res: Response) => {
    const { user_id, username } = req.user;
    console.log(req.file);
    const { data, error } = await supabase.storage
      .from("user-files")
      .upload(
        `${user_id}/${username}/${req.file.originalname}`,
        req.file.buffer
      );

    if (error) res.status(400).json({ message: error });
    else res.status(200).json({ message: "File uploaded successfully", data });
  }
);

// Starting server
try {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port: ${port}`);
  });
} catch (err) {
  console.error(err);
}
