/** Projects section */
export type IResumeProjectItem = {
  title: string;
  stack: string[];
  links: string[];
  description: string[];
};

/** Skills section */
export type IResumeSkillsItem = {
  category: string;
  skills: string[];
};

/** Experience section */
export type IResumeExperienceItem = {
  position: string;
  organization: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string[];
};

/** Education section */
export type IResumeEducationItem = {
  institution: string;
  location: string;
  degree: string;
  startDate: string;
  endDate?: string;
};

/** Personal information (header section) */
export type IResumeHeaderInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio?: string;
};

/** Resume sections (after header) */
export type IResumeSections = {
  skills: IResumeSkillsItem[];
  experience: IResumeExperienceItem[];
  education: IResumeEducationItem[];
  projects: IResumeProjectItem[];
};

/** ResumeBuilder class */
export type IResumeBuilder = IResumeHeaderInfo & IResumeSections;

export type ISectionOrder = Array<keyof IResumeSections>;
