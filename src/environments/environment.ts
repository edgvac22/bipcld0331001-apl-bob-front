// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    tenant: 'b5e244bd-c492-495b-8b10-61bfd453e423',
    clientId: '546a3476-055a-4414-a55f-ae3173cf8b78',
    authority: 'https://login.microsoftonline.com/b5e244bd-c492-495b-8b10-61bfd453e423',
    redirectUri: 'http://localhost:4200/home',
    postLogoutRedirectUri: `${window.location.origin}/login`,
    endpoints: {
      API: 'http://localhost:3000/dev'
    },
    cacheLocation: 'localStorage',
  },
  environment: 'local'
};