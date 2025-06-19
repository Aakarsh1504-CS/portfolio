'use client';

import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'CodeLeela',
    description: "A coder's social platform inspired by Krishna ji. Features include JWT authentication, post creation, and image uploads.",
    tech: ['Node.js', 'Express', 'MongoDB', 'Multer'],
    liveLink: 'https://code-leela.onrender.com',
    githubLink: 'https://github.com/Aakarsh1504-CS/code-leela',
  },
  {
    title: 'Personal Note App',
    description: 'Full-featured note-taking application with CRUD operations and session-based authentication.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    liveLink: 'https://mynote-vv6z.onrender.com/',
    githubLink: 'https://github.com/Aakarsh1504-CS/take-note',
  },
  {
    title: 'Movie Search App',
    description: 'Clean and intuitive movie search application powered by the OMDB API.',
    tech: ['HTML', 'CSS', 'JavaScript', 'OMDB API'],
    liveLink: 'https://aakarsh-projects-api-movie.on.drv.tw/dets/',
    githubLink: 'https://github.com/Aakarsh1504-CS/MOVIE-SEARCH',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <FaGithub className="w-6 h-6" />
                    </a>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <FaExternalLinkAlt className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 