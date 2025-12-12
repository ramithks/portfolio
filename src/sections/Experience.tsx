import { Reveal } from "../components/ui/Reveal";

const experiences = [
  {
    company: "Zolnoi Innovations",
    role: "Senior Backend Engineer",
    period: "Oct 2024 - Present",
    location: "Bengaluru",
    points: [
      "Architected a multi-channel notification engine processing 5,000+ alerts/day with 99.5% delivery reliability, reducing operational load and alert fatigue.",
      "Consolidated 200+ alert streams into digest summaries, cutting user noise by 75% and improving engagement.",
      "Reduced API P95 latency from 800ms to 300ms (60%) through Redis caching, optimized DB calls, and critical-path refactors.",
      "Shipped 15+ production features across microservices; raised test coverage to 85%, preventing 30+ regressions.",
      "Achieved 4× faster queries via schema redesign, index tuning, and execution plan optimization."
    ],
    tech: ["FastAPI", "PostgreSQL", "Redis", "AWS", "Docker", "APScheduler"]
  },
  {
    company: "JustPoll (Streetlab Internet Pvt Ltd)",
    role: "Founder & CTO",
    period: "Oct 2021 - Mar 2025",
    location: "Bengaluru",
    points: [
      "Architected and scaled TypeScript backend serving 500+ beta users; improved query performance by 40% via schema optimization and caching.",
      "Designed WebSocket infrastructure supporting real-time features with distributed state and connection lifecycle management.",
      "Cut deployment time by 60% (45 → 15 mins) by introducing ECS autoscaling, CI/CD, and CloudWatch-driven observability.",
      "Built Redis-backed task queues with <200ms P95 latency, reducing incidents by 45%.",
      "Led a 5-member engineering team, driving 20+ releases and improving user retention by 65%."
    ],
    tech: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "AWS (ECS, S3)", "WebSockets", "Docker"]
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-32 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <Reveal>
            <div className="flex items-center gap-4 mb-20">
                <div className="h-px w-20 bg-white/20"></div>
                <span className="text-white/40 font-mono tracking-widest uppercase text-sm">
                    System Logs
                </span>
            </div>
        </Reveal>

        <div className="relative border-l-2 border-white/5 ml-4 md:ml-20 space-y-20">
            {experiences.map((exp, index) => (
                <div key={index} className="relative pl-8 md:pl-20">
                    {/* Commits Node Marker */}
                    <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-black border-4 border-white/10 group-hover:border-primary transition-colors z-10" />
                    
                    <Reveal delay={index * 0.1}>
                        <div className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
                            
                            {/* Metadata Column */}
                            <div className="text-white/30 font-mono text-sm pt-1">
                                <div>{exp.period}</div>
                                <div className="mt-1 text-primary/80">{exp.location}</div>
                            </div>

                            {/* Content Column */}
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    {exp.company}
                                </h3>
                                <div className="text-lg text-white/50 mb-6 font-medium tracking-wide">
                                    {exp.role}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {exp.points.map((point, i) => (
                                        <li key={i} className="text-gray-400 text-lg leading-relaxed pl-4 border-l border-white/10">
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono text-white/30 border border-white/5 px-2 py-1 rounded hover:text-primary hover:border-primary/20 transition-colors cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
