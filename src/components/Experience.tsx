'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    title: 'Backend Developer',
    company: 'FanCraze',
    period: 'Nov 2024 - Present',
    type: 'Onsite',
    points: [
      'Engineered production-grade finance and KYC modules processing sensitive user data',
      'Integrated multiple third-party payment systems with robust error handling',
      'Ensured cryptographic handling of financial identifiers and tokens',
      'Delivered scalable, low-latency APIs supporting real-time balance updates',
      'Developed monitoring, logging, and alerting tools for 24/7 availability',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'DesiQna',
    period: 'June 2023 - Aug 2023',
    type: 'Remote',
    points: [
      'Implemented responsive frontend and backend features for user login, Q&A, and dashboard',
      'Improved authentication flow and boosted reliability of platform operations',
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                    <p>{exp.period}</p>
                    <p className="text-sm">{exp.type}</p>
                  </div>
                </div>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  {exp.points.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 