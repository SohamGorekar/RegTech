import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin } from "lucide-react";

const states = [
  { value: "maharashtra", label: "Maharashtra" },
  { value: "karnataka", label: "Karnataka" },
  { value: "delhi", label: "Delhi NCR" },
  { value: "tamilnadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
];

const citiesByState: Record<string, { value: string; label: string }[]> = {
  maharashtra: [
    { value: "thane", label: "Thane" },
    { value: "mumbai", label: "Mumbai" },
    { value: "pune", label: "Pune" },
    { value: "nagpur", label: "Nagpur" },
  ],
  karnataka: [
    { value: "bangalore", label: "Bangalore" },
    { value: "mysore", label: "Mysore" },
  ],
  delhi: [
    { value: "delhi", label: "New Delhi" },
    { value: "gurgaon", label: "Gurgaon" },
    { value: "noida", label: "Noida" },
  ],
  tamilnadu: [
    { value: "chennai", label: "Chennai" },
    { value: "coimbatore", label: "Coimbatore" },
  ],
  telangana: [
    { value: "hyderabad", label: "Hyderabad" },
  ],
};

interface StepLocationProps {
  state: string;
  city: string;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

const StepLocation = ({ state, city, onStateChange, onCityChange }: StepLocationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          Where will you operate?
        </h2>
        <p className="text-muted-foreground">
          Location determines local permits and municipal requirements
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-card rounded-xl p-6 border border-border shadow-md">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-card-foreground">Business Location</h3>
              <p className="text-sm text-muted-foreground">Primary place of operation</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                State
              </label>
              <Select value={state} onValueChange={onStateChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                City
              </label>
              <Select 
                value={city} 
                onValueChange={onCityChange}
                disabled={!state}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={state ? "Select city" : "Select state first"} />
                </SelectTrigger>
                <SelectContent>
                  {(citiesByState[state] || []).map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {(city === "thane" || city === "pune") && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-accent/10 rounded-xl p-4 border border-accent/20"
          >
            <p className="text-sm text-accent font-medium">
              🎯 Great choice! We have deep expertise in {city === "thane" ? "Thane" : "Pune"} municipal regulations and local compliance requirements.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StepLocation;
