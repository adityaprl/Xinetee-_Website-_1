
import React from "react";

interface XineteLogoProps {
  className?: string;
}

const XineteLogo: React.FC<XineteLogoProps> = ({ className }) => {
  return (
    <div className={`relative ${className || "w-8 h-8"}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple via-neon-blue to-neon-pink rounded-md opacity-70 blur-[2px]" />
      <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
        X
      </div>
    </div>
  );
};

export default XineteLogo;
