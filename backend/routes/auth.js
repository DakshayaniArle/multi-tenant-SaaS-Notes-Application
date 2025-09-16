import express from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user =await User.findOne({email}).populate("tenant");
        console.log(user);
        if(!user) return res.status(400).json({error:"User not found"});

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({error:"Invalid Credentials"});

        const token= jwt.sign({
            id:user._id,
            email:user.email,
            role:user.role,
            tenantId:user.tenant?._id,
            tenant:{
                slug:user.tenant?.slug,
                name:user.tenant?.name,
            }
        },
           process.env.JWT_SECRET,
           {expiresIn:"1h"}
        );

        res.json({
            token,
            role:user.role,
            tenant:{
                id:user.tenant?._id,
                slug:user.tenant?.slug,
                name:user.tenant?.name,
            }
        });
    }
    catch(err){
        return res.status(500).json({error:"Server Error"});
    }
})

export default router

