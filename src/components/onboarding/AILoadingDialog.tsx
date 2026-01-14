import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Scale, FileSearch, MapPin, Shield, Sparkles } from "lucide-react";

const loadingSteps = [
  { message: "Scanning MCA Master Directions...", icon: FileSearch },
  { message: "Checking Thane Municipal Bye-laws...", icon: MapPin },
  { message: "Analyzing GST compliance requirements...", icon: Scale },
  { message: "Generating DPDP Privacy Framework...", icon: Shield },
  { message: "Finalizing your personalized roadmap...", icon: Sparkles },
];

interface AILoadingDialogProps {
  open: boolean;
  onComplete: () => void;
}

const AILoadingDialog = ({ open, onComplete }: AILoadingDialogProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setProgress(0);
      return;
    }

    const stepDuration = 1500;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = ((currentStep + 1) / loadingSteps.length) * 100;
        if (prev >= target - 5) return prev;
        return prev + 2;
      });
    }, 50);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= loadingSteps.length - 1) {
          clearInterval(stepInterval);
          clearInterval(progressInterval);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [open, currentStep, onComplete]);

  const CurrentIcon = loadingSteps[currentStep]?.icon || Sparkles;

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-card border-border [&>button]:hidden">
        <div className="py-8">
          <div className="flex flex-col items-center text-center">
            {/* Animated icon */}
            <motion.div
              key={currentStep}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="w-20 h-20 rounded-full gradient-teal flex items-center justify-center mb-6 shadow-glow"
            >
              <CurrentIcon className="w-10 h-10 text-accent-foreground" />
            </motion.div>

            {/* Progress bar */}
            <div className="w-full mb-6">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Loading message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-lg font-medium text-card-foreground mb-2"
              >
                {loadingSteps[currentStep]?.message}
              </motion.p>
            </AnimatePresence>

            <p className="text-sm text-muted-foreground">
              Our AI is analyzing regulations for your specific case
            </p>

            {/* Step indicators */}
            <div className="flex gap-2 mt-6">
              {loadingSteps.map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8 }}
                  animate={{
                    scale: index === currentStep ? 1.2 : 1,
                    backgroundColor:
                      index <= currentStep
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
