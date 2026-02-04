'use client';

import { motion } from 'framer-motion';
import { BriefcaseIcon, HeartIcon, GlobeAltIcon, SparklesIcon, AcademicCapIcon, UsersIcon } from '@heroicons/react/24/outline';
import CornerBackButton from '../Components/CornerBackButton';

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / New York",
      type: "Full-time",
      description: "Build beautiful, responsive user interfaces that millions of users interact with daily.",
      requirements: ["React/Next.js", "TypeScript", "5+ years experience", "UI/UX focus"]
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "San Francisco",
      type: "Full-time",
      description: "Scale our platform to handle millions of transactions while maintaining security and performance.",
      requirements: ["Node.js", "MongoDB", "AWS", "3+ years experience"]
    },
    {
      title: "Community Manager",
      department: "Community",
      location: "Remote",
      type: "Full-time",
      description: "Foster our growing community and create meaningful connections between users.",
      requirements: ["Community building", "Social media", "Event planning", "2+ years experience"]
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "London",
      type: "Full-time",
      description: "Design intuitive experiences that make sharing and renting seamless for our users.",
      requirements: ["Figma", "User research", "Prototyping", "4+ years experience"]
    }
  ];

  const benefits = [
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "Health & Wellness",
      description: "Comprehensive health coverage, mental health support, and wellness programs."
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: "Remote First",
      description: "Work from anywhere with flexible hours and a distributed team culture."
    },
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Learning & Growth",
      description: "Continuous learning opportunities, conferences, and career development programs."
    },
    {
      icon: <UsersIcon className="h-8 w-8" />,
      title: "Team Events",
      description: "Regular team building activities, hackathons, and social events."
    }
  ];

  const values = [
    "Innovation at every level",
    "User-first approach",
    "Transparency and trust",
    "Continuous learning",
    "Work-life balance",
    "Diversity and inclusion"
  ];

  return (
    <div className="min-h-screen page-bg">
      <CornerBackButton topClass="top-6" leftClass="left-6" />
      
      {/* Header */}
      <div className="pt-20 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-tr from-emerald-700 via-cyan-700 to-amber-700 bg-clip-text text-transparent mb-6">
            Join Our Team
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Help us build the future of sharing. We're looking for passionate people who believe 
            in the power of community and sustainable living.
          </p>
        </motion.div>
      </div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white mb-6">
              <BriefcaseIcon className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Work With Us?
            </h2>
            <p className="text-xl leading-relaxed opacity-90">
              We're not just building a platform – we're building a movement. Every day, our work 
              helps thousands of people share resources, build trust, and create a more sustainable world.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Perks & Benefits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-6 mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Values
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-xl border p-4 text-center shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-cyan-600 font-medium">{value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Open Positions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Open Positions
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{position.title}</h3>
                  <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-medium rounded-full">
                    {position.type}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <BriefcaseIcon className="h-4 w-4" />
                    {position.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <GlobeAltIcon className="h-4 w-4" />
                    {position.location}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{position.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.requirements.map((req, reqIndex) => (
                      <span key={reqIndex} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="px-6 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white mb-6">
              <SparklesIcon className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented people. Send us your resume and let's discuss 
              how you can contribute to our mission.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                Send Resume
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition-colors">
                Contact HR
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
