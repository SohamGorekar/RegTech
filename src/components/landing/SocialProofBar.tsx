import { motion } from "framer-motion";
import { Users, IndianRupee, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Startups Registered",
  },
  {
    icon: IndianRupee,
    value: "₹2Cr+",
    label: "Saved in Legal Fees",
  },
  {
    icon: Clock,
    value: "72hrs",
    label: "Average Time to Incorporate",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Compliance Success Rate",
  },
];

const SocialProofBar = () => {
  return (
    <section className="py-8 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-display font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofBar;
