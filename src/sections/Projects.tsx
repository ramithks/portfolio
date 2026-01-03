import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { TiltCard } from "../components/ui/TiltCard";
import { useState } from "react";
import { ProjectModal } from "../components/ui/ProjectModal";

const projects = [
  {
    title: "AlgoHabit",
    category: "AI-POWERED // ED-TECH",
    desc: "AI-powered DSA learning platform designed around habit formation, streaks, and gamified progression. 50+ active users.",
    tech: ["React", "Supabase", "OpenRouter AI", "PWA"],
    link: "https://algohabit.com",
    github: null,
    details: {
        problem: "Students struggle to maintain consistency in learning DSA. Existing platforms lack gamification and personalized learning plans.",
        solution: "Built a Progressive Web App (PWA) with offline-first architecture. Integrated AI via OpenRouter to convert syllabi into structured learning plans.",
        impact: "Achieved 95+ Lighthouse score. AI pipeline reduced content costs by 70%. Improved 30-day user retention by 60%."
    }
  },
  {
    title: "Ledgerly",
    category: "FINTECH // ML",
    desc: "Smart finance tracker with predictive categorization (Logistic Regression) and expense forecasting (ARIMA).",
    tech: ["FastAPI", "React", "ML (TF-IDF)", "Pytest"],
    link: null,
    github: null,
    details: {
        problem: "Managing multiple subscriptions and forecasting future expenses is manually intensive for users.",
        solution: "Developed ML pipelines for 88% accurate subscription classification and MAD-based anomaly detection.",
        impact: "Achieved 92% code coverage with Pytest. Categorized transactions with 88% accuracy across 50+ categories."
    }
  },
  {
    title: "HelpMyBuddy",
    category: "HACKATHON WINNER // GEO",
    desc: "Real-time emergency marketplace with <500ms matching latency using MongoDB spatial queries.",
    tech: ["React Native", "Node.js", "Express", "FastAPI"],
    link: null,
    github: "https://github.com/SiliconNinjas/HelpMyBuddy",
    details: {
        problem: "Fragmented systems for finding immediate emergency help like car breakdowns or medical needs.",
        solution: "High-concurrency matching engine connecting users to helpers within a 5km radius using geospatial indexing.",
        impact: "Won HackBangalore 2024. Proved low-latency matching in real-time scenarios."
    }
  },
  {
    title: "AG-WALLET",
    category: "SUPPLY CHAIN // AGRI",
    desc: "Supply chain platform connecting farmers and distributors with real-time price monitoring and Google Maps API.",
    tech: ["Android (Java)", "MySQL", "Google Maps API"],
    link: null,
    github: null,
    details: {
        problem: "Lack of transparency in agricultural supply chains leads to poor pricing for farmers.",
        solution: "Built a direct-access platform for location-based distributor discovery and quality rating systems.",
        impact: "Enabled transparent pricing and improved downstream visibility for agricultural producers."
    }
  }
];

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="work" className="py-24 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
         <Reveal>
             <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
                Key Projects
             </h2>
         </Reveal>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
                <Reveal key={index} delay={index * 0.1}>
                    <div onClick={() => setSelectedProject(project)} className="cursor-pointer h-full"> 
                        <TiltCard>
                            <SpotlightCard className="group relative overflow-hidden flex flex-col justify-between h-full min-h-[300px] p-8 hover:border-primary/50 transition-all">
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-2 py-1 rounded">
                                            {project.category}
                                        </span>
                                        <div className="flex gap-2">
                                            {project.github && (
                                                <div className="text-text-secondary hover:text-white transition-colors">
                                                    <Github size={20} />
                                                </div>
                                            )}
                                            {project.link && (
                                                <div className="text-text-secondary hover:text-white transition-colors">
                                                    <ExternalLink size={20} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    
                                    <p className="text-text-secondary leading-relaxed mb-6 text-sm">
                                        {project.desc}
                                    </p>
                                </div>

                                <div className="relative z-10 border-t border-white/5 pt-4 mt-auto">
                                    <div className="flex flex-wrap gap-4 items-center">
                                        <Code2 size={14} className="text-primary" />
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="text-xs font-medium text-text-secondary">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </SpotlightCard>
                        </TiltCard>
                    </div>
                </Reveal>
            ))}
         </div>

         <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
         />
      </div>
    </section>
  );
};
