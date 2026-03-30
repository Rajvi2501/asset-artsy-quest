import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const tips = [
  { emoji: "💡", text: "Always return assets before the due date to maintain a clean record!" },
  { emoji: "🔋", text: "Keep your laptop charged above 20% to extend battery life" },
  { emoji: "🛡️", text: "Never share your device passwords with anyone" },
  { emoji: "📱", text: "Enable screen lock on all assigned mobile devices" },
  { emoji: "🎧", text: "Store your Jabra headset in its case when not in use" },
  { emoji: "💻", text: "Restart your laptop at least once a week for best performance" },
  { emoji: "🔒", text: "Lock your screen every time you leave your desk — Win+L!" },
  { emoji: "☁️", text: "Back up important files to the cloud regularly" },
];

const FunTipsBanner = () => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-card border border-border p-5 shadow-card"
    >
      {/* Decorative corner shapes */}
      <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-sunshine/10" />
      <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-lavender/10" />

      <div className="relative z-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-sunshine/20 flex items-center justify-center text-2xl shrink-0 animate-wiggle">
          {tips[currentTip].emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-sunshine uppercase tracking-wider mb-1">💡 IT Pro Tip</p>
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="text-sm text-foreground font-medium"
          >
            {tips[currentTip].text}
          </motion.p>
        </div>
        <div className="flex gap-1 shrink-0">
          {tips.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentTip(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentTip ? "bg-primary w-5" : "bg-border hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FunTipsBanner;
