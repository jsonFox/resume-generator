import ResumeBuilder from '../lib/resume-builder';

const resume = new ResumeBuilder()
  .addPersonalInfo({
    name: 'John Doe',
    address: 'Springfield, IL 62701',
    phone: '555-555-5555',
    email: 'john.doe@gmail.com',
    linkedin: 'https://www.linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe'
  })
  .addSkills([
    {
      category: 'Languages',
      skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'SQL']
    },
    {
      category: 'Web Technologies',
      skills: ['HTML', 'CSS', 'React', 'Node.js', 'Express', 'Django']
    },
    {
      category: 'Databases',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite']
    }
  ])
  .addExperience([
    {
      position: 'Software Engineer',
      organization: 'ABC Company',
      location: 'Springfield, IL',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: [
        'Developed new features for web application using React and Node.js',
        'Optimized database queries to improve performance by 20%',
        'Mentored junior developers on best practices and coding standards'
      ]
    },
    {
      position: 'Software Developer',
      organization: 'XYZ Corporation',
      location: 'Chicago, IL',
      startDate: 'Jun 2018',
      endDate: 'Dec 2019',
      description: [
        'Designed and implemented RESTful APIs for mobile applications',
        'Collaborated with team members to deliver projects on time',
        'Participated in code reviews to ensure code quality and consistency'
      ]
    }
  ])
  .addEducation([
    {
      institution: 'University of Illinois',
      location: 'Urbana-Champaign, IL',
      degree: 'Bachelor of Science in Computer Science',
      startDate: 'Aug 2014',
      endDate: 'May 2018'
    }
  ])
  .addProjects([
    {
      title: 'Portfolio Website',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      links: [],
      description: [
        'Developed a personal portfolio website to showcase projects and skills',
        'Implemented contact form using Nodemailer to send emails to my inbox'
      ]
    },
    {
      title: 'Task Manager App',
      stack: ['React', 'Node.js', 'Express', 'MongoDB'],
      links: [],
      description: [
        'Built a task manager application to keep track of daily tasks and goals',
        'Utilized JWT for user authentication and authorization'
      ]
    }
  ]);

export default resume;
