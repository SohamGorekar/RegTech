import { ROADMAP_PROMPT_STENCIL } from '../utils/promptStencils';

interface BusinessDNA {
  projectName: string;
  projectDescription: string;
  sector: string;
  state: string;
  city: string;
  structure: string;
  teamSize: number;
}

export const buildPromptFromStencil = (businessDNA: BusinessDNA): string => {
  let prompt = ROADMAP_PROMPT_STENCIL;

  // Replace all placeholders with actual business data
  prompt = prompt.replace(/{{projectName}}/g, businessDNA.projectName);
  prompt = prompt.replace(/{{projectDescription}}/g, businessDNA.projectDescription);
  prompt = prompt.replace(/{{sector}}/g, businessDNA.sector);
  prompt = prompt.replace(/{{city}}/g, businessDNA.city);
  prompt = prompt.replace(/{{state}}/g, businessDNA.state);
  prompt = prompt.replace(/{{structure}}/g, businessDNA.structure);
  prompt = prompt.replace(/{{teamSize}}/g, businessDNA.teamSize.toString());

  return prompt;
};