import React from "react";

interface BlueCardProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  backgroundImageUrl?: string;
}

export default function BlueCard({
  title,
  children,
  className,
  backgroundImageUrl,
}: BlueCardProps) {
  return (
    <div
      className={`bg-primary-700 rounded-lg shadow-lg overflow-hidden p-6 ml-8 ${className}`}
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-4 rounded-md">
        <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
}
