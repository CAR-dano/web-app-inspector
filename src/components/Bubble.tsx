import React from "react";

interface BubbleProps {
  className?: string;
}

function Bubble({ className }: BubbleProps) {
  return (
    <div
      className={`absolute rounded-full z-[-1] opacity-30 ${className}`}
    ></div>
  );
}

export default Bubble;
