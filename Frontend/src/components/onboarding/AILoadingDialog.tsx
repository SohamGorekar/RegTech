import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Scale, FileSearch, MapPin, Shield, Sparkles, CheckCircle } from "lucide-react";

const loadingSteps = [
  { message: "Analyzing your business requirements...", icon: FileSearch },
  { message: "Scanning regulatory databases...", icon: MapPin },
  { message: "Checking sector-specific compliance...", icon: Scale },
  { message: "Reviewing state & local laws...", icon: Shield },
  { message: "Generating personalized roadmap...", icon: Sparkles },
];

interface AILoadingDialogProps {
  open: boolean;
  onComplete: () => void;
  isGenerating?: boolean;  // NEW: tracks if API is still running
}

const AILoadingDialog = ({ open, onComplete, isGenerating = true }: AILoadingDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setProgress(0);
      setIsDone(false);
      return;
    }

    // Cycle through steps while generating
    const stepDuration = 3000; // 3 seconds per step
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (isDone) return 100;
        // Don't go past 95% until API is done
        const maxProgress = isGenerating ? 95 : 100;
        if (prev >= maxProgress) return prev;
        return prev + 1;
      });
    }, 100);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        // Keep cycling through steps while generating
        if (isGenerating) {
          return (prev + 1) % loadingSteps.length;
        }
        return prev;
      });
    }, stepDuration);

    // When API is done, complete animation
    if (!isGenerating && !isDone) {
      setIsDone(true);
      setProgress(100);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [open, isGenerating, isDone, onComplete]);

  const CurrentIcon = isDone ? CheckCircle : (loadingSteps[currentStep]?.icon || Sparkles);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-card border-border [&>button]:hidden">
        <div className="py-8">
          <div className="flex flex-col items-center text-center">
            {/* Animated icon */}
            <motion.div
              key={isDone ? 'done' : currentStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-glow ${
                isDone ? 'bg-emerald-500' : 'gradient-teal'
              }`}
            >
              <CurrentIcon className="w-10 h-10 text-white" />
            </motion.div>

            {/* Progress bar */}
            <div className="w-full mb-6">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Loading message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={isDone ? 'done' : currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg font-medium text-card-foreground mb-2"
              >
                {isDone ? "Roadmap generated successfully!" : loadingSteps[currentStep]?.message}
              </motion.p>
            </AnimatePresence>

            <p className="text-sm text-muted-foreground">
              {isDone ? "Redirecting to your roadmap..." : "AI is analyzing regulations for your business..."}
            </p>

            {/* Step indicators */}
            <div className="flex gap-2 mt-6">
              {loadingSteps.map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: index === currentStep && !isDone ? 1.2 : 1,
                    backgroundColor: isDone || index <= currentStep
                      ? "hsl(173 90% 32%)"
                      : "hsl(var(--muted))",
                  }}
                  className="w-2 h-2 rounded-full"
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AILoadingDialog;