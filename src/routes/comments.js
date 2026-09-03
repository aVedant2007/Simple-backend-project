import prisma from '../prisma.js'
import express from 'express';

const router = express.Router();

router.get('/articles/:id/comments', async(req, res) => {
    try{
        const {id : a_id} = req.params;
        const comms = await prisma.comment.findMany({
            where: {article_id: a_id},
        });
        res.json(comms);
    }catch(error){
        console.log(error);
        res.status(500).json({error : "Failed to fetch comments"});
    }
});

router.post('/articles/:id/comments', async(req, res) => {
    try{
        const {id : a_id} = req.params;
        const { content, author_name } = req.body;

        if (!content) {
            return res.status(400).json({ error: "Content is required" });
        }

        const comment = await prisma.comment.create({
            data: {article_id: a_id, author_name, content},
        });
        res.json(comment);
    }catch(error){
        console.log(error);
        res.status(500).json({error : "Failed to create comment"});
    }
});

export default router;