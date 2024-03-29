// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:7102/api/',
  Stripe: {
    PublishableKey: 'pk_test_51MjjywBFz34eglKwhFzaUqWCKXz3O7I9iHy7EI1mdx25to4iG2ASp4pA6lqzG53wIhHTlO0Zfmm4jgnwCjSq3RfI00eGpFaVBX'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
