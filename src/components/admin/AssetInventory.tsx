import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import CartoonAssetIcon from "@/components/dashboard/CartoonAssetIcon";
import type { Asset } from "@/types/admin";

const assetStatusColors: Record<string, string> = {
  "available": "bg-mint text-primary-foreground",
  "in-use": "gradient-cool text-primary-foreground",
  "maintenance": "bg-sunshine text-foreground",
};

interface Props {
  assets: Asset[];
  onDelete: (id: string) => void;
}

const AssetInventory = ({ assets, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {["Asset ID", "Type", "Description", "Status", "Assigned To", "Actions"].map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, i) => (
            <motion.tr
              key={asset.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="border-b border-border/50 hover:bg-muted/30 transition-colors"
            >
              <td className="py-4 px-3 font-mono text-xs text-foreground font-semibold">{asset.id}</td>
              <td className="py-4 px-3">
                <div className="flex items-center gap-2">
                  <CartoonAssetIcon type={asset.type} size="sm" />
                  <span className="font-semibold text-foreground">{asset.type}</span>
                </div>
              </td>
              <td className="py-4 px-3 text-muted-foreground text-xs">{asset.description}</td>
              <td className="py-4 px-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${assetStatusColors[asset.status]}`}>
                  {asset.status === "available" && "✅"} {asset.status === "in-use" && "🔗"} {asset.status === "maintenance" && "🔧"} {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                </span>
              </td>
              <td className="py-4 px-3 text-foreground text-xs">{asset.assignedTo}</td>
              <td className="py-4 px-3">
                <button
                  onClick={() => onDelete(asset.id)}
                  className="p-1.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetInventory;
