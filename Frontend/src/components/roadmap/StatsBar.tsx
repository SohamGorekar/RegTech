import { motion } from "framer-motion";
import { IndianRupee, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import CircularProgress from "./CircularProgress";

interface StatsBarProps {
  readinessScore: number;
  estimatedFees: number;
  launchEta: number;
}

const StatsBar = ({ readinessScore, estimatedFees, launchEta }: StatsBarProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-5 bg-card border-border shadow-brand-md hover:shadow-brand-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Readiness Score</p>
              <p className="text-2xl font-bold text-foreground mt-1">{readinessScore}%</p>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-xs text-emerald-500">+5% this week</span>
              </div>
            </div>
            <CircularProgress
              value={readinessScore}
              size={56}
              strokeWidth={5}
              color={readinessScore >= 50 ? "teal" : "amber"}
            />
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-5 bg-card border-border shadow-brand-md hover:shadow-brand-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Est. Govt Fees</p>
              <div className="flex items-center gap-1 mt-1">
                <IndianRupee className="h-5 w-5 text-foreground" />
                <span className="text-2xl font-bold text-foreground">
                  {estimatedFees.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Excluding professional fees</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-gold/10 flex items-center justify-center">
              <IndianRupee className="h-7 w-7 text-gold" />
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-5 bg-card border-border shadow-brand-md hover:shadow-brand-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Launch ETA</p>
              <p className="text-2xl font-bold text-foreground mt-1">{launchEta} days</p>
              <p className="text-xs text-muted-foreground mt-2">Based on current pace</p>
            </div>
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-7 w-7 text-primary" />
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatsBar;
