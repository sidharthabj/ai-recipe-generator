const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

export interface Ingredient {
  id?: string;
  name: string;
  quantity: string;
}

export interface RecipeIngredient {
  id: number;
  name: string;
  quantity: string;
  isAvailable: boolean;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: string;
  imageUrl: string | null;
  createdAt: string;
  ingredients: RecipeIngredient[];
}

export async function generateRecipe(
  ingredients: Ingredient[],
): Promise<Recipe> {
  const res = await fetch(`${API_BASE}/recipes/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  if (!res.ok) throw new Error("Failed to generate recipe");
  return res.json();
}
