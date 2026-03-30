import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RequestModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: RequestData) => void;
}

export interface RequestData {
  employeeName: string;
  assetType: string;
  customAsset: string;
  purpose: string;
  department: string;
  returnDate: string;
}

const departments = [
  "3101-UNIT HEAD OFFICE -VHEW", "3104-SUB CONTRACTING", "3106-WELDING ENGINEERING",
  "3107-DESIGN COMPETENCY CENTRE", "3108-PURCHASE & STORES", "3109-METALLICS QA-QC & NDT",
  "3111-IR, ADMIN & MEDICAL CENTER", "3112-FINANCE & ACCOUNTS", "3113-EHS",
  "3115-INFORMATION TECHNOLOGY", "3117-MAINTENANCE", "3119-ANNEX-VHEW",
  "3120-PLANT ENGINEERING", "3121-HR & TQM", "3123-PMG - NUCLEAR",
  "3130-MFG. SHOP INCHARGE", "3131-PRODUCTION BAY-II", "3132-PRODUCTION BAY-III",
  "3133-PRODUCTION BAY-IV", "3134-METALIC-NPL", "3135-SHOP PLANNING",
  "3136-PRODUCTION BAY-I", "3138-PRODUCTION ENGINEERING", "3139-MACHINE SHOP",
  "3161-PMG - PPI", "3198-MARKETING - PPI",
];

const assetTypes = ["Laptop", "Pendrive", "Mobile", "Jabra", "Other"];

const RequestModal = ({ open, onClose, onSubmit }: RequestModalProps) => {
  const [form, setForm] = useState<RequestData>({
    employeeName: "", assetType: "", customAsset: "", purpose: "", department: "", returnDate: "",
  });
  const [deptSearch, setDeptSearch] = useState("");
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  const filteredDepts = departments.filter(d => d.toLowerCase().includes(deptSearch.toLowerCase()));

  const handleSubmit = () => {
    if (!form.employeeName || !form.assetType || !form.department || !form.returnDate) return;
    onSubmit(form);
    setForm({ employeeName: "", assetType: "", customAsset: "", purpose: "", department: "", returnDate: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-card rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-hover"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-wiggle">🎯</span>
                <h3 className="text-xl font-display font-bold text-foreground">Request IT Asset</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted">
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">👤 Employee Name *</label>
                <input
                  value={form.employeeName}
                  onChange={e => setForm(f => ({ ...f, employeeName: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">🖥️ Asset Type *</label>
                <div className="flex flex-wrap gap-2">
                  {assetTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setForm(f => ({ ...f, assetType: type, customAsset: "" }))}
                      className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                        form.assetType === type
                          ? "gradient-hero text-primary-foreground shadow-playful scale-105"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      }`}
                    >
                      {type === "Laptop" && "💻"} {type === "Pendrive" && "💾"} {type === "Mobile" && "📱"} {type === "Jabra" && "🎧"} {type === "Other" && "🔧"} {type}
                    </button>
                  ))}
                </div>
              </div>

              {form.assetType === "Other" && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
                  <label className="block text-sm font-semibold text-foreground mb-2">✏️ Specify Asset *</label>
                  <input
                    value={form.customAsset}
                    onChange={e => setForm(f => ({ ...f, customAsset: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder="What do you need?"
                  />
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">📝 Purpose *</label>
                <textarea
                  value={form.purpose}
                  onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                  rows={3}
                  placeholder="Why do you need this asset?"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-semibold text-foreground mb-2">🏢 Department *</label>
                <input
                  value={form.department || deptSearch}
                  onChange={e => { setDeptSearch(e.target.value); setForm(f => ({ ...f, department: "" })); setShowDeptDropdown(true); }}
                  onFocus={() => setShowDeptDropdown(true)}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                  placeholder="Search department..."
                />
                {showDeptDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-hover max-h-48 overflow-y-auto z-50">
                    {filteredDepts.map(dept => (
                      <button
                        key={dept}
                        onClick={() => { setForm(f => ({ ...f, department: dept })); setDeptSearch(""); setShowDeptDropdown(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted text-foreground transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                      >
                        {dept}
                      </button>
                    ))}
                    {filteredDepts.length === 0 && <p className="px-4 py-3 text-sm text-muted-foreground">No results</p>}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">📅 Expected Return Date *</label>
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={e => setForm(f => ({ ...f, returnDate: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-border">
              <Button variant="soft" onClick={onClose}>Cancel</Button>
              <Button variant="fun" onClick={handleSubmit}>🚀 Submit Request</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RequestModal;
