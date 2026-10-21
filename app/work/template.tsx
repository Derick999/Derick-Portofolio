"use client";

import { motion } from "framer-motion";

/**
 * Templates re-mount on every navigation (unlike layouts), so this fades
 * each case study in, including when jumping between projects.
 */
export default function WorkTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
