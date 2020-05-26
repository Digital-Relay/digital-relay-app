export const maxLengths = {
  email: 255,
  password: 128,
  name: 255,
  teamName: 255
};

export const passwordMinLength = 8;
export const nrOfStages = 20;
export const refreshTokenLocalStorage = 'refreshToken';

export function errorMessages(field): string {
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
}
