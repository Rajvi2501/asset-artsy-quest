import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Bell, ChevronDown, Monitor, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingShapes from "@/components/dashboard/FloatingShapes";
import FunStatCard from "@/components/dashboard/FunStatCard";
import CartoonAssetIcon from "@/components/dashboard/CartoonAssetIcon";
import AdminRequestTable from "@/components/admin/AdminRequestTable";
import AssetInventory from "@/components/admin/AssetInventory";
import AddAssetModal from "@/components/admin/AddAssetModal";
import AssignAssetModal from "@/components/admin/AssignAssetModal";
import RejectModal from "@/components/admin/RejectModal";
import HoldModal from "@/components/admin/HoldModal";
import ReturnAssetModal from "@/components/admin/ReturnAssetModal";
import type { AdminRequest, Asset } from "@/types/admin";

const sampleRequests: AdminRequest[] = [
  { id: 1, employeeId: "EMP-001", employeeName: "Rahul Sharma", assetType: "Laptop", purpose: "Development work", department: "3115-INFORMATION TECHNOLOGY", requestDate: "2025-01-15", returnDate: "2025-04-15", assignedAsset: "DELL-LAP-0042", status: "collected" },
  { id: 2, employeeId: "EMP-002", employeeName: "Priya Singh", assetType: "Jabra", purpose: "Client calls", department: "3198-MARKETING - PPI", requestDate: "2025-02-20", returnDate: "2025-03-20", assignedAsset: "-", status: "pending" },
  { id: 3, employeeId: "EMP-003", employeeName: "Amit Patel", assetType: "Mobile", purpose: "Field operations", department: "3120-PLANT ENGINEERING", requestDate: "2024-12-01", returnDate: "2025-01-01", assignedAsset: "SAM-MOB-0018", status: "overdue" },
  { id: 4, employeeId: "EMP-004", employeeName: "Sneha Gupta", assetType: "Laptop", purpose: "Training", department: "3121-HR & TQM", requestDate: "2025-01-10", returnDate: "2025-02-10", assignedAsset: "-", status: "approved" },
  { id: 5, employeeId: "EMP-005", employeeName: "Vikram Das", assetType: "Pendrive", purpose: "Data transfer", department: "3112-FINANCE & ACCOUNTS", requestDate: "2025-02-01", returnDate: "2025-02-15", assignedAsset: "USB-032", status: "closed" },
];

const sampleAssets: Asset[] = [
  { id: "DELL-LAP-0042", type: "Laptop", description: "Dell Latitude 5540", status: "in-use", assignedTo: "Rahul Sharma", location: "IT Dept", purchaseDate: "2024-03-15" },
  { id: "DELL-LAP-0043", type: "Laptop", description: "Dell Latitude 5540", status: "available", assignedTo: "-", location: "Store Room", purchaseDate: "2024-03-15" },
  { id: "SAM-MOB-0018", type: "Mobile", description: "Samsung Galaxy A54", status: "in-use", assignedTo: "Amit Patel", location: "Plant Eng", purchaseDate: "2024-06-20" },
  { id: "USB-032", type: "Pendrive", description: "SanDisk 64GB", status: "available", assignedTo: "-", location: "Store Room", purchaseDate: "2024-01-10" },
  { id: "JAB-010", type: "Jabra", description: "Jabra Evolve2 75", status: "available", assignedTo: "-", location: "IT Dept", purchaseDate: "2024-08-01" },
];

type FilterStatus = "all" | "pending" | "approved" | "collected" | "overdue" | "closed" | "hold";

