import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET /api/saved
router.get("/", async (req: Request, res: Response) => {
  const savedRecipes = await prisma.savedRecipe.findMany({
    include: {
      recipe: {
        include: {
          ingredients: true,
        },
      },
    },
    orderBy: {
      savedAt: "desc",
    },
  });

  res.json(savedRecipes);
});

// POST /api/saved
router.post("/", async (req: Request, res: Response) => {
  const { recipeId } = req.body;

  if (!recipeId) {
    res.status(400).json({ error: "No recipeId provided" });
    return;
  }

  const saved = await prisma.savedRecipe.create({
    data: { recipeId },
    include: {
      recipe: {
        include: {
          ingredients: true,
        },
      },
    },
  });

  res.status(201).json(saved);
});

// DELETE /api/saved/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.savedRecipe.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
});

export default router;
