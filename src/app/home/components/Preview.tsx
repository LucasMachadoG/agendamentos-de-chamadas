import Image from "next/image"
import calendario from '../../../assets/calendario.png'

export default function Preview(){
  return(
    <div>
      <Image 
        src={calendario}
        height={400}
        quality={100}
        priority
        alt="Calendário simbolizando aplicacao em funcionamento"
      />
    </div>
  )
}