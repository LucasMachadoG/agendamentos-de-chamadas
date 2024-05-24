import { auth, signOut } from "../../../auth"

export default async function Dashboard(){
  const session = await auth()

  return(
    <div>
      <span className="text-white">{JSON.stringify(session)}</span>
      <form action={async () => {
        "use server"

        await signOut()
      }}>
        <button className="text-white" type="submit">
          Sign out
        </button>
      </form>
    </div>
  )
}