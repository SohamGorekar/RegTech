// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { 
//   Building2, Receipt, MapPin, Users, ChevronDown, 
//   ExternalLink, Sparkles, Check, Clock, CircleDollarSign,
//   Scale, Menu
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// interface Task {
//   id: string;
//   title: string;
//   day: number;
//   status: "pending" | "completed";
//   aiBreakdown: string;
//   documents: string[];
//   portalUrl: string;
//   category: string;
// }

// const categories = [
//   { id: "incorporation", label: "Central Incorporation", icon: Building2, color: "bg-primary" },
//   { id: "tax", label: "Tax & GST", icon: Receipt, color: "bg-accent" },
//   { id: "local", label: "State/Local Permits", icon: MapPin, color: "bg-gold" },
//   { id: "labor", label: "Labor Laws", icon: Users, color: "bg-destructive" },
// ];

// const taskData: Task[] = [
//   {
//     id: "1",
//     title: "Digital Signature Certificate (DSC)",
//     day: 1,
//     status: "completed",
//     aiBreakdown: "DSC is mandatory for all directors to sign MCA forms electronically. Class 3 DSC with 2-year validity is recommended.",
//     documents: ["PAN Card", "Aadhaar Card", "Passport Photo", "Video Verification"],
//     portalUrl: "https://www.mca.gov.in",
//     category: "incorporation",
//   },
//   {
//     id: "2",
//     title: "Director Identification Number (DIN)",
//     day: 2,
//     status: "completed",
//     aiBreakdown: "Each director needs a unique DIN. Apply via SPICe+ form. Valid for lifetime unless disqualified.",
//     documents: ["DSC", "PAN Card", "Address Proof"],
//     portalUrl: "https://www.mca.gov.in",
//     category: "incorporation",
//   },
//   {
//     id: "3",
//     title: "Name Reservation (RUN)",
//     day: 3,
//     status: "pending",
//     aiBreakdown: "Reserve up to 2 proposed names via RUN (Reserve Unique Name). Names valid for 20 days after approval.",
//     documents: ["Proposed Names List", "Business Description"],
//     portalUrl: "https://www.mca.gov.in",
//     category: "incorporation",
//   },
//   {
//     id: "4",
//     title: "SPICe+ Company Incorporation",
//     day: 5,
//     status: "pending",
//     aiBreakdown: "Single integrated form for incorporation, PAN, TAN, GST, EPFO, ESIC. Submit MOA and AOA.",
//     documents: ["MOA", "AOA", "Director Consent", "Registered Office Proof"],
//     portalUrl: "https://www.mca.gov.in",
//     category: "incorporation",
//   },
//   {
//     id: "5",
//     title: "GST Registration",
//     day: 7,
//     status: "pending",
//     aiBreakdown: "Mandatory if turnover exceeds ₹40L (₹20L for services). Apply with bank account details and address proof.",
//     documents: ["PAN", "Certificate of Incorporation", "Bank Statement", "Address Proof"],
//     portalUrl: "https://www.gst.gov.in",
//     category: "tax",
//   },
//   {
//     id: "6",
//     title: "Professional Tax Registration",
//     day: 10,
//     status: "pending",
//     aiBreakdown: "Maharashtra requires PT registration within 30 days of hiring first employee. Monthly filing required.",
//     documents: ["PAN", "GST Certificate", "Salary Register"],
//     portalUrl: "https://mahagst.gov.in",
//     category: "tax",
//   },
//   {
//     id: "7",
//     title: "Thane Municipal Trade License",
//     day: 14,
//     status: "pending",
//     aiBreakdown: "Required for all commercial establishments in Thane. Apply at TMC office with NOC from landlord.",
//     documents: ["Property NOC", "ID Proof", "Address Proof", "Fire Safety Certificate"],
//     portalUrl: "https://thanecity.gov.in",
//     category: "local",
//   },
//   {
//     id: "8",
//     title: "Shop & Establishment Registration",
//     day: 12,
//     status: "pending",
//     aiBreakdown: "Mandatory registration under Maharashtra Shops Act. Apply within 30 days of commencement.",
//     documents: ["Address Proof", "PAN", "Employee List"],
//     portalUrl: "https://mahalabour.gov.in",
//     category: "labor",
//   },
//   {
//     id: "9",
//     title: "EPFO Registration",
//     day: 15,
//     status: "pending",
//     aiBreakdown: "Required when you have 20+ employees. Employer contributes 12% of basic salary.",
//     documents: ["PAN", "Bank Details", "Employee Aadhaar"],
//     portalUrl: "https://unifiedportal-emp.epfindia.gov.in",
//     category: "labor",
//   },
//   {
//     id: "10",
//     title: "ESIC Registration",
//     day: 15,
//     status: "pending",
//     aiBreakdown: "Mandatory for establishments with 10+ employees where wages are below ₹21,000/month.",
//     documents: ["PAN", "Bank Statement", "Address Proof"],
//     portalUrl: "https://www.esic.in",
//     category: "labor",
//   },
// ];

