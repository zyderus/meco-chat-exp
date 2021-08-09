import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'
import Image from 'next/image'
import Link from 'next/link'

export default function Chat() {
  const [session, loading]: any = useSession()

  if (loading) return null
  if (!loading && !session) return null

  return (
    <div>
      <h2>
        Hi {session.user.name}!
        <span role='img' aria-label='waving hand'>
          👋
        </span>
      </h2>
      <p>{session.user.email}</p>
      <Image src={session.user.image} height={100} width={100} alt='avatar' />
      You are currently viewing a top secret page!
      <div className='m-8'>
        <Link href='/'>
          <a>back</a>
        </Link>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context)
  let user = session && session.user

  /* If user is NOT logged in, then redirect */
  if (!user) {
    return {
      redirect: { destination: '/', permanent: false },
    }
  }

  return {
    props: {
      session: session,
    },
  }
}
