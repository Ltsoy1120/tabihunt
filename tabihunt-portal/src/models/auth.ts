export type AuthStateType = {
  email?: string
  phoneNumber?: string
  password?: string
  otp?: string
}

export interface LoginWithEmailDto {
  email: string
  password: string
}

export interface LoginWithPhoneDto {
  phoneNumber: string
  password: string
}

export interface TokenResponseDto {
  accessToken: string
  refreshToken: string
}

export interface PasswordResetEmailDto {
  email: string
  newPassword: string
  otp: string
}

export interface PasswordResetPhoneDto {
  phoneNumber: string
  newPassword: string
  otp: string
}

export interface VerifyOtpEmailDto {
  email: string
  otp: string
}

export interface VerifyOtpPhoneDto {
  phoneNumber: string
  otp: string
}

export interface UserDto {
  id: string
  email?: string
  phoneNumber?: string
  role: string
  language: string
  createdAt: string
  updatedAt: string
}

export interface UserData {
  email?: string
  phoneNumber?: string
}
