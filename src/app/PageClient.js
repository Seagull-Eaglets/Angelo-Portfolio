'use client'
import Image from 'next/image'
import MobileNav from '../components/MobileNav'
import ContactForm from '../components/ContactForm'
import ScrollToTop from '../components/ScrollToTop'
import ThemeToggleButton from '../components/ThemeToggleButton'
import StructuredData from '../components/StructuredData'
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaDocker, 
  FaPhp, 
  FaLaravel, 
  FaJava, 
  FaGithub, 
  FaLinkedin, 
  FaFacebook, 
  FaDownload, 
  FaTasks, 
  FaFileAlt, 
  FaDesktop, 
  FaBrain, 
  FaGlobe, 
  FaJs, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaChevronLeft, 
  FaChevronRight 

} from 'react-icons/fa'
import { TbBrandNextjs} from 'react-icons/tb'
import { SiTailwindcss, SiMysql } from 'react-icons/si'
import { motion } from 'framer-motion'
import Link from 'next/link'

const languagesAndDatabases = [
  { name: 'Python', icon: FaPython, level: 75, color: '#3776AB' },
  { name: 'JavaScript', icon: FaJs, level: 90, color: '#F7DF1E' },
  // { name: 'TypeScript', icon: TbBrandTypescript, level: 80, color: '#3178C6' },
  { name: 'Java', icon: FaJava, level: 85, color: '#f89820' },
  { name: 'PHP', icon: FaPhp, level: 90, color: '#777BB4' },
  // { name: 'C++', icon: TbBrandCpp, level: 78, color: '#00599C' },
  // { name: 'PostgreSQL', icon: BiLogoPostgresql, level: 80, color: '#4169E1' },
  { name: 'MySQL', icon: SiMysql, level: 85, color: '#F29111' },
]

const frameworksAndTools = [
  { name: 'React', icon: FaReact, level: 90, color: '#61DAFB' },
  { name: 'Next.js', icon: TbBrandNextjs, level: 85, color: '#888888' },
  { name: 'Node.js', icon: FaNodeJs, level: 85, color: '#339933' },
  // { name: 'Django', icon: SiDjango, level: 80, color: '#0C852A' },
  { name: 'Laravel', icon: FaLaravel, level: 88, color: '#FF2D20' },
  // { name: 'Spring Boot', icon: BiLogoSpringBoot, level: 82, color: '#6DB33F' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95, color: '#06B6D4' },
  { name: 'Docker', icon: FaDocker, level: 75, color: '#2496ED' },
]

