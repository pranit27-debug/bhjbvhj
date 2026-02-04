"use client";
import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-amber-50/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {[
            { step: '1', title: 'Sign Up', desc: 'Create your free account and verify your email.' },
            { step: '2', title: 'Request or List', desc: 'Browse nearby items or list what you want to rent out.' },
            { step: '3', title: 'Connect & Rent', desc: 'Chat, agree on terms, and enjoy hassle-free renting.' },
          ].map(({ step, title, desc }) => (
            <motion.div
              key={step}
              variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 text-white font-bold">{step}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 text-center">
          <a href="/signup" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-tr from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white shadow">Join Now</a>
        </div>
      </div>
    </section>
  );
}
