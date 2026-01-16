// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import {
//   Plus,
//   ShoppingCart,
//   Wallet,
//   UtensilsCrossed,
//   Code,
//   Briefcase,
//   MapPin,
//   Building2,
//   ChevronRight,
//   Sparkles
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useAuth } from "@/contexts/AuthContext";
// import CircularProgress from "@/components/roadmap/CircularProgress";

// // Sector icons mapping
// const sectorIcons = {
//   ecommerce: ShoppingCart,
//   fintech: Wallet,
//   restaurant: UtensilsCrossed,
//   saas: Code,
//   consulting: Briefcase,
//   default: Building2,
// };

// // Mock project data - in real app, this would come from database
// const mockProjects = [
//   {
//     id: "1",
//     name: "QuickCart India",
//     sector: "ecommerce",
//     location: "Thane, MH",
//     structure: "Pvt Ltd",
//     progress: 45,
//     totalTasks: 18,
//     completedTasks: 8,
//     createdAt: "2024-01-15",
//   },
//   {
//     id: "2",
//     name: "PayEasy Solutions",
//     sector: "fintech",
//     location: "Pune, MH",
//     structure: "LLP",
//     progress: 72,
//     totalTasks: 22,
//     completedTasks: 16,
//     createdAt: "2024-02-20",
//   },
//   {
//     id: "3",
//     name: "Spice Junction",
//     sector: "restaurant",
//     location: "Mumbai, MH",
//     structure: "Proprietorship",
//     progress: 20,
//     totalTasks: 15,
//     completedTasks: 3,
//     createdAt: "2024-03-10",
//   },
// ];

// const Dashboard = () => {
//   const { user } = useAuth();
//   const [projects, setProjects] = useState(mockProjects);

//   // Check for newly created project from onboarding
//   useEffect(() => {
//     const storedData = localStorage.getItem("regtech_data");
//     if (storedData) {
//       const data = JSON.parse(storedData);
//       // Check if this project already exists (by checking if it was just created)
//       const existingNewProject = projects.find(p => p.id === "new");
//       if (!existingNewProject && data.sector) {
//         const newProject = {
//           id: "new",
//           name: `My ${data.sector.charAt(0).toUpperCase() + data.sector.slice(1)} Startup`,
//           sector: data.sector,
//           location: `${data.city.charAt(0).toUpperCase() + data.city.slice(1)}, MH`,
//           structure: data.structure === "pvtltd" ? "Pvt Ltd" : data.structure === "llp" ? "LLP" : "Proprietorship",
//           progress: 12,
//           totalTasks: 18,
//           completedTasks: 2,
//           createdAt: new Date().toISOString().split('T')[0],
//         };
//         setProjects(prev => [newProject, ...prev]);
//       }
//     }
//   }, []);

//   const getSectorIcon = (sector: string) => {
//     return sectorIcons[sector as keyof typeof sectorIcons] || sectorIcons.default;
//   };

//   const getProgressColor = (progress: number): "emerald" | "teal" | "amber" => {
//     if (progress >= 75) return "emerald";
//     if (progress >= 40) return "teal";
//     return "amber";
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       <main className="pt-24 pb-20">
//         <div className="container mx-auto px-6">
//           {/* Welcome Header */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-10"
//           >
//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//               <div>
//                 <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
//                   Hello, {user?.name?.split(' ')[0] || 'Founder'} 👋
//                 </h1>
//                 <p className="text-muted-foreground text-lg">
//                   Welcome to your startup command center. Track and manage all your compliance journeys.
//                 </p>
//               </div>

//               <Link to="/onboarding">
//                 <Button className="btn-teal gap-2 px-6 py-6 text-base font-semibold shadow-brand-md hover:shadow-brand-lg transition-all">
//                   <Plus className="w-5 h-5" />
//                   Create New Project
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>

