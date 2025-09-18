import React from "react";
import { motion } from "framer-motion";

const Details: React.FC = () => {
  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">    {/* bỏ min-h-screen + flex center */}
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="relative w-full rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]"
  >
    <img src="/images/details.jpg" alt="Thiệp cưới" className="w-full h-auto object-cover" />
  </motion.div>
</div>

  );
};

export default Details;
