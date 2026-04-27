import { Router, Request, Response } from "express";
import prisma from "../lib/prisma";
import { model } from "../lib/gemini";

const router = Router();

// POST /api/recipes/generate
router.post("/generate", async (req: Request, res: Response) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.length === 0) {
      res.status(400).json({ error: "No ingredients provided" });
      return;
    }

    const ingredientList = ingredients
      .map(
        (ing: { name: string; quantity: string }) =>
          `${ing.name} (${ing.quantity})`,
      )
      .join(", ");

    const prompt = `You are a recipe generator. The user has these ingredients with quantities: ${ingredientList}.
    
    Generate a recipe that uses as many of these ingredients as possible.
    If the recipe needs additional ingredients beyond what the user has, include them too.
    
    Respond with ONLY a JSON object in this exact format, no other text:
    {
      "title": "Recipe Title",
      "description": "Short description of the dish",
      "instructions": "Step by step cooking instructions",
      "ingredients": [
        { "name": "ingredient name", "quantity": "amount needed", "isAvailable": true },
        { "name": "ingredient name", "quantity": "amount needed", "isAvailable": false }
      ]
    }
    
    Rules:
    - Mark isAvailable as true if the ingredient was in the user's provided list
    - Mark isAvailable as false if it is an additional ingredient the user needs to buy
    - Use the exact quantities the recipe needs, not the quantities the user provided
    - Keep instructions clear and numbered`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleaned = text.replace(/```json|```/g, "").trim();
    const recipeData = JSON.parse(cleaned);

    const recipe = await prisma.recipe.create({
      data: {
        title: recipeData.title,
        description: recipeData.description,
        instructions: recipeData.instructions,
        ingredients: {
          create: recipeData.ingredients.map((ing: any) => ({
            name: ing.name,
            quantity: ing.quantity,
            isAvailable: ing.isAvailable,
          })),
        },
      },
      include: {
        ingredients: true,
      },
    });

    res.status(201).json(recipe);
  } catch (error: any) {
    console.error("Generate recipe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/recipes/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const recipe = await prisma.recipe.findUnique({
      where: { id: Number(id) },
      include: { ingredients: true },
    });

    if (!recipe) {
      res.status(404).json({ error: "Recipe not found" });
      return;
    }

    res.json(recipe);
  } catch (error: any) {
    console.error("Get recipe error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
