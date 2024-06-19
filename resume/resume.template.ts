import ResumeBuilder from '../lib/resume-builder';

const resume = new ResumeBuilder()
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
    },
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
      description: []
    },
  ]);

export default resume;
