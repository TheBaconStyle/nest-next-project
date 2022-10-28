import {createContext, useContext} from 'react'
import {AuthContextState} from './Auth'
import {MutatorCallback, MutatorOptions} from 'swr'

export const AuthContext = createContext<AuthContextState>({
  authError: undefined,
  isAuthValidating: false,
  reauth(
    data: Promise<string> | MutatorCallback<string> | string | undefined,
    opts: boolean | MutatorOptions<string> | undefined,
  ): Promise<string | undefined> {
    return Promise.resolve(undefined)
  },
})

export const useAuth = () => useContext(AuthContext)
