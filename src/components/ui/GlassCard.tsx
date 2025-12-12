import { cn } from "../../lib/utils";

export const GlassCard = ({ className, children }: { className?: string, children: React.ReactNode }) => (
  <div className={cn("bg-[#1a1a1e] border border-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/5 transition-all duration-300 shadow-xl", className)}>
    {children}
  </div>
)
