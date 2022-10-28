import {AppProps} from 'next/app'
import {useRouter} from 'next/router'
import {Suspense, useEffect} from 'react'
import {AuthProvider} from 'src/client/components/Auth'
import {Preloader} from 'src/client/components/Preloader'
import {useBoolean} from 'usehooks-ts'
import '../client/styles/global.scss'

export default function App({Component, pageProps}: AppProps) {
  const router = useRouter()
  const {setFalse, setTrue, value: isLoading} = useBoolean(false)
  useEffect(() => {
    router.events.on('routeChangeStart', setTrue)
    router.events.on('routeChangeComplete', setFalse)
    return () => {
      router.events.off('routeChangeStart', setTrue)
      router.events.off('routeChangeComplete', setFalse)
    }
  }, [])
  return (
    <Suspense fallback={'Loading...'}>
      <AuthProvider>
        {isLoading && <Preloader/>}
        <Component {...pageProps} />
      </AuthProvider>
    </Suspense>
  )
}
