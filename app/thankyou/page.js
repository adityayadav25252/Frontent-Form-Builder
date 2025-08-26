"use client";

import { motion } from "framer-motion";

export default function ThankYouPage() {
  return (
    <div className="thank-you-message">
      <motion.i
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="fas fa-check-circle"
      ></motion.i>

      <motion.h2
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Thank You!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        Your response has been submitted successfully.
      </motion.p>
    </div>
  );
}
