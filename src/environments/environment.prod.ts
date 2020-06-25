/* tslint:disable */
export const environment = {
  production: true,
  apiBaseUrl: window['env']['apiUrl'] || 'default',
  debug: window['env']['debug'] || false,
  raceDate: Date.parse(window['env']['raceDate']) || Date.parse('2020-06-20'),
  pushPublicKey: window['env']['pushPublicKey'],
  dryRun: window['env']['dryRun'],
  version: window['env']['version']
};