//           {/* Stats Overview */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
//           >
//             <Card className="bg-card border-border">
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
//                     <Building2 className="w-6 h-6 text-primary" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-foreground">{projects.length}</p>
//                     <p className="text-sm text-muted-foreground">Active Projects</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="bg-card border-border">
//               <CardContent className="p-6">
//                 <div className="flex items-center gap-4">
//                   <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
//                     <Sparkles className="w-6 h-6 text-accent" />
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-foreground">
//                       {projects.reduce((acc, p) => acc + p.completedTasks, 0)}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Tasks Completed</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Section Title */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="mb-6"
//           >
//             <h2 className="text-xl font-semibold text-foreground">Your Projects</h2>
//             <p className="text-muted-foreground">Click on a project to view its compliance roadmap</p>
//           </motion.div>

//           {/* Project Grid */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {projects.map((project, index) => {
//               const IconComponent = getSectorIcon(project.sector);

//               return (
//                 <motion.div
//                   key={project.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 * index }}
//                   whileHover={{ y: -4 }}
//                   className="group"
//                 >
//                   <Card className="h-full bg-card border-border hover:border-accent/50 hover:shadow-brand-md transition-all duration-300 overflow-hidden">
//                     <CardContent className="p-6">
//                       {/* Header */}
//                       <div className="flex items-start justify-between mb-6">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
//                             <IconComponent className="w-6 h-6 text-primary-foreground" />
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
//                               {project.name}
//                             </h3>
//                             <p className="text-sm text-muted-foreground capitalize">
//                               {project.sector}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Metadata */}
//                       <div className="flex flex-wrap gap-2 mb-6">
//                         <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
//                           <MapPin className="w-3 h-3" />
//                           {project.location}
//                         </span>
//                         <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
//                           <Building2 className="w-3 h-3" />
//                           {project.structure}
//                         </span>
//                       </div>

//                       {/* Progress Ring */}
//                       <div className="flex items-center justify-center mb-6">
//                         <CircularProgress
//                           value={project.progress}
//                           size={100}
//                           strokeWidth={8}
//                           showValue={true}
//                           color={getProgressColor(project.progress)}
//                         />
//                       </div>

//                       {/* Task Count */}
//                       <p className="text-center text-sm text-muted-foreground mb-6">
//                         {project.completedTasks} of {project.totalTasks} tasks completed
//                       </p>

//                       {/* Action Button */}
//                       <Link to="/roadmap" className="block">
//                         <Button
//                           className="w-full btn-teal gap-2 group-hover:shadow-brand-sm transition-all"
//                         >
//                           View Full Roadmap
//                           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                         </Button>
//                       </Link>
//                     </CardContent>
//                   </Card>
//                 </motion.div>
//               );
//             })}

//             {/* Add New Project Card */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 * projects.length }}
//               whileHover={{ y: -4 }}
//             >
//               <Link to="/onboarding" className="block h-full">
//                 <Card className="h-full bg-card/50 border-2 border-dashed border-border hover:border-accent/50 hover:bg-card transition-all duration-300 cursor-pointer">
//                   <CardContent className="p-6 h-full flex flex-col items-center justify-center min-h-[320px]">
//                     <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
//                       <Plus className="w-8 h-8 text-accent" />
//                     </div>
//                     <h3 className="font-semibold text-foreground mb-2">Start New Project</h3>
//                     <p className="text-sm text-muted-foreground text-center">
//                       Launch your next startup with our AI-powered compliance roadmap
//                     </p>
//                   </CardContent>
//                 </Card>
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Plus,
  ShoppingCart,
  Wallet,
  UtensilsCrossed,
  Code,
  Briefcase,
  MapPin,
  Building2,
  ChevronRight,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import CircularProgress from "@/components/roadmap/CircularProgress";
import { useToast } from "@/hooks/use-toast";

const API_URL = "http://localhost:5000/api";

// Sector icons mapping
const sectorIcons = {
  ecommerce: ShoppingCart,
  fintech: Wallet,
  restaurant: UtensilsCrossed,
  saas: Code,
  consulting: Briefcase,
  default: Building2,
};

