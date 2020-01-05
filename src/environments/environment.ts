// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'https://asia-east2-octalogic-portfolio-dev.cloudfunctions.net/api/v1/admin',
  firebaseConfig: {
    apiKey: 'AIzaSyBsMfgsHNyypJnmf96tT0OLo8UMFY-ZMNE',
    authDomain: 'octalogic-portfolio-dev.firebaseapp.com',
    databaseURL: 'https://octalogic-portfolio-dev.firebaseio.com',
    projectId: 'octalogic-portfolio-dev',
    storageBucket: 'octalogic-portfolio-dev.appspot.com',
    messagingSenderId: '972342187770',
    appId: '1:972342187770:web:f425e591de136a72359b43',
    measurementId: 'G-LM82D4HJDN',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
