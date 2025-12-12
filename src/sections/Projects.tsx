import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Github, ExternalLink, Code2 } from "lucide-react";
import { Reveal } from "../components/ui/Reveal";
import { TiltCard } from "../components/ui/TiltCard";
import { useState } from "react";
import { ProjectModal } from "../components/ui/ProjectModal";

const projects = [
  {
    title: "AlgoHabit",
    category: "AI // ED-TECH",
    desc: "Engineered React PWA achieving 95+ Lighthouse score. Integrated OpenRouter AI improving syllabus processing accuracy to 90%.",
    tech: ["React", "Supabase", "OpenRouter AI", "PWA"],
    link: "https://algohabit.com",
    github: null,
    details: {
        problem: "Students struggle to track syllabus progress effectively across multiple subjects, leading to poor exam preparation.",
        solution: "Built a Progressive Web App (PWA) with offline support. Integrated AI to automatically parse uploaded syllabus PDFs and generate tracked checklists.",
        impact: "Achieved 95+ Lighthouse performance score. AI parser reduced manual data entry by 100%, improving user retention by 40%."
    }
  },
  {
    title: "Ledgerly",
    category: "FINTECH // ML",
    desc: "Predictive finance tracker using ARIMA & TF-IDF for automated transaction categorization (88% accuracy).",
    tech: ["FastAPI", "ARIMA", "React", "Pytest"],
    link: null,
    github: null,
    details: {
        problem: "Manual expense tracking is tedious, leading to user churn. Existing apps lack intelligent categorization.",
        solution: "Developed a predictive engine using ARIMA for forecasting and TF-IDF for transaction classification. Exposed via high-performance FastAPI endpoints.",
        impact: "Categorization accuracy reached 88%. Forecasting model helped users reduce monthly overspending by 15% on average."
    }
  },
  {
    title: "HelpMyBuddy",
    category: "HACKATHON WINNER",
    desc: "Hyperlocal service marketplace with geolocation matching. Built Node.js backend with real-time tracking.",
    tech: ["React Native", "Node.js", "Geolocation"],
    link: null,
    github: "https://github.com/SiliconNinjas/HelpMyBuddy",
    details: {
        problem: "Finding reliable local help during emergencies (e.g., car breakdown, medical) is slow and fragmented.",
        solution: "Created a real-time marketplace connecting seekers with helpers based on geospatial proximity using MongoDB spatial queries.",
        impact: "Won Hackathon. Demonstrated <500ms matching latency for users within a 5km radius."
    }
  },
  {
    title: "AG-WALLET",
    category: "SUPPLY CHAIN",
    desc: "Android app connecting farmers to distributors. Implemented real-time price monitoring and Google Maps integration.",
    tech: ["Android", "MySQL", "Google Maps"],
    link: null,
    github: null,
    details: {
        problem: "Farmers lack real-time visibility into market prices, often selling at a loss to middlemen.",
        solution: "Developed a native Android app offering real-time price feeds and a direct connection to distributors via Google Maps integration.",
        impact: "Empowered 50+ pilot farmers to negotiate better rates, increasing average profit margins by 12%."
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
