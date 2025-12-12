import { Reveal } from "../components/ui/Reveal";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Code2, Database, Cloud, Server, Activity } from "lucide-react";

const skillCategories = [
    {
        icon: Code2,
        title: "Backend & Languages",
        skills: ["Python", "FastAPI", "Node.js", "TypeScript", "AsyncIO", "REST", "gRPC", "WebSockets"]
    },
    {
        icon: Database,
        title: "Databases",
        skills: ["PostgreSQL", "Redis", "MongoDB", "MySQL", "Query Optimization", "Indexing", "Schema Design", "ACID Transactions"]
    },
    {
        icon: Server,
        title: "Systems & Architecture",
        skills: ["Microservices", "Distributed Systems", "Event-Driven Architecture", "Caching Strategies", "Load Balancing", "High Availability", "Rate Limiting", "API Gateway", "Observability"]
    },
    {
        icon: Cloud,
        title: "Cloud & DevOps",
        skills: ["AWS (ECS, EC2, S3, CloudWatch, Lambda)", "Docker", "Terraform", "GitHub Actions", "CI/CD", "Infrastructure Automation"]
    },
    {
        icon: Activity,
        title: "Testing & Reliability",
        skills: ["Pytest", "Integration Testing", "SLO/SLI Monitoring", "Incident Management", "Root Cause Analysis"]
    }
];

export const Skills = () => {
    return (
        <section id="skills" className="py-32 px-4 sm:px-10">
            <div className="max-w-7xl mx-auto">
                <Reveal>
                    <div className="mb-20">
                        <h2 className="text-6xl font-bold mb-4 leading-tight">
                            Technical <span className="text-primary">Stack</span>
                        </h2>
                        <p className="text-gray-400 text-xl max-w-2xl">
                            Core technologies powering scalable, production-grade systems
                        </p>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, idx) => (
                        <Reveal key={idx} delay={idx * 0.1}>
                            <SpotlightCard className="p-6 bg-white/5 border-white/10 h-full">
                                {/* Icon */}
                                <div className="mb-4 inline-flex p-3 rounded-xl bg-primary/10">
                                    <category.icon className="text-primary" size={24} />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold mb-4">
                                    {category.title}
                                </h3>

                                {/* Skills List */}
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIdx) => (
                                        <span
                                            key={skillIdx}
                                            className="px-2.5 py-1 text-xs font-mono bg-white/5 text-gray-300 rounded border border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
