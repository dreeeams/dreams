'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <>
      {/* Cal.com inline embed script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function (C, A, L) {
              let p = function (a, ar) {
                a.q.push(ar);
              };
              let d = C.document;
              C.Cal =
                C.Cal ||
                function () {
                  let cal = C.Cal;
                  let ar = arguments;
                  if (!cal.q) {
                    cal.q = [];
                  }
                  if (ar[0] === "ns") {
                    cal.q.push(ar);
                    return;
                  }
                  if (ar[0] === "on") {
                    cal.q.push(ar);
                    return;
                  }
                  if (!cal.loaded) {
                    cal.ns = {};
                    cal.q.push(ar);
                    cal.loaded = true;
                    let t = d.createElement("script");
                    t.src = A;
                    t.async = true;
                    t.onload = function () {
                      cal.q.forEach((ar) => {
                        p(cal, ar);
                      });
                    };
                    d.head.appendChild(t);
                  }
                  p(cal, ar);
                };
            })(window, "https://app.cal.com/embed/embed.js", "Cal");

            Cal("init", { origin: "https://app.cal.com" });

            Cal("ui", {
              theme: "light",
              cssVarsPerTheme: {
                light: { "cal-brand": "#1E1E1E" },
                dark: { "cal-brand": "#DEE5ED" },
              },
              hideEventTypeDetails: false,
              layout: "month_view",
            });
          `,
        }}
      />

      <section id="contact" className="relative z-10 bg-white">
        {/* Contact Section */}
        <div className="py-24 px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center justify-center mb-8">
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic">
                  ({' '}
                </span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic text-center whitespace-nowrap">
                  {t('title').toUpperCase()}
                </h2>
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-nostalgic">
                  {' '}
                  )
                </span>
              </div>
              <p className="text-lg md:text-xl mb-4">{t('subtitle')}</p>
              <p className="text-sm text-gray-600">{t('noSpam')}</p>
            </motion.div>

            {/* Cal.com Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                data-cal-link="luis-fernandez-ezzzmp/30min"
                data-cal-config='{"layout":"month_view","theme":"light"}'
                type="button"
                className="bg-black text-white px-8 py-4 text-lg font-bold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {t('scheduleButton')}
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
