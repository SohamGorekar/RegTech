import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, User, Check } from "lucide-react";

const structures = [
  {
    value: "pvtltd",
    title: "Private Limited",
    icon: Building2,
    description: "Best for startups seeking funding. Limited liability, separate legal entity.",
    features: ["Limited liability protection", "Can raise external funding", "Perpetual succession"],
    recommended: true,
  },
  {
    value: "llp",
    title: "LLP",
    icon: Users,
    description: "Flexible partnership with limited liability. Great for professional services.",
    features: ["Partner flexibility", "Lower compliance", "Tax benefits"],
    recommended: false,
  },
  {
    value: "proprietorship",
    title: "Proprietorship",
    icon: User,
    description: "Simplest structure for solo founders. Quick to set up, minimal compliance.",
    features: ["Easiest to start", "Minimal paperwork", "Full control"],
    recommended: false,
  },
];

interface StepStructureProps {
  value: string;
  onChange: (value: string) => void;
}

const StepStructure = ({ value, onChange }: StepStructureProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Choose your business structure
        </h2>
        <p className="text-muted-foreground">
          This affects liability, taxation, and compliance requirements
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {structures.map((structure, index) => (
          <motion.div
            key={structure.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              onClick={() => onChange(structure.value)}
              className={`cursor-pointer h-full transition-all duration-300 hover:shadow-lg ${
                value === structure.value
                  ? "border-2 border-accent shadow-lg ring-2 ring-accent/20"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <CardHeader className="relative">
                {structure.recommended && (
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-medium">
                    Recommended
                  </div>
                )}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 ${
                  value === structure.value ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                }`}>
                  <structure.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl font-display">{structure.title}</CardTitle>
                <CardDescription>{structure.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {structure.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className={`w-4 h-4 ${value === structure.value ? "text-accent" : "text-muted-foreground"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StepStructure;
