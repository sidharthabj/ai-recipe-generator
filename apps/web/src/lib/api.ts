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

const USE_MOCK = true; // set to true to use mock data instead of real API

const MOCK_RECIPE: Recipe = {
  id: 1,
  title: "Lemon Garlic Chicken",
  description:
    "A simple and fragrant pan-seared chicken with bright lemon and garlic, perfect for a quick weeknight dinner.",
  instructions:
    "1. Season chicken breast with salt. 2. Heat a pan over medium-high heat. 3. Sear chicken for 6-7 minutes each side until golden. 4. Add crushed garlic and cook for 1 minute. 5. Squeeze lemon over the top and rest for 3 minutes before serving.",
  imageUrl: null,
  createdAt: new Date().toISOString(),
  ingredients: [
    { id: 1, name: "Chicken breast", quantity: "2 pieces", isAvailable: true },
    { id: 2, name: "Garlic", quantity: "4 cloves", isAvailable: true },
    { id: 3, name: "Sea salt", quantity: "1 tsp", isAvailable: false },
  ],
};

export async function generateRecipe(
  ingredients: Ingredient[],
): Promise<Recipe> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return MOCK_RECIPE;
  }

  const res = await fetch(`${API_BASE}/recipes/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients }),
  });
  if (!res.ok) throw new Error("Failed to generate recipe");
  return res.json();
}
