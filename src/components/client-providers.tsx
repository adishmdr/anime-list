'use client';

import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { Providers } from '@/components/providers';
import { UserProvider } from '@/lib/user-context';
import { Footer } from '@/components/footer';

export function ClientProviders({ children }: { children: ReactNode }) {
    return (
        <ApolloProvider client={apolloClient}>
            <Providers>
                <UserProvider>
                    {children}
                    <Footer />
                </UserProvider>
            </Providers>
        </ApolloProvider>
    );
}
