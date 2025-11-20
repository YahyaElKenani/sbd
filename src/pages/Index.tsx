import { BirthdayCake } from "@/components/BirthdayCake";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background flex flex-col items-center justify-center p-4 md:p-8">
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-float">
          Happy Birthday
        </h1>
        <h2 className="text-6xl md:text-8xl font-extrabold text-primary drop-shadow-lg">
          Sara! 🎉
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          Make a wish and blow out the candles! 
          <br />
          <span className="text-sm">🎤 Allow microphone access to blow</span>
        </p>
      </div>

      <BirthdayCake />

      <div className="mt-12 text-center space-y-2">
        <p className="text-muted-foreground text-sm">
          💝 Wishing you a day filled with joy, laughter, and love!
        </p>
      </div>
    </div>
  );
};

export default Index;
