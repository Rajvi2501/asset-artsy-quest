import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { AdminRequest, Asset } from "@/types/admin";

interface Props {
  open: boolean;
  request?: AdminRequest;
  assets: Asset[];
  onClose: () => void;
  onAssign: (requestId: number, assetId: string) => void;
}

const AssignAssetModal = ({ open, request, assets, onClose, onAssign }: Props) => {
  const [selectedAsset, setSelectedAsset] = useState("");

  const handleSubmit = () => {
    if (!selectedAsset || !request) return;
    onAssign(request.id, selectedAsset);
    setSelectedAsset("");
    onClose();
  };

  const relevantAssets = assets.filter(a => a.type.toLowerCase() === request?.assetType.toLowerCase());

  return (
    <AnimatePresence>
      {open && request && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ type: "spring", damping: 25 }} className="bg-card rounded-3xl p-8 w-full max-w-md shadow-hover" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-wiggle">📦</span>
                <h3 className="text-xl font-display font-bold text-foreground">Assign Asset</h3>
              </div>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted"><X size={20} /></button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-2xl bg-muted/50">
                <p className="text-sm text-muted-foreground">👤 Employee: <span className="font-semibold text-foreground">{request.employeeName}</span></p>
                <p className="text-sm text-muted-foreground mt-1">🖥️ Asset Type: <span className="font-semibold text-foreground">{request.assetType}</span></p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">🏷️ Select Asset *</label>
                {relevantAssets.length > 0 ? (
                  <div className="space-y-2">
                    {relevantAssets.map(a => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAsset(a.id)}
                        className={`w-full text-left px-4 py-3 rounded-2xl text-sm transition-all duration-300 ${
                          selectedAsset === a.id
                            ? "gradient-hero text-primary-foreground shadow-playful"
                            : "bg-muted text-foreground hover:bg-primary/10"
                        }`}
                      >
                        <span className="font-mono font-bold">{a.id}</span> — {a.description}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-2xl">No available {request.assetType} assets 😕</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-5 border-t border-border">
              <Button variant="soft" onClick={onClose}>Cancel</Button>
              <Button variant="fun" onClick={handleSubmit} disabled={!selectedAsset}>✅ Confirm</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssignAssetModal;
