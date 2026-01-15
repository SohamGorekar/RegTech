import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  color?: "teal" | "navy" | "amber" | "emerald";
}

const CircularProgress = ({
  value,
  size = 60,
  strokeWidth = 6,
  className,
  showValue = true,
  color = "teal",
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  const colorClasses = {
    teal: "stroke-accent",
    navy: "stroke-primary",
    amber: "stroke-amber-500",
    emerald: "stroke-emerald-500",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn("transition-all duration-500 ease-out", colorClasses[color])}
        />
      </svg>
      {showValue && (
        <span className="absolute text-sm font-bold text-foreground">
          {value}%
        </span>
      )}
    </div>
  );
};

export default CircularProgress;
