'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, ChatBubbleLeftRightIcon, ClockIcon } from '@heroicons/react/24/outline';
import CornerBackButton from '../Components/CornerBackButton';

export default function ContactUsPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  const contactMethods = [
    {
      icon: <EnvelopeIcon className="h-8 w-8" />,
      title: "Email Support",
      description: "Get help with your account or rental questions",
      contact: "support@rentalapp.com",
      response: "Response within 24 hours",
      color: "from-emerald-500 to-cyan-500"
    },
    {
      icon: <PhoneIcon className="h-8 w-8" />,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      response: "Mon-Fri 9AM-6PM EST",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: <ChatBubbleLeftRightIcon className="h-8 w-8" />,
      title: "Live Chat",
      description: "Instant help from our online support team",
      contact: "Available 24/7",
      response: "Immediate response",
      color: "from-blue-500 to-purple-500"
    }
  ];

  const officeLocations = [
    {
      city: "Bengaluru, India",
      address: "Indiranagar, Bengaluru, Karnataka, India",
      phone: "+1 (555) 123-4567",
      hours: "Mon-Fri 9AM-6PM EST"
    },
    {
      city: "San Francisco",
      address: "456 Tech Avenue, CA 94102",
      phone: "+1 (555) 987-6543",
      hours: "Mon-Fri 9AM-6PM PST"
    },
    {
      city: "London",
      address: "789 Business Lane, UK SW1A 1AA",
      phone: "+44 20 1234 5678",
      hours: "Mon-Fri 9AM-6PM GMT"
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
            Contact Us
          </h1>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            We're here to help! Get in touch with our team for support, 
            feedback, or any questions you might have.
          </p>
        </motion.div>
      </div>

      {/* Contact Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${method.color} text-white mb-6`}>
                  {method.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-lg font-bold text-cyan-600 mb-2">{method.contact}</div>
                <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
                  <ClockIcon className="h-4 w-4" />
                  {method.response}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="px-6 mb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur rounded-2xl border p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="6"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white py-4 px-8 rounded-xl font-medium text-lg hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>

      {/* Office Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-6 mb-16"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Offices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="bg-white/90 backdrop-blur rounded-2xl border p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-center mb-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-white mb-3">
                    <MapPinIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{office.city}</h3>
                </div>
                
                <div className="space-y-3 text-center">
                  <div className="text-gray-600">
                    <div className="font-medium mb-1">Address</div>
                    <div className="text-sm">{office.address}</div>
                  </div>
                  
                  <div className="text-gray-600">
                    <div className="font-medium mb-1">Phone</div>
                    <div className="text-sm">{office.phone}</div>
                  </div>
                  
                  <div className="text-gray-600">
                    <div className="font-medium mb-1">Hours</div>
                    <div className="text-sm">{office.hours}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="px-6 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Immediate Help?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Check out our Help Center for instant answers to common questions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/help-center"
                className="bg-white text-cyan-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Visit Help Center
              </a>
              <a
                href="/safety"
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-cyan-600 transition-colors"
              >
                Safety Guidelines
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
