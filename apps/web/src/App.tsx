import { useState } from "react";
import Header from "@/components/layout/Header";
import IngredientForm from "@/components/recipe/IngredientForm";
import { generateRecipe, type Recipe } from "@/lib/api";

type Tab = "generate" | "saved";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("generate");
  const [savedCount, _setSavedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate(ingredients: Ingredient[]) {
    setIsLoading(true);
    setError(null);
    try {
      const recipe = await generateRecipe(ingredients);
      setCurrentRecipe(recipe);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedCount={savedCount}
      />
      <main className="max-w-[672px] mx-auto px-6 py-8 pb-16">
        {activeTab === "generate" ? (
          <>
            <IngredientForm onSubmit={handleGenerate} isLoading={isLoading} />
            {error && <p className="text-sm text-destructive mt-4">{error}</p>}
            {currentRecipe && (
              <pre className="mt-8 text-xs bg-muted p-4 rounded-lg overflow-auto">
                {JSON.stringify(currentRecipe, null, 2)}
              </pre>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">My Recipes tab coming soon</p>
        )}
      </main>
    </div>
  );
}

export default App;
