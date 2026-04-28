interface LoadingProps {
  isRegenerating?: boolean;
}

export function LoadingState({ isRegenerating = false }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <div>
        <p className="text-sm font-medium">
          {isRegenerating
            ? "Finding a different recipe"
            : "Generating your recipe"}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {isRegenerating
            ? "Exploring new combinations"
            : "This will just take a moment"}
        </p>
      </div>
    </div>
  );
}
