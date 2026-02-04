"use client";
import { motion } from 'framer-motion';

export default function PopularCategories() {
  const categories = [
    { name: 'Furniture', count: '2,340 items available', img: '/assets/Furniture.jpeg' },
    { name: 'Appliances', count: '1,890 items available', img: '/assets/Appliances.jpg' },
    { name: 'Bikes', count: '1,250 items available', img: '/assets/Bikes.png' },
    { name: 'Tools', count: '980 items available', img: '/assets/Tools.jpg' },
    { name: 'Electronics', count: '750 items available', img: '/assets/Electronics.jpeg' },
    { name: 'Sports', count: '650 items available', img: '/assets/sports.jpg' },
  ];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Popular Categories</h2>
          <p className="mt-3 text-gray-600">Discover what's available in your area</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((c) => (
            <motion.div
              key={c.name}
              variants={{ hidden: { y: 14, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="rounded-3xl border bg-white p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="h-40 rounded-2xl bg-gray-100 overflow-hidden">
                <img 
                  src={c.img} 
                  alt={`${c.name} category`} 
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105" 
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <p className="text-sm text-gray-600">{c.count}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


