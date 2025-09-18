import React from "react";
import Cover from "./pages/Cover";
import Gallery from "./pages/Gallery";
import Details from "./pages/Details";
import RSVP from "./pages/RSVP";
import WeddingEnvelope from "./pages/WeddingEnvelope";
import Countdown from "./pages/Countdown";

function App() {
  const [opened, setOpened] = React.useState(false);
  const envelopeRef = React.useRef<HTMLDivElement | null>(null);

  const handleExplore = () => setOpened(true);

  // Khi opened = true và section đã mount -> cuộn mượt xuống
  React.useEffect(() => {
    if (!opened) return;
    const el = envelopeRef.current;
    if (!el) return;

    // double-RAF cho chắc (đợi DOM + layout ổn định)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    // (tùy chọn) fallback cho iOS Safari
    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => clearTimeout(t);
  }, [opened]);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ... background fixed nếu bạn đã thêm ... */}

      <Cover onExplore={handleExplore} />

      {opened && (
        <>
          <section id="envelope" ref={envelopeRef} className="py-8 scroll-mt-16">
            <WeddingEnvelope
              coverSrc="/images/phong-bi.jpg"
              renderInner={() => <Details />}
            />
          </section>

          <section id="gallery" className="scroll-mt-20">
            <Gallery />
          </section>

          <section id="countdown" className="scroll-mt-20">
            <Countdown />
          </section>

          <section id="rsvp" className="scroll-mt-20">
            <RSVP />
          </section>
        </>
      )}
    </div>
  );
}

export default App;
