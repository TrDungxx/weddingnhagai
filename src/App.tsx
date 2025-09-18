// App.tsx
import React from "react";
import Cover from "./pages/Cover";
import Gallery from "./pages/Gallery";
import Details from "./pages/Details";
import RSVP from "./pages/RSVP";
import WeddingEnvelope from "./pages/WeddingEnvelope";
import Countdown from "./pages/Countdown";

function App() {
  const [opened, setOpened] = React.useState(false);

  const handleExplore = () => {
    setOpened(true);
    requestAnimationFrame(() => {
      document.getElementById("envelope")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* ===== GLOBAL BACKGROUND (áp dụng toàn bộ app) ===== */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-pink-50 via-white to-rose-50" />
      <div className="pointer-events-none fixed inset-0 -z-10
        bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,.18),transparent_40%),
            radial-gradient(circle_at_80%_0%,rgba(94,234,212,.14),transparent_35%)]" />

      {/* ===== Nội dung ===== */}
      <Cover onExplore={handleExplore} />

      {opened && (
        <>
          {/* Phong bì + mở bụp nội dung bên trong */}
          <section id="envelope" className="py-8 scroll-mt-16">
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
