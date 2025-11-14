import { provideHttpClient, withFetch } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { todoReducer } from './app/todos/store/reducers/todo.reducer';
import { TodoEffects } from './app/todos/store/effects/todo.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(App, {
  providers: [
    ...( (appConfig as any)?.providers ?? [] ),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
    provideStoreDevtools({ maxAge: 25 }), // spread any providers exported by appConfig
    provideHttpClient(withFetch())               // enable fetch for SSR compatibility
  ]
})
  .catch((err) => console.error(err));
