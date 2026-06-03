import { motion } from 'framer-motion'
import { BarChart3, Globe, Megaphone, Search, TrendingUp } from 'lucide-react'

const floating = [
  { icon: Search, label: 'SEO +42%', x: '-12%', y: '8%', delay: 0 },
  { icon: Megaphone, label: 'Ads Live', x: '88%', y: '12%', delay: 0.3 },
  { icon: Globe, label: 'Site Speed 98', x: '92%', y: '58%', delay: 0.6 },
  { icon: TrendingUp, label: 'Leads ↑', x: '-8%', y: '62%', delay: 0.9 },
]

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-lg perspective-1200 lg:max-w-none">
      {floating.map(({ icon: Icon, label, x, y, delay }) => (
        <motion.div
          key={label}
          className="glass absolute z-20 hidden rounded-2xl px-3 py-2 shadow-xl sm:flex sm:items-center sm:gap-2"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + delay, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' }}
            className="flex items-center gap-2"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange/20 text-orange">
              <Icon size={16} />
            </div>
            <span className="text-xs font-medium text-white/90">{label}</span>
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, rotateX: 18, rotateY: -12, y: 40 }}
        animate={{ opacity: 1, rotateX: 8, rotateY: -6, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-orange/20 via-purple/30 to-blue/15 blur-3xl" />

        <motion.div
          animate={{ rotateX: [8, 5, 8], rotateY: [-6, -3, -6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/5 p-3 shadow-2xl shadow-purple/20 sm:rounded-3xl sm:p-4"
        >
          <div className="mb-3 flex items-center gap-2 px-1">
            <span className="h-2.5 w-2.5 rounded-full bg-orange/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-blue/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-purple/80" />
            <span className="ml-2 font-mono text-[10px] text-white/40 sm:text-xs">
              growth.digihooks.app
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10 bg-bg/90">
            <div className="flex border-b border-white/10 p-3 sm:p-4">
              <div className="flex-1">
                <p className="text-[10px] uppercase tracking-wider text-white/40 sm:text-xs">
                  Revenue pipeline
                </p>
                <p className="font-display text-xl font-bold text-white sm:text-2xl">+127%</p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/20 text-orange sm:h-10 sm:w-10">
                <BarChart3 size={18} />
              </div>
            </div>

            <div className="flex h-24 items-end gap-1.5 p-3 sm:h-28 sm:gap-2 sm:p-4">
              {[40, 55, 48, 72, 65, 88, 78, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-purple to-blue"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 1.2 + i * 0.05, duration: 0.6 }}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-white/10 p-3 sm:p-4">
              {[
                { label: 'Organic', val: '8.4k' },
                { label: 'Leads', val: '342' },
                { label: 'Conv.', val: '4.2%' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-lg p-2 sm:p-3">
                  <p className="text-[10px] text-white/45 sm:text-xs">{stat.label}</p>
                  <p className="font-display text-sm font-semibold text-blue sm:text-base">
                    {stat.val}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
