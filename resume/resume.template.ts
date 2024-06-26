import ResumeBuilder from '../lib/resume-builder';

const resume = new ResumeBuilder()
  /**
   * Font definitions can be imported from SERIF and SANS_SERIF objects in  '../lib/fonts'
   * Leave empty to use default font
   */
  .setFont()
  /**
   * See here for list of valid colors:
   * https://sharelatex-wiki-cdn-671420.c.cdn77.org/learn-scripts/images/e/ef/OLxcolorList2.png
   * Leave empty for black
   */
  .setColor()
  .addPersonalInfo({
    name: '',
    address: '',
    phone: '',
    email: '',
    linkedin: '',
    github: '',
    portfolio: ''
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
