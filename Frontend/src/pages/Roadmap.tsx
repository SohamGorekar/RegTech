// import { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import { Download, Share2, ChevronRight, Home } from "lucide-react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import Navbar from "@/components/Navbar";
// import RoadmapSidebar from "@/components/roadmap/RoadmapSidebar";
// import StatsBar from "@/components/roadmap/StatsBar";
// import TaskCard from "@/components/roadmap/TaskCard";
// import MobileNav from "@/components/roadmap/MobileNav";

// // Enhanced roadmap data with detailed information
// const roadmapData = [
//   {
//     id: "company",
//     category: "Company Registration",
//     tasks: [
//       {
//         id: "run",
//         title: "Choose unique company name (RUN)",
//         status: "completed" as const,
//         timeline: "Day 1",
//         description:
//           "Reserve a unique name for your company through the RUN (Reserve Unique Name) facility on MCA portal. This is the first step and prevents name conflicts with existing entities.",
//         requirements: ["Director's PAN", "Director's Aadhaar", "Proposed Names (2 options)"],
//         portalUrl: "https://www.mca.gov.in/MinistryV2/runllpservice.html",
//       },
//       {
//         id: "dsc",
//         title: "Apply for DSC (Digital Signature)",
//         status: "completed" as const,
//         timeline: "Day 2-3",
//         description:
//           "A Digital Signature Certificate is mandatory for filing documents electronically with MCA. All directors must obtain Class 3 DSC from authorized certifying agencies.",
//         requirements: ["Director's PAN", "Aadhaar", "Passport Photo", "Address Proof"],
//         portalUrl: "https://www.mca.gov.in/content/mca/global/en/acts-rules/dsc.html",
//       },
//       {
//         id: "din",
//         title: "Apply for DIN (Director ID)",
//         status: "in-progress" as const,
//         timeline: "Day 3-4",
//         description:
//           "Director Identification Number is a unique ID for company directors in India. It's allotted by MCA and is required before incorporation.",
//         requirements: ["PAN", "Aadhaar", "Passport Photo", "Address Proof", "Mobile Number"],
//         portalUrl: "https://www.mca.gov.in/MinistryV2/dinservices.html",
//       },
//       {
//         id: "spice",
//         title: "File SPICe+ form with MCA",
//         status: "pending" as const,
//         timeline: "Day 5-7",
//         description:
//           "SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus) is a single form for company incorporation, DIN allotment, PAN, TAN, EPFO, ESIC, and GST.",
//         requirements: ["DSC", "DIN", "Name Reservation", "MOA/AOA", "Registered Office Address"],
//         portalUrl: "https://www.mca.gov.in/MinistryV2/spaborplus.html",
//       },
//       {
//         id: "coi",
//         title: "Receive Certificate of Incorporation",
//         status: "pending" as const,
//         timeline: "Day 8-10",
//         description:
//           "Upon successful verification, MCA issues the Certificate of Incorporation along with PAN and TAN. This marks the official birth of your company.",
//         requirements: ["Approved SPICe+ Form", "Payment of Fees"],
//         portalUrl: "https://www.mca.gov.in",
//       },
//     ],
//   },
//   {
//     id: "tax",
//     category: "Tax Registrations",
//     tasks: [
//       {
//         id: "pan",
//         title: "Apply for PAN (Company)",
//         status: "pending" as const,
//         timeline: "Day 10-12",
//         description:
//           "Company PAN is auto-generated via SPICe+ but may need additional verification. It's essential for all financial transactions and tax filings.",
//         requirements: ["Certificate of Incorporation", "Director Details"],
//         portalUrl: "https://www.incometax.gov.in",
//       },
//       {
//         id: "tan",
//         title: "Apply for TAN",
//         status: "pending" as const,
//         timeline: "Day 10-12",
//         description:
//           "Tax Deduction and Collection Account Number is required for deducting TDS on salaries, rent, professional fees, and other payments.",
//         requirements: ["Company PAN", "Registered Address Proof"],
//         portalUrl: "https://www.tin-nsdl.com",
//       },
//       {
//         id: "gst",
//         title: "GST Registration",
//         status: "pending" as const,
//         timeline: "Day 12-15",
//         description:
//           "Goods and Services Tax registration is mandatory if your turnover exceeds ₹40L (goods) or ₹20L (services). Required for interstate sales and e-commerce.",
//         requirements: ["PAN", "Aadhaar", "Bank Account", "Business Address Proof", "Photos"],
//         portalUrl: "https://www.gst.gov.in",
//       },
//       {
//         id: "ptax",
//         title: "Professional Tax Registration",
//         status: "pending" as const,
//         timeline: "Day 15-18",
//         description:
//           "Professional Tax is a state-level tax on income earned by employees and professionals. Employers must register and deduct PT from employee salaries.",
//         requirements: ["PAN", "TAN", "Employee Details", "Business Registration"],
//         portalUrl: "https://mahagst.gov.in",
//       },
//     ],
//   },
//   {
//     id: "state",
//     category: "Maharashtra State Compliance",
//     tasks: [
//       {
//         id: "shop-est",
//         title: "Shop & Establishment License (Thane MC)",
//         status: "pending" as const,
//         timeline: "Day 18-22",
//         description:
//           "Required under Maharashtra Shops & Establishments Act for any commercial premises. Regulates working hours, leave policies, and employment conditions.",
//         requirements: ["Incorporation Certificate", "Rent Agreement", "Owner ID Proof", "Photos"],
//         portalUrl: "https://thanecity.gov.in",
//       },
//       {
//         id: "trade",
//         title: "Trade License",
//         status: "pending" as const,
//         timeline: "Day 22-25",
//         description:
//           "A trade license from local municipal corporation authorizes you to conduct specific business activities in the area. Required for most commercial operations.",
//         requirements: ["Shop & Establishment License", "GST Certificate", "NOC from Owner"],
//         portalUrl: "https://thanecity.gov.in",
//       },
//       {
//         id: "fire",
//         title: "Fire NOC (if applicable)",
//         status: "pending" as const,
//         timeline: "Day 25-30",
//         description:
//           "Fire No Objection Certificate may be required based on premises size and nature of business. Ensures fire safety compliance for commercial establishments.",
//         requirements: ["Floor Plan", "Fire Safety Equipment Details", "Building Permit"],
//         portalUrl: "https://firenoc.maharashtra.gov.in",
//       },
//     ],
//   },
//   {
//     id: "labor",
//     category: "Labor & Employment",
//     tasks: [
//       {
//         id: "pf",
//         title: "PF Registration (EPFO)",
//         status: "pending" as const,
//         timeline: "Day 30-35",
//         description:
//           "Provident Fund registration is mandatory when you have 20+ employees. Provides retirement benefits and is a key compliance for employers.",
//         requirements: ["PAN", "Incorporation Certificate", "Employee List", "Bank Details"],
//         portalUrl: "https://unifiedportal-emp.epfindia.gov.in",
//       },
//       {
//         id: "esi",
//         title: "ESI Registration",
//         status: "pending" as const,
//         timeline: "Day 30-35",
//         description:
//           "Employees' State Insurance provides health insurance and medical benefits. Mandatory for establishments with 10+ employees earning up to ₹21,000/month.",
//         requirements: ["PAN", "Employee Details", "Bank Account", "Address Proof"],
//         portalUrl: "https://www.esic.in",
//       },
//       {
//         id: "contracts",
//         title: "Draft Employment Contracts",
//         status: "pending" as const,
//         timeline: "Day 35-40",
//         description:
//           "Legally binding employment agreements protect both employer and employee. Should include salary, roles, confidentiality clauses, and termination terms.",
//         requirements: ["Offer Letter Template", "Company Policies", "NDA Template"],
//         portalUrl: "#",
//       },
//     ],
//   },
// ];

