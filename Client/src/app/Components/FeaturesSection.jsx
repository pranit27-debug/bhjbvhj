"use client";
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  UserGroupIcon, 
  StarIcon 
} from '@heroicons/react/24/outline';

export default function FeaturesSection() {
  const cards = [
    { 
      title: 'Secure & Safe', 
      desc: 'All items are verified and insured for your peace of mind.',
      icon: ShieldCheckIcon
    },
    { 
      title: 'Flexible Duration', 
      desc: 'Rent for days, weeks, or months – whatever works for you.',
      icon: ClockIcon
    },
    { 
      title: 'Community Driven', 
      desc: 'Connect with neighbors and build a sharing community.',
      icon: UserGroupIcon
    },
    { 
      title: 'Quality Guaranteed', 
      desc: 'Rated items and trusted users ensure great experiences.',
      icon: StarIcon
    },
  ];

  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Why Choose RentEase?</h2>
          <p className="mt-3 text-gray-600">The smartest way to access what you need without the commitment of buying</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((c) => (
            <motion.div
              key={c.title}
              variants={{ hidden: { y: 16, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="rounded-2xl border bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-14 w-14 rounded-xl bg-gradient-to-tr from-blue-600 to-green-500 text-white flex items-center justify-center mb-4">
                <c.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
