import express from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => { 
    try { 
        const articles = await prisma.article.findMany(
            { where: { published: true }, orderBy: { createdAt: "desc" }, }); 
        res.json(articles); }
    catch (error)
    { console.log(error);
        res.status(500).json({ error: "Failed to fetch articles" }); 
    } });

router.get("/all", async (req, res) => { 
    try { 
        const articles = await prisma.article.findMany({ orderBy: { createdAt: "desc" }, }); 
        res.json(articles); 
    } catch (error) { 
        console.log(error);
        res.status(500).json({ error: "Failed to fetch all articles" }); 
    } });

router.get("/:slug", async (req, res) => { 
    const { slug } = req.params; 
    try { 
        const article = await prisma.article.findUnique({ where: { slug }, });
        if (!article) { return res.status(404).json({ error: "Article not found" }); } 
        res.json(article); } 
    catch (error) { res.status(500).json({ error: "Failed to fetch article" }); } });

router.post("/", async (req, res) => {
  try {
    const {
      slug,
      title,
      description,
      contents,
      cover_image,
      published_at,
      tags,
      category_id,
      status,
      type,
      estimated_read_time,
    } = req.body;

    // minimal validation
    if (!slug || !title || !description || !contents) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const article = await prisma.article.create({
      data: {
        slug,
        title,
        description,
        contents, // JSON (Prisma handles JSONB)
        coverImage: cover_image ?? null,
        publishedAt: published_at ? new Date(published_at) : null,
        tags: tags ?? [],
        categoryId: category_id ?? null,
        status: status ?? "draft",
        type: type ?? "newsletter",
        estimatedReadTime: estimated_read_time ?? null,
      },
    });

    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create article" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    
    const updated = await prisma.article.update({
      where: { id }, // UUID → no Number()
      data: data,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update article" });
  }
});

router.delete("/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const deleted = await prisma.article.delete({where: {id}});
        res.json(deleted);

    }catch(error){
        console.error(error);
        res.status(500);
        res.json({error: "Failed to delete article"});
    }
});

export default router;