import { motion } from "framer-motion";

interface TimelineEvent {
  emoji: string;
  title: string;
  time: string;
  detail: string;
  color: string;
}

const events: TimelineEvent[] = [
  { emoji: "📦", title: "Laptop Collected", time: "Jan 15, 2025", detail: "DELL-LAP-0042 assigned", color: "bg-primary" },
  { emoji: "📝", title: "Jabra Requested", time: "Feb 20, 2025", detail: "Waiting for approval", color: "bg-sunshine" },
  { emoji: "🚨", title: "Mobile Overdue", time: "Jan 01, 2025", detail: "SAM-MOB-0018 — please return", color: "bg-destructive" },
];

const ActivityTimeline = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-card rounded-3xl shadow-card p-6 md:p-8"
    >
      <h3 className="text-xl font-display font-bold text-foreground mb-5 flex items-center gap-2">
        📜 Recent Activity
      </h3>
      <div className="space-y-0">
        {events.map((event, i) => (
          <motion.div
            key={i}
            initial={{ x: -15, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.65 + i * 0.1 }}
            className="flex gap-4 group"
          >
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full ${event.color} flex items-center justify-center text-lg shadow-playful group-hover:scale-110 transition-transform`}>
                {event.emoji}
              </div>
              {i < events.length - 1 && (
                <div className="w-0.5 flex-1 bg-border my-1" />
              )}
            </div>
            {/* Content */}
            <div className="pb-6 flex-1">
              <p className="font-bold text-foreground text-sm">{event.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
              <p className="text-xs text-muted-foreground/70 mt-1 bg-muted/50 inline-block px-2 py-1 rounded-lg">{event.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityTimeline;
