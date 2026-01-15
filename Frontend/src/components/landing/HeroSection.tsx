import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileCheck, Shield, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Compliance</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              Go from{" "}
              <span className="text-gradient">Idea</span> to{" "}
              <span className="text-gradient-gold">Incorporated</span>{" "}
              in Minutes
            </h1>

            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Navigate India's complex regulatory maze with AI-powered guidance. 
              From MCA filings to local Thane & Pune permits—we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/Dashboard">
                <Button className="btn-teal rounded-full px-8 py-6 text-lg group">
                  Launch My Startup
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/#how-it-works">
                <button 
                  className="rounded-full px-8 py-4 text-lg font-medium border-2 border-white/40 text-white bg-white/5 hover:bg-white/15 hover:border-white/60 transition-all duration-200"
                >
                  Watch Demo
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 mt-10 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm">Bank-grade Security</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <FileCheck className="w-5 h-5 text-accent" />
                <span className="text-sm">Govt. Verified Sources</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Abstract illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Document mockup */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md mx-auto border border-border">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-gold" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-5/6" />
                    
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg gradient-teal flex items-center justify-center">
                          <FileCheck className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <div>
                          <div className="h-3 bg-accent/30 rounded w-32 mb-2" />
                          <div className="h-2 bg-muted rounded w-24" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <div className="px-3 py-1.5 rounded-full bg-accent/20 text-accent text-xs">GST Ready</div>
                      <div className="px-3 py-1.5 rounded-full bg-gold/20 text-gold text-xs">DPDP Compliant</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full gradient-gold flex items-center justify-center">
                    <span className="text-gold-foreground text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">MCA Approved</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-lg p-4 border border-border"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <span className="text-accent-foreground text-xs font-bold">AI</span>
                  </div>
                  <span className="text-sm font-medium text-card-foreground">Processing...</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
