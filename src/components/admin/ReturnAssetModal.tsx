import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { AdminRequest } from "@/types/admin";

const conditions = [
  { value: "good", label: "Good - No issues", emoji: "✅" },
  { value: "minor", label: "Minor Damage", emoji: "⚠️" },
  { value: "major", label: "Major Damage", emoji: "🔴" },
  { value: "broken", label: "Not Working", emoji: "💀" },
];

interface Props {
  open: boolean;
  request?: AdminRequest;
  onClose: () => void;
  onReturn: (requestId: number, condition: string) => void;
}

const ReturnAssetModal = ({ open, request, onClose, onReturn }: Props) => {
  const [condition, setCondition] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!condition || !request) return;
    onReturn(request.id, condition);
    setCondition("");
    setNotes("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && request && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", damping: 25 }} className="bg-card rounded-3xl p-8 w-full max-w-md shadow-hover" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-wiggle">🔄</span>
                <h3 className="text-xl font-display font-bold text-foreground">Return Asset</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"><X size={20} /></button>
            </div>

            <div className="p-4 rounded-2xl bg-muted/50 mb-4">
              <p className="text-sm text-muted-foreground">👤 Employee: <span className="font-semibold text-foreground">{request.employeeName}</span></p>
              <p className="text-sm text-muted-foreground mt-1">🏷️ Asset: <span className="font-semibold text-foreground">{request.assignedAsset}</span></p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">🔍 Asset Condition *</label>
                <div className="grid grid-cols-2 gap-2">
                  {conditions.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setCondition(c.value)}
                      className={`px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 ${
                        condition === c.value
                          ? "gradient-hero text-primary-foreground shadow-playful scale-105"
                          : "bg-muted text-muted-foreground hover:bg-primary/10"
                      }`}
                    >
                      {c.emoji} {c.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">📋 Notes</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-primary focus:outline-none transition-colors resize-none" rows={2} placeholder="Any notes..." />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-border">
              <Button variant="soft" onClick={onClose}>Cancel</Button>
              <Button variant="fun" onClick={handleSubmit} disabled={!condition}>🔄 Confirm Return</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReturnAssetModal;
