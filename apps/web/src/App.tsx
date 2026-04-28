import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import IngredientForm from "@/components/recipe/IngredientForm";
import RecipeDetail from "@/components/recipe/RecipeDetail";
import MyRecipesPage from "@/pages/MyRecipesPage";
import { LoadingState } from "@/pages/GeneratePage";
import {
  generateRecipe,
  fetchSavedRecipes,
  saveRecipe,
  deleteSavedRecipe,
  type Recipe,
  type SavedRecipe,
} from "@/lib/api";

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
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedRecipes()
      .then(setSavedRecipes)
      .catch((err) => console.error("Failed to load saved recipes:", err));
  }, []);

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

  async function handleSave(recipe: Recipe) {
    const existing = savedRecipes.find((r) => r.recipeId === recipe.id);
    if (existing) {
      try {
        await deleteSavedRecipe(existing.id);
        setSavedRecipes((prev) => prev.filter((r) => r.id !== existing.id));
      } catch (err) {
        console.error("Failed to unsave recipe:", err);
      }
    } else {
      try {
        const saved = await saveRecipe(recipe.id);
        setSavedRecipes((prev) => [...prev, saved]);
      } catch (err) {
        console.error("Failed to save recipe:", err);
      }
    }
  }

  async function handleDelete(savedId: number) {
    try {
      await deleteSavedRecipe(savedId);
      setSavedRecipes((prev) => prev.filter((r) => r.id !== savedId));
    } catch (err) {
      console.error("Failed to delete recipe:", err);
    }
  }

  function handleSelectSaved(recipe: Recipe) {
    setCurrentRecipe(recipe);
    setView("recipe");
    setActiveTab("generate");
  }

  const isSaved = currentRecipe
    ? savedRecipes.some((r) => r.recipeId === currentRecipe.id)
    : false;

  function renderGenerate() {
    if (isLoading) return <LoadingState />;
    if (isRegenerating && currentRecipe)
      return (
        <>
          <LoadingState isRegenerating />
          {error && <p className="text-sm text-destructive mt-4">{error}</p>}
        </>
      );
    if (view === "input")
      return (
        <>
          <IngredientForm onSubmit={handleGenerate} isLoading={isLoading} />
          {error && <p className="text-sm text-destructive mt-4">{error}</p>}
        </>
      );
    if (view === "recipe" && currentRecipe)
      return (
        <>
          <RecipeDetail
            recipe={currentRecipe}
            onBack={handleBack}
            onRegenerate={handleRegenerate}
            onSave={handleSave}
            isSaved={isSaved}
            isRegenerating={isRegenerating}
          />
          {error && <p className="text-sm text-destructive mt-4">{error}</p>}
        </>
      );
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedRecipes.length}
      />
      <main className="max-w-[672px] mx-auto px-6 py-8 pb-16">
        {activeTab === "generate" ? (
          renderGenerate()
        ) : (
          <MyRecipesPage
            savedRecipes={savedRecipes}
            onDelete={handleDelete}
            onSelect={handleSelectSaved}
          />
        )}
      </main>
    </div>
  );
}

export default App;
