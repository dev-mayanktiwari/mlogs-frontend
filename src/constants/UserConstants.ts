export enum EUserTypeConstants {
  MIN_PASSWORD_LENGTH = 8,
  MAX_PASSWORD_LENGTH = 25,
  MIN_USERNAME_LENGTH = 5,
  MAX_USERNAME_LENGTH = 15,
  MIN_NAME_LENGTH = 3,
  MAX_NAME_LENGTH = 30,
  MAX_MESSAGE_LENGTH = 500,
  MIN_MESSAGE_LENGTH = 6,
}

export const MIN_LENGTH_MESSAGE = (entity: string, length: number) =>
  `${entity} must be ${length} characters long.`;

export const MAX_LENGTH_MESSAGE = (entity: string, length: number) =>
  `${entity} must be at most ${length} characters long.`;
