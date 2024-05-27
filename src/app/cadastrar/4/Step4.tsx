import Button from "@/app/components/Button";
import InputComponent from "@/app/components/InputComponent";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Step4(){
  return(
    <div className="mt-6">
      <form className="w-full flex flex-col rounded-lg gap-2 bg-gray-800 p-4">
        <div className="flex flex-col space-y-4">
          <span className="text-gray-100 text-sm">Foto de perfil</span>
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              className="text-ignite-300 border border-ignite-300 text-sm px-2 py-3 font-medium rounded-lg"
            >
              Selecionar foto
            </Button>
          </div>
        </div>
      </form>
    </div>
    
  )
}