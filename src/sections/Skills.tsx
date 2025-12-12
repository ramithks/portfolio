import { Reveal } from "../components/ui/Reveal";

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
        <section id="skills" className="py-32 px-4 md:px-10">
            <div className="max-w-5xl mx-auto">
                <Reveal>
                    <div className="flex items-center gap-4 mb-20">
                        <div className="h-px w-20 bg-white/20"></div>
                        <span className="text-white/40 font-mono tracking-widest uppercase text-sm">
                            Technical Stack
                        </span>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-6">
                    {skillCategories.map((category, idx) => (
                        <Reveal key={idx} delay={idx * 0.1}>
                            <div className="border border-white/5 p-6 hover:border-white/10 transition-colors">
                                <h3 className="text-lg font-mono text-white/50 mb-4 tracking-wide">
                                    {category.title}
                                </h3>
                                
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIdx) => (
                                        <span
                                            key={skillIdx}
                                            className="text-xs font-mono text-white/30 border border-white/5 px-2 py-1 rounded hover:text-primary hover:border-primary/20 transition-colors cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
};
