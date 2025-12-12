import { motion } from "framer-motion";
import { type ReactNode } from "react";

export const TiltCard = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};