// const Roadmap = () => {
//   const [activeCategory, setActiveCategory] = useState("company");

//   // Calculate category progress and stats
//   const categories = useMemo(() => {
//     return roadmapData.map((section) => {
//       const completedCount = section.tasks.filter(
//         (t) => t.status === "completed"
//       ).length;
//       const progress = Math.round((completedCount / section.tasks.length) * 100);

//       return {
//         id: section.id,
//         name: section.category,
//         icon: null,
//         progress,
//         taskCount: section.tasks.length,
//         completedCount,
//       };
//     });
//   }, []);

//   // Calculate overall stats
//   const stats = useMemo(() => {
//     const allTasks = roadmapData.flatMap((s) => s.tasks);
//     const completedTasks = allTasks.filter((t) => t.status === "completed").length;
//     const readinessScore = Math.round((completedTasks / allTasks.length) * 100);

//     return {
//       readinessScore,
//       estimatedFees: 15500,
//       launchEta: 40 - Math.floor((completedTasks / allTasks.length) * 40),
//     };
//   }, []);

//   // Get active section
//   const activeSection = roadmapData.find((s) => s.id === activeCategory);

//   const handleCategoryClick = (id: string) => {
//     setActiveCategory(id);
//     // Scroll to top of content on mobile
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-background pt-16">
//         <div className="flex">
//           {/* Sidebar - Desktop */}
//           <RoadmapSidebar
//             categories={categories}
//             activeCategory={activeCategory}
//             onCategoryClick={handleCategoryClick}
//           />

