import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Ingredient {
  id: string;
  name: string;
  quantity: string;
}

interface IngredientFormProps {
  onSubmit: (ingredients: Ingredient[]) => void;
  isLoading: boolean;
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function IngredientForm({
  onSubmit,
  isLoading,
}: IngredientFormProps) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: generateId(), name: "", quantity: "" },
  ]);

  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      { id: generateId(), name: "", quantity: "" },
    ]);
  }

  function removeIngredient(id: string) {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  }

  function updateIngredient(
    id: string,
    field: "name" | "quantity",
    value: string,
  ) {
    setIngredients((prev) =>
      prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)),
    );
  }

  function handleSubmit() {
    const filled = ingredients.filter((i) => i.name.trim() !== "");
    if (filled.length === 0) return;
    onSubmit(filled);
  }

  const lastIngredientEmpty =
    ingredients[ingredients.length - 1].name.trim() === "";
  const noIngredientsFilled = ingredients.every((i) => i.name.trim() === "");

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          What's in your kitchen?
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Add your ingredients and quantities and we'll craft a recipe around
          them.
        </p>
      </div>

      <div className="flex items-center pl-3 pr-3">
        <span className="text-[11px] font-medium uppercase text-muted-foreground flex-1">
          Ingredient
        </span>
        <span className="text-[11px] font-medium uppercase text-muted-foreground w-[110px] shrink-0">
          Quantity
        </span>
        <span className="w-8" />
      </div>

      <Card className="overflow-hidden p-0">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id}
            className={`flex items-center h-[40px] ${index < ingredients.length - 1 ? "border-b" : ""}`}
          >
            <Input
              value={ingredient.name}
              onChange={(e) =>
                updateIngredient(ingredient.id, "name", e.target.value)
              }
              placeholder="e.g. chicken breast"
              className="flex-1 border-0 shadow-none focus-visible:ring-0 h-full rounded-none px-3 py-0"
            />
            <div className="w-px h-5 bg-border shrink-0" />
            <Input
              value={ingredient.quantity}
              onChange={(e) =>
                updateIngredient(ingredient.id, "quantity", e.target.value)
              }
              placeholder="e.g. 500g"
              className="w-[110px] shrink-0 border-0 shadow-none focus-visible:ring-0 h-full rounded-none text-sm text-muted-foreground px-3 py-0"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeIngredient(ingredient.id)}
              disabled={ingredients.length === 1}
              className="mr-2 hover:text-destructive hover:bg-destructive/10"
            >
              ×
            </Button>
          </div>
        ))}
      </Card>

      <Button
        variant="ghost"
        onClick={addIngredient}
        disabled={lastIngredientEmpty}
        className="w-full"
      >
        + Add Ingredient
      </Button>

      <Button
        onClick={handleSubmit}
        disabled={isLoading || noIngredientsFilled}
        className="w-full"
      >
        {isLoading ? "Generating your recipe..." : "Generate Recipe"}
      </Button>
    </div>
  );
}
