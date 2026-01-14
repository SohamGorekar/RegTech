import { Menu, Building2, Receipt, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import CircularProgress from "./CircularProgress";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  progress: number;
  taskCount: number;
  completedCount: number;
}

interface MobileNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryClick: (id: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  company: <Building2 className="h-5 w-5" />,
  tax: <Receipt className="h-5 w-5" />,
  state: <MapPin className="h-5 w-5" />,
  labor: <Users className="h-5 w-5" />,
};

const MobileNav = ({ categories, activeCategory, onCategoryClick }: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle>Compliance Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav className="p-4 space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left",
                  activeCategory === category.id
                    ? "bg-accent/10 border border-accent/20"
                    : "hover:bg-muted/50 border border-transparent"
                )}
              >
                <CircularProgress
                  value={category.progress}
                  size={40}
                  strokeWidth={4}
                  showValue={false}
                  color={category.progress === 100 ? "emerald" : "teal"}
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "transition-colors",
                      activeCategory === category.id ? "text-accent" : "text-muted-foreground"
                    )}>
                      {categoryIcons[category.id]}
                    </span>
                    <span className={cn(
                      "font-medium text-sm",
                      activeCategory === category.id ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {category.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {category.completedCount}/{category.taskCount} tasks
                  </p>
                </div>
              </button>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
