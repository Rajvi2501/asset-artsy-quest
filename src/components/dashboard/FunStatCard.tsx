import { motion } from "framer-motion";

interface FunStatCardProps {
  icon: string;
  value: number;
  label: string;
  gradient: string;
  delay?: number;
}

const FunStatCard = ({ icon, value, label, gradient, delay = 0 }: FunStatCardProps) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={`relative overflow-hidden rounded-3xl p-6 ${gradient} shadow-card cursor-default group`}
    >
      {/* Decorative circle */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-primary-foreground/10 group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute -bottom-2 -left-2 w-16 h-16 rounded-full bg-primary-foreground/5" />
      
      <div className="relative z-10">
        <span className="text-4xl mb-3 block animate-float">{icon}</span>
        <p className="text-4xl font-display font-bold text-primary-foreground">{value}</p>
        <p className="text-sm text-primary-foreground/80 font-semibold mt-1">{label}</p>
      </div>
    </motion.div>
  );
};

export default FunStatCard;
