'use client';

import { motion } from 'framer-motion';
import { UsersIcon, ChatBubbleLeftRightIcon, HeartIcon, StarIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';
import CornerBackButton from '../Components/CornerBackButton';

export default function CommunityPage() {
  const communityStats = [
    { number: "50K+", label: "Active Members", icon: <UsersIcon className="h-8 w-8" /> },
    { number: "100K+", label: "Successful Rentals", icon: <HeartIcon className="h-8 w-8" /> },
    { number: "4.9", label: "Average Rating", icon: <StarIcon className="h-8 w-8" /> },
    { number: "24/7", label: "Support Available", icon: <ChatBubbleLeftRightIcon className="h-8 w-8" /> }
  ];

  const communityFeatures = [
    {
      icon: <UsersIcon className="h-8 w-8" />,
      title: "Member Forums",
      description: "Connect with other users, share tips, and discuss everything related to sharing and renting.",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      title: "Live Events",
      description: "Join our virtual and in-person events to network and learn from community experts.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Rewards Program",
      description: "Earn points for positive interactions and unlock exclusive community benefits.",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: <SparklesIcon className="h-8 w-8" />,
      title: "Knowledge Sharing",
      description: "Access tutorials, guides, and best practices shared by experienced community members.",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const upcomingEvents = [
    {
      title: "Community Meetup",
      date: "March 15, 2024",
      time: "6:00 PM EST",
      location: "Virtual Event",
      description: "Join us for our monthly community meetup where we'll discuss platform updates and share success stories."
    },
    {
      title: "Rental Tips Workshop",
      date: "March 22, 2024",
      time: "2:00 PM EST",
      location: "Virtual Event",
      description: "Learn from top earners about how to maximize your rental income and build a successful business."
    },
    {
      title: "Safety & Trust Forum",
      date: "March 29, 2024",
      time: "7:00 PM EST",
      location: "Virtual Event",
      description: "An open discussion about maintaining safety standards and building trust in our community."
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
            Our Community
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Join thousands of people who believe in sharing, sustainability, and building 
            meaningful connections. Together, we're creating a better world.
          </p>
        </motion.div>
      </div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-tr from-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Community Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Makes Our Community Special
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Upcoming Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="px-6 mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Upcoming Community Events
          </h2>
          
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-medium hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300">
                    Join Event
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Join Community CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="px-6 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Connect with like-minded people, share your experiences, and be part of 
              something bigger than just renting items.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Join Now
              </a>
              <a
                href="/help-center"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
