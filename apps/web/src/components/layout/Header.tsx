import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Tab = "generate" | "saved";

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  savedCount: number;
}

export default function Header({
  activeTab,
  onTabChange,
  savedCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
      <div className="max-w-[672px] mx-auto px-6 h-14 flex items-center justify-between">
        <span className="text-sm font-semibold">Ramsey</span>
        <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as Tab)}>
          <TabsList>
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="saved">
              My Recipes{savedCount > 0 ? ` (${savedCount})` : ""}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
}
