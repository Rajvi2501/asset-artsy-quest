import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const quotes = [
  { text: "Track every asset from request to return 📋", emoji: "📋" },
  { text: "Real-time visibility into your IT inventory 🖥️", emoji: "🖥️" },
  { text: "Simplified asset management for modern teams 🚀", emoji: "🚀" },
  { text: "Request, approve & assign — all in one place ✅", emoji: "✅" },
  { text: "Stay organized, stay productive 💼", emoji: "💼" },
];

const SpeechBubble = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Speech bubble shape */}
      <div className="relative bg-card border-2 border-foreground/10 rounded-2xl px-5 py-3 shadow-md">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-semibold text-foreground text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {quotes[index].text}
          </motion.p>
        </AnimatePresence>
        {/* Bubble tail */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-r-2 border-b-2 border-foreground/10 rotate-45" />
      </div>
    </div>
  );
};

export default SpeechBubble;
