import { ButtonHTMLAttributes, ReactElement } from "react"

interface ButtonProps{
  title: string
  className?: string
  icon?: ReactElement
  onClick?: () => void
  type: "submit" | "button" | "reset"
}

export default function ButtonComponent({ title, className, icon, onClick, type }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>){
  return(
    <button
      type={type}
      onClick={onClick}
      className={`text-sm px-2 py-3 font-medium rounded-lg flex justify-center items-center ${className}`}
    > 
      <span className="mr-2">{title}</span>
      {icon}
    </button>
  )
}