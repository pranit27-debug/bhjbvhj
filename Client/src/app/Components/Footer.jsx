"use client";
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-amber-50/60 pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <motion.div variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
            <div className="flex items-center gap-2">
              <img src="/assets/ReneEase.png" alt="RentEase Logo" className="h-8 w-auto" />
              <span className="text-xl font-semibold">RentEase</span>
            </div>
            <p className="mt-3 text-sm text-gray-600 max-w-sm">Making sharing simple, sustainable, and accessible for everyone.</p>
          </motion.div>

          <motion.div variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
            <h4 className="font-semibold">Platform</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a href="/browse" className="hover:text-gray-900">Browse Items</a></li>
              <li><a href="/list-item" className="hover:text-gray-900">List an Item</a></li>
              <li><a href="/request-item" className="hover:text-gray-900">Request Item</a></li>
              <li><a href="/dashboard" className="hover:text-gray-900">Dashboard</a></li>
              <li><a href="/how-it-works" className="hover:text-gray-900">How it Works</a></li>
              <li><a href="/pricing" className="hover:text-gray-900">Pricing</a></li>
            </ul>
          </motion.div>

          <motion.div variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a href="/help-center" className="hover:text-gray-900">Help Center</a></li>
              <li><a href="/safety" className="hover:text-gray-900">Safety</a></li>
              <li><a href="/contact-us" className="hover:text-gray-900">Contact Us</a></li>
              <li><a href="/community" className="hover:text-gray-900">Community</a></li>
            </ul>
          </motion.div>

          <motion.div variants={{ hidden: { y: 12, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><a href="/about" className="hover:text-gray-900">About</a></li>
              <li><a href="/careers" className="hover:text-gray-900">Careers</a></li>
              <li><a href="/press" className="hover:text-gray-900">Press</a></li>
              <li><a href="/legal" className="hover:text-gray-900">Legal</a></li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} RentEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