interface Project {
  id: string;
  name: string;
  description: string | null;
  sector: string;
  location: string;
  structure: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
  createdAt: string;
}

interface DashboardStats {
  totalProjects: number;
  totalTasksCompleted: number;
  totalTasks: number;
}

const Dashboard = () => {
  const { user, token } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    totalTasksCompleted: 0,
    totalTasks: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${API_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          setProjects(data.projects || []);
          setStats(
            data.stats || {
              totalProjects: 0,
              totalTasksCompleted: 0,
              totalTasks: 0,
            }
          );
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch projects",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Fetch projects error:", error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [token, toast]);

  const getSectorIcon = (sector: string) => {
    return (
      sectorIcons[sector as keyof typeof sectorIcons] || sectorIcons.default
    );
  };

  const getProgressColor = (progress: number): "emerald" | "teal" | "amber" => {
    if (progress >= 75) return "emerald";
    if (progress >= 40) return "teal";
    return "amber";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-6 flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading your projects...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                  Hello, {user?.name?.split(" ")[0] || "Founder"} 👋
                </h1>
                <p className="text-muted-foreground text-lg">
                  Welcome to your startup command center. Track and manage all
                  your compliance journeys.
                </p>
              </div>

              <Link to="/onboarding">
                <Button className="btn-teal gap-2 px-6 py-6 text-base font-semibold shadow-brand-md hover:shadow-brand-lg transition-all">
                  <Plus className="w-5 h-5" />
                  Create New Project
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.totalProjects}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Active Projects
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {stats.totalTasksCompleted}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Tasks Completed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-xl font-semibold text-foreground">
              Your Projects
            </h2>
            <p className="text-muted-foreground">
              Click on a project to view its compliance roadmap
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Building2 className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No projects yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create your first project to get started!
                </p>
                <Link to="/onboarding">
                  <Button className="btn-teal gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Project
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                {projects.map((project, index) => {
                  const IconComponent = getSectorIcon(project.sector);

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ y: -4 }}
                      className="group"
                    >
                      <Card className="h-full bg-card border-border hover:border-accent/50 hover:shadow-brand-md transition-all duration-300 overflow-hidden">
                        <CardContent className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
                                <IconComponent className="w-6 h-6 text-primary-foreground" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                                  {project.name}
                                </h3>
                                <p className="text-sm text-muted-foreground capitalize">
                                  {project.sector}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              {project.location}
                            </span>
                            <span className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
                              <Building2 className="w-3 h-3" />
                              {project.structure}
                            </span>
                          </div>

                          {/* Progress Ring */}
                          <div className="flex items-center justify-center mb-6">
                            <CircularProgress
                              value={project.progress}
                              size={100}
                              strokeWidth={8}
                              showValue={true}
                              color={getProgressColor(project.progress)}
                            />
                          </div>

                          {/* Task Count */}
                          <p className="text-center text-sm text-muted-foreground mb-6">
                            {project.completedTasks} of {project.totalTasks}{" "}
                            tasks completed
                          </p>

                          {/* Action Button */}
                          <Link to={`/roadmap/${project.id}`} className="block">
                            <Button className="w-full btn-teal gap-2 group-hover:shadow-brand-sm transition-all">
                              View Full Roadmap
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}

                {/* Add New Project Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * projects.length }}
                  whileHover={{ y: -4 }}
                >
                  <Link to="/onboarding" className="block h-full">
                    <Card className="h-full bg-card/50 border-2 border-dashed border-border hover:border-accent/50 hover:bg-card transition-all duration-300 cursor-pointer">
                      <CardContent className="p-6 h-full flex flex-col items-center justify-center min-h-[320px]">
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                          <Plus className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          Start New Project
                        </h3>
                        <p className="text-sm text-muted-foreground text-center">
                          Launch your next startup with our AI-powered
                          compliance roadmap
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
