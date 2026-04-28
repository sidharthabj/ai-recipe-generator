import RecipeCard from "@/components/recipe/RecipeCard";
import { type Recipe } from "@/lib/api";

interface MyRecipesPageProps {
  savedRecipes: Recipe[];
  onDelete: (id: number) => void;
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
        {savedRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={onDelete}
            onClick={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
