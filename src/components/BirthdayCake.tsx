import { useState, useEffect, useRef } from "react";
import { Candle } from "./Candle";
import { Confetti } from "./Confetti";
import { toast } from "sonner";

export const BirthdayCake = () => {
  const [candles, setCandles] = useState([true, true, true, true]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      
      analyser.fftSize = 256;
      microphone.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      microphoneRef.current = microphone;
      
      setIsListening(true);
      detectBlow();
      toast.success("Microphone ready! Blow to extinguish the candles 🎂");
    } catch (error) {
      toast.error("Please allow microphone access to blow out the candles");
    }
  };

  const detectBlow = () => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const checkBlowing = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / bufferLength;

      // If sound level is high enough (blowing detected)
      if (average > 30) {
        const litCandles = candles.filter(c => c).length;
        if (litCandles > 0) {
          const randomIndex = candles.findIndex(c => c);
          if (randomIndex !== -1) {
            setCandles(prev => {
              const newCandles = [...prev];
              newCandles[randomIndex] = false;
              return newCandles;
            });
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(checkBlowing);
    };

    checkBlowing();
  };

  useEffect(() => {
    const allOut = candles.every(c => !c);
    if (allOut && candles.length > 0) {
      setShowConfetti(true);
      toast.success("Happy Birthday Sara! 🎉🎂");
      
      // Stop microphone
      if (microphoneRef.current && audioContextRef.current) {
        microphoneRef.current.disconnect();
        audioContextRef.current.close();
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
      
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [candles]);

  const resetCandles = () => {
    setCandles([true, true, true, true]);
    setShowConfetti(false);
    if (!isListening) {
      startListening();
    }
  };

  useEffect(() => {
    startListening();

    return () => {
      if (microphoneRef.current && audioContextRef.current) {
        microphoneRef.current.disconnect();
        audioContextRef.current.close();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {showConfetti && <Confetti />}
      
      <div className="relative animate-float">
        {/* Candles */}
        <div className="flex justify-center gap-8 mb-6">
          {candles.map((isLit, index) => (
            <Candle key={index} isLit={isLit} />
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
