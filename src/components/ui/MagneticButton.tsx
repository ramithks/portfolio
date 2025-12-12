import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { usePlaySound } from "../../hooks/usePlaySound";

export const MagneticButton = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { playHover, playClick } = usePlaySound();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  return (
    <motion.button
      ref={ref}
      className={cn("relative cursor-none", className)}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      onMouseEnter={() => playHover()}
      onClick={() => playClick()}
      {...props as any}
    >
      {children}
    </motion.button>
  );
};
