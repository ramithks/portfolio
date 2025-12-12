import { Reveal } from "../components/ui/Reveal";
import { Terminal } from "lucide-react";

const skillCategories = [
    {
        title: "Backend & Languages",
        skills: ["Python", "FastAPI", "Node.js", "TypeScript", "AsyncIO", "REST", "gRPC", "WebSockets"]
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "Query Optimization", "Indexing", "Schema Design", "ACID Transactions"]
    },
    {
        title: "Systems & Architecture",
        skills: ["Microservices", "Distributed Systems", "Event-Driven Architecture", "Caching Strategies", "Load Balancing", "High Availability", "Rate Limiting", "API Gateway", "Observability"]
    },
    {
        title: "Cloud & DevOps",
        skills: ["AWS (ECS, EC2, S3, CloudWatch, Lambda)", "Docker", "Terraform", "GitHub Actions", "CI/CD", "Infrastructure Automation"]
    },
    {
        title: "Testing & Reliability",
        skills: ["Pytest", "Integration Testing", "SLO/SLI Monitoring", "Incident Management", "Root Cause Analysis"]
    }
];

export const Skills = () => {
    return (
        <section id="skills" className="py-32 px-4 sm:px-10">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="mb-16">
                        {/* Terminal-style header */}
                        <div className="flex items-center gap-3 mb-4">
                            <Terminal className="text-primary" size={32} />
                            <h2 className="text-4xl md:text-5xl font-bold">
                                <span className="text-gray-500">$</span> cat technical_skills<span className="text-primary">.json</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 text-lg ml-11">
                            Core technologies and methodologies for building scalable systems
                        </p>
                    </div>
                </Reveal>

                <div className="space-y-8">
                    {skillCategories.map((category, idx) => (
                        <Reveal key={idx} delay={idx * 0.1}>
                            <div className="group relative bg-gradient-to-r from-gray-900/60 to-gray-900/30 border border-gray-800/70 rounded-lg p-6 hover:border-primary/40 transition-all duration-300">
                                {/* Category header - terminal style */}
                                <div className="flex items-start gap-4 mb-4">
                                    <span className="text-primary font-mono text-sm mt-1">{">"}</span>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-3 font-mono">
                                            "{category.title}"<span className="text-primary">:</span>
                                        </h3>
                                        
                                        {/* Skills grid */}
                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map((skill, skillIdx) => (
                                                <span
                                                    key={skillIdx}
                                                    className="px-3 py-1.5 text-sm font-mono bg-black/40 text-gray-300 rounded border border-gray-700/50 hover:border-primary/60 hover:text-primary hover:bg-black/60 transition-all duration-200"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Subtle line separator */}
                                {idx !== skillCategories.length - 1 && (
                                    <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
                                )}
                            </div>
                        </Reveal>
                    ))}
                </div>

                {/* Terminal prompt footer */}
                <Reveal delay={0.6}>
                    <div className="mt-8 text-gray-500 font-mono text-sm flex items-center gap-2">
                        <span className="text-primary">ramith@portfolio</span>
                        <span>~</span>
                        <span className="text-gray-600">%</span>
                        <span className="animate-pulse">_</span>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
