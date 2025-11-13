import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    ...( (appConfig as any)?.providers ?? [] ), // spread any providers exported by appConfig
    provideHttpClient(withFetch())               // enable fetch for SSR compatibility
  ]
})
  .catch((err) => console.error(err));
