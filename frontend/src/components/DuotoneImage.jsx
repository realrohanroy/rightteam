import React from "react";

/**
 * Applies a consistent duotone color grade (navy shadows, warm paper highlights, 
 * orange-red accent) to stock photography.
 */
export const DuotoneImage = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative overflow-hidden bg-[#050B14] ${className}`}>
      {/* 
        Base Image:
        mix-blend-screen ensures shadows take on the #050B14 container color.
        grayscale+contrast prepares the image values for clean duotone mapping.
      */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover mix-blend-screen opacity-90 grayscale contrast-125"
      />
      
      {/* Warm paper highlights overlay */}
      <div className="absolute inset-0 bg-[#FFF9F0] mix-blend-multiply opacity-60 pointer-events-none" />
      
      {/* Subtle orange-red accent overlay (very low opacity to tint midtones slightly) */}
      <div className="absolute inset-0 bg-[#E8522B] mix-blend-color opacity-[0.08] pointer-events-none" />
    </div>
  );
};
