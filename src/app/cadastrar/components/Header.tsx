interface HeaderProps{
  title?: string 
  content?: string
}

export default function Header({ title, content }: HeaderProps){
  return (
    <div>
      <p className="text-2xl font-bold text-white">{title}</p>
      <span className="text-gray-200">{content}</span>
    </div>
  )
}