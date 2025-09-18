import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const imgs = [
  { src: "/images/caro1.jpg", alt: "Couple 1" },
  { src: "/images/caro2.jpg", alt: "Couple 2" },
  { src: "/images/caro3.jpg", alt: "Couple 3" },
  { src: "/images/caro4.jpg", alt: "Couple 4" },
  { src: "/images/caro5.jpg", alt: "Couple 5" },
];

const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 600;

const Gallery: React.FC = () => {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<number | null>(null);
  const [paused, setPaused] = React.useState(false);

  // cập nhật index theo scroll
  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = 16;
      const cardW = card.clientWidth;
      const idx = Math.round(el.scrollLeft / (cardW + gap));
      setActive(Math.max(0, Math.min(imgs.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // hàm scroll mượt tới index
  const snapTo = (i: number) => {
    const el = scrollerRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) {
      const start = el.scrollLeft;
      const end = card.offsetLeft;
      const dur = TRANSITION_MS;
      const t0 = performance.now();
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / dur);
        el.scrollLeft = start + (end - start) * ease(p);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  };

  const next = React.useCallback(() => {
    const nextIndex = (active + 1) % imgs.length; // vòng lặp vô tận
    snapTo(nextIndex);
  }, [active]);

  const prev = React.useCallback(() => {
    const prevIndex = (active - 1 + imgs.length) % imgs.length;
    snapTo(prevIndex);
  }, [active]);

  // autoplay
  React.useEffect(() => {
    if (paused || lightbox !== null) return;
    const id = window.setInterval(() => {
      next();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [next, paused, lightbox]);

  // pause khi tab ẩn
  React.useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <div className="pt-16 pb-8 px-4"> 
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Camera className="w-8 h-8 text-rose-500 mx-auto mb-4" />
          <h1 className="font-serif text-3xl md:text-4xl text-gray-800 mb-3">
            Album ảnh
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
             ✨✨✨✨✨
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex overflow-x-auto snap-x snap-mandatory pr-4 -ml-1"
            style={{ scrollbarWidth: "none" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            {imgs.map((img, i) => (
              <motion.div
                key={i}
                className="snap-center shrink-0 mr-4 w-[90%] sm:w-[70%] md:w-[55%] lg:w-[38%]"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                onClick={() => setLightbox(i)}
              >
                <motion.div
                  animate={{ scale: active === i ? 1 : 0.95 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* nút prev/next */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur p-2 shadow hover:bg-white"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => snapTo(i)}
                className={`h-2 rounded-full transition-all ${
                  active === i ? "w-6 bg-rose-500" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <X className="absolute top-4 right-4 w-6 h-6 text-white cursor-pointer" />
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              src={imgs[lightbox].src}
              alt={imgs[lightbox].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
