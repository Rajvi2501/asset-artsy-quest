import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, ShieldCheck, ArrowRight, Monitor, Keyboard, Mouse, Cpu, Laptop, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingShapes from "@/components/dashboard/FloatingShapes";
import { toast } from "sonner";

const floatingIcons = [
  { icon: "💻", x: "8%", y: "15%", delay: 0, size: "text-4xl" },
  { icon: "🖱️", x: "85%", y: "20%", delay: 0.5, size: "text-3xl" },
  { icon: "⌨️", x: "12%", y: "75%", delay: 1, size: "text-3xl" },
  { icon: "📱", x: "90%", y: "70%", delay: 1.5, size: "text-4xl" },
  { icon: "🖥️", x: "5%", y: "45%", delay: 0.8, size: "text-3xl" },
  { icon: "🎧", x: "92%", y: "45%", delay: 1.2, size: "text-3xl" },
  { icon: "📀", x: "20%", y: "90%", delay: 0.3, size: "text-2xl" },
  { icon: "🔌", x: "80%", y: "88%", delay: 1.8, size: "text-2xl" },
];

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState<"employee" | "admin" | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!employeeId.trim()) {
      toast.error("Please enter your Employee ID! 🆔");
      return;
    }
    if (!role) {
      toast.error("Please select your role! 👤");
      return;
    }
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
      <FloatingShapes />

      {/* Floating cartoon icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.size} pointer-events-none select-none opacity-60`}
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Top nav bar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center gap-3 px-6 py-4"
      >
        <div className="w-12 h-12 rounded-2xl gradient-cool flex items-center justify-center shadow-playful">
          <Monitor className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            IT Asset Management
          </h1>
          <p className="text-xs text-muted-foreground">Manage, allocate, and track IT assets efficiently ✨</p>
        </div>
      </motion.div>

      {/* Login card */}
      <div className="relative z-10 flex items-center justify-center px-4" style={{ minHeight: "calc(100vh - 80px)" }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-playful p-8 border border-border/50 relative overflow-hidden">
            {/* Decorative corner blobs */}
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-primary/10 animate-blob" />
            <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-secondary/10 animate-blob" style={{ animationDelay: "2s" }} />

            {/* Cartoon mascot */}
            <motion.div
              className="flex justify-center mb-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center shadow-hover text-4xl">
                🛡️
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-center text-foreground mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-muted-foreground mb-6 text-sm"
            >
              Sign in with your Employee ID 🎯
            </motion.p>

            {/* Employee ID */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.55 }}
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
                className="h-12 rounded-xl bg-muted/50 border-border/60 text-base focus-visible:ring-primary/40 placeholder:text-muted-foreground/60"
              />
            </motion.div>

            {/* Role selection */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mb-6"
            >
              <label className="block text-sm font-semibold text-foreground mb-3 text-center" style={{ fontFamily: "var(--font-display)" }}>
                Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole("employee")}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    role === "employee"
                      ? "border-primary bg-primary/10 shadow-playful"
                      : "border-border/60 bg-muted/30 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  {role === "employee" && (
                    <motion.div
                      layoutId="roleGlow"
                      className="absolute inset-0 rounded-2xl border-2 border-primary/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    role === "employee" ? "gradient-cool" : "bg-muted"
                  }`}>
                    <User className={`w-6 h-6 ${role === "employee" ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <span className={`font-semibold text-sm ${role === "employee" ? "text-primary" : "text-foreground"}`}
                    style={{ fontFamily: "var(--font-display)" }}>
                    Employee
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setRole("admin")}
                  className={`relative p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    role === "admin"
                      ? "border-secondary bg-secondary/10 shadow-playful"
                      : "border-border/60 bg-muted/30 hover:border-secondary/40 hover:bg-secondary/5"
                  }`}
                >
                  {role === "admin" && (
                    <motion.div
                      layoutId="roleGlow"
                      className="absolute inset-0 rounded-2xl border-2 border-secondary/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    role === "admin" ? "gradient-warm" : "bg-muted"
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

            {/* Continue button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75 }}
            >
              <Button
                onClick={handleContinue}
                className="w-full h-12 rounded-xl text-base font-bold gradient-hero text-primary-foreground border-0 shadow-playful hover:shadow-hover transition-all duration-300"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Fun footer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-xs text-muted-foreground mt-5"
            >
              Made with 💜 for seamless asset management
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
