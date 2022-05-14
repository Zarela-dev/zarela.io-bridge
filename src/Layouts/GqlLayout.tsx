import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '../aplloClient'

export default function GqlLayout({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
