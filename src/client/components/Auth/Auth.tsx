import {ApiClient} from 'src/shared/utils/api-client.util'
import useSWR, {KeyedMutator} from 'swr'
import {AuthContext} from './AuthContext'
import {BaseComponentProps} from "../../../shared/types/component.type";

export interface AuthContextState {
  reauth: KeyedMutator<string>
  login?: string
  authError: any
  isAuthValidating: boolean
}

export function AuthProvider({children}: BaseComponentProps) {
  const {
    mutate: reauth,
    data: login,
    error: authError,
    isValidating: isAuthValidating,
  } = useSWR<string>('OSL_AUTH', async () => {
    const response = await ApiClient.get<{ user: string }>('/api/auth').catch(
      () => false,
    )
    if (typeof response !== 'boolean') {
      return response.data.user
    }
    return ''
  })
  return (
    <AuthContext.Provider
      value={{reauth, login, authError, isAuthValidating}}
    >
      {children}
    </AuthContext.Provider>
  )
}
