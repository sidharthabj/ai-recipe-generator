import { useState } from "react";
import Header from "@/components/layout/Header";
import IngredientForm from "@/components/recipe/IngredientForm";
import RecipeDetail from "@/components/recipe/RecipeDetail";
import { generateRecipe, type Recipe } from "@/lib/api";

type Tab = "generate" | "saved";
type View = "input" | "recipe";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("generate");
  const [view, setView] = useState<View>("input");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [lastIngredients, setLastIngredients] = useState<Ingredient[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(ingredients: Ingredient[]) {
    setIsLoading(true);
    setError(null);
    setLastIngredients(ingredients);
    try {
      const recipe = await generateRecipe(ingredients);
      setCurrentRecipe(recipe);
      setView("recipe");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegenerate() {
    setIsRegenerating(true);
    setError(null);
    try {
      const recipe = await generateRecipe(lastIngredients);
      setCurrentRecipe(recipe);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsRegenerating(false);
    }
  }

  function handleBack() {
    setView("input");
    setCurrentRecipe(null);
  }

  function handleSave(recipe: Recipe) {
    const alreadySaved = savedRecipes.some((r) => r.id === recipe.id);
    if (alreadySaved) return;
    setSavedRecipes((prev) => [...prev, recipe]);
  }

  const isSaved = currentRecipe
    ? savedRecipes.some((r) => r.id === currentRecipe.id)
    : false;

  return (
    <div className="min-h-screen">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedRecipes.length}
      />
      <main className="max-w-[672px] mx-auto px-6 py-8 pb-16">
        {activeTab === "generate" ? (
          <>
            {view === "input" ? (
              <IngredientForm onSubmit={handleGenerate} isLoading={isLoading} />
            ) : currentRecipe ? (
              <RecipeDetail
                recipe={currentRecipe}
                onBack={handleBack}
                onRegenerate={handleRegenerate}
                onSave={handleSave}
                isSaved={isSaved}
                isRegenerating={isRegenerating}
              />
            ) : null}
            {error && <p className="text-sm text-destructive mt-4">{error}</p>}
          </>
        ) : (
          <p className="text-muted-foreground">My Recipes tab coming soon</p>
        )}
      </main>
    </div>
  );
}

export default App;
