import { PrismaClient } from '@prisma/client';
import {Request, Response } from 'express';
import bcrypt from "bcryptjs";
import jwt, { sign } from 'jsonwebtoken';

const prisma = new PrismaClient();

export const signup = async(req:Request, res:Response)=>{
    try {
        const { name, email, password } = req.body;
        
        if(!name || !email  || !password){
            res.status(400).json({
                message: "Please fill all fields",
                success : false,
            });
            return;
        }

        const user = await prisma.user.findUnique({
            where : {
                email : email,
            },
        });
        console.log(user);
        
        if(user){
            res.status(400).json({
                message : "User already exist with email",
                success : false,
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password : hashedPassword,
            },
        });
        res.status(201).json({
            message : 'User created successfully',
            success : true,
        });
    } catch (error) {
        console.log(error);
        
    }
}

export const login = async(req:Request , res:Response)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            res.status(400).json({
                message : "All fields are required",
                success  :true,
            });
            return;
        };

        const user = await prisma.user.findUnique({
            where : {
                email : email,
            },
        });

        if(!user){
            res.status(400).json({
                message : "User not exist with given email ",
                success : false,
            });
            return;
        }

        const isPasswordMatched = bcrypt.compare(password, user.password);

        if(!isPasswordMatched){
            res.status(400).json({
                message : "Incorrect password",
                success : false,
            });
            return;
        }

        const tokenData = {
            userId: user.id,
        };
        const secret_key = process.env.SECRET_KEY || '';
        
        const token = jwt.sign(tokenData, secret_key.toString(), {
        expiresIn: "1d",
        });


        res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
          }).json({
            message : `Welcome back ${user.name}`,
            success : true,
            user,
          });


    } catch (error) {
        console.log(error);
        
    }
}