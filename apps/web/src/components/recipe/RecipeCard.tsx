import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Recipe } from "@/lib/api";

interface RecipeCardProps {
  recipe: Recipe;
  onDelete: (id: number) => void;
  onClick: (recipe: Recipe) => void;
}

export default function RecipeCard({
  recipe,
  onDelete,
  onClick,
}: RecipeCardProps) {
  const availableCount = recipe.ingredients.filter((i) => i.isAvailable).length;
  const missingCount = recipe.ingredients.filter((i) => !i.isAvailable).length;

  return (
    <Card
      className="overflow-hidden p-0 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(recipe)}
    >
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug">{recipe.title}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(recipe.id);
            }}
            className="shrink-0 hover:text-destructive hover:bg-destructive/10"
          >
            ×
          </Button>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[hsl(142_76%_36%/0.07)] text-[hsl(142,70%,28%)] border border-[hsl(142_76%_36%/0.15)]">
            {availableCount} you have
          </span>
          {missingCount > 0 && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[hsl(25_95%_53%/0.07)] text-[hsl(25,85%,35%)] border border-[hsl(25_95%_53%/0.15)]">
              {missingCount} to buy
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
