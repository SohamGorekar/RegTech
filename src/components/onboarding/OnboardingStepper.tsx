import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
  steps: string[];
}

const OnboardingStepper = ({ currentStep, steps }: StepperProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-display font-bold transition-all duration-300 ${
                index < currentStep
                  ? "bg-accent text-accent-foreground"
                  : index === currentStep
                  ? "bg-primary text-primary-foreground animate-pulse-glow"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={`text-xs mt-2 font-medium hidden sm:block ${
                index <= currentStep ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {step}
            </span>
          </motion.div>

          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-24 h-1 mx-2 rounded transition-colors duration-300 ${
                index < currentStep ? "bg-accent" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OnboardingStepper;
