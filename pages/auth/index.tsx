import React from 'react';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  InMemoryWebStorage,
  UserManager,
  WebStorageStateStore
} from 'oidc-client';
import { AppContext } from 'next/app';

async function run(): Promise<void> {
  const manager: UserManager = new UserManager({
    response_mode: 'query',
    userStore: new WebStorageStateStore({ store: new InMemoryWebStorage() })
  });

  if (typeof location !== 'undefined') {
    let path = '/';

    const isInIframe = location !== parent.location;

    try {
      const user = await (isInIframe
        ? manager.signinSilentCallback()
        : manager.signinRedirectCallback());

      if (!isInIframe && user?.state?.path) {
        path = user.state.path.replace(location.origin, '');
      }
    } catch (e: any) {

      // TODO: handle errors and log them to Sentry
    } finally {
      console.log(path);

      if (!isInIframe) {
        location.replace(path);
      }
    }
  }
}

const Auth = () => {
  return (<></>);
}

Auth.getInitialProps = async (ctx: AppContext) => {
  await run();
  return {}
}

export default Auth;
