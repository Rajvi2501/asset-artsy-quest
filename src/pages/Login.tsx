import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, ArrowRight, Monitor, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingShapes from "@/components/dashboard/FloatingShapes";
import { toast } from "sonner";

const floatingIcons = [
  { icon: "💻", x: "7%", y: "20%", delay: 0 },
  { icon: "🖥️", x: "87%", y: "18%", delay: 0.8 },
  { icon: "⌨️", x: "10%", y: "72%", delay: 1.2 },
  { icon: "📱", x: "90%", y: "68%", delay: 0.4 },
  { icon: "🎧", x: "82%", y: "42%", delay: 1.6 },
  { icon: "🖱️", x: "5%", y: "48%", delay: 2 },
  { icon: "📡", x: "18%", y: "88%", delay: 0.6 },
  { icon: "🔐", x: "78%", y: "85%", delay: 1 },
];

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState<"employee" | "admin" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!employeeId.trim()) {
      toast.error("Please enter your Employee ID");
      return;
    }
    if (!role) {
      toast.error("Please select your role");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      navigate(role === "admin" ? "/admin" : "/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <FloatingShapes />

      {/* Floating tech icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none opacity-30"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Top nav */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center gap-3 px-6 py-4"
      >
        <div className="w-11 h-11 rounded-xl gradient-cool flex items-center justify-center shadow-playful">
          <Monitor className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            IT Asset Management
          </h1>
          <p className="text-xs text-muted-foreground">Manage, allocate, and track IT assets efficiently</p>
        </div>
      </motion.div>

      {/* Login card */}
      <div className="relative z-10 flex items-center justify-center px-4" style={{ minHeight: "calc(100vh - 72px)" }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.15 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-playful p-8 border border-border/40 relative overflow-hidden">
            {/* Subtle decorative blobs */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/8 animate-blob" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-accent/8 animate-blob" style={{ animationDelay: "3s" }} />

            {/* Icon */}
            <motion.div
              className="flex justify-center mb-5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-hover">
                <Fingerprint className="w-8 h-8 text-primary-foreground" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-2xl font-bold text-center text-foreground mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="text-center text-muted-foreground mb-6 text-sm"
            >
              Sign in with your Employee ID
            </motion.p>

            {/* Employee ID */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-5"
            >
              <label className="block text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-display)" }}>
                Employee ID
              </label>
              <Input
                type="text"
                placeholder="e.g. 90311504"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="h-12 rounded-xl bg-muted/40 border-2 border-border/50 text-base focus-visible:ring-primary/30 focus-visible:border-primary/50 placeholder:text-muted-foreground/50"
              />
            </motion.div>

            {/* Role selection */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <label className="block text-sm font-semibold text-foreground mb-3 text-center" style={{ fontFamily: "var(--font-display)" }}>
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                {/* Employee */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole("employee")}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2.5 ${
                    role === "employee"
                      ? "border-primary bg-primary/8 shadow-playful"
                      : "border-border/50 bg-muted/20 hover:border-primary/30"
                  }`}
                >
                  <AnimatePresence>
                    {role === "employee" && (
                      <motion.div
                        layoutId="roleIndicator"
                        className="absolute inset-0 rounded-2xl border-2 border-primary/40"
                        initial={false}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    role === "employee" ? "gradient-cool shadow-md" : "bg-muted"
                  }`}>
                    <User className={`w-6 h-6 ${role === "employee" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-semibold text-sm ${role === "employee" ? "text-primary" : "text-foreground"}`}
                    style={{ fontFamily: "var(--font-display)" }}>
                    Employee
                  </span>
                </motion.button>

                {/* Admin */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole("admin")}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2.5 ${
                    role === "admin"
                      ? "border-secondary bg-secondary/8 shadow-playful"
                      : "border-border/50 bg-muted/20 hover:border-secondary/30"
                  }`}
                >
                  <AnimatePresence>
                    {role === "admin" && (
                      <motion.div
                        layoutId="roleIndicator"
                        className="absolute inset-0 rounded-2xl border-2 border-secondary/40"
                        initial={false}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      />
                    )}
                  </AnimatePresence>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    role === "admin" ? "gradient-warm shadow-md" : "bg-muted"
                  }`}>
                    <ShieldCheck className={`w-6 h-6 ${role === "admin" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-semibold text-sm ${role === "admin" ? "text-secondary" : "text-foreground"}`}
                    style={{ fontFamily: "var(--font-display)" }}>
                    Admin
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Continue */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                onClick={handleContinue}
                disabled={isLoading}
                className="w-full h-12 rounded-xl text-base font-bold gradient-hero text-primary-foreground border-0 shadow-playful hover:shadow-hover transition-all duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {isLoading ? "Signing in..." : (
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
              transition={{ delay: 0.9 }}
              className="text-center text-xs text-muted-foreground mt-5"
            >
              Seamless IT Asset Management
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