// const Dashboard = () => {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [tasks, setTasks] = useState<Task[]>(taskData);
//   const [userData, setUserData] = useState<any>(null);

//   useEffect(() => {
//     const data = localStorage.getItem("regtech_data");
//     if (data) {
//       setUserData(JSON.parse(data));
//     }
//   }, []);

//   const completedCount = tasks.filter((t) => t.status === "completed").length;
//   const progress = (completedCount / tasks.length) * 100;

//   const filteredTasks = selectedCategory === "all" 
//     ? tasks 
//     : tasks.filter((t) => t.category === selectedCategory);

//   const getCategoryProgress = (categoryId: string) => {
//     const categoryTasks = tasks.filter((t) => t.category === categoryId);
//     const completed = categoryTasks.filter((t) => t.status === "completed").length;
//     return categoryTasks.length > 0 ? (completed / categoryTasks.length) * 100 : 0;
//   };

//   const toggleTaskStatus = (taskId: string) => {
//     setTasks((prev) =>
//       prev.map((t) =>
//         t.id === taskId
//           ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
//           : t
//       )
//     );
//   };

//   const Sidebar = () => (
//     <div className="h-full bg-sidebar text-sidebar-foreground">
//       <div className="p-6 border-b border-sidebar-border">
//         <Link to="/" className="flex items-center gap-2">
//           <div className="w-10 h-10 rounded-lg gradient-teal flex items-center justify-center">
//             <Scale className="w-5 h-5 text-accent-foreground" />
//           </div>
//           <span className="text-xl font-display font-bold">RegTech</span>
//         </Link>
//       </div>

//       <ScrollArea className="h-[calc(100vh-200px)]">
//         <div className="p-4 space-y-2">
//           <button
//             onClick={() => setSelectedCategory("all")}
//             className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
//               selectedCategory === "all"
//                 ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                 : "hover:bg-sidebar-accent/50"
//             }`}
//           >
//             <span className="font-medium">All Tasks</span>
//             <Badge variant="secondary">{tasks.length}</Badge>
//           </button>

//           {categories.map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setSelectedCategory(cat.id)}
//               className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
//                 selectedCategory === cat.id
//                   ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                   : "hover:bg-sidebar-accent/50"
//               }`}
//             >
//               <div className="flex items-center gap-3">
//                 <div className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center`}>
//                   <cat.icon className="w-4 h-4 text-primary-foreground" />
//                 </div>
//                 <span className="font-medium text-sm">{cat.label}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8">
//                   <svg className="w-8 h-8 transform -rotate-90">
//                     <circle
//                       cx="16"
//                       cy="16"
//                       r="12"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="3"
//                       strokeOpacity="0.2"
//                     />
//                     <circle
//                       cx="16"
//                       cy="16"
//                       r="12"
//                       fill="none"
//                       stroke="hsl(var(--sidebar-primary))"
//                       strokeWidth="3"
//                       strokeDasharray={`${getCategoryProgress(cat.id) * 0.75} 100`}
//                       strokeLinecap="round"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </button>
//           ))}
//         </div>
//       </ScrollArea>

//       <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
//         <Link to="/">
//           <Button variant="outline" className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent">
//             Back to Home
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Desktop Sidebar */}
//       <aside className="hidden lg:block w-72 fixed left-0 top-0 bottom-0 z-40">
//         <Sidebar />
//       </aside>

