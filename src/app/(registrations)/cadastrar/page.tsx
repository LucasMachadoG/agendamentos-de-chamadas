import MultiStep from "../../components/MultiStep";
import FormCadastrar from "./components/FormCadastrar";
import Header from "./components/Header";

export default function Cadastrar(){
  return(
    <div className="w-full h-screen flex justify-center">
      <div className="max-w-xl mt-20">
        <Header />
        <MultiStep size={4} currentStep={1} />
        <FormCadastrar />
      </div>
    </div>
  )
}