import { motion } from "framer-motion";

interface Badge {
  emoji: string;
  title: string;
  description: string;
  earned: boolean;
  gradient: string;
}

const badges: Badge[] = [
  { emoji: "🌟", title: "First Request", description: "Made your first asset request", earned: true, gradient: "gradient-warm" },
  { emoji: "⚡", title: "Speed Runner", description: "Returned asset before due date", earned: true, gradient: "gradient-fun" },
  { emoji: "🏆", title: "Asset Champion", description: "5+ assets managed successfully", earned: false, gradient: "gradient-hero" },
  { emoji: "🎯", title: "Perfect Record", description: "Zero overdue returns", earned: false, gradient: "gradient-cool" },
  { emoji: "🦸", title: "IT Hero", description: "Helped resolve 3 IT issues", earned: false, gradient: "gradient-warm" },
];

const AchievementBadges = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="bg-card rounded-3xl shadow-card p-6 md:p-8"
    >
      <h3 className="text-xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
        🏅 Achievements
      </h3>
      <div className="flex flex-wrap gap-3">
        {badges.map((badge, i) => (
          <motion.div
            key={badge.title}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.08 }}
            whileHover={{ scale: 1.08, y: -4 }}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl cursor-default transition-all duration-300 ${
              badge.earned
                ? `${badge.gradient} shadow-playful`
                : "bg-muted/50 border border-border"
            }`}
          >
            <span className={`text-2xl ${badge.earned ? "animate-wiggle" : "grayscale opacity-40"}`}>
              {badge.emoji}
            </span>
            <div>
              <p className={`text-sm font-bold ${badge.earned ? "text-primary-foreground" : "text-muted-foreground"}`}>
                {badge.title}
              </p>
              <p className={`text-xs ${badge.earned ? "text-primary-foreground/70" : "text-muted-foreground/60"}`}>
                {badge.description}
              </p>
            </div>
            {!badge.earned && (
              <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-border flex items-center justify-center">
                <span className="text-[8px]">🔒</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AchievementBadges;
