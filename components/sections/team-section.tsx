'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const teamMembers = [
  { name: 'SARAH CHEN', role: 'Creative Director', specialty: 'UI/UX Design', id: 1 },
  { name: 'MARCUS KANE', role: 'Lead Developer', specialty: 'Full-Stack', id: 2 },
  { name: 'ELENA RODRIGUEZ', role: 'Mobile Engineer', specialty: 'React Native', id: 3 },
  { name: 'DAVID PARK', role: 'Product Manager', specialty: 'Strategy', id: 4 },
];

export default function TeamSection() {
  const t = useTranslations('team');

  return (
    <section id="team" className="py-24 px-6 md:px-12 bg-surface-light-1">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-medium mb-8">( {t('title').toUpperCase()} )</p>
          <h2 className="text-5xl md:text-7xl font-nostalgic">THE PEOPLE</h2>
          <h2 className="text-5xl md:text-7xl italic font-nostalgic">BEHIND YOUR</h2>
          <h2 className="text-5xl md:text-7xl font-nostalgic">SUCCESS</h2>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              {/* Card Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-[3/4] bg-white border-4 border-black relative overflow-hidden mb-4"
              >
                <div className="absolute inset-0 flex items-center justify-center text-sm">
                  [TEAM MEMBER {member.id}]
                </div>

                {/* Hover overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="w-12 h-12 rounded-full bg-brand border-2 border-white"
                  />
                </motion.div>
              </motion.div>

              {/* Card Info */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                className="border-2 border-black bg-white"
              >
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm">{member.name}</h3>
                  <p className="text-xs text-gray-600">{member.role}</p>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-xs font-medium bg-black text-white px-2 py-1">
                      {member.specialty}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
