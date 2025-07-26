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

  async loginUser(req:Request,res:Response){
    const {email,password} = req.body
    if(!email || !password){
      res.status(400).json({
        message : "Please provide email or passowrd"
      })
      return
    }
    //check if email or password is in our database or not
   const data = await User.findAll({
      where:{
        email: email
      }
    })

    if(data.length ==0){

      res.status(404).json(
        {
         
          message:"Not registrated"
        }
      )


    }
    else{
     //check passwoprd
    const isPasswordMatch = bcrypt.compareSync(password,data[0].password)
    if (isPasswordMatch){
      //login vayo ,token generation
      //token --- your identity on digital platform
    }
    else{
      res.status(403).json({
        messange:"Invalid email or password"


      })
    }
        }
      }
    }
  


export default AuthController;
 