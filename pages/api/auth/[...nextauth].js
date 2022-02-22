import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

import env from '../../../env';

const { SSO_HOST } = env;

export default NextAuth({
  providers: [
    KeycloakProvider({
        clientId: 'fdk-registration-public',
        clientSecret: 'test',
        issuer: `${SSO_HOST}/auth/realms/fdk`,
        scope: 'openid authorities profile email',
      }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        console.log("\n\n\njwt")
        console.log({ token, account })

        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token, user }) {
        console.log("\n\n\nsession")
        console.log({ session, token, user })

        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        session.user = user;
        return session
      }
    }
})
