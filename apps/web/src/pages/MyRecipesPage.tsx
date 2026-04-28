import RecipeCard from "@/components/recipe/RecipeCard";
import { type Recipe, type SavedRecipe } from "@/lib/api";

interface MyRecipesPageProps {
  savedRecipes: SavedRecipe[];
  onDelete: (savedId: number) => void;
  onSelect: (recipe: Recipe) => void;
}

export default function MyRecipesPage({
  savedRecipes,
  onDelete,
  onSelect,
}: MyRecipesPageProps) {
  if (savedRecipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-sm font-semibold">No saved recipes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Generate a recipe and save it here to build your personal cookbook.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold tracking-tight">My Recipes</h1>
      <div className="grid grid-cols-1 gap-3">
        {savedRecipes.map((saved) => (
          <RecipeCard
            key={saved.id}
            recipe={saved.recipe}
            savedId={saved.id}
            onDelete={onDelete}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
