import React from "react";

export default function Spinner({
  variant,
  animation,
  size,
  className,
}: {
  className?: string;
  variant: string;
  animation: string;
  size: string;
}) {
  return (
    <div className={`${className} spinner-${animation} spinner-${animation}-${size} text-${variant}`} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}
