import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';

interface TerminalModeProps {
  onExit: () => void;
}

// Mock File System
const fileSystem = {
  '~': {
    type: 'dir',
    children: ['about', 'experience', 'projects', 'contact', 'skills', 'readme.txt']
  },
  '~/about': {
    type: 'dir',
    children: ['profile.txt', 'skills.txt', 'hobbies.txt']
  },
  '~/experience': {
    type: 'dir',
    children: ['current_role.txt', 'history.log']
  },
  '~/projects': {
    type: 'dir',
    children: ['portfolio_v9.txt', 'god_mode.exe', 'distributed_systems.iso']
  },
  '~/contact': {
    type: 'dir',
    children: ['email.txt', 'socials.json']
  },
  '~/skills': {
    type: 'dir',
    children: ['backend.txt', 'databases.txt', 'systems.txt', 'cloud.txt', 'testing.txt', 'all.json']
  }
};

const fileContents: Record<string, string> = {
  '~/readme.txt': "Welcome to Ramith's Portfolio System V9.\nThis is a fully interactive terminal.\nNavigate using 'cd' and 'ls'. Read files with 'cat'.",
  '~/about/profile.txt': "Name: Ramith K S\nRole: Senior Backend Engineer\nFocus: Distributed Systems, High-Performance APIs.",
  '~/about/skills.txt': "Languages: Go, Rust, TypeScript, Python.\nTech: Kubernetes, Docker, AWS, Kafka, gRPC.",
  '~/skills/backend.txt': "Backend & Languages:\n  - Python, FastAPI, Node.js, TypeScript\n  - AsyncIO, REST, gRPC, WebSockets",
  '~/skills/databases.txt': "Databases:\n  - PostgreSQL, Redis, MongoDB, MySQL\n  - Query Optimization, Indexing, Schema Design, ACID Transactions",
  '~/skills/systems.txt': "Systems & Architecture:\n  - Microservices, Distributed Systems\n  - Event-Driven Architecture, Caching Strategies\n  - Load Balancing, High Availability\n  - Rate Limiting, API Gateway, Observability",
  '~/skills/cloud.txt': "Cloud & DevOps:\n  - AWS (ECS, EC2, S3, CloudWatch, Lambda)\n  - Docker, Terraform, GitHub Actions\n  - CI/CD, Infrastructure Automation",
  '~/skills/testing.txt': "Testing & Reliability:\n  - Pytest, Integration Testing\n  - SLO/SLI Monitoring\n  - Incident Management, Root Cause Analysis",
  '~/skills/all.json': "{\n  \"backend\": [\"Python\", \"FastAPI\", \"Node.js\", \"TypeScript\"],\n  \"databases\": [\"PostgreSQL\", \"Redis\", \"MongoDB\"],\n  \"cloud\": [\"AWS\", \"Docker\", \"Terraform\"]\n}",
  '~/experience/current_role.txt': "Position: Senior Backend Engineer\nLocation: Bangalore, India\nStack: Go, Microservices, Event-Driven Architecture.",
  '~/experience/history.log': "[2023] Promoted to Senior Engineer\n[2021] Joined as Backend Engineer\n[2019] Internship at TechCorp",
  '~/projects/portfolio_v9.txt': "The site you are looking at.\nBuilt with React, Tailwind, Framer Motion, and Three.js.",
  '~/projects/god_mode.exe': "BINARY FILE (God Mode Logic). Do not execute.",
  '~/contact/email.txt': "ramithks@example.com",
  '~/contact/socials.json': "{\n  \"github\": \"github.com/ramithks\",\n  \"linkedin\": \"linkedin.com/in/ramithks\"\n}"
};

