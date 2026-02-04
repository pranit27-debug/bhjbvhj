'use client';

import { motion } from 'framer-motion';
import { HeartIcon, GlobeAltIcon, UsersIcon, SparklesIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import CornerBackButton from '../Components/CornerBackButton';

export default function AboutPage() {
  const values = [
    {
      icon: <HeartIcon className="h-8 w-8" />,
      title: "Community First",
      description: "We believe in the power of people helping people. Every feature we build is designed to strengthen our community bonds.",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: "Sustainability",
      description: "By sharing resources, we reduce waste and promote a more sustainable way of living. Every rental is a step toward a greener future.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: "Trust & Safety",
      description: "We've built our platform on the foundation of trust. Every user is verified, every transaction is protected, and every interaction is safe.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible in the sharing economy, making it easier and safer than ever to share.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const milestones = [
    { year: "2020", title: "Founded", description: "Started with a simple idea: make sharing easier and safer" },
    { year: "2021", title: "First 1K Users", description: "Reached our first thousand community members" },
    { year: "2022", title: "Series A Funding", description: "Raised $5M to scale our platform" },
    { year: "2023", title: "100K+ Rentals", description: "Celebrated our 100,000th successful rental" },
    { year: "2024", title: "Global Expansion", description: "Launched in 10 new countries" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former product manager at major tech companies, passionate about building communities and sustainable solutions.",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Expert in scalable systems and security, previously led engineering teams at fintech startups.",
      image: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Community",
      bio: "Community builder with 10+ years experience in user engagement and trust building.",
      image: "👩‍🤝‍👩"
    }
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
            About Us
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            We're on a mission to build the world's most trusted community for sharing and renting. 
            Because when we share, we all win.
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl leading-relaxed opacity-90">
              To create a world where sharing is not just easy and safe, but the preferred way to access 
              what we need. We believe that by building trust and fostering community, we can unlock the 
              full potential of the sharing economy.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${value.color} text-white mb-6`}>
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Journey
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-cyan-500 to-emerald-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white/90 backdrop-blur rounded-2xl border p-6 shadow-lg">
                      <div className="text-2xl font-bold text-cyan-600 mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Team */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Meet Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <div className="text-cyan-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50K+", label: "Happy Users" },
              { number: "100K+", label: "Successful Rentals" },
              { number: "10+", label: "Countries" },
              { number: "99.8%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-tr from-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="px-6 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of the sharing revolution. Together, we can build a more sustainable, 
              connected, and trusting world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started
              </a>
              <a
                href="/careers"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition-colors"
              >
                Join Our Team
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
