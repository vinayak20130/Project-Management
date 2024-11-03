import { PrismaClient } from '@prisma/client';
import { error, log } from 'console';
import { create } from 'domain';
import { json, Request, Response } from 'express';
import bcrypt from "bcryptjs";

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