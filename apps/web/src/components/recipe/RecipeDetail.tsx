import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type Recipe } from "@/lib/api";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onRegenerate: () => void;
  onSave: (recipe: Recipe) => void;
  isSaved: boolean;
  isRegenerating: boolean;
}

export default function RecipeDetail({
  recipe,
  onBack,
  onRegenerate,
  onSave,
  isSaved,
  isRegenerating,
}: RecipeDetailProps) {
  const availableIngredients = recipe.ingredients.filter((i) => i.isAvailable);
  const missingIngredients = recipe.ingredients.filter((i) => !i.isAvailable);
  const steps = recipe.instructions
    .split(/\d+\.\s+/)
    .filter((s) => s.trim() !== "");

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={onBack}
        className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      >
        ← Ingredients
      </button>

      {/* Title and description */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{recipe.title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {recipe.description}
        </p>
      </div>

      {/* Ingredients */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Ingredients</h2>

        {/* You have it */}
        {availableIngredients.length > 0 && (
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between px-3 py-2 bg-[hsl(142_76%_36%/0.07)] border-b border-[hsl(142_76%_36%/0.15)]">
              <div className="flex items-center gap-2">
                <span className="w-[7px] h-[7px] rounded-full bg-[hsl(142,70%,36%)]" />
                <span className="text-[11px] font-medium uppercase text-[hsl(142,70%,28%)]">
                  You have it
                </span>
              </div>
              <span className="text-[11px] text-[hsl(142,70%,28%)]">
                {availableIngredients.length} items
              </span>
            </div>
            {availableIngredients.map((ingredient, index) => (
              <div
                key={ingredient.id}
                className={`flex items-center justify-between px-3 py-2 ${index < availableIngredients.length - 1 ? "border-b" : ""}`}
              >
                <span className="text-sm">{ingredient.name}</span>
                <span className="text-sm text-muted-foreground">
                  {ingredient.quantity}
                </span>
              </div>
            ))}
          </Card>
        )}

        {/* Need to buy */}
        {missingIngredients.length > 0 && (
          <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between px-3 py-2 bg-[hsl(25_95%_53%/0.07)] border-b border-[hsl(25_95%_53%/0.15)]">
              <div className="flex items-center gap-2">
                <span className="w-[7px] h-[7px] rounded-full bg-[hsl(25,95%,50%)]" />
                <span className="text-[11px] font-medium uppercase text-[hsl(25,85%,35%)]">
                  Need to buy
                </span>
              </div>
              <span className="text-[11px] text-[hsl(25,85%,35%)]">
                {missingIngredients.length} items
              </span>
            </div>
            {missingIngredients.map((ingredient, index) => (
              <div
                key={ingredient.id}
                className={`flex items-center justify-between px-3 py-2 ${index < missingIngredients.length - 1 ? "border-b" : ""}`}
              >
                <span className="text-sm">{ingredient.name}</span>
                <span className="text-sm text-muted-foreground">
                  {ingredient.quantity}
                </span>
              </div>
            ))}
          </Card>
        )}
      </div>

      {/* Steps */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold">Instructions</h2>
        <div>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex gap-3 px-3 py-3 bg-card border-x border-t ${
                index === 0 ? "rounded-t-lg" : ""
              } ${index === steps.length - 1 ? "rounded-b-lg border-b" : ""}`}
            >
              <span className="text-xs font-semibold text-muted-foreground tabular-nums min-w-[18px]">
                {index + 1}
              </span>
              <span className="text-sm">{step.trim()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="flex-1"
        >
          {isRegenerating ? "Finding a different recipe..." : "Regenerate"}
        </Button>
        <Button
          variant={isSaved ? "default" : "outline"}
          onClick={() => onSave(recipe)}
          className="flex-1"
        >
          {isSaved ? "Saved" : "Save Recipe"}
        </Button>
      </div>
    </div>
  );
}
