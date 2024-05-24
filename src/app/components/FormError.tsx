import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProp{
  message?: string
}


export default function FormError({ message }: FormErrorProp){
  if(!message){
    return null
  }

  return(
    <div className="bg-red-400/15 text-red-400 p-3 rounded-md flex items-center gap-x-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-8 w-8" />
      <p>{message}</p>
    </div>
  )
}