//       {/* Mobile Header */}
//       <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border p-4">
//         <div className="flex items-center justify-between">
//           <Link to="/" className="flex items-center gap-2">
//             <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center">
//               <Scale className="w-4 h-4 text-accent-foreground" />
//             </div>
//             <span className="font-display font-bold">RegTech</span>
//           </Link>
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon">
//                 <Menu className="w-5 h-5" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="p-0 w-72">
//               <Sidebar />
//             </SheetContent>
//           </Sheet>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="flex-1 lg:ml-72 pt-20 lg:pt-0">
//         <div className="p-6 lg:p-8">
//           {/* Header Stats */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
//           >
//             {/* Compliance Score */}
//             <Card className="border-border">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">
//                   Compliance Score
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="flex items-center gap-4">
//                   <div className="relative w-16 h-16">
//                     <svg className="w-16 h-16 transform -rotate-90">
//                       <circle
//                         cx="32"
//                         cy="32"
//                         r="28"
//                         fill="none"
//                         stroke="hsl(var(--muted))"
//                         strokeWidth="6"
//                       />
//                       <circle
//                         cx="32"
//                         cy="32"
//                         r="28"
//                         fill="none"
//                         stroke="hsl(var(--accent))"
//                         strokeWidth="6"
//                         strokeDasharray={`${progress * 1.76} 176`}
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                     <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
//                       {Math.round(progress)}%
//                     </span>
//                   </div>
//                   <div>
//                     <p className="text-2xl font-bold text-card-foreground">
//                       {completedCount}/{tasks.length}
//                     </p>
//                     <p className="text-sm text-muted-foreground">Tasks completed</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Est. Govt Fees */}
//             <Card className="border-border">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//                   <CircleDollarSign className="w-4 h-4" />
//                   Est. Govt Fees
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-3xl font-display font-bold text-card-foreground">
//                   ₹15,000
//                 </p>
//                 <p className="text-sm text-muted-foreground">Approximate total</p>
//               </CardContent>
//             </Card>

//             {/* Launch Countdown */}
//             <Card className="border-border">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   Launch Countdown
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-3xl font-display font-bold text-card-foreground">
//                   15 Days
//                 </p>
//                 <p className="text-sm text-muted-foreground">To full compliance</p>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* User Context */}
//           {userData && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="mb-6 flex flex-wrap gap-2"
//             >
//               <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
//                 {userData.sector?.charAt(0).toUpperCase() + userData.sector?.slice(1)}
//               </Badge>
//               <Badge className="bg-accent/10 text-accent hover:bg-accent/20">
//                 {userData.city?.charAt(0).toUpperCase() + userData.city?.slice(1)}
//               </Badge>
//               <Badge className="bg-gold/10 text-gold hover:bg-gold/20">
//                 {userData.structure === "pvtltd" ? "Private Limited" : userData.structure?.toUpperCase()}
//               </Badge>
//               <Badge variant="outline">{userData.teamSize} employees</Badge>
//             </motion.div>
//           )}

//           {/* Task List */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//           >
//             <h2 className="text-xl font-display font-bold mb-4">
//               {selectedCategory === "all" 
//                 ? "All Compliance Tasks" 
//                 : categories.find((c) => c.id === selectedCategory)?.label}
//             </h2>

//             <Accordion type="single" collapsible className="space-y-3">
//               {filteredTasks.map((task, index) => (
//                 <motion.div
//                   key={task.id}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <AccordionItem
//                     value={task.id}
//                     className="border border-border rounded-xl overflow-hidden bg-card"
//                   >
//                     <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180">
//                       <div className="flex items-center gap-4 flex-1 text-left">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             toggleTaskStatus(task.id);
//                           }}
//                           className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
//                             task.status === "completed"
//                               ? "bg-accent border-accent"
//                               : "border-border hover:border-accent"
//                           }`}
//                         >
//                           {task.status === "completed" && (
//                             <Check className="w-4 h-4 text-accent-foreground" />
//                           )}
//                         </button>
//                         <div className="flex-1">
//                           <p className={`font-medium ${task.status === "completed" ? "line-through text-muted-foreground" : "text-card-foreground"}`}>
//                             {task.title}
//                           </p>
//                         </div>
//                         <Badge
//                           variant={task.status === "completed" ? "secondary" : "outline"}
//                           className="mr-2"
//                         >
//                           Day {task.day}
//                         </Badge>
//                       </div>
//                     </AccordionTrigger>
//                     <AccordionContent className="px-4 pb-4">
//                       <div className="pl-10 space-y-4">
//                         {/* AI Breakdown */}
//                         <div className="bg-muted/50 rounded-lg p-4">
//                           <div className="flex items-center gap-2 mb-2">
//                             <Sparkles className="w-4 h-4 text-accent" />
//                             <span className="text-sm font-medium text-card-foreground">AI Breakdown</span>
//                           </div>
//                           <p className="text-sm text-muted-foreground">{task.aiBreakdown}</p>
//                         </div>

//                         {/* Documents */}
//                         <div>
//                           <p className="text-sm font-medium text-card-foreground mb-2">Required Documents</p>
//                           <div className="flex flex-wrap gap-2">
//                             {task.documents.map((doc) => (
//                               <Badge key={doc} variant="secondary" className="text-xs">
//                                 {doc}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>

