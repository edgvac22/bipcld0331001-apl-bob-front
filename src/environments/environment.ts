// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  config: {
    tenant: 'b5e244bd-c492-495b-8b10-61bfd453e423',
    clientId: '6c8eb53b-8318-4ed7-886d-9f75f409b34f',
    authority: 'https://login.microsoftonline.com/b5e244bd-c492-495b-8b10-61bfd453e423',
    redirectUri: `${window.location.origin}/home`,
    postLogoutRedirectUri: `${window.location.origin}/login`,
    endpoints: {
      API: 'http://localhost:3000/dev',
      FILE_API: 'http://localhost:9000'
    },
    cacheLocation: 'localStorage',
  },
  environment: 'local'
};