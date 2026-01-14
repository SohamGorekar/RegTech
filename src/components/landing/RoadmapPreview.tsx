import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Lightbulb, MapPin, Building2, Route, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    title: "Tell Us Your Idea",
    description: "Select your sector—Fintech, EdTech, E-commerce, or more",
  },
  {
    icon: MapPin,
    title: "Pin Your Location",
    description: "Choose your city for hyper-local compliance rules",
  },
  {
    icon: Building2,
    title: "Choose Structure",
    description: "Private Limited, LLP, or Proprietorship—we guide you",
  },
  {
    icon: Route,
    title: "Get Your Roadmap",
    description: "AI-generated compliance checklist with deadlines",
  },
];

const RoadmapPreview = () => {
  return (
    <section id="how-it-works" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Your Journey to Compliance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to launch your legally compliant startup
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Step number circle */}
              <div className="absolute left-8 md:left-1/2 w-16 h-16 rounded-full bg-primary flex items-center justify-center z-10 -translate-x-1/2">
                <step.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content card */}
              <div
                className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-card rounded-xl p-6 shadow-md border border-border/50"
                >
                  <span className="text-sm font-medium text-accent mb-2 block">
                    Step {index + 1}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-card-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/onboarding">
            <Button className="btn-teal rounded-full px-8 py-6 text-lg group">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapPreview;
