import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

type Props = {
  coverSrc?: string;     // ảnh mặt ngoài (phong bì)
  innerSrc?: string;     // ảnh bên trong (details dạng ảnh)
  // Nếu bạn muốn dùng component Details thay vì ảnh, truyền render prop:
  renderInner?: () => React.ReactNode;
};

const WeddingEnvelope: React.FC<Props> = ({
  coverSrc = "/images/envelope.jpg",
  innerSrc = "/images/details.jpg",
  renderInner,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Mặt ngoài */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={coverSrc}
          alt="Phong bì thiệp cưới"
          className="w-full h-auto object-cover"
        />

        {/* Nút bling-bling */}
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-5 py-3 rounded-full bg-rose-600 text-white font-medium shadow-lg"
        >
          <Sparkles className="w-5 h-5" />
          Mở thiệp
          {/* hiệu ứng lấp lánh nhẹ */}
          <motion.span
            className="absolute inset-0 rounded-full"
            initial={{ boxShadow: "0 0 0px rgba(255,255,255,0)" }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(255,255,255,0)",
                "0 0 20px rgba(255,255,255,0.7)",
                "0 0 0px rgba(255,255,255,0)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </motion.button>
      </div>

      {/* Panel bên trong (mở bụp) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-3xl shadow-xl bg-white"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute z-10 top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Hiển thị ảnh details hoặc component Details */}
            {renderInner ? (
              <div className="p-2">{renderInner()}</div>
            ) : (
              <img
                src={innerSrc}
                alt="Chi tiết bên trong"
                className="w-full h-auto object-cover"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeddingEnvelope;
