/* tslint:disable */
export const environment = {
  production: true,
  apiBaseUrl: window['env']['apiUrl'] || 'default',
  debug: window['env']['debug'] || false,
  raceDate: Date.parse(window['env']['raceDate']) || Date.parse('2020-06-22')
};
