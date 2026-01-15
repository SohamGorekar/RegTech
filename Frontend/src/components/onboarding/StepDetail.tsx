import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface StepDetailProps {
  projectName: string;
  projectDescription: string;
  onProjectNameChange: (value: string) => void;
  onProjectDescriptionChange: (value: string) => void;
}

const StepDetail = ({
  projectName,
  projectDescription,
  onProjectNameChange,
  onProjectDescriptionChange,
}: StepDetailProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Tell us about your project
        </h2>
        <p className="text-muted-foreground">
          Provide basic details to get personalized regulatory guidance
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-card-foreground">Project Details</h3>
              <p className="text-sm text-muted-foreground">Basic information about your venture</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Project Name *
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => onProjectNameChange(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                placeholder="Enter your project name"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Choose a name that reflects your business identity
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Project Description *
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => onProjectDescriptionChange(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent min-h-[100px] resize-none transition-all duration-200"
                placeholder="Describe your project, goals, target market, and what you aim to achieve..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Be specific about your business model and objectives
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">i</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This information helps us tailor the compliance roadmap specifically for your business needs and industry context.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepDetail;