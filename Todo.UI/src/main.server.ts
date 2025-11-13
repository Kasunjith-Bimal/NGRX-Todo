// DEV ONLY: allow self-signed certs for SSR fetch (insecure — don't use in prod)
// DEV ONLY: allow self-signed certs for SSR fetch (insecure — don't use in prod)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';
import { provideHttpClient, withFetch } from '@angular/common/http';

const bootstrap = (context: BootstrapContext) =>
  bootstrapApplication(App, {
    ...(config as any),
    providers: [
      ...( (config as any)?.providers ?? [] ),
      provideHttpClient(withFetch())
    ]
  }, context);

export default bootstrap;
