import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Brain, MapPin } from "lucide-react";

const features = [
  {
    icon: FileSearch,
    title: "Fragmented Laws, Unified",
    description: "We aggregate central, state, and local regulations into one coherent roadmap. No more hunting through gazette notifications.",
    gradient: "from-primary to-primary/70",
  },
  {
    icon: Brain,
    title: "AI-Powered Drafting",
    description: "Generate compliant MOAs, AOAs, and policy documents with Gemini AI. Each draft is tailored to your specific business structure.",
    gradient: "from-accent to-accent/70",
  },
  {
    icon: MapPin,
    title: "Hyper-Local Expertise",
    description: "From Thane Municipal trade licenses to Pune MPCB clearances—we know the local rules that trip up most founders.",
    gradient: "from-gold to-gold/70",
  },
];

const FeatureGrid = () => {
  return (
    <section id="sectors" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Why Founders Choose RegTech
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built specifically for India's unique regulatory complexity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="card-hover h-full border-border/50 bg-card">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-display">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
