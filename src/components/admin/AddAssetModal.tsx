import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Asset } from "@/types/admin";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (asset: Asset) => void;
}

const AddAssetModal = ({ open, onClose, onSubmit }: Props) => {
  const [form, setForm] = useState({ id: "", type: "", description: "", location: "", purchaseDate: "", notes: "" });

  const handleSubmit = () => {
    if (!form.id || !form.type || !form.description) return;
    onSubmit({ ...form, status: "available", assignedTo: "-" });
    setForm({ id: "", type: "", description: "", location: "", purchaseDate: "", notes: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", damping: 25 }} className="bg-card rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-hover" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-wiggle">🆕</span>
                <h3 className="text-xl font-display font-bold text-foreground">Add New Asset</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"><X size={20} /></button>
            </div>

            <div className="space-y-4">
              {[
                { label: "🏷️ Asset ID", key: "id", placeholder: "e.g. DELL-LAP-0044" },
                { label: "🖥️ Asset Type", key: "type", placeholder: "e.g. Laptop" },
                { label: "📝 Description", key: "description", placeholder: "e.g. Dell Latitude 5540" },
                { label: "📍 Location", key: "location", placeholder: "e.g. Store Room" },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-semibold text-foreground mb-2">{field.label} *</label>
                  <input
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">📅 Purchase Date</label>
                <input type="date" value={form.purchaseDate} onChange={e => setForm(f => ({ ...f, purchaseDate: e.target.value }))} className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">📋 Notes</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors resize-none" rows={2} placeholder="Optional notes..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8 pt-5 border-t border-border">
              <Button variant="soft" onClick={onClose}>Cancel</Button>
              <Button variant="fun" onClick={handleSubmit}>💾 Save Asset</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddAssetModal;