//           {/* Main Content */}
//           <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-auto">
//             <div className="max-w-5xl mx-auto p-6 lg:p-8">
//               {/* Header */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mb-8"
//               >
//                 {/* Mobile Nav + Breadcrumb */}
//                 <div className="flex items-center gap-4 mb-4">
//                   <MobileNav
//                     categories={categories}
//                     activeCategory={activeCategory}
//                     onCategoryClick={handleCategoryClick}
//                   />

//                   <Breadcrumb>
//                     <BreadcrumbList>
//                       <BreadcrumbItem>
//                         <BreadcrumbLink asChild>
//                           <Link to="/dashboard" className="flex items-center gap-1">
//                             <Home className="h-4 w-4" />
//                             Dashboard
//                           </Link>
//                         </BreadcrumbLink>
//                       </BreadcrumbItem>
//                       <BreadcrumbSeparator>
//                         <ChevronRight className="h-4 w-4" />
//                       </BreadcrumbSeparator>
//                       <BreadcrumbItem>
//                         <BreadcrumbPage>Roadmap</BreadcrumbPage>
//                       </BreadcrumbItem>
//                     </BreadcrumbList>
//                   </Breadcrumb>
//                 </div>

//                 {/* Title and Actions */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div>
//                     <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
//                       Your Compliance Roadmap
//                     </h1>
//                     <p className="text-muted-foreground">
//                       SaaS Startup • Private Limited • Thane, Maharashtra
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               {/* Stats Bar */}
//               {/* <div className="mb-8">
//                 <StatsBar
//                   readinessScore={stats.readinessScore}
//                   estimatedFees={stats.estimatedFees}
//                   launchEta={stats.launchEta}
//                 />
//               </div> */}

//               {/* Active Category Tasks */}
//               <motion.div
//                 key={activeCategory}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <div className="flex items-center justify-between mb-4">
//                   <h2 className="text-lg font-semibold text-foreground">
//                     {activeSection?.category}
//                   </h2>
//                   <span className="text-sm text-muted-foreground">
//                     {activeSection?.tasks.filter((t) => t.status === "completed").length}/
//                     {activeSection?.tasks.length} completed
//                   </span>
//                 </div>

//                 <div className="space-y-3">
//                   {activeSection?.tasks.map((task, index) => {
//                     // Determine if task should be locked
//                     const previousTask = activeSection.tasks[index - 1];
//                     const isLocked =
//                       index > 0 &&
//                       previousTask?.status !== "completed" &&
//                       task.status === "pending";

//                     return (
//                       <motion.div
//                         key={task.id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                       >
//                         <TaskCard
//                           title={task.title}
//                           status={isLocked ? "locked" : task.status}
//                           timeline={task.timeline}
//                           description={task.description}
//                           requirements={task.requirements}
//                           portalUrl={task.portalUrl}
//                           isLocked={isLocked}
//                         />
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </motion.div>

//               {/* CTA Section */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="mt-12 bg-navy rounded-xl p-8 text-center"
//               >
//                 <h2 className="text-xl font-bold text-primary-foreground mb-2">
//                   Need Help Executing This Roadmap?
//                 </h2>
//                 <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
//                   Connect with our network of verified legal experts and CAs who
//                   specialize in startup compliance.
//                 </p>
//                 <Button className="bg-accent hover:bg-teal-light text-accent-foreground">
//                   Find a Professional
//                 </Button>
//               </motion.div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Roadmap;







import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Share2, ChevronRight, Home, Loader2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Navbar from "@/components/Navbar";
import RoadmapSidebar from "@/components/roadmap/RoadmapSidebar";
import StatsBar from "@/components/roadmap/StatsBar";
import TaskCard from "@/components/roadmap/TaskCard";
import MobileNav from "@/components/roadmap/MobileNav";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const API_URL = 'http://localhost:5000/api';

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending";
  timeline: string;
  description: string;
  requirements: string[];
  portalUrl: string;
}

interface RoadmapCategory {
  id: string;
  category: string;
  tasks: Task[];
}

interface ProjectData {
  id: string;
  name: string;
  description: string;
  sector: string;
  location: string;
  structure: string;
  teamSize: number;
  completedCount: number;
  totalCount: number;
  roadmapData: RoadmapCategory[];
}

