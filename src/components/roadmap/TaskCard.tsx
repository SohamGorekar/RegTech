import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Clock,
  Lock,
  ExternalLink,
  Sparkles,
  ChevronDown,
  Shield,
  FileText,
  CreditCard,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface TaskCardProps {
  title: string;
  status: "completed" | "in-progress" | "pending" | "locked";
  timeline: string;
  description: string;
  requirements: string[];
  portalUrl?: string;
  sourceVerification?: string;
  onComplete?: () => void;
  isLocked?: boolean;
}

const requirementIcons: Record<string, React.ReactNode> = {
  Aadhaar: <User className="h-3 w-3" />,
  PAN: <CreditCard className="h-3 w-3" />,
  "Address Proof": <FileText className="h-3 w-3" />,
  default: <FileText className="h-3 w-3" />,
};

const TaskCard = ({
  title,
  status,
  timeline,
  description,
  requirements,
  portalUrl = "#",
  sourceVerification = "Verified via Master Direction 2026",
  onComplete,
  isLocked = false,
}: TaskCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleted, setIsCompleted] = useState(status === "completed");

  const handleComplete = () => {
    if (isLocked || isCompleted) return;
    
    setIsCompleted(true);
    onComplete?.();
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#0D9488", "#1E3A8A", "#B45309"],
    });
  };

  const actualStatus = isCompleted ? "completed" : status;

  const statusConfig = {
    completed: {
      icon: <Check className="h-4 w-4" />,
      bgClass: "bg-emerald-500",
      borderClass: "border-emerald-500/30",
      textClass: "text-emerald-600",
      cardClass: "bg-emerald-50 border-emerald-200",
    },
    "in-progress": {
      icon: <Clock className="h-4 w-4" />,
      bgClass: "bg-amber-500",
      borderClass: "border-amber-500/30",
      textClass: "text-amber-600",
      cardClass: "bg-amber-50 border-amber-200 animate-pulse-slow",
    },
    pending: {
      icon: <div className="h-2 w-2 rounded-full bg-muted-foreground" />,
      bgClass: "bg-muted",
      borderClass: "border-border",
      textClass: "text-muted-foreground",
      cardClass: "bg-card border-border",
    },
    locked: {
      icon: <Lock className="h-4 w-4" />,
      bgClass: "bg-muted",
      borderClass: "border-border",
      textClass: "text-muted-foreground",
      cardClass: "bg-muted/30 border-border opacity-60",
    },
  };

  const config = statusConfig[actualStatus] || statusConfig.pending;

  return (
    <motion.div
      layout
      className={cn(
        "rounded-lg border overflow-hidden transition-all duration-300",
        config.cardClass,
        isLocked && "cursor-not-allowed"
      )}
    >
      {/* Collapsed View */}
      <div
        onClick={() => !isLocked && setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/30 transition-colors",
          isLocked && "cursor-not-allowed"
        )}
      >
        {/* Status Icon */}
        <div
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center text-white shrink-0",
            config.bgClass
          )}
        >
          {config.icon}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-medium",
              actualStatus === "completed"
                ? "text-muted-foreground line-through"
                : "text-foreground"
            )}
          >
            {title}
          </p>
        </div>

        {/* Timeline Badge */}
        <Badge
          variant="outline"
          className={cn("shrink-0", config.borderClass, config.textClass)}
        >
          {timeline}
        </Badge>

        {/* Source Verified Badge */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
                <Badge
                  variant="secondary"
                  className="shrink-0 bg-primary/10 text-primary border-primary/20 gap-1 hidden sm:flex"
                >
                <Shield className="h-3 w-3" />
                Verified
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{sourceVerification}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Expand Icon */}
        <ChevronDown
          className={cn(
            "h-5 w-5 text-muted-foreground transition-transform duration-300",
            isExpanded && "rotate-180"
          )}
        />
      </div>

      {/* Expanded View */}
      <AnimatePresence>
        {isExpanded && !isLocked && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border"
          >
            <div className="p-4 space-y-4">
              {/* Description */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Why is this required?
                </h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">
                  Required Documents
                </h4>
                <div className="flex flex-wrap gap-2">
                  {requirements.map((req) => (
                    <Badge
                      key={req}
                      variant="outline"
                      className="bg-muted/50 gap-1.5"
                    >
                      {requirementIcons[req] || requirementIcons.default}
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  asChild
                >
                  <a href={portalUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Go to Portal
                  </a>
                </Button>

                {/* <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      size="sm"
                      className="gap-2 bg-accent hover:bg-accent/80 text-accent-foreground"
                    >
                      <Sparkles className="h-4 w-4" />
                      Draft with Gemini
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-lg">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent" />
                        AI Document Drafting
                      </SheetTitle>
                      <SheetDescription>
                        Let AI help you prepare documents for: {title}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground">
                          This feature will use Gemini AI to help you draft and
                          prepare the necessary documents. You'll be guided
                          through the process step by step.
                        </p>
                      </div>
                      <Button className="w-full gap-2 bg-accent hover:bg-accent/80">
                        <Sparkles className="h-4 w-4" />
                        Start Drafting
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet> */}

                {actualStatus !== "completed" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="gap-2 ml-auto text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComplete();
                    }}
                  >
                    <Check className="h-4 w-4" />
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskCard;
