import prisma from '../prisma.js'
import express from "express";

const router = express.Router();


router.get("/", async (req, res) => {
    try{
        const subscribers = await prisma.subscribers.findMany();
        res.json(subscribers);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to fetch subscribers"});
    }
});

router.post("/subscribe", async(req, res) => {
    try{
        const { email } = req.body;
        if(!email)
            return res.status(400).json({error: "Email is required"});
        const subscriber = await prisma.subscribers.create({
            data: {email},
        });
        res.json(subscriber);
    }catch(error){
        console.log(error);
        res.status(500).json({error: "Failed to subscriber"});
    }
});

export default router;