const Admin = () => {
  const [requests, setRequests] = useState<AdminRequest[]>(sampleRequests);
  const [assets, setAssets] = useState<Asset[]>(sampleAssets);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [addAssetOpen, setAddAssetOpen] = useState(false);
  const [assignModal, setAssignModal] = useState<{ open: boolean; request?: AdminRequest }>({ open: false });
  const [rejectModal, setRejectModal] = useState<{ open: boolean; request?: AdminRequest }>({ open: false });
  const [holdModal, setHoldModal] = useState<{ open: boolean; request?: AdminRequest }>({ open: false });
  const [returnModal, setReturnModal] = useState<{ open: boolean; request?: AdminRequest }>({ open: false });

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const approvedCount = requests.filter(r => r.status === "approved").length;
  const collectedCount = requests.filter(r => r.status === "collected").length;
  const overdueCount = requests.filter(r => r.status === "overdue").length;
  const closedCount = requests.filter(r => r.status === "closed").length;

  const filtered = requests.filter(r => {
    const matchesFilter = filter === "all" || r.status === filter;
    const matchesSearch = r.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.assetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "approved" } : r));
  };

  const handleAssign = (requestId: number, assetId: string) => {
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: "collected", assignedAsset: assetId } : r));
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: "in-use", assignedTo: requests.find(r => r.id === requestId)?.employeeName || "" } : a));
  };

  const handleReject = (id: number, _reason: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "cancelled" } : r));
  };

  const handleHold = (id: number, _reason: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "hold" } : r));
  };

  const handleReturn = (requestId: number, _condition: string) => {
    const req = requests.find(r => r.id === requestId);
    setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: "closed" } : r));
    if (req?.assignedAsset && req.assignedAsset !== "-") {
      setAssets(prev => prev.map(a => a.id === req.assignedAsset ? { ...a, status: "available", assignedTo: "-" } : a));
    }
  };

  const handleAddAsset = (asset: Asset) => {
    setAssets(prev => [asset, ...prev]);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(prev => prev.filter(a => a.id !== id));
  };

  const filterButtons: { label: string; value: FilterStatus; emoji: string }[] = [
    { label: "All", value: "all", emoji: "📋" },
    { label: "Pending", value: "pending", emoji: "⏳" },
    { label: "Approved", value: "approved", emoji: "✅" },
    { label: "Collected", value: "collected", emoji: "📦" },
    { label: "Overdue", value: "overdue", emoji: "🚨" },
    { label: "Closed", value: "closed", emoji: "🔒" },
    { label: "Hold", value: "hold", emoji: "⏸️" },
  ];

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
          <span className="px-3 py-1 rounded-full gradient-cool text-primary-foreground text-xs font-bold flex items-center gap-1">
            <Shield size={12} /> Admin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden md:block">{dateStr}</span>
          <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell size={18} className="text-muted-foreground" />
            {pendingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center font-bold animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 gradient-hero rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">AD</div>
            <span className="text-sm font-semibold text-foreground hidden md:block">Admin</span>
            <ChevronDown size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
          </div>
        </div>
      </motion.nav>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Hero */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Admin <span className="text-gradient">Command Center</span> 🎛️
          </h2>
          <p className="text-muted-foreground text-lg">Manage requests, assets, and keep everything running smoothly</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          <FunStatCard icon="📋" value={requests.length} label="Total" gradient="gradient-hero" delay={0.15} />
          <FunStatCard icon="⏳" value={pendingCount} label="Pending" gradient="gradient-warm" delay={0.2} />
          <FunStatCard icon="✅" value={approvedCount} label="Approved" gradient="gradient-fun" delay={0.25} />
          <FunStatCard icon="📦" value={collectedCount} label="Collected" gradient="gradient-cool" delay={0.3} />
          <FunStatCard icon="🚨" value={overdueCount} label="Overdue" gradient="gradient-warm" delay={0.35} />
          <FunStatCard icon="🔒" value={closedCount} label="Closed" gradient="gradient-fun" delay={0.4} />
        </div>

        {/* Request Inbox */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="bg-card rounded-3xl shadow-card p-6 md:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              📥 Request Inbox
              <span className="px-3 py-1 rounded-full bg-sunshine text-foreground text-xs font-bold">
                {pendingCount} pending
              </span>
            </h3>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-56 pl-9 pr-4 py-2.5 rounded-2xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors text-sm"
                  placeholder="Search requests..."
                />
              </div>
              <Button variant="soft" size="sm" className="rounded-2xl">
                <Download size={14} /> Export
              </Button>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filterButtons.map(fb => (
              <button
                key={fb.value}
                onClick={() => setFilter(fb.value)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-300 ${
                  filter === fb.value
                    ? "gradient-hero text-primary-foreground shadow-playful scale-105"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {fb.emoji} {fb.label}
              </button>
            ))}
          </div>

          <AdminRequestTable
            requests={filtered}
            onApprove={handleApprove}
            onAssign={(req) => setAssignModal({ open: true, request: req })}
            onReject={(req) => setRejectModal({ open: true, request: req })}
            onHold={(req) => setHoldModal({ open: true, request: req })}
            onReturn={(req) => setReturnModal({ open: true, request: req })}
          />
        </motion.div>

        {/* Asset Inventory */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="bg-card rounded-3xl shadow-card p-6 md:p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
              🗄️ Asset Inventory
            </h3>
            <Button variant="fun" size="default" onClick={() => setAddAssetOpen(true)}>
              <Plus size={16} /> Add Asset
            </Button>
          </div>
          <AssetInventory assets={assets} onDelete={handleDeleteAsset} />
        </motion.div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-center mt-10 pb-8">
          <p className="text-sm text-muted-foreground">Made with 💜 by IT Team • Admin Panel 🛡️</p>
        </motion.div>
      </div>

      {/* Modals */}
      <AddAssetModal open={addAssetOpen} onClose={() => setAddAssetOpen(false)} onSubmit={handleAddAsset} />
      <AssignAssetModal
        open={assignModal.open}
        request={assignModal.request}
        assets={assets.filter(a => a.status === "available")}
        onClose={() => setAssignModal({ open: false })}
        onAssign={handleAssign}
      />
      <RejectModal
        open={rejectModal.open}
        request={rejectModal.request}
        onClose={() => setRejectModal({ open: false })}
        onReject={handleReject}
      />
      <HoldModal
        open={holdModal.open}
        request={holdModal.request}
        onClose={() => setHoldModal({ open: false })}
        onHold={handleHold}
      />
      <ReturnAssetModal
        open={returnModal.open}
        request={returnModal.request}
        onClose={() => setReturnModal({ open: false })}
        onReturn={handleReturn}
      />
    </div>
  );
};

export default Admin;
