export const ROADMAP_PROMPT_STENCIL = `You are an expert Indian startup compliance advisor with deep knowledge of regulatory requirements across all sectors and states.

**BUSINESS PROFILE:**
- Company Name: {{projectName}}
- Business Description: {{projectDescription}}
- Industry Sector: {{sector}}
- Location: {{city}}, {{state}}, India
- Legal Structure: {{structure}}
- Team Size: {{teamSize}} employees

**YOUR TASK:**
Generate a comprehensive, step-by-step compliance roadmap for this startup. The roadmap must be accurate, practical, and tailored to their specific sector, location, and legal structure.

**GUIDELINES:**
1. Create 4-6 compliance categories (e.g., "Company Registration", "Tax Registrations", "State Compliance", "Labor & Employment", "Sector-Specific Licenses")
2. Each category should contain 3-5 specific, actionable tasks
3. Tasks must be relevant to the business's sector ({{sector}}), location ({{city}}, {{state}}), and structure ({{structure}})
4. Provide realistic timelines (e.g., "Day 1", "Day 2-3", "Week 1-2", "Day 10-15")
5. Write clear descriptions explaining WHY each task is legally required
6. List specific documents needed for each task
7. Include official Indian government portal URLs where applicable (e.g., https://www.mca.gov.in, https://www.gst.gov.in, https://www.epfindia.gov.in)
8. Ensure tasks are in logical order (earlier tasks as prerequisites for later ones)

**IMPORTANT RULES:**
- All task IDs must be unique (e.g., "task-1-1", "task-2-3")
- All category IDs must be unique (e.g., "company", "tax", "state", "labor")
- Every task status must be "pending"
- Timelines should be realistic (government processes take time)
- Requirements array must list actual documents needed in India

**OUTPUT FORMAT:**
Return ONLY a valid JSON array. Do NOT include markdown code blocks, explanations, or any text before/after the JSON.

The JSON structure must be EXACTLY:

[
  {
    "id": "company",
    "category": "Company Registration",
    "tasks": [
      {
        "id": "task-1-1",
        "title": "Reserve Company Name (RUN)",
        "status": "pending",
        "timeline": "Day 1",
        "description": "Reserve a unique name through the MCA portal to prevent conflicts with existing entities. This is mandatory before incorporation.",
        "requirements": ["Director's PAN", "Director's Aadhaar", "Two name options"],
        "portalUrl": "https://www.mca.gov.in"
      },
      {
        "id": "task-1-2",
        "title": "Another task title",
        "status": "pending",
        "timeline": "Day 2-3",
        "description": "Detailed explanation here",
        "requirements": ["Requirement 1", "Requirement 2"],
        "portalUrl": "https://portal-url.gov.in"
      }
    ]
  },
  {
    "id": "tax",
    "category": "Tax Registrations",
    "tasks": [
      {
        "id": "task-2-1",
        "title": "Task title",
        "status": "pending",
        "timeline": "Day 10-12",
        "description": "Explanation",
        "requirements": ["Doc 1", "Doc 2"],
        "portalUrl": "https://portal.gov.in"
      }
    ]
  }
]

**SPECIAL CONSIDERATIONS:**
- For {{structure}}: Include structure-specific registrations (e.g., ROC for Pvt Ltd, LLP registration for LLP)
- For {{sector}}: Include sector-specific licenses (e.g., RBI for fintech, FSSAI for food/restaurant, SEBI for investment)
- For {{state}}: Include state-specific requirements (e.g., Professional Tax registration, state-specific shop licenses)
- For team size {{teamSize}}: If 20+ employees, include EPF and ESI registration

Generate the compliance roadmap now in valid JSON format:`;