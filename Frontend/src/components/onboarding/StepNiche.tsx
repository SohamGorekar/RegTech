import { motion } from "framer-motion";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { 
  Wallet, GraduationCap, ShoppingCart, UtensilsCrossed, 
  Cloud, Stethoscope, Factory, Truck, Palette, Building
} from "lucide-react";

const sectors = [
  { value: "fintech", label: "Fintech", icon: Wallet, description: "Payment gateways, lending, insurance" },
  { value: "edtech", label: "EdTech", icon: GraduationCap, description: "Online learning, skill development" },
  { value: "saas", label: "SaaS", icon: Cloud, description: "Software as a Service products" },
  { value: "ecommerce", label: "E-commerce", icon: ShoppingCart, description: "Online retail, marketplaces" },
  { value: "restrobar", label: "Restro-bar", icon: UtensilsCrossed, description: "Restaurants, bars, cafes" },
  { value: "cloudkitchen", label: "Cloud Kitchen", icon: UtensilsCrossed, description: "Delivery-only food service" },
  { value: "healthtech", label: "HealthTech", icon: Stethoscope, description: "Telemedicine, health apps" },
  { value: "manufacturing", label: "Manufacturing", icon: Factory, description: "Product manufacturing" },
  { value: "logistics", label: "Logistics", icon: Truck, description: "Delivery, warehousing, supply chain" },
  { value: "agency", label: "Digital Agency", icon: Palette, description: "Creative, marketing, tech services" },
];

interface StepNicheProps {
  value: string;
  onChange: (value: string) => void;
}

const StepNiche = ({ value, onChange }: StepNicheProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
          What's your business sector?
        </h2>
        <p className="text-muted-foreground">
          This helps us identify sector-specific regulations
        </p>
      </div>

      <Command className="rounded-xl border border-border shadow-lg bg-card max-w-2xl mx-auto">
        <CommandInput 
          placeholder="Search sectors..." 
          className="border-b border-border"
        />
        <CommandList className="max-h-80">
          <CommandEmpty>No sector found.</CommandEmpty>
          <CommandGroup>
            {sectors.map((sector) => (
              <CommandItem
                key={sector.value}
                value={sector.value}
                onSelect={() => onChange(sector.value)}
                className={`cursor-pointer p-4 transition-colors ${
                  value === sector.value 
                    ? "!bg-accent/15 border-l-4 border-accent" 
                    : "hover:!bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    value === sector.value ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                  }`}>
                    <sector.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{sector.label}</p>
                    <p className="text-sm text-muted-foreground">{sector.description}</p>
                  </div>
                  {value === sector.value && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                    >
                      <span className="text-white text-sm">✓</span>
                    </motion.div>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </motion.div>
  );
};

export default StepNiche;
