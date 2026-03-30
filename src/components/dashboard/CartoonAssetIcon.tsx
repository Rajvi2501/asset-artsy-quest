interface CartoonAssetIconProps {
  type: string;
  size?: "sm" | "md" | "lg";
}

const assetEmojis: Record<string, string> = {
  Laptop: "💻",
  Pendrive: "💾",
  Mobile: "📱",
  Jabra: "🎧",
  Other: "🔧",
};

const CartoonAssetIcon = ({ type, size = "md" }: CartoonAssetIconProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-lg",
    md: "w-12 h-12 text-2xl",
    lg: "w-16 h-16 text-3xl",
  };

  return (
    <div className={`${sizeClasses[size]} rounded-2xl bg-muted flex items-center justify-center animate-wiggle`}>
      {assetEmojis[type] || "📦"}
    </div>
  );
};

export default CartoonAssetIcon;
