import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, LogOut, Bell, ChevronDown, AlertTriangle, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingShapes from "@/components/dashboard/FloatingShapes";
import FunStatCard from "@/components/dashboard/FunStatCard";
import CartoonAssetIcon from "@/components/dashboard/CartoonAssetIcon";
import RequestModal from "@/components/dashboard/RequestModal";
import FunIllustration from "@/components/dashboard/FunIllustration";
import FunTipsBanner from "@/components/dashboard/FunTipsBanner";
import AchievementBadges from "@/components/dashboard/AchievementBadges";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityTimeline from "@/components/dashboard/ActivityTimeline";
import type { RequestData } from "@/components/dashboard/RequestModal";

interface AssetRequest {
  id: number;
  employeeName: string;
  assetType: string;
  department: string;
  requestDate: string;
  returnDate: string;
  assignedAsset: string;
  status: "pending" | "approved" | "collected" | "overdue" | "closed" | "cancelled";
}

const statusColors: Record<string, string> = {
  pending: "bg-sunshine text-foreground",
  approved: "bg-mint text-primary-foreground",
  collected: "gradient-cool text-primary-foreground",
  overdue: "bg-destructive text-destructive-foreground",
  closed: "bg-muted-foreground text-primary-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
};

const statusEmojis: Record<string, string> = {
  pending: "⏳",
  approved: "✅",
  collected: "📦",
  overdue: "🚨",
  closed: "🔒",
  cancelled: "❌",
};

const sampleRequests: AssetRequest[] = [
  { id: 1, employeeName: "Rahul Sharma", assetType: "Laptop", department: "3115-INFORMATION TECHNOLOGY", requestDate: "2025-01-15", returnDate: "2025-04-15", assignedAsset: "DELL-LAP-0042", status: "collected" },
  { id: 2, employeeName: "Rahul Sharma", assetType: "Jabra", department: "3115-INFORMATION TECHNOLOGY", requestDate: "2025-02-20", returnDate: "2025-03-20", assignedAsset: "-", status: "pending" },
  { id: 3, employeeName: "Rahul Sharma", assetType: "Mobile", department: "3115-INFORMATION TECHNOLOGY", requestDate: "2024-12-01", returnDate: "2025-01-01", assignedAsset: "SAM-MOB-0018", status: "overdue" },
];

const Index = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [requests, setRequests] = useState<AssetRequest[]>(sampleRequests);
  const [searchTerm, setSearchTerm] = useState("");

  const hasOverdue = requests.some(r => r.status === "overdue");
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const handleSubmit = (data: RequestData) => {
    const newReq: AssetRequest = {
      id: Date.now(),
      employeeName: data.employeeName,
      assetType: data.assetType === "Other" ? data.customAsset : data.assetType,
      department: data.department,
      requestDate: new Date().toISOString().split("T")[0],
      returnDate: data.returnDate,
      assignedAsset: "-",
      status: "pending",
    };
    setRequests(prev => [newReq, ...prev]);
  };

  const filtered = requests.filter(r =>
    r.assetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background relative font-body">
      <FloatingShapes />

      {/* Nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4 bg-card/80 backdrop-blur-md border-b border-border"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-hero rounded-2xl flex items-center justify-center shadow-playful">
            <Monitor size={20} className="text-primary-foreground" />
          </div>
          <h1 className="text-xl font-display font-bold text-foreground">IT Assets</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden md:block">{dateStr}</span>
          <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell size={18} className="text-muted-foreground" />
            {hasOverdue && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />}
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 gradient-cool rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">RS</div>
            <span className="text-sm font-semibold text-foreground hidden md:block">Rahul</span>
            <ChevronDown size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row items-center gap-6 mb-10"
        >
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Welcome back, <span className="text-gradient">Rahul!</span> 👋
            </h2>
            <p className="text-muted-foreground text-lg">Manage your IT assets with ease and style</p>
          </div>
          <div className="w-48 h-48 md:w-56 md:h-56 animate-float-slow">
            <FunIllustration />
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <FunStatCard icon="📋" value={requests.length} label="Total Requests" gradient="gradient-hero" delay={0.15} />
          <FunStatCard icon="⏳" value={requests.filter(r => r.status === "pending").length} label="Pending" gradient="gradient-warm" delay={0.25} />
          <FunStatCard icon="📦" value={requests.filter(r => r.status === "collected").length} label="Collected" gradient="gradient-fun" delay={0.35} />
          <FunStatCard icon="🚨" value={requests.filter(r => r.status === "overdue").length} label="Overdue" gradient="gradient-cool" delay={0.45} />
        </div>

        {/* Overdue Notice */}
        {hasOverdue && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 mb-6"
          >
            <AlertTriangle size={22} className="text-destructive animate-wiggle" />
            <p className="text-sm font-semibold text-destructive">⚠️ You have overdue assets! Please return them immediately.</p>
          </motion.div>
        )}

        {/* Requests Table */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-card rounded-3xl shadow-card p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              📂 My Requests
            </h3>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full md:w-56 pl-9 pr-4 py-2.5 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-sm"
                  placeholder="Search requests..."
                />
              </div>
              <Button variant="fun" size="default" onClick={() => setModalOpen(true)}>
                <Plus size={16} /> Request
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {["Asset", "Department", "Request Date", "Return Date", "Assigned", "Status"].map(h => (
                    <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((req, i) => (
                  <motion.tr
                    key={req.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors group"
                  >
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <CartoonAssetIcon type={req.assetType} size="sm" />
                        <span className="font-semibold text-foreground">{req.assetType}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 text-muted-foreground text-xs">{req.department}</td>
                    <td className="py-4 px-3 text-foreground">{req.requestDate}</td>
                    <td className="py-4 px-3 text-foreground">{req.returnDate}</td>
                    <td className="py-4 px-3 font-mono text-xs text-muted-foreground">{req.assignedAsset}</td>
                    <td className="py-4 px-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusColors[req.status]}`}>
                        {statusEmojis[req.status]} {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-muted-foreground">
                      <span className="text-4xl block mb-2">🔍</span>
                      No requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Fun footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center mt-10 pb-8"
        >
          <p className="text-sm text-muted-foreground">
            Made with 💜 by IT Team • Keep your assets safe! 🔐
          </p>
        </motion.div>
      </div>

      <RequestModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} />
    </div>
  );
};

export default Index;
