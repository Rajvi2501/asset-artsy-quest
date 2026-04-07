import { motion } from "framer-motion";
import { Check, X, Pause, RotateCcw, Package } from "lucide-react";
import CartoonAssetIcon from "@/components/dashboard/CartoonAssetIcon";
import type { AdminRequest } from "@/types/admin";

const statusColors: Record<string, string> = {
  pending: "bg-sunshine text-foreground",
  approved: "bg-mint text-primary-foreground",
  collected: "gradient-cool text-primary-foreground",
  overdue: "bg-destructive text-destructive-foreground",
  closed: "bg-muted-foreground text-primary-foreground",
  cancelled: "bg-destructive text-destructive-foreground",
  hold: "bg-coral text-primary-foreground",
};

const statusEmojis: Record<string, string> = {
  pending: "⏳",
  approved: "✅",
  collected: "📦",
  overdue: "🚨",
  closed: "🔒",
  cancelled: "❌",
  hold: "⏸️",
};

interface Props {
  requests: AdminRequest[];
  onApprove: (id: number) => void;
  onAssign: (req: AdminRequest) => void;
  onReject: (req: AdminRequest) => void;
  onHold: (req: AdminRequest) => void;
  onReturn: (req: AdminRequest) => void;
}

const AdminRequestTable = ({ requests, onApprove, onAssign, onReject, onHold, onReturn }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["Employee", "Asset", "Purpose", "Date", "Return", "Status", "Actions"].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((req, i) => (
            <motion.tr
              key={req.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
            >
              <td className="py-4 px-3">
                <div>
                  <p className="font-semibold text-foreground text-sm">{req.employeeName}</p>
                  <p className="text-xs text-muted-foreground">{req.employeeId}</p>
                </div>
              </td>
              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <CartoonAssetIcon type={req.assetType} size="sm" />
                  <span className="font-semibold text-foreground">{req.assetType}</span>
                </div>
              </td>
              <td className="py-4 px-3 text-muted-foreground text-xs max-w-[150px] truncate">{req.purpose}</td>
              <td className="py-4 px-3 text-foreground text-xs">{req.requestDate}</td>
              <td className="py-4 px-3 text-foreground text-xs">{req.returnDate}</td>
              <td className="py-4 px-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusColors[req.status]}`}>
                  {statusEmojis[req.status]} {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>
              <td className="py-4 px-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {req.status === "pending" && (
                    <>
                      <button onClick={() => onApprove(req.id)} className="p-1.5 rounded-xl bg-mint/20 text-mint hover:bg-mint/30 transition-colors" title="Approve">
                        <Check size={14} />
                      </button>
                      <button onClick={() => onReject(req)} className="p-1.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors" title="Reject">
                        <X size={14} />
                      </button>
                      <button onClick={() => onHold(req)} className="p-1.5 rounded-xl bg-sunshine/20 text-foreground hover:bg-sunshine/30 transition-colors" title="Hold">
                        <Pause size={14} />
                      </button>
                    </>
                  )}
                  {req.status === "approved" && (
                    <button onClick={() => onAssign(req)} className="p-1.5 rounded-xl bg-sky/20 text-sky hover:bg-sky/30 transition-colors" title="Assign Asset">
                      <Package size={14} />
                    </button>
                  )}
                  {(req.status === "collected" || req.status === "overdue") && (
                    <button onClick={() => onReturn(req)} className="p-1.5 rounded-xl bg-lavender/20 text-primary hover:bg-lavender/30 transition-colors" title="Return">
                      <RotateCcw size={14} />
                    </button>
                  )}
                </div>
              </td>
            </motion.tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-12 text-muted-foreground">
                <span className="text-4xl block mb-2">📭</span>
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminRequestTable;
