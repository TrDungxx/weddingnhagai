import React from "react";
import { motion } from "framer-motion";

type CoverProps = {
  bride: string;
  groom: string;
  date: string;        // ví dụ: "07.10.2025"
  onExplore?: () => void;
  photoUrl?: string;
};

const Cover: React.FC<CoverProps> = ({
  bride = "Vũ Hoa",
  groom = "Trung Dũng",
  date = "06.10.2025",
  onExplore,
  photoUrl = "/images/decor1.jpg", // đổi thành ảnh của bạn
}) => {
  const leftIn = {
    hidden: { x: -60, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration: 1.4, ease: "easeOut" } },
  };
  const rightIn = {
    hidden: { x: 60, opacity: 0 },
    show: { x: 0, opacity: 1, transition: { duration:1.4, ease: "easeOut" } },
  };
  const upIn = {
    hidden: { y: 60, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 2, ease: "easeOut" } },
  };

  return (
    <section
      id="cover"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50 via-white to-rose-100"
    >
      {/* nền hạt bụi nhẹ */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,.18),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(94,234,212,.14),transparent_35%)]" />

      {/* khung điện thoại nhẹ để giống video */}
      <div className="relative w-[88vw] max-w-[420px] mx-auto">
        {/* header text */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.p
            variants={rightIn}
            initial="hidden"
            animate="show"
            className="tracking-[0.25em] text-xs sm:text-sm text-gray-500"
          >
            THƯ MỜI CƯỚI
          </motion.p>

          <motion.h1
            variants={leftIn}
            initial="hidden"
            animate="show"
            className="mt-2 text-3xl sm:text-4xl font-light tracking-[0.18em]"
          >
            WEDDING INVITATION
          </motion.h1>

          <motion.p
            variants={rightIn}
            initial="hidden"
            animate="show"
            className="mt-2 text-sm sm:text-base tracking-[0.35em] text-gray-600"
          >
            {date}
          </motion.p>
        </div>

        {/* ảnh – đi từ dưới lên */}
        <motion.div
          variants={upIn}
          initial="hidden"
          animate="show"
          className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-white"
        >
          {/* ảnh */}
          <img
            src={photoUrl}
            alt="wedding cover"
            className="w-full h-[480px] object-cover"
          />

          {/* tên cô dâu chú rể */}
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-white/90 via-white/70 to-transparent">
            <div className="text-center">
              <motion.p
                variants={leftIn}
                initial="hidden"
                animate="show"
                className="text-lg sm:text-xl font-medium"
              >
                {groom} <span className="mx-1">&</span> {bride}
              </motion.p>
              <motion.p
                variants={rightIn}
                initial="hidden"
                animate="show"
                className="text-xs sm:text-sm text-gray-600 tracking-widest"
              >
                SAVE THE DATE
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* nút khám phá */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
          className="flex justify-center"
        >
          <button
            onClick={onExplore}
            className="mt-6 sm:mt-7 px-6 py-2 rounded-full bg-rose-500 text-white text-sm font-medium shadow hover:shadow-md hover:bg-rose-600 transition"
          >
            Khám phá
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Cover;
