export default function convertTimeStringToMinutes(timesString: string){
  const [ hours, minutes ] = timesString.split(':').map(Number)

  return hours * 60 + minutes
}