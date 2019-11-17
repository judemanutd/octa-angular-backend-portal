// tslint:disable-next-line: no-import-side-effect
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(ref => {
    // Ensure that Angular destroys itself on hot reloads.
    // tslint:disable-next-line: no-string-literal
    if (window['ngRef']) {
      // tslint:disable-next-line: no-string-literal
      window['ngRef'].destroy();
    }
    // tslint:disable-next-line: no-string-literal
    window['ngRef'] = ref;

    // Otherise, log the boot error
  })
  .catch(err => console.error(err));
