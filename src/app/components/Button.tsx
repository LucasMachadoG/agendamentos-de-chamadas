import { ButtonHTMLAttributes, ReactElement } from "react"

interface ButtonProps{
  title: string
  className?: string
  icon?: ReactElement
  onClick?: () => void
}

export default function Button({ title, className, icon, onClick }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>){
  return(
    <button
      onClick={onClick}
      className={`w-full text-sm px-2 py-3 font-semibold rounded-lg flex justify-center items-center ${className}`}
    > 
      {icon}
      {title}
    </button>
  )
}