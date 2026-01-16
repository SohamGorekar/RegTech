// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
// import StepDetail from "@/components/onboarding/StepDetail";
// import StepNiche from "@/components/onboarding/StepNiche";
// import StepLocation from "@/components/onboarding/StepLocation";
// import StepStructure from "@/components/onboarding/StepStructure";
// import StepTeam from "@/components/onboarding/StepTeam";
// import AILoadingDialog from "@/components/onboarding/AILoadingDialog";

// const steps = ["Project Details", "Sector", "Location", "Structure", "Team"];

// const Onboarding = () => {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   // Form state - added projectName and projectDescription
//   const [projectName, setProjectName] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [sector, setSector] = useState("");
//   const [state, setState] = useState("maharashtra");
//   const [city, setCity] = useState("");
//   const [structure, setStructure] = useState("");
//   const [teamSize, setTeamSize] = useState(5);

//   const canProceed = () => {
//     switch (currentStep) {
//       case 0:
//         return projectName.trim() !== "" && projectDescription.trim() !== "";
//       case 1:
//         return sector !== "";
//       case 2:
//         return state !== "" && city !== "";
//       case 3:
//         return structure !== "";
//       case 4:
//         return teamSize > 0;
//       default:
//         return false;
//     }
//   };

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setIsLoading(true);
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleLoadingComplete = () => {
//     setIsLoading(false);
//     // Store data in localStorage for dashboard
//     localStorage.setItem("regtech_data", JSON.stringify({
//       projectName,
//       projectDescription,
//       sector,
//       state,
//       city,
//       structure,
//       teamSize,
//     }));
//     navigate("/roadmap");
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <StepDetail
//             projectName={projectName}
//             projectDescription={projectDescription}
//             onProjectNameChange={setProjectName}
//             onProjectDescriptionChange={setProjectDescription}
//           />
//         );
//       case 1:
//         return <StepNiche value={sector} onChange={setSector} />;
//       case 2:
//         return (
//           <StepLocation
//             state={state}
//             city={city}
//             onStateChange={setState}
//             onCityChange={setCity}
//           />
//         );
//       case 3:
//         return <StepStructure value={structure} onChange={setStructure} />;
//       case 4:
//         return <StepTeam value={teamSize} onChange={setTeamSize} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="pt-24 pb-8">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-4xl mx-auto"
//           >
//             {/* Stepper */}
//             <OnboardingStepper currentStep={currentStep} steps={steps} />

//             {/* Step content */}
//             <div className="min-h-[400px]">{renderStep()}</div>

//             {/* Navigation buttons */}
//             <div className="flex justify-between mt-12">
//               <Button
//                 variant="outline"
//                 onClick={handleBack}
//                 disabled={currentStep === 0}
//                 className="gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </Button>

//               <Button
//                 onClick={handleNext}
//                 disabled={!canProceed()}
//                 className="btn-teal gap-2"
//               >
//                 {currentStep === steps.length - 1 ? "Generate Roadmap" : "Next"}
//                 <ArrowRight className="w-4 h-4" />
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       <AILoadingDialog open={isLoading} onComplete={handleLoadingComplete} />
//     </div>
//   );
// };

// export default Onboarding;





// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
// import StepDetail from "@/components/onboarding/StepDetail";
// import StepNiche from "@/components/onboarding/StepNiche";
// import StepLocation from "@/components/onboarding/StepLocation";
// import StepStructure from "@/components/onboarding/StepStructure";
// import StepTeam from "@/components/onboarding/StepTeam";
// import AILoadingDialog from "@/components/onboarding/AILoadingDialog";
// import { useAuth } from "@/contexts/AuthContext";
// import { useToast } from "@/hooks/use-toast";

// const API_URL = 'http://localhost:5000/api';
// const steps = ["Project Details", "Sector", "Location", "Structure", "Team"];

// const Onboarding = () => {
//   const navigate = useNavigate();
//   const { token } = useAuth();
//   const { toast } = useToast();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

//   // Form state
//   const [projectName, setProjectName] = useState("");
//   const [projectDescription, setProjectDescription] = useState("");
//   const [sector, setSector] = useState("");
//   const [state, setState] = useState("maharashtra");
//   const [city, setCity] = useState("");
//   const [structure, setStructure] = useState("");
//   const [teamSize, setTeamSize] = useState(5);

//   const canProceed = () => {
//     switch (currentStep) {
//       case 0:
//         return projectName.trim() !== "" && projectDescription.trim() !== "";
//       case 1:
//         return sector !== "";
//       case 2:
//         return state !== "" && city !== "";
//       case 3:
//         return structure !== "";
//       case 4:
//         return teamSize > 0;
//       default:
//         return false;
//     }
//   };

//   const handleNext = async () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       // Final step - submit to backend
//       await handleSubmit();
//     }
//   };

//   const handleSubmit = async () => {
//     if (!token) {
//       toast({
//         title: "Error",
//         description: "You must be logged in to create a project",
//         variant: "destructive",
//       });
//       navigate('/auth');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch(`${API_URL}/projects`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           projectName,
//           projectDescription,
//           sector,
//           state,
//           city,
//           structure,
//           teamSize: Number(teamSize)
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         setCreatedProjectId(data.project.id);
//         // AI loading dialog will show, then redirect after animation
//         toast({
//           title: "Success!",
//           description: "Your project has been created successfully",
//         });
//       } else {
//         setIsLoading(false);
//         toast({
//           title: "Error",
//           description: data.error || "Failed to create project",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error('Create project error:', error);
//       setIsLoading(false);
//       toast({
//         title: "Error",
//         description: "Network error. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   const handleBack = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleLoadingComplete = () => {
//     setIsLoading(false);
    
//     // Navigate to the roadmap for the created project
//     if (createdProjectId) {
//       navigate(`/roadmap/${createdProjectId}`);
//     } else {
//       // Fallback to dashboard if no project ID
//       navigate("/dashboard");
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 0:
//         return (
//           <StepDetail
//             projectName={projectName}
//             projectDescription={projectDescription}
//             onProjectNameChange={setProjectName}
//             onProjectDescriptionChange={setProjectDescription}
//           />
//         );
//       case 1:
//         return <StepNiche value={sector} onChange={setSector} />;
//       case 2:
//         return (
//           <StepLocation
//             state={state}
//             city={city}
//             onStateChange={setState}
//             onCityChange={setCity}
//           />
//         );
//       case 3:
//         return <StepStructure value={structure} onChange={setStructure} />;
//       case 4:
//         return <StepTeam value={teamSize} onChange={setTeamSize} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="pt-24 pb-8">
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-4xl mx-auto"
//           >
//             {/* Stepper */}
//             <OnboardingStepper currentStep={currentStep} steps={steps} />

//             {/* Step content */}
//             <div className="min-h-[400px]">{renderStep()}</div>

//             {/* Navigation buttons */}
//             <div className="flex justify-between mt-12">
//               <Button
//                 variant="outline"
//                 onClick={handleBack}
//                 disabled={currentStep === 0 || isLoading}
//                 className="gap-2"
//               >
//                 <ArrowLeft className="w-4 h-4" />
//                 Back
//               </Button>

//               <Button
//                 onClick={handleNext}
//                 disabled={!canProceed() || isLoading}
//                 className="btn-teal gap-2"
//               >
//                 {currentStep === steps.length - 1 ? "Generate Roadmap" : "Next"}
//                 <ArrowRight className="w-4 h-4" />
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </main>

//       <AILoadingDialog open={isLoading} onComplete={handleLoadingComplete} />
//     </div>
//   );
// };

// export default Onboarding;




import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OnboardingStepper from "@/components/onboarding/OnboardingStepper";
import StepDetail from "@/components/onboarding/StepDetail";
import StepNiche from "@/components/onboarding/StepNiche";
import StepLocation from "@/components/onboarding/StepLocation";
import StepStructure from "@/components/onboarding/StepStructure";
import StepTeam from "@/components/onboarding/StepTeam";
import AILoadingDialog from "@/components/onboarding/AILoadingDialog";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:5000/api";
const steps = ["Project Details", "Sector", "Location", "Structure", "Team"];

const Onboarding = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);

  // Form state
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [sector, setSector] = useState("");
  const [state, setState] = useState("maharashtra");
  const [city, setCity] = useState("");
  const [structure, setStructure] = useState("");
  const [teamSize, setTeamSize] = useState(5);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return projectName.trim() !== "" && projectDescription.trim() !== "";
      case 1:
        return sector !== "";
      case 2:
        return state !== "" && city !== "";
      case 3:
        return structure !== "";
      case 4:
        return teamSize > 0;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit to backend
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!token) {
      toast({
        title: "Error",
        description: "You must be logged in to create a project",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsGenerating(true);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName,
          projectDescription,
          sector,
          state,
          city,
          structure,
          teamSize: Number(teamSize),
        }),
      });

      const data = await response.json();

      if (data.success) {
        setCreatedProjectId(data.project.id);
        setIsGenerating(false);
        toast({
          title: "Success!",
          description: "Your project has been created successfully",
        });
      } else {
        setIsLoading(false);
        setIsGenerating(false);
        toast({
          title: "Error",
          description: data.error || "Failed to create project",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Create project error:", error);
      setIsLoading(false);
      setIsGenerating(false);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);

    // Navigate to the roadmap for the created project
    if (createdProjectId) {
      navigate(`/roadmap/${createdProjectId}`);
    } else {
      // Fallback to dashboard if no project ID
      navigate("/dashboard");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <StepDetail
            projectName={projectName}
            projectDescription={projectDescription}
            onProjectNameChange={setProjectName}
            onProjectDescriptionChange={setProjectDescription}
          />
        );
      case 1:
        return <StepNiche value={sector} onChange={setSector} />;
      case 2:
        return (
          <StepLocation
            state={state}
            city={city}
            onStateChange={setState}
            onCityChange={setCity}
          />
        );
      case 3:
        return <StepStructure value={structure} onChange={setStructure} />;
      case 4:
        return <StepTeam value={teamSize} onChange={setTeamSize} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-8">
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
                disabled={currentStep === 0 || isLoading}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed() || isLoading}
                className="btn-teal gap-2"
              >
                {currentStep === steps.length - 1 ? "Generate Roadmap" : "Next"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <AILoadingDialog
        open={isLoading}
        onComplete={handleLoadingComplete}
        isGenerating={isGenerating}
      />
    </div>
  );
};

export default Onboarding;