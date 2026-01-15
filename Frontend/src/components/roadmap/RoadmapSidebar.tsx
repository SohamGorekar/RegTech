import { motion } from "framer-motion";
import { Building2, Receipt, MapPin, Users, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CircularProgress from "./CircularProgress";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  progress: number;
  taskCount: number;
  completedCount: number;
}

interface RoadmapSidebarProps {
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

const RoadmapSidebar = ({
  categories,
  activeCategory,
  onCategoryClick,
}: RoadmapSidebarProps) => {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-card border-r border-border h-[calc(100vh-4rem)]">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Compliance Categories</h2>
        <p className="text-sm text-muted-foreground mt-1">Track your progress</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-2">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onCategoryClick(category.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 group text-left",
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
                    activeCategory === category.id ? "text-accent" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {categoryIcons[category.id] || category.icon}
                  </span>
                  <span className={cn(
                    "font-medium text-sm truncate",
                    activeCategory === category.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {category.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category.completedCount}/{category.taskCount} tasks
                </p>
              </div>
              
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                activeCategory === category.id ? "text-accent rotate-90" : "text-muted-foreground"
              )} />
            </motion.button>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="p-4 border-t border-border">
        <div className="bg-primary rounded-lg p-4 text-center">
          <p className="text-primary-foreground text-sm font-medium">Need Expert Help?</p>
          <p className="text-primary-foreground/70 text-xs mt-1">Connect with verified CAs</p>
        </div>
      </div>
    </aside>
  );
};

export default RoadmapSidebar;
