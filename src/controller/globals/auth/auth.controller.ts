import { Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt" 

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      if (!username || !password || !email) {
        res.status(400).json({
          message: "Please provide username, password, and email",
        });
        return;
      }

      await User.create({ 
        username:username,
         password:bcrypt.hashSync(password,12) ,
          email:email,
         });

      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error: any) {
      console.error("Error in registerUser:", error.message);
      res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  }
}

export default AuthController;
