'use server'

import { auth } from "../../../auth"

export default async function getSession(){
  const session = await auth()

  if(!session){
    return null
  }

  return session
}