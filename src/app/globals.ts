import {AbstractControl} from '@angular/forms';

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
  const seconds: string = `${tempo % 60}`.padStart(2, '0');
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
  const seconds = duration % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
