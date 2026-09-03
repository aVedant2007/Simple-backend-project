import express from "express";
import prisma from '../prisma.js';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error){
        console.log(error);
        res.status(500);
        res.json({error : "Failed to fetch required fields"});
    }
});

router.post("/", async(req, res) => {
    try{
        const { name, slug } = req.body;
        const category = await prisma.category.create({
            data: {name ,slug}
        })
        res.json(category);
    }catch(error){
        console.log(error);
        res.status(500);
        res.json({error : "Failed to create category"});
    }
});

export default router;