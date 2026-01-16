// Dummy roadmap data generator matching the frontend roadmap structure
// This will be replaced with Gemini API call later

export const generateDummyRoadmap = (sector: string, structure: string) => {
  return [
    {
      id: "company",
      category: "Company Registration",
      tasks: [
        {
          id: "run",
          title: "Choose unique company name (RUN)",
          status: "pending" as const,
          timeline: "Day 1",
          description:
            "Reserve a unique name for your company through the RUN (Reserve Unique Name) facility on MCA portal. This is the first step and prevents name conflicts with existing entities.",
          requirements: ["Director's PAN", "Director's Aadhaar", "Proposed Names (2 options)"],
          portalUrl: "https://www.mca.gov.in/MinistryV2/runllpservice.html",
        },
        {
          id: "dsc",
          title: "Apply for DSC (Digital Signature)",
          status: "pending" as const,
          timeline: "Day 2-3",
          description:
            "A Digital Signature Certificate is mandatory for filing documents electronically with MCA. All directors must obtain Class 3 DSC from authorized certifying agencies.",
          requirements: ["Director's PAN", "Aadhaar", "Passport Photo", "Address Proof"],
          portalUrl: "https://www.mca.gov.in/content/mca/global/en/acts-rules/dsc.html",
        },
        {
          id: "din",
          title: "Apply for DIN (Director ID)",
          status: "pending" as const,
          timeline: "Day 3-4",
          description:
            "Director Identification Number is a unique ID for company directors in India. It's allotted by MCA and is required before incorporation.",
          requirements: ["PAN", "Aadhaar", "Passport Photo", "Address Proof", "Mobile Number"],
          portalUrl: "https://www.mca.gov.in/MinistryV2/dinservices.html",
        },
        {
          id: "spice",
          title: `File SPICe+ form with MCA (${structure === 'pvtltd' ? 'Pvt Ltd' : structure === 'llp' ? 'LLP' : 'Proprietorship'})`,
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
      category: "State Compliance",
      tasks: [
        {
          id: "shop-est",
          title: "Shop & Establishment License",
          status: "pending" as const,
          timeline: "Day 18-22",
          description:
            "Required under state Shops & Establishments Act for any commercial premises. Regulates working hours, leave policies, and employment conditions.",
          requirements: ["Incorporation Certificate", "Rent Agreement", "Owner ID Proof", "Photos"],
          portalUrl: "https://mahagst.gov.in",
        },
        {
          id: "trade",
          title: "Trade License",
          status: "pending" as const,
          timeline: "Day 22-25",
          description:
            "A trade license from local municipal corporation authorizes you to conduct specific business activities in the area. Required for most commercial operations.",
          requirements: ["Shop & Establishment License", "GST Certificate", "NOC from Owner"],
          portalUrl: "https://mahagst.gov.in",
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
    {
      id: "sector-specific",
      category: `${sector.charAt(0).toUpperCase() + sector.slice(1)}-Specific Licenses`,
      tasks: [
        {
          id: "sector-license-1",
          title: `${sector.charAt(0).toUpperCase() + sector.slice(1)} Industry License`,
          status: "pending" as const,
          timeline: "Day 40-45",
          description:
            `Sector-specific licenses required for ${sector} businesses. Requirements vary based on the nature of operations and regulatory framework.`,
          requirements: ["Industry-specific Documents", "Compliance Certificates", "NOCs"],
          portalUrl: "#",
        },
        {
          id: "sector-license-2",
          title: "Regulatory Authority Registration",
          status: "pending" as const,
          timeline: "Day 45-50",
          description:
            `Registration with relevant regulatory authorities for ${sector} sector. Ensures compliance with industry-specific regulations.`,
          requirements: ["Business Plan", "Financial Statements", "Compliance Documents"],
          portalUrl: "#",
        },
      ],
    },
  ];
};