import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, ShieldCheck, ArrowRight, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FloatingShapes from "@/components/dashboard/FloatingShapes";
import { toast } from "sonner";

// Cute kawaii mascot SVG component
const KawaiiRobot = ({ mood }: { mood: "idle" | "happy" | "wink" }) => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    {/* Body */}
    <rect x="25" y="45" width="70" height="55" rx="18" fill="hsl(258, 65%, 58%)" />
    {/* Belly */}
    <rect x="38" y="58" width="44" height="30" rx="12" fill="hsl(258, 65%, 72%)" opacity="0.5" />
    {/* Head */}
    <rect x="20" y="10" width="80" height="45" rx="20" fill="hsl(258, 65%, 58%)" />
    {/* Face plate */}
    <rect x="30" y="18" width="60" height="30" rx="12" fill="hsl(0, 0%, 100%)" />
    {/* Eyes */}
    {mood === "wink" ? (
      <>
        <ellipse cx="48" cy="33" rx="7" ry="7" fill="hsl(250, 30%, 15%)" />
        <ellipse cx="48" cy="30" rx="3" ry="2" fill="white" />
        <path d="M65 30 Q72 36 79 30" stroke="hsl(250, 30%, 15%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </>
    ) : (
      <>
        <ellipse cx="48" cy="33" rx={mood === "happy" ? 7 : 6} ry={mood === "happy" ? 7 : 6} fill="hsl(250, 30%, 15%)" />
        <ellipse cx="48" cy="30" rx="3" ry="2" fill="white" />
        <ellipse cx="72" cy="33" rx={mood === "happy" ? 7 : 6} ry={mood === "happy" ? 7 : 6} fill="hsl(250, 30%, 15%)" />
        <ellipse cx="72" cy="30" rx="3" ry="2" fill="white" />
      </>
    )}
    {/* Mouth */}
    {mood === "happy" ? (
      <path d="M52 40 Q60 48 68 40" stroke="hsl(340, 80%, 62%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    ) : (
      <ellipse cx="60" cy="42" rx="5" ry="3" fill="hsl(340, 80%, 62%)" />
    )}
    {/* Cheeks */}
    <circle cx="38" cy="40" r="4" fill="hsl(340, 80%, 82%)" opacity="0.6" />
    <circle cx="82" cy="40" r="4" fill="hsl(340, 80%, 82%)" opacity="0.6" />
    {/* Antenna */}
    <line x1="60" y1="10" x2="60" y2="2" stroke="hsl(258, 65%, 58%)" strokeWidth="3" strokeLinecap="round" />
    <circle cx="60" cy="0" r="4" fill="hsl(172, 66%, 50%)" />
    {/* Arms */}
    <rect x="10" y="55" width="18" height="12" rx="6" fill="hsl(258, 65%, 48%)" />
    <rect x="92" y="55" width="18" height="12" rx="6" fill="hsl(258, 65%, 48%)" />
    {/* Feet */}
    <rect x="32" y="95" width="20" height="12" rx="6" fill="hsl(258, 65%, 48%)" />
    <rect x="68" y="95" width="20" height="12" rx="6" fill="hsl(258, 65%, 48%)" />
    {/* Heart on belly */}
    <path d="M55 68 C55 65 52 63 52 66 C52 69 55 72 58 75 L60 73 L62 75 C65 72 68 69 68 66 C68 63 65 65 65 68 C65 70 62 72 60 73 C58 72 55 70 55 68Z" fill="hsl(340, 80%, 62%)" opacity="0.8" />
  </svg>
);

// Sparkle component
const Sparkle = ({ x, y, delay, size = 16 }: { x: string; y: string; delay: number; size?: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
      opacity: [0, 1, 0],
    }}
    transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"
        fill="hsl(42, 95%, 65%)"
      />
    </svg>
  </motion.div>
);

// Cute cloud
const CuteCloud = ({ x, y, delay, scale = 1 }: { x: string; y: string; delay: number; scale?: number }) => (
  <motion.div
    className="absolute pointer-events-none"
    style={{ left: x, top: y }}
    animate={{ x: [0, 20, 0], y: [0, -5, 0] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  >
    <svg width={80 * scale} height={50 * scale} viewBox="0 0 80 50">
      <ellipse cx="40" cy="35" rx="35" ry="15" fill="white" opacity="0.4" />
      <ellipse cx="28" cy="28" rx="18" ry="16" fill="white" opacity="0.4" />
      <ellipse cx="55" cy="28" rx="20" ry="14" fill="white" opacity="0.4" />
      <ellipse cx="40" cy="22" rx="16" ry="14" fill="white" opacity="0.4" />
    </svg>
  </motion.div>
);

// Floating cute items
const cuteFloaters = [
  { icon: "🐱", x: "6%", y: "18%", delay: 0 },
  { icon: "🦊", x: "88%", y: "15%", delay: 0.8 },
  { icon: "🐰", x: "8%", y: "78%", delay: 1.2 },
  { icon: "🐻", x: "91%", y: "75%", delay: 0.4 },
  { icon: "💻", x: "15%", y: "45%", delay: 1.6 },
  { icon: "🎮", x: "85%", y: "48%", delay: 2 },
  { icon: "⭐", x: "25%", y: "12%", delay: 0.6 },
  { icon: "🌈", x: "78%", y: "88%", delay: 1 },
  { icon: "🍭", x: "92%", y: "32%", delay: 1.4 },
  { icon: "🎈", x: "4%", y: "60%", delay: 1.8 },
];

// Bouncing dots loader
const BouncingDots = () => (
  <div className="flex gap-1 justify-center">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 rounded-full bg-primary-foreground"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
      />
    ))}
  </div>
);

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [role, setRole] = useState<"employee" | "admin" | null>(null);
  const [robotMood, setRobotMood] = useState<"idle" | "happy" | "wink">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Robot reacts to input
  useEffect(() => {
    if (employeeId.length > 0 && role) {
      setRobotMood("happy");
    } else if (employeeId.length > 0 || role) {
      setRobotMood("wink");
    } else {
      setRobotMood("idle");
    }
  }, [employeeId, role]);

  const handleContinue = () => {
    if (!employeeId.trim()) {
      toast.error("Employee ID daalo na! 🆔", { description: "Bina ID ke kaise chalega? 😄" });
      return;
    }
    if (!role) {
      toast.error("Role select karo! 👤", { description: "Employee ya Admin? 🤔" });
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15">
      <FloatingShapes />

      {/* Cute clouds */}
      <CuteCloud x="5%" y="8%" delay={0} scale={1.2} />
      <CuteCloud x="70%" y="5%" delay={2} scale={0.8} />
      <CuteCloud x="50%" y="85%" delay={4} scale={1} />

      {/* Sparkles */}
      <Sparkle x="20%" y="25%" delay={0} size={14} />
      <Sparkle x="75%" y="20%" delay={1} size={18} />
      <Sparkle x="30%" y="80%" delay={2} size={12} />
      <Sparkle x="80%" y="70%" delay={0.5} size={16} />
      <Sparkle x="10%" y="50%" delay={1.5} size={10} />
      <Sparkle x="60%" y="10%" delay={2.5} size={14} />

      {/* Floating cute animals & items */}
      {cuteFloaters.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl pointer-events-none select-none"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Rainbow arc at top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <svg width="600" height="150" viewBox="0 0 600 150">
          {["hsl(0,80%,65%)", "hsl(30,90%,60%)", "hsl(50,95%,65%)", "hsl(120,60%,55%)", "hsl(200,80%,62%)", "hsl(258,65%,58%)", "hsl(280,60%,60%)"].map((color, i) => (
            <path
              key={i}
              d={`M ${50 + i * 8} 150 A ${250 - i * 8} ${120 - i * 5} 0 0 1 ${550 - i * 8} 150`}
              fill="none"
              stroke={color}
              strokeWidth="6"
              opacity="0.7"
            />
          ))}
        </svg>
      </motion.div>

      {/* Top nav bar */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center gap-3 px-6 py-4"
      >
        <motion.div
          className="w-12 h-12 rounded-2xl gradient-cool flex items-center justify-center shadow-playful"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Monitor className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        <div>
          <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            IT Asset Management 🎪
          </h1>
          <p className="text-xs text-muted-foreground">Assets ko manage karna ab hai masti! ✨</p>
        </div>
      </motion.div>

      {/* Login card */}
      <div className="relative z-10 flex items-center justify-center px-4" style={{ minHeight: "calc(100vh - 80px)" }}>
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 60, rotate: -3 }}
          animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/95 backdrop-blur-xl rounded-[2rem] shadow-playful p-8 border-2 border-border/40 relative overflow-hidden">
            {/* Decorative corner blobs */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-sunshine/20 animate-blob" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-accent/15 animate-blob" style={{ animationDelay: "3s" }} />
            <div className="absolute top-1/2 -right-6 w-16 h-16 rounded-full bg-secondary/10 animate-blob" style={{ animationDelay: "5s" }} />

            {/* Kawaii Robot Mascot */}
            <motion.div
              className="flex justify-center mb-3"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-24 h-24 relative">
                <KawaiiRobot mood={robotMood} />
                {/* Speech bubble */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={robotMood}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-3 -right-14 bg-card rounded-xl px-2 py-1 text-xs font-bold shadow-md border border-border/50 whitespace-nowrap"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {robotMood === "idle" && "Hii! 👋"}
                    {robotMood === "wink" && "Badhiya! 😊"}
                    {robotMood === "happy" && "Chalein! 🚀"}
                    <div className="absolute -bottom-1 left-3 w-2 h-2 bg-card border-b border-r border-border/50 rotate-45" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-center text-foreground mb-0.5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Welcome Back! 🎉
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-muted-foreground mb-5 text-sm"
            >
              Apni ID daalo aur shuru karo! 🎯
            </motion.p>

            {/* Employee ID */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.55, type: "spring" }}
              className="mb-5"
            >
              <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-lg">🎫</span> Employee ID
              </label>
              <Input
                type="text"
                placeholder="e.g. 90311504"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="h-12 rounded-2xl bg-muted/40 border-2 border-border/50 text-base focus-visible:ring-primary/30 focus-visible:border-primary/50 placeholder:text-muted-foreground/50 transition-all"
              />
            </motion.div>

            {/* Role selection */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.65, type: "spring" }}
              className="mb-6"
            >
              <label className="block text-sm font-semibold text-foreground mb-3 text-center flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-display)" }}>
                <span className="text-lg">🎭</span> Select Your Role
              </label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRole("employee")}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    role === "employee"
                      ? "border-primary bg-primary/10 shadow-playful"
                      : "border-border/50 bg-muted/20 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  <AnimatePresence>
                    {role === "employee" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 text-lg"
                      >
                        ✅
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={role === "employee" ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-4xl"
                  >
                    👨‍💼
                  </motion.div>
                  <span className={`font-bold text-sm ${role === "employee" ? "text-primary" : "text-foreground"}`}
                    style={{ fontFamily: "var(--font-display)" }}>
                    Employee
                  </span>
                  <span className="text-[10px] text-muted-foreground">Assets use karo</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRole("admin")}
                  className={`relative p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    role === "admin"
                      ? "border-secondary bg-secondary/10 shadow-playful"
                      : "border-border/50 bg-muted/20 hover:border-secondary/40 hover:bg-secondary/5"
                  }`}
                >
                  <AnimatePresence>
                    {role === "admin" && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 text-lg"
                      >
                        ✅
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={role === "admin" ? { rotate: [0, -10, 10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-4xl"
                  >
                    🦸‍♂️
                  </motion.div>
                  <span className={`font-bold text-sm ${role === "admin" ? "text-secondary" : "text-foreground"}`}
                    style={{ fontFamily: "var(--font-display)" }}>
                    Admin
                  </span>
                  <span className="text-[10px] text-muted-foreground">Assets manage karo</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Continue button */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.75, type: "spring" }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="w-full h-13 rounded-2xl text-base font-bold gradient-hero text-primary-foreground border-0 shadow-playful hover:shadow-hover transition-all duration-300"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      Chal rahe hain <BouncingDots />
                    </div>
                  ) : (
                    <>
                      Let's Go! 🚀
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {/* Fun footer with walking emoji */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-5 relative"
            >
              <p className="text-xs text-muted-foreground">
                Made with 💜 by cute robots 🤖
              </p>
              {/* Tiny walking character */}
              <motion.div
                className="absolute -bottom-2 text-sm"
                animate={{ x: ["-10%", "110%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                🐾
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
