import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { AdminRequest } from "@/types/admin";

interface Props {
  open: boolean;
  request?: AdminRequest;
  onClose: () => void;
  onHold: (id: number, reason: string) => void;
}

const HoldModal = ({ open, request, onClose, onHold }: Props) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason || !request) return;
    onHold(request.id, reason);
    setReason("");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && request && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", damping: 25 }} className="bg-card rounded-3xl p-8 w-full max-w-md shadow-hover" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏸️</span>
                <h3 className="text-xl font-display font-bold text-foreground">Hold Ticket</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"><X size={20} /></button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">📝 Hold Reason *</label>
              <textarea value={reason} onChange={e => setReason(e.target.value)} className="w-full px-4 py-3 rounded-2xl border-2 border-border bg-background text-foreground focus:border-sunshine focus:outline-none transition-colors resize-none" rows={3} placeholder="Why is this on hold?" />
              <p className="text-xs text-muted-foreground mt-1">This reason will be visible to the employee</p>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-5 border-t border-border">
              <Button variant="soft" onClick={onClose}>Cancel</Button>
              <Button variant="fun" onClick={handleSubmit} disabled={!reason}>⏸️ Put on Hold</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HoldModal;