const Roadmap = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("company");
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch project roadmap data
  useEffect(() => {
    const fetchRoadmap = async () => {
      if (!token || !projectId) {
        navigate('/auth');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/projects/${projectId}/roadmap`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          setProjectData(data.project);
          // Set first category as active
          if (data.project.roadmapData.length > 0) {
            setActiveCategory(data.project.roadmapData[0].id);
          }
        } else {
          toast({
            title: "Error",
            description: data.error || "Failed to fetch roadmap",
            variant: "destructive",
          });
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Fetch roadmap error:', error);
        toast({
          title: "Error",
          description: "Failed to load roadmap. Please try again.",
          variant: "destructive",
        });
        navigate('/dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmap();
  }, [projectId, token, navigate, toast]);

  // Handle task completion
  const handleTaskComplete = async (taskId: string) => {
    if (!projectId || !token) return;

    try {
      const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId,
          status: 'completed'
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update local state
        setProjectData(prev => {
          if (!prev) return null;
          
          return {
            ...prev,
            completedCount: data.completedCount,
            roadmapData: prev.roadmapData.map(category => ({
              ...category,
              tasks: category.tasks.map(task =>
                task.id === taskId ? { ...task, status: 'completed' as const } : task
              )
            }))
          };
        });

        toast({
          title: "Task Completed!",
          description: "Great progress! Keep going.",
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update task",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Update task error:', error);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      });
    }
  };

  // Calculate category progress and stats
  const categories = useMemo(() => {
    if (!projectData) return [];

    return projectData.roadmapData.map((section) => {
      const completedCount = section.tasks.filter(
        (t) => t.status === "completed"
      ).length;
      const progress = Math.round((completedCount / section.tasks.length) * 100);

      return {
        id: section.id,
        name: section.category,
        icon: null,
        progress,
        taskCount: section.tasks.length,
        completedCount,
      };
    });
  }, [projectData]);

  // Calculate overall stats
  const stats = useMemo(() => {
    if (!projectData) return { readinessScore: 0, estimatedFees: 0, launchEta: 40 };

    const readinessScore = projectData.totalCount > 0
      ? Math.round((projectData.completedCount / projectData.totalCount) * 100)
      : 0;

    return {
      readinessScore,
      estimatedFees: 15500,
      launchEta: 40 - Math.floor((projectData.completedCount / projectData.totalCount) * 40),
    };
  }, [projectData]);

  // Get active section
  const activeSection = projectData?.roadmapData.find((s) => s.id === activeCategory);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground">Loading your roadmap...</p>
          </div>
        </div>
      </>
    );
  }

  if (!projectData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Project not found</h2>
            <Link to="/dashboard">
              <Button className="mt-4">Go to Dashboard</Button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-16">
        <div className="flex">
          {/* Sidebar - Desktop */}
          <RoadmapSidebar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryClick={handleCategoryClick}
          />

          {/* Main Content */}
          <main className="flex-1 min-h-[calc(100vh-4rem)] overflow-auto">
            <div className="max-w-5xl mx-auto p-6 lg:p-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                {/* Mobile Nav + Breadcrumb */}
                <div className="flex items-center gap-4 mb-4">
                  <MobileNav
                    categories={categories}
                    activeCategory={activeCategory}
                    onCategoryClick={handleCategoryClick}
                  />

                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link to="/dashboard" className="flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            Dashboard
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage>Roadmap</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                {/* Title and Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                      {projectData.name}
                    </h1>
                    <p className="text-muted-foreground">
                      {projectData.sector} • {projectData.structure} • {projectData.location}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats Bar */}
              <div className="mb-8">
                <StatsBar
                  readinessScore={stats.readinessScore}
                  estimatedFees={stats.estimatedFees}
                  launchEta={stats.launchEta}
                />
              </div>

              {/* Active Category Tasks */}
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {activeSection?.category}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {activeSection?.tasks.filter((t) => t.status === "completed").length}/
                    {activeSection?.tasks.length} completed
                  </span>
                </div>

                <div className="space-y-3">
                  {activeSection?.tasks.map((task, index) => {
                    // Determine if task should be locked
                    const previousTask = activeSection.tasks[index - 1];
                    const isLocked =
                      index > 0 &&
                      previousTask?.status !== "completed" &&
                      task.status === "pending";

                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <TaskCard
                          title={task.title}
                          status={isLocked ? "locked" : task.status}
                          timeline={task.timeline}
                          description={task.description}
                          requirements={task.requirements}
                          portalUrl={task.portalUrl}
                          isLocked={isLocked}
                          onComplete={() => handleTaskComplete(task.id)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 bg-navy rounded-xl p-8 text-center"
              >
                <h2 className="text-xl font-bold text-primary-foreground mb-2">
                  Need Help Executing This Roadmap?
                </h2>
                <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
                  Connect with our network of verified legal experts and CAs who
                  specialize in startup compliance.
                </p>
                <Button className="bg-accent hover:bg-teal-light text-accent-foreground">
                  Find a Professional
                </Button>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Roadmap;