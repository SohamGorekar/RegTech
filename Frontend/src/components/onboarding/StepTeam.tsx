import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Users, User, Building } from "lucide-react";

interface StepTeamProps {
  value: number;
  onChange: (value: number) => void;
}

const StepTeam = ({ value, onChange }: StepTeamProps) => {
  const getTeamSize = () => {
    if (value === 1) return { label: "Solo Founder", icon: User };
    if (value <= 10) return { label: "Small Team", icon: Users };
    if (value <= 50) return { label: "Growing Team", icon: Users };
    return { label: "Established Team", icon: Building };
  };

  const teamInfo = getTeamSize();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          How big is your team?
        </h2>
        <p className="text-muted-foreground">
          Team size affects labor law compliance requirements
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <div className="bg-card rounded-xl p-8 border border-border shadow-md">
          <div className="flex items-center justify-center mb-8">
            <motion.div
              key={teamInfo.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <teamInfo.icon className="w-10 h-10 text-primary" />
              </div>
              <p className="text-4xl font-display font-bold text-primary mb-2">
                {value === 100 ? "100+" : value}
              </p>
              <p className="text-muted-foreground">{teamInfo.label}</p>
            </motion.div>
          </div>

          <div className="px-4">
            <Slider
              value={[value]}
              onValueChange={(v) => onChange(v[0])}
              min={1}
              max={100}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
              <span>1</span>
              <span>25</span>
              <span>50</span>
              <span>75</span>
              <span>100+</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 space-y-3"
        >
          {value >= 10 && (
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
              <p className="text-sm text-accent">
                ℹ️ With 10+ employees, you'll need to register under the Shops & Establishments Act.
              </p>
            </div>
          )}
          {value >= 20 && (
            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm text-gold">
                ⚠️ Companies with 20+ employees require PF and ESIC registration.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StepTeam;
