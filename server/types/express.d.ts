import { Request } from "express";

interface User {
  user_id: number;
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      authenticated: boolean;
      user: User;
      file: Express.Multer.File;
    }
  }
}
