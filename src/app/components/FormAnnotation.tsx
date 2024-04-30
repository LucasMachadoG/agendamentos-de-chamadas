interface FormAnnotationProps{
  children?: React.ReactNode
}

export default function FormAnnotation({ children }: FormAnnotationProps){
  return(
    <div className="mt-1 text-gray-400">
      {children}
    </div>
  )
}