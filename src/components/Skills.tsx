'use client';

import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript (Node.js)', 'Java', 'Python'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['Node.js', 'Express', 'Kafka', 'Laravel'],
  },
  {
    title: 'Databases & Storage',
    skills: ['MongoDB', 'MySQL', 'Redis'],
  },
  {
    title: 'Cloud & Infrastructure',
    skills: ['AWS EC2', 'AWS S3', 'Docker'],
  },
  {
    title: 'Financial Systems',
    skills: ['Payment APIs', 'KYC Flows', 'Fraud Prevention', 'Transaction Consistency', 'Secure Tokens'],
  },
  {
    title: 'Best Practices',
    skills: ['Unit Testing', 'Agile', 'CI/CD', 'Secure Coding', 'Audit Logging'],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg transform-gpu transition-all duration-100 hover:shadow-xl hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm transform-gpu transition-all duration-100 hover:scale-105 hover:bg-blue-200 dark:hover:bg-blue-800 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 