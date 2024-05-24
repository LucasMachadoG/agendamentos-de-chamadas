import React, { ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
}

export default function Button({ href, disabled, children, className, ...rest }: ButtonProps){
  const buttonClasses = `${className} ${disabled ? 'opacity-50 cursor-not-allowed': ''}`

  return (
    <button
      disabled={disabled}
      className={buttonClasses}
      {...rest}
    >
      {children}
    </button>
  );
}