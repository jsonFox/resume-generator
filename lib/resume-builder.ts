import { FontDefinition } from './fonts';
import {
  IResumeHeaderInfo,
  IResumeBuilder,
  IResumeExperienceItem,
  IResumeProjectItem,
  IResumeSkillsItem,
  IResumeEducationItem,
  ISectionOrder
} from './types';

export default class ResumeBuilder implements IResumeBuilder {
  // Header info
  name: string = '';
  address: string = '';
  phone: string = '';
  email: string = '';
  linkedin: string = '';
  github: string = '';
  portfolio?: string;
  // Resume sections
  skills: IResumeSkillsItem[] = [];
  experience: IResumeExperienceItem[] = [];
  education: IResumeEducationItem[] = [];
  projects: IResumeProjectItem[] = [];
  // Section order
  sectionOrder: ISectionOrder = [
    'skills',
    'experience',
    'education',
    'projects'
  ];
  // (Optional) name of output files
  filename?: string;
  // Formatting options
  font?: FontDefinition;
  color?: string;

  constructor(filename?: string) {
    this.filename = filename;
  }

  setFont(font?: FontDefinition) {
    this.font = font;
    return this;
  }

  setColor(color?: string) {
    this.color = color;
    return this;
  }

  addPersonalInfo(info: IResumeHeaderInfo) {
    this.name = info.name;
    this.address = info.address;
    this.phone = info.phone;
    this.email = info.email;
    this.linkedin = info.linkedin;
    this.github = info.github;
    this.portfolio = info.portfolio;
    return this;
  }

  addSkills(skills: IResumeSkillsItem | IResumeSkillsItem[]) {
    if (Array.isArray(skills)) {
      this.skills = [...this.skills, ...skills];
    } else {
      this.skills.push(skills);
    }
    return this;
  }

  addExperience(experience: IResumeExperienceItem | IResumeExperienceItem[]) {
    if (Array.isArray(experience)) {
      this.experience = [...this.experience, ...experience];
    } else {
      this.experience.push(experience);
    }
    return this;
  }

  addEducation(education: IResumeEducationItem | IResumeEducationItem[]) {
    if (Array.isArray(education)) {
      this.education = [...this.education, ...education];
    } else {
      this.education.push(education);
    }
    return this;
  }

  addProjects(projects: IResumeProjectItem | IResumeProjectItem[]) {
    if (Array.isArray(projects)) {
      this.projects = [...this.projects, ...projects];
    } else {
      this.projects.push(projects);
    }
    return this;
  }

  setSectionOrder(order: ISectionOrder) {
    if (order.length !== this.sectionOrder.length) {
      throw new Error('Section order must contain all sections');
    }
    this.sectionOrder = order;
    return this;
  }
}
