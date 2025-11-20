import { useState, useEffect } from "react";
import { Candle } from "./Candle";
import { Confetti } from "./Confetti";
import { toast } from "sonner";

export const BirthdayCake = () => {
  const [candles, setCandles] = useState([true, true, true, true]);
  const [showConfetti, setShowConfetti] = useState(false);

  const blowCandle = (index: number) => {
    if (candles[index]) {
      setCandles(prev => {
        const newCandles = [...prev];
        newCandles[index] = false;
        return newCandles;
      });
    }
  };

  useEffect(() => {
    const allOut = candles.every(c => !c);
    if (allOut && candles.length > 0) {
      setShowConfetti(true);
      toast.success("Happy Birthday Sara! 🎉🎂");
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [candles]);

  const resetCandles = () => {
    setCandles([true, true, true, true]);
    setShowConfetti(false);
  };

  return (
    <div className="relative">
      {showConfetti && <Confetti />}
      
      <div className="relative animate-float">
        {/* Candles */}
        <div className="flex justify-center gap-8 mb-6">
          {candles.map((isLit, index) => (
            <div key={index} onClick={() => blowCandle(index)} className="cursor-pointer">
              <Candle isLit={isLit} />
            </div>
          ))}
        </div>

        {/* Cake */}
        <div className="relative mx-auto w-64 md:w-80">
          {/* Top frosting layer */}
          <div className="h-8 bg-gradient-to-b from-white to-muted rounded-t-full border-4 border-primary/20" />
          
          {/* Cake layer 1 */}
          <div className="h-16 bg-gradient-to-b from-primary to-primary/80 border-x-4 border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          {/* Middle frosting */}
          <div className="h-6 bg-gradient-to-b from-white to-muted border-x-4 border-primary/20" />
          
          {/* Cake layer 2 */}
          <div className="h-20 bg-gradient-to-b from-primary to-primary/80 border-x-4 border-primary/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          
          {/* Bottom frosting */}
          <div className="h-8 bg-gradient-to-b from-white to-muted rounded-b-3xl border-4 border-primary/20 border-t-0" />
          
          {/* Cake plate */}
          <div className="h-3 bg-accent/30 rounded-full mt-2 shadow-lg" />
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={resetCandles}
        className="mt-8 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
      >
        Light Candles Again
      </button>
    </div>
  );
};
