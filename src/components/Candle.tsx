interface CandleProps {
  isLit: boolean;
}

export const Candle = ({ isLit }: CandleProps) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Flame */}
      {isLit && (
        <div className="relative mb-1">
          <div className="w-4 h-6 bg-secondary rounded-full animate-flicker animate-glow" />
          <div className="absolute inset-0 w-4 h-6 bg-secondary/50 rounded-full blur-sm" />
        </div>
      )}
      
      {/* Wick */}
      <div className={`w-0.5 h-3 ${isLit ? 'bg-gray-800' : 'bg-gray-600'} transition-colors`} />
      
      {/* Candle body */}
      <div className="w-3 h-12 bg-gradient-to-b from-accent to-accent/80 rounded-b-sm shadow-md" />
    </div>
  );
};
