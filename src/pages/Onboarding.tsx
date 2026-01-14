import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import StepNiche from "@/components/onboarding/StepNiche";
import StepLocation from "@/components/onboarding/StepLocation";
import StepStructure from "@/components/onboarding/StepStructure";
import StepTeam from "@/components/onboarding/StepTeam";
import AILoadingDialog from "@/components/onboarding/AILoadingDialog";

const steps = ["Sector", "Location", "Structure", "Team"];

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [sector, setSector] = useState("");
  const [state, setState] = useState("maharashtra");
  const [city, setCity] = useState("");
  const [structure, setStructure] = useState("");
  const [teamSize, setTeamSize] = useState(5);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return sector !== "";
      case 1:
        return state !== "" && city !== "";
      case 2:
        return structure !== "";
      case 3:
        return teamSize > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Store data in localStorage for dashboard
    localStorage.setItem("regtech_data", JSON.stringify({
      sector,
      state,
      city,
      structure,
      teamSize,
    }));
    navigate("/roadmap");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepNiche value={sector} onChange={setSector} />;
      case 1:
        return (
          <StepLocation
            state={state}
            city={city}
            onStateChange={setState}
            onCityChange={setCity}
          />
        );
      case 2:
        return <StepStructure value={structure} onChange={setStructure} />;
      case 3:
        return <StepTeam value={teamSize} onChange={setTeamSize} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Stepper */}
            <OnboardingStepper currentStep={currentStep} steps={steps} />

            {/* Step content */}
            <div className="min-h-[400px]">{renderStep()}</div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-12">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-teal gap-2"
              >
                {currentStep === steps.length - 1 ? "Generate Roadmap" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />

      <AILoadingDialog open={isLoading} onComplete={handleLoadingComplete} />
    </div>
  );
};

export default Onboarding;
