import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ComicScene from "@/components/login/ComicScene";
import SpeechBubble from "@/components/login/SpeechBubble";
import FloatingShapes from "@/components/dashboard/FloatingShapes";
import { toast } from "sonner";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState<"employee" | "admin" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!employeeId.trim()) {
      toast.error("Please enter your Employee ID to continue.");
      return;
    }
    if (!role) {
      toast.error("Please select your role to proceed.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      navigate(role === "admin" ? "/admin" : "/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <FloatingShapes />

      {/* Comic-style halftone background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top bar */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center gap-3 px-6 py-4"
      >
        <motion.div
          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md"
          style={{ background: "var(--gradient-cool)" }}
          whileHover={{ rotate: 12 }}
        >
          <Zap className="w-5 h-5 text-primary-foreground" />
        </motion.div>
        <div>
          <h1 className="text-lg font-bold text-foreground font-display">
            IT Asset Hub
          </h1>
          <p className="text-xs text-muted-foreground">IT Asset Management Portal</p>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center px-4" style={{ minHeight: "calc(100vh - 72px)" }}>
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 items-center">

          {/* Left — Illustration + Speech bubble */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.1 }}
            className="hidden md:flex flex-col items-center gap-5"
          >
            <SpeechBubble />
            <div className="w-full max-w-xs">
              <ComicScene />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-muted-foreground text-center italic"
            >
              "Streamline your IT assets, simplify your workflow" ✨
            </motion.p>
          </motion.div>

          {/* Right — Login card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.2 }}
          >
            <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-[var(--shadow-playful)] p-8 border-2 border-border/30 relative overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary/5" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent/5" />

              {/* Comic-style ZAP badge */}
              <motion.div
                className="flex justify-center mb-4"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.4 }}
              >
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ background: "var(--gradient-hero)" }}
                  >
                    <span className="text-3xl">🚀</span>
                  </div>
                  {/* Sparkle */}
                  <motion.span
                    className="absolute -top-1 -right-1 text-sm"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </div>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-2xl font-bold text-center text-foreground mb-1 font-display"
              >
                Welcome Back 👋
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-center text-muted-foreground mb-6 text-sm"
              >
                Sign in with your Employee ID to get started
              </motion.p>

              {/* Employee ID */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-5"
              >
                <label className="block text-sm font-semibold text-foreground mb-2 font-display">
                  Employee ID 🪪
                </label>
                <Input
                  type="text"
                  placeholder="e.g. 90311504"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleContinue()}
                  className="h-12 rounded-xl bg-muted/40 border-2 border-border/50 text-base focus-visible:ring-primary/30 focus-visible:border-primary/50 placeholder:text-muted-foreground/50"
                />
              </motion.div>

              {/* Role selection */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mb-6"
              >
                <label className="block text-sm font-semibold text-foreground mb-3 text-center font-display">
                  Select Your Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <RoleCard
                    role="employee"
                    selected={role === "employee"}
                    onSelect={() => setRole("employee")}
                    icon={<User className="w-6 h-6" />}
                    label="Employee"
                    emoji="👨‍💻"
                    activeGradient="var(--gradient-cool)"
                    activeColor="text-primary"
                  />
                  <RoleCard
                    role="admin"
                    selected={role === "admin"}
                    onSelect={() => setRole("admin")}
                    icon={<ShieldCheck className="w-6 h-6" />}
                    label="Admin"
                    emoji="🛡️"
                    activeGradient="var(--gradient-warm)"
                    activeColor="text-secondary"
                  />
                </div>
              </motion.div>

              {/* Submit */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-base font-bold text-primary-foreground border-0 shadow-[var(--shadow-playful)] hover:shadow-[var(--shadow-hover)] transition-all duration-300 font-display"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  {isLoading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      ⚡
                    </motion.span>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-center text-xs text-muted-foreground mt-5"
              >
                Made with ❤️ for IT Teams
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/* ---- Role Card Sub-Component ---- */
interface RoleCardProps {
  role: string;
  selected: boolean;
  onSelect: () => void;
  icon: React.ReactNode;
  label: string;
  emoji: string;
  activeGradient: string;
  activeColor: string;
}

const RoleCard = ({ selected, onSelect, icon, label, emoji, activeGradient, activeColor }: RoleCardProps) => (
  <motion.button
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.96 }}
    onClick={onSelect}
    className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
      selected
        ? `border-current ${activeColor} bg-current/5 shadow-[var(--shadow-playful)]`
        : "border-border/50 bg-muted/20 hover:border-primary/20"
    }`}
  >
    <AnimatePresence>
      {selected && (
        <motion.div
          layoutId="roleGlow"
          className="absolute inset-0 rounded-2xl opacity-10"
          style={{ background: activeGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          exit={{ opacity: 0 }}
        />
      )}
    </AnimatePresence>
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
        selected ? "text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"
      }`}
      style={selected ? { background: activeGradient } : undefined}
    >
      {selected ? <span className="text-xl">{emoji}</span> : icon}
    </div>
    <span className={`font-semibold text-sm font-display ${selected ? activeColor : "text-foreground"}`}>
      {label}
    </span>
  </motion.button>
);

export default Login;
