"use client";
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section id="start" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 px-6 py-12 text-white sm:px-12"
        >
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold">Ready to Start Renting?</h2>
              <p className="mt-2 max-w-xl text-white/90">Join thousands of users who are already saving money and reducing waste through smart renting</p>
            </div>
            <div className="flex gap-3">
              <a href="/browse" className="rounded-md bg-white px-5 py-3 font-semibold text-gray-900">Start Browsing</a>
              <a href="/list-item" className="rounded-md bg-white/10 px-5 py-3 font-semibold text-white ring-1 ring-inset ring-white/30 hover:bg-white/15">List Your Items</a>
              <a href="/request-item" className="rounded-md bg-white/10 px-5 py-3 font-semibold text-white ring-1 ring-inset ring-white/30 hover:bg-white/15">Request Items</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