export const TerminalMode = ({ onExit }: TerminalModeProps) => {
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~'); // Current Working Directory
  const [output, setOutput] = useState<string[]>([
    "Last login: " + new Date().toUTCString() + " on ttys001",
    "RamithOS v9.11.2 (Darwin Kernel Version 23.0.0)",
    "",
    "Type 'help' for a list of commands.",
    ""
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
    const handleClick = () => inputRef.current?.focus();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const resolvePath = (path: string) => {
    if (path === '~' || path === '/') return '~';
    if (path.startsWith('~/')) return path;
    if (path === '..') {
      if (cwd === '~') return '~';
      return '~'; // Only one level deep supported for now
    }
    return `${cwd}/${path}`.replace('~//', '~/');
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    
    const args = trimmed.split(' ');
    const command = args[0];
    const target = args[1];

    const newOutput = [...output, `${cwd === '~' ? 'ramith@portfolio ~ %' : `ramith@portfolio ${cwd.split('/')[1]} %`} ${cmd}`];

    let response: string | string[] = [];

    switch (command) {
      case 'help':
        response = [
          "GNU bash, version 5.1.16(1)-release (x86_64-apple-darwin21.1.0)",
          "These shell commands are defined internally.  Type `help' to see this list.",
          "",
          "  cd [dir]    Change the shell working directory",
          "  ls          List information about the FILEs",
          "  cat [file]  Concatenate FILE(s) to standard output",
          "  clear       Clear the terminal screen",
          "  whoami      Print the user name",
          "  date        Print the system date and time",
          "  exit        Exit the shell",
          ""
        ];
        break;

      case 'ls':
        // @ts-ignore
        const currentDir = fileSystem[cwd];
        if (currentDir) {
           // Format output like ls -F
           response = currentDir.children.map((item: string) => {
              const fullPath = `${cwd}/${item}`.replace('~//', '~/');
              // @ts-ignore
              const isDir = fileSystem[fullPath];
              return isDir ? `${item}/` : item;
           }).join('  ');
        } else {
            response = `ls: cannot open directory '.': Permission denied`;
        }
        break;

      case 'cd':
        if (!target || target === '~') {
            setCwd('~');
        } else {
            const newPath = resolvePath(target);
            // @ts-ignore
            if (fileSystem[newPath]) {
                setCwd(newPath);
            } else {
                response = `cd: no such file or directory: ${target}`;
            }
        }
        break;

      case 'cat':
        if (!target) {
            response = "cat: missing argument";
        } else {
            const fullPath = resolvePath(target);
            // @ts-ignore
            const content = fileContents[fullPath];
            if (content) {
                response = content;
            } else {
                // Check if it's a directory
                // @ts-ignore
                if (fileSystem[fullPath]) {
                    response = `cat: ${target}: Is a directory`;
                } else {
                    response = `cat: ${target}: No such file or directory`;
                }
            }
        }
        break;

      case 'clear':
        setOutput([]);
        return;

      case 'whoami':
        response = "ramith";
        break;

      case 'date':
        response = new Date().toString();
        break;

      case 'exit':
        onExit();
        return;

      default:
        response = `zsh: command not found: ${command}`;
    }

    if (Array.isArray(response)) {
        setOutput([...newOutput, ...response]);
    } else {
        setOutput([...newOutput, response]);
    }
    
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
    if (e.key === 'Tab') {
        e.preventDefault();
        // Implement simple autocomplete
        const args = input.trim().split(' ');
        const partial = args[args.length - 1];
        
        // @ts-ignore
        const currentFiles = fileSystem[cwd]?.children || [];
        const match = currentFiles.find((f: string) => f.startsWith(partial));
        
        if (match) {
            const newInput = args.slice(0, -1).join(' ') + (args.length > 1 ? ' ' : '') + match;
            setInput(newInput);
        }
    }
  };

  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-10 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl h-[80vh] bg-[#050505]/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col font-mono text-sm pointer-events-auto ring-1 ring-black/50"
      >    
          {/* Mac-style Window Header */}
          <div className="bg-[#1f2335] px-4 py-3 flex items-center justify-between border-b border-gray-800">
             <div className="flex gap-2">
                 <button onClick={onExit} className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group">
                     <X size={8} className="text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </button>
                 <div className="w-3 h-3 rounded-full bg-[#ffbd2e] flex items-center justify-center group">
                    <Minus size={8} className="text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
                 <div className="w-3 h-3 rounded-full bg-[#27c93f] flex items-center justify-center group">
                     <Square size={8} className="text-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                 </div>
             </div>
             <div className="text-gray-400 font-medium text-xs flex items-center gap-2">
                 <span className="hidden md:inline">ramith — -zsh — 80x24</span>
             </div>
             <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Terminal Body */}
          <div 
            className="flex-1 bg-transparent p-4 overflow-y-auto text-[#a9b1d6] selection:bg-[#3d59a1] selection:text-white"
            onClick={() => inputRef.current?.focus()}
          >
              <div className="space-y-1">
                  {output.map((line, i) => (
                      <div key={i} className="whitespace-pre-wrap break-words">{line}</div>
                  ))}
              </div>

              <div className="flex items-center mt-1">
                  <span className="text-[#7aa2f7] font-bold mr-2">
                      {cwd === '~' ? 'ramith@portfolio ~ %' : `ramith@portfolio ${cwd.split('/')[1]} %`}
                  </span>
                  <input 
                      ref={inputRef}
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent border-none outline-none text-[#c0caf5] caret-[#7aa2f7]"
                      spellCheck="false"
                      autoComplete="off"
                      autoFocus
                  />
              </div>
              <div ref={bottomRef} className="h-4" />
          </div>
      </motion.div>
    </div>
  );
};