export default function PageClient() {
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <Image src="/Tech-Angelo-logo.png" alt="Angelo Logo" width={40} height={40} className="rounded-full" />
                <div className="text-xl font-bold gradient-text">Angelo Consulta</div>
                <ThemeToggleButton />
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="#home" className="hover:text-primary transition-colors">Home</Link>
                <Link href="#projects" className="hover:text-primary transition-colors">Case Studies</Link>
                <Link href="#about" className="hover:text-primary transition-colors">About</Link>
                <Link href="#skills" className="hover:text-primary transition-colors">Skills</Link>
                <Link href="#testimonials" className="hover:text-primary transition-colors">Testimonials</Link>
                <Link href="#contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              </div>
              <MobileNav />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="min-h-screen grid md:grid-cols-2 pt-16 md:pt-0">
          <div className="bg-background flex flex-col justify-center items-center p-8 md:p-16">
              <div className="animate-fade-in-up w-full max-w-2xl text-center">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
                  Hi, I'm <span className="gradient-text">Angelo </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  Full-Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="#projects"
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                  >
                    View My Work
                  </a>
                  <a
                    href="#contact"
                    className="border border-border text-foreground px-8 py-3 rounded-full font-medium hover:bg-accent transition-colors"
                  >
                    Get In Touch
                  </a>
                </div>
              </div>
          </div>
         <div className="bg-background flex items-center justify-center p-8 relative min-h-[50vh]">
          <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-[24px] shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
            <Image
              src="/profile.png"
              alt="A photo of Angelo"
              width={500}
              height={520}
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
              className="w-full h-auto max-h-[72vh] object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background/85 via-background/20 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
          </div>
        </div>
        </section>

        {/* Projects Section (Case Studies) */}
        <section id="projects" className="py-20 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Here are some of my recent projects that showcase my skills and passion for development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Document Tracker System',
                  description: 'A robust system for tracking and managing documents with version control, user permissions, and real-time notifications using WebSockets.',
                  tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'WebSocket'],
                  image: FaFileAlt,
                  color: '#FF2D20'
                },
                {
                  title: 'My Website',
                  description: 'This portfolio website, built from scratch using Next.js and Tailwind CSS to create a modern, responsive design.',
                  tech: ['Next.js', 'Tailwind CSS', 'React'],
                  image: FaGlobe,
                  color: '#BF55EC'
                },
                {
                  title: 'Task Management App',
                  description: 'A collaborative task management application with real-time updates.',
                  tech: ['Next.js', 'TypeScript', 'Socket.io', 'MongoDB'],
                  image: FaTasks,
                  color: '#3B82F6'
                },
                {
                  title: 'Agro Climatic Advisory Portal (ACAP)',
                  description: 'Manage the web app created by UPLBFI. ACAP is used in climate-smart agriculture, aims to help farmers reduce losses and enhance decision-making. Users includes farmers (primary beneficiaries), DA/municipal agricultural offices/ag-extension workers (act as intermediaries), and experts (analyze to improve climate adaptation strategies).',
                  tech: ['Next.js', 'Firebase', 'Material UI', 'Node Version Manager', 'Docker', 'PAGASA OpenWeather API'],
                  image: FaGlobe,
                  color: '#4CAF50'
                },
                {
                  title: 'SK Management System',
                  description: 'A desktop application for efficient SK management, built with a modern UI. It follows the MVC architecture and features full CRUD functionalities.',
                  tech: ['Java', 'Material UI', 'MySQL'],
                  image: FaDesktop,
                  color: '#0081CB'
                },
                {
                  title: 'Handwriting Recognition Exam Checker',
                  description: 'A desktop app using CNN to automatically check handwritten multiple-choice exams. It provides detailed feedback, including scores and incorrect answers, and is designed to handle various handwriting styles.',
                  tech: ['Python', 'TensorFlow', 'YOLO', 'Computer Vision', 'Roboflow', 'Gemini API'],
                  image: FaBrain,
                  color: '#8A2BE2'
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-background rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow group"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform" style={{ color: project.color }}>
                    <project.image />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <button className="text-primary hover:underline font-medium">
                    View Project →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                I'm a dedicated developer with a passion for creating innovative solutions and beautiful user experiences.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Who I Am</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a full-stack developer with expertise in modern web technologies. I love turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
                </p>
              </div>
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-72 h-72 bg-background rounded-full flex items-center justify-center">
                    <div className="text-6xl">👨‍💻</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                I work with a variety of technologies to create amazing digital experiences.
              </p>
            </div>
            <div className="space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8">Languages & Databases</h3>
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
                  {languagesAndDatabases.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      className="text-center group flex flex-col items-center w-24"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: idx * 0.12 }}
                    >
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform" style={{ color: skill.color }}>
                        <skill.icon />
                      </div>
                      <h3 className="font-semibold mb-2">{skill.name}</h3>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-center mb-8">Frameworks, Libraries & Tools</h3>
                <div className="flex flex-wrap justify-center gap-x-16 gap-y-12">
                  {frameworksAndTools.map((skill, idx) => (
                    <motion.div
                      key={skill.name}
                      className="text-center group flex flex-col items-center w-24"
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: idx * 0.12 }}
                    >
                      <div
                        className="text-6xl mb-4 group-hover:scale-110 transition-transform"
                        style={{ color: skill.color }}
                      >
                        <skill.icon />
                      </div>
                      <h3 className="font-semibold mb-2">{skill.name}</h3>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hear from our satisfied clients about their experience working with us.
              </p>
            </div>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background border border-border rounded-full p-2 shadow-md hover:bg-accent transition-colors disabled:opacity-40"
                style={{ marginLeft: '-1.5rem' }}
                aria-label="Scroll testimonials left"
                onClick={() => {
                  const container = document.getElementById('testimonial-carousel')
                  if (container) container.scrollBy({ left: -340, behavior: 'smooth' })
                }}
              >
                <FaChevronLeft className="text-2xl" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background border border-border rounded-full p-2 shadow-md hover:bg-accent transition-colors disabled:opacity-40"
                style={{ marginRight: '-1.5rem' }}
                aria-label="Scroll testimonials right"
                onClick={() => {
                  const container = document.getElementById('testimonial-carousel')
                  if (container) container.scrollBy({ left: 340, behavior: 'smooth' })
                }}
              >
                <FaChevronRight className="text-2xl" />
              </motion.button>
              <motion.div
                id="testimonial-carousel"
                className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                style={{ cursor: 'grab' }}
                whileTap={{ cursor: 'grabbing' }}
              >
                {[
                  {
                    name: 'Mon Carlo Mangente',
                    title: 'Co - IT Programmer',
                    quote: 'Angelo\'s technical skills and commitment to quality are impressive. He delivered a robust and efficient solution that perfectly met our needs.',
                    avatar: '👨‍💻'
                  },
                  // {
                  //   name: 'Joel L. Heraldo',
                  //   title: 'Department of Agriculture ICT Head & Focal',
                  //   quote: "The level of professionalism and technical expertise is unmatched. Highly recommend for any development needs.",
                  //   avatar: '👨‍💻'
                  // },
                  {
                    name: 'Mary Joy Señido',
                    title: 'Department of Agriculture - AMIA Admin',
                    quote: 'Incredible attention to detail and a passion for creating a great user experience. A pleasure to work with.',
                    avatar: '👩‍🎨'
                  },
                  // {
                  //   name: 'Maria Dulce M. Ciano',
                  //   title: 'Co - IT Programmer',
                  //   quote: "Angelo is a reliable teammate and a skilled programmer. He always brings creative solutions to the table and is a pleasure to work with.",
                  //   avatar: '👩‍💻'
                  // },
                  {
                    name: 'Ramcel Abio',
                    title: 'Department of Agriculture - AMIA Admin',
                    quote: 'Working with Angelo was a seamless experience. His expertise and dedication greatly contributed to the success of our projects.',
                    avatar: '👨‍🌾'
                  },
                  {
                    name: 'Jowie P. Diaz',
                    title: 'Department of Agriculture - AMIA Technical Staff',
                    quote: 'Angelo\'s expertise and dedication made a significant impact on our team\'s success. Highly recommended!',
                    avatar: '👨‍💼'
                  }
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="bg-background rounded-lg p-6 shadow-lg text-center flex flex-col justify-between min-w-[320px] max-w-xs snap-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div>
                      <div className="text-5xl mb-4">{testimonial.avatar}</div>
                      <p className="text-muted-foreground mb-4 italic">"{testimonial.quote}"</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                I'm always interested in hearing about new opportunities and exciting projects.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="flex flex-col items-center text-center w-full">
                <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">Let's Connect</h3>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-1 md:space-y-0 md:space-x-4">
                    <FaEnvelope className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-center md:text-left">Email</div>
                      <a href="mailto:angeloconsulta42@gmail.com" className="text-muted-foreground hover:text-primary block text-center md:text-left">angeloconsulta42@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-1 md:space-y-0 md:space-x-4">
                    <FaPhone className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-center md:text-left">Phone</div>
                      <div className="text-muted-foreground block text-center md:text-left">09516877062</div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center md:items-start space-y-1 md:space-y-0 md:space-x-4">
                    <FaMapMarkerAlt className="text-2xl text-primary" />
                    <div>
                      <div className="font-medium text-center md:text-left">Location</div>
                      <div className="text-muted-foreground block text-center md:text-left">Cale, Tiwi, Albay, Bicol Philippines</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex space-x-6">
                  <a href="https://github.com/AngeloConsulta" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors"><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/angelo-consulta-2b4ba1302" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors"><FaLinkedin /></a>
                  <a href="https://www.facebook.com/thoyzkie.atlusnoc" target="_blank" rel="noopener noreferrer" className="text-3xl hover:text-primary transition-colors"><FaFacebook /></a>
                </div>
                <div className="mt-8">
                    <a
                      href="/Software_Developer_Angelo_Cuya_Consulta.pdf"
                      download="Software_Developer_Angelo_Cuya_Consulta.pdf"
                      className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                    >
                      <FaDownload />
                      Download CV
                    </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-background py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-muted-foreground">
              © 2024 Angelo. All rights reserved. Built with ❤️ using Next.js
            </p>
          </div>
        </footer>

        <ScrollToTop />
      </div>
    </>
  )
} 