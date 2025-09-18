import React from "react";
import { CalendarHeart } from "lucide-react";

/** ---- helpers ---- */
const pad = (n: number, len = 2) => n.toString().padStart(len, "0");
const targetVN = new Date("2025-10-07T11:00:00+07:00"); // 11:00, 07/10/2025 (GMT+7)

function diff(to: Date) {
  const now = Date.now();
  const end = to.getTime();
  let d = Math.max(0, end - now);

  const days = Math.floor(d / 86400000); d -= days * 86400000;
  const hours = Math.floor(d / 3600000); d -= hours * 3600000;
  const minutes = Math.floor(d / 60000); d -= minutes * 60000;
  const seconds = Math.floor(d / 1000);
  return { days, hours, minutes, seconds, done: end <= now };
}

/** ---- flip digit ---- */
type FlipDigitProps = { value: number; width?: number; height?: number };

const FlipDigit: React.FC<{ digit: string; width?: number; height?: number }> = ({
  digit,
  width = 72,
  height = 96,
}) => {
  const [prev, setPrev] = React.useState(digit);
  const [curr, setCurr] = React.useState(digit);
  const [flip, setFlip] = React.useState(false);

  React.useEffect(() => {
    if (digit === curr) return;
    setPrev(curr);
    setCurr(digit);
    setFlip(true);
    const t = setTimeout(() => setFlip(false), 650);
    return () => clearTimeout(t);
  }, [digit, curr]);

  const w = `${width}px`;
  const h = `${height}px`;
  const fontSize = `${Math.round(height * 0.46)}px`;
  const radius = "12px";
  

  return (
    <div
      className="relative mx-1 select-none rounded-lg shadow-md flex items-center justify-center
             bg-gradient-to-br from-rose-400 via-pink-300 to-rose-200"
      style={{ width: w, height: h, fontSize, borderRadius: radius }}
    >
      {/* số hiện tại */}
      <span className="font-semibold text-gray-900">{curr}</span>

      {/* flip overlay */}
      {flip && (
        <>
          <div className="absolute inset-0 flex items-center justify-center animate-flipTop">
            <span className="font-semibold text-gray-900">{prev}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center animate-flipBottom">
            <span className="font-semibold text-gray-900">{curr}</span>
          </div>
        </>
      )}
    </div>
  );
};


/** ---- time unit (d, h, m, s) có thể 2-3 chữ số ---- */
const TimeUnit: React.FC<{ label: string; value: number }> = ({ label, value }) => {
  const str = value.toString(); // ví dụ 18 => "18"
  return (
    <div className="flex flex-col items-center">
      <div className="flex">
        {str.split("").map((d, i) => (
          <FlipDigit key={i} digit={d} />
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-500">{label}</div>
    </div>
  );
};


/** ---- countdown flip ---- */
const CountdownFlip: React.FC<{ target?: Date; title?: string }> = ({ target = targetVN, title = "Đếm ngược tới ngày cưới" }) => {
  const [t, setT] = React.useState(() => diff(target));

  React.useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (t.done) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-rose-50 text-rose-600 mb-4">
            <CalendarHeart className="w-5 h-5" />
            <span>Đã tới ngày trọng đại 🎉</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-gray-800">Hẹn gặp bạn tại buổi lễ!</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* keyframes cho flip – nhúng tại chỗ để bạn không cần file CSS riêng */}
      <style>{`
        @keyframes flipTop { 
          0% { transform: rotateX(0deg); } 
          100% { transform: rotateX(-90deg); } 
        }
        @keyframes flipBottom { 
          0% { transform: rotateX(90deg); } 
          100% { transform: rotateX(0deg); } 
        }
        .animate-flipTop { animation: flipTop 0.6s ease-in forwards; }
        .animate-flipBottom { animation: flipBottom 0.6s ease-out forwards; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-rose-50 text-rose-600">
            <CalendarHeart className="w-5 h-5" />
            <span>{title}</span>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            {target.toLocaleString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <TimeUnit label="Ngày" value={t.days} />
          <span className="hidden sm:block text-4xl text-gray-400">:</span>
          <TimeUnit label="Giờ" value={t.hours} />
          <span className="hidden sm:block text-4xl text-gray-400">:</span>
          <TimeUnit label="Phút" value={t.minutes} />
          <span className="hidden sm:block text-4xl text-gray-400">:</span>
          <TimeUnit label="Giây" value={t.seconds} />
        </div>
      </div>
    </section>
  );
};

export default CountdownFlip;
