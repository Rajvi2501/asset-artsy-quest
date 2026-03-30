import { motion } from "framer-motion";
import { Laptop, Headphones, Smartphone, Wrench, HelpCircle, BookOpen } from "lucide-react";

const actions = [
  { icon: Laptop, label: "Request Laptop", emoji: "💻", color: "bg-primary/10 text-primary hover:bg-primary/20" },
  { icon: Headphones, label: "Request Jabra", emoji: "🎧", color: "bg-coral/10 text-coral hover:bg-coral/20" },
  { icon: Smartphone, label: "Request Mobile", emoji: "📱", color: "bg-mint/10 text-mint hover:bg-mint/20" },
  { icon: Wrench, label: "Raise Issue", emoji: "🔧", color: "bg-sunshine/10 text-sunshine hover:bg-sunshine/20" },
  { icon: HelpCircle, label: "IT Support", emoji: "❓", color: "bg-sky/10 text-sky hover:bg-sky/20" },
  { icon: BookOpen, label: "IT Guidelines", emoji: "📖", color: "bg-lavender/10 text-lavender hover:bg-lavender/20" },
];

interface QuickActionsProps {
  onRequestClick: () => void;
}

const QuickActions = ({ onRequestClick }: QuickActionsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-card rounded-3xl shadow-card p-6 md:p-8"
    >
      <h3 className="text-xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
        ⚡ Quick Actions
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.55 + i * 0.06 }}
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={i < 3 ? onRequestClick : undefined}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300 ${action.color} cursor-pointer`}
          >
            <span className="text-2xl">{action.emoji}</span>
            <span className="text-xs font-semibold text-center leading-tight">{action.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActions;