//                         {/* Actions */}
//                         <div className="flex flex-wrap gap-3">
//                           <a href={task.portalUrl} target="_blank" rel="noopener noreferrer">
//                             <Button variant="outline" size="sm" className="gap-2">
//                               Go to Govt Portal
//                               <ExternalLink className="w-4 h-4" />
//                             </Button>
//                           </a>
//                           <Button size="sm" className="btn-teal gap-2">
//                             <Sparkles className="w-4 h-4" />
//                             Draft with AI
//                           </Button>
//                         </div>
//                       </div>
//                     </AccordionContent>
//                   </AccordionItem>
//                 </motion.div>
//               ))}
//             </Accordion>
//           </motion.div>

//           {/* Final CTA */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="mt-8"
//           >
//             <Button
//               disabled={progress < 100}
//               className={`w-full py-6 text-lg ${
//                 progress >= 100 ? "btn-gold" : "bg-muted text-muted-foreground"
//               }`}
//             >
//               {progress >= 100
//                 ? "🎉 Download Compliance Certificate"
//                 : `Complete all tasks to unlock certificate (${Math.round(progress)}%)`}
//             </Button>
//           </motion.div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;








import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Download, Share2, ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";
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

// Enhanced roadmap data with detailed information
const roadmapData = [
  {
    id: "company",
    category: "Company Registration",
    tasks: [
      {
        id: "run",
        title: "Choose unique company name (RUN)",
        status: "completed" as const,
        timeline: "Day 1",
        description:
          "Reserve a unique name for your company through the RUN (Reserve Unique Name) facility on MCA portal. This is the first step and prevents name conflicts with existing entities.",
        requirements: ["Director's PAN", "Director's Aadhaar", "Proposed Names (2 options)"],
        portalUrl: "https://www.mca.gov.in/MinistryV2/runllpservice.html",
      },
      {
        id: "dsc",
        title: "Apply for DSC (Digital Signature)",
        status: "completed" as const,
        timeline: "Day 2-3",
        description:
          "A Digital Signature Certificate is mandatory for filing documents electronically with MCA. All directors must obtain Class 3 DSC from authorized certifying agencies.",
        requirements: ["Director's PAN", "Aadhaar", "Passport Photo", "Address Proof"],
        portalUrl: "https://www.mca.gov.in/content/mca/global/en/acts-rules/dsc.html",
      },
      {
        id: "din",
        title: "Apply for DIN (Director ID)",
        status: "in-progress" as const,
        timeline: "Day 3-4",
        description:
          "Director Identification Number is a unique ID for company directors in India. It's allotted by MCA and is required before incorporation.",
        requirements: ["PAN", "Aadhaar", "Passport Photo", "Address Proof", "Mobile Number"],
        portalUrl: "https://www.mca.gov.in/MinistryV2/dinservices.html",
      },
      {
        id: "spice",
        title: "File SPICe+ form with MCA",
        status: "pending" as const,
        timeline: "Day 5-7",
        description:
          "SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus) is a single form for company incorporation, DIN allotment, PAN, TAN, EPFO, ESIC, and GST.",
        requirements: ["DSC", "DIN", "Name Reservation", "MOA/AOA", "Registered Office Address"],
        portalUrl: "https://www.mca.gov.in/MinistryV2/spaborplus.html",
      },
      {
        id: "coi",
        title: "Receive Certificate of Incorporation",
        status: "pending" as const,
        timeline: "Day 8-10",
        description:
          "Upon successful verification, MCA issues the Certificate of Incorporation along with PAN and TAN. This marks the official birth of your company.",
        requirements: ["Approved SPICe+ Form", "Payment of Fees"],
        portalUrl: "https://www.mca.gov.in",
      },
    ],
  },
  {
    id: "tax",
    category: "Tax Registrations",
    tasks: [
      {
        id: "pan",
        title: "Apply for PAN (Company)",
        status: "pending" as const,
        timeline: "Day 10-12",
        description:
          "Company PAN is auto-generated via SPICe+ but may need additional verification. It's essential for all financial transactions and tax filings.",
        requirements: ["Certificate of Incorporation", "Director Details"],
        portalUrl: "https://www.incometax.gov.in",
      },
      {
        id: "tan",
        title: "Apply for TAN",
        status: "pending" as const,
        timeline: "Day 10-12",
        description:
          "Tax Deduction and Collection Account Number is required for deducting TDS on salaries, rent, professional fees, and other payments.",
        requirements: ["Company PAN", "Registered Address Proof"],
        portalUrl: "https://www.tin-nsdl.com",
      },
      {
        id: "gst",
        title: "GST Registration",
        status: "pending" as const,
        timeline: "Day 12-15",
        description:
          "Goods and Services Tax registration is mandatory if your turnover exceeds ₹40L (goods) or ₹20L (services). Required for interstate sales and e-commerce.",
        requirements: ["PAN", "Aadhaar", "Bank Account", "Business Address Proof", "Photos"],
        portalUrl: "https://www.gst.gov.in",
      },
      {
        id: "ptax",
        title: "Professional Tax Registration",
        status: "pending" as const,
        timeline: "Day 15-18",
        description:
          "Professional Tax is a state-level tax on income earned by employees and professionals. Employers must register and deduct PT from employee salaries.",
        requirements: ["PAN", "TAN", "Employee Details", "Business Registration"],
        portalUrl: "https://mahagst.gov.in",
      },
    ],
  },
  {
    id: "state",
    category: "Maharashtra State Compliance",
    tasks: [
      {
        id: "shop-est",
        title: "Shop & Establishment License (Thane MC)",
        status: "pending" as const,
        timeline: "Day 18-22",
        description:
          "Required under Maharashtra Shops & Establishments Act for any commercial premises. Regulates working hours, leave policies, and employment conditions.",
        requirements: ["Incorporation Certificate", "Rent Agreement", "Owner ID Proof", "Photos"],
        portalUrl: "https://thanecity.gov.in",
      },
      {
        id: "trade",
        title: "Trade License",
        status: "pending" as const,
        timeline: "Day 22-25",
        description:
          "A trade license from local municipal corporation authorizes you to conduct specific business activities in the area. Required for most commercial operations.",
        requirements: ["Shop & Establishment License", "GST Certificate", "NOC from Owner"],
        portalUrl: "https://thanecity.gov.in",
      },
      {
        id: "fire",
        title: "Fire NOC (if applicable)",
        status: "pending" as const,
        timeline: "Day 25-30",
        description:
          "Fire No Objection Certificate may be required based on premises size and nature of business. Ensures fire safety compliance for commercial establishments.",
        requirements: ["Floor Plan", "Fire Safety Equipment Details", "Building Permit"],
        portalUrl: "https://firenoc.maharashtra.gov.in",
      },
    ],
  },
  {
    id: "labor",
    category: "Labor & Employment",
    tasks: [
      {
        id: "pf",
        title: "PF Registration (EPFO)",
        status: "pending" as const,
        timeline: "Day 30-35",
        description:
          "Provident Fund registration is mandatory when you have 20+ employees. Provides retirement benefits and is a key compliance for employers.",
        requirements: ["PAN", "Incorporation Certificate", "Employee List", "Bank Details"],
        portalUrl: "https://unifiedportal-emp.epfindia.gov.in",
      },
      {
        id: "esi",
        title: "ESI Registration",
        status: "pending" as const,
        timeline: "Day 30-35",
        description:
          "Employees' State Insurance provides health insurance and medical benefits. Mandatory for establishments with 10+ employees earning up to ₹21,000/month.",
        requirements: ["PAN", "Employee Details", "Bank Account", "Address Proof"],
        portalUrl: "https://www.esic.in",
      },
      {
        id: "contracts",
        title: "Draft Employment Contracts",
        status: "pending" as const,
        timeline: "Day 35-40",
        description:
          "Legally binding employment agreements protect both employer and employee. Should include salary, roles, confidentiality clauses, and termination terms.",
        requirements: ["Offer Letter Template", "Company Policies", "NDA Template"],
        portalUrl: "#",
      },
    ],
  },
];

const Roadmap = () => {
  const [activeCategory, setActiveCategory] = useState("company");

  // Calculate category progress and stats
  const categories = useMemo(() => {
    return roadmapData.map((section) => {
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
  }, []);

  // Calculate overall stats
  const stats = useMemo(() => {
    const allTasks = roadmapData.flatMap((s) => s.tasks);
    const completedTasks = allTasks.filter((t) => t.status === "completed").length;
    const readinessScore = Math.round((completedTasks / allTasks.length) * 100);

    return {
      readinessScore,
      estimatedFees: 15500,
      launchEta: 40 - Math.floor((completedTasks / allTasks.length) * 40),
    };
  }, []);

  // Get active section
  const activeSection = roadmapData.find((s) => s.id === activeCategory);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(id);
    // Scroll to top of content on mobile
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                      Your Compliance Roadmap
                    </h1>
                    <p className="text-muted-foreground">
                      SaaS Startup • Private Limited • Thane, Maharashtra
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </Button>
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
