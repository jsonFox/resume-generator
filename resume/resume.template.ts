import ResumeBuilder from '../lib/resume-builder';
import { SERIF, SANS_SERIF } from '../lib/fonts';

const resume = new ResumeBuilder()
  /**
   // Font definitions can be imported from SERIF and SANS_SERIF objects in  '../lib/fonts'
   // Leave empty to use default font
   */
  .setFont()
  /**
   * Default colors supported, see here for list of additional valid colors:
   * https://sharelatex-wiki-cdn-671420.c.cdn77.org/learn-scripts/images/e/ef/OLxcolorList2.png
   * Leave empty for black
   */
  .setTextColor()
  /**
   * Default colors supported, see here for list of additional valid colors:
   * https://sharelatex-wiki-cdn-671420.c.cdn77.org/learn-scripts/images/e/ef/OLxcolorList2.png
   * Leave empty for black
   */
  .setDividerColor()
  .addPersonalInfo({
    name: '',
    address: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: '' // This is optional and can be left blank
  })
  .addSkills([
    {
      category: '',
      skills: []
    }
  ])
  .addExperience([
    {
      position: '',
      organization: '',
      location: '',
      startDate: '',
      endDate: '',
      description: []
    }
  ])
  .addEducation([
    {
      institution: '',
      location: '',
      degree: '',
      startDate: '',
      endDate: ''
    }
  ])
  .addProjects([
    {
      title: '',
      stack: [],
      links: [],
      description: ''
    }
  ]);

export default resume;
