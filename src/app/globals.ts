import {AbstractControl} from '@angular/forms';
import {environment} from '../environments/environment';

export const maxLengths = {
  email: 255,
  password: 128,
  name: 255,
  teamName: 255
};

export const passwordMinLength = 8;
export const nrOfStages = 20;
export const refreshTokenLocalStorage = 'refreshToken';

export function tempoString(tempo: number) {
  const seconds: string = `${Math.floor(tempo % 60)}`.padStart(2, '0');
  return `${Math.floor(tempo / 60)}:${seconds}/km`;
}

export function hoursMinutesString(secondsSinceMidnight: number) {
  const hours = Math.floor(secondsSinceMidnight / (60 * 60));
  const minutes = Math.floor((secondsSinceMidnight % (60 * 60)) / 60);
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function hoursMinutesSecondsString(duration: number) {
  const hours = Math.floor(duration / (60 * 60));
  const minutes = Math.floor((duration % (60 * 60)) / 60);
  const seconds = Math.floor(duration % 60);
  if (!hours) {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function getToday(): number {
  const today = Date.now();
  return today - (today % (24 * 60 * 60 * 1000));
}

export function getSecondsSinceMidnight(): number {
  const today = new Date();
  return today.getHours() * 60 * 60 + today.getMinutes() * 60 + today.getSeconds();
}

export function raceDayDifference(): number {
  if (environment.dryRun === true) {
    return 0;
  }
  return (getToday() - environment.raceDate);
}

export function errorMessages(field: AbstractControl): string {
  if (field.hasError('email')) {
    return 'Neplatný e-mail.';
  }
  if (field.hasError('passwordsDontMatch')) {
    return 'Heslá sa nezhodujú.';
  }
  if (field.hasError('required')) {
    return 'Toto pole je povinné.';
  }
  if (field.hasError('maxlength')) {
    return 'Zadaná hodnota je príliš dlhá.';
  }
  if (field.hasError('minlength')) {
    return `Heslo musí mať aspoň ${passwordMinLength} znakov.`;
  }
  if (field.hasError('min')) {
    return 'Príliš nízka hodnota.';
  }
  if (field.hasError('max')) {
    return 'Príliš vysoká hodnota.';
  }
  if (field.hasError('alreadyIsMember')) {
    return 'Tento používateľ už je členom tohoto tímu.';
  }
  return '';
}
