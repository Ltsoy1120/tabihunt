import { AxiosResponse } from "axios"
import {
  LoginWithEmailDto,
  LoginWithPhoneDto,
  PasswordResetEmailDto,
  PasswordResetPhoneDto,
  TokenResponseDto,
  VerifyOtpEmailDto,
  VerifyOtpPhoneDto
} from "@/models/auth"
import http from "./http.service"

export const authService = {
  async loginWithEmail(
    payload: LoginWithEmailDto
  ): Promise<AxiosResponse<TokenResponseDto>> {
    return await http.post(`auth/login/email`, payload)
  },
  async loginWithPhone(
    payload: LoginWithPhoneDto
  ): Promise<AxiosResponse<TokenResponseDto>> {
    return await http.post(`auth/login/phone`, payload)
  },
  async logout(): Promise<AxiosResponse> {
    const accessToken = localStorage.getItem("accessToken")
    const refreshToken = localStorage.getItem("refreshToken")
    return await http.post(
      `auth/logout`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
  },
  async sendOtpEmail(email: string): Promise<AxiosResponse> {
    return await http.post(`auth/otp/send/email`, { email })
  },
  async sendOtpPhone(phoneNumber: string): Promise<AxiosResponse> {
    return await http.post(`auth/otp/send/phone`, { phoneNumber })
  },
  async verifyOtpEmail(payload: VerifyOtpEmailDto): Promise<AxiosResponse> {
    return await http.post(`auth/otp/verify/email`, payload)
  },
  async verifyOtpPhone(payload: VerifyOtpPhoneDto): Promise<AxiosResponse> {
    return await http.post(`auth/otp/verify/phone`, payload)
  },
  async passwordResetEmail(
    payload: PasswordResetEmailDto
  ): Promise<AxiosResponse> {
    return await http.post(`auth/password/reset/email`, payload)
  },
  async passwordResetPhone(
    payload: PasswordResetPhoneDto
  ): Promise<AxiosResponse> {
    return await http.post(`auth/password/reset/phone`, payload)
  },
  async refreshAccessToken(
    refreshToken: string
  ): Promise<AxiosResponse<TokenResponseDto>> {
    return await http.post(`auth/refresh-token`, { refreshToken })
  },
  async passwordChange(password: string): Promise<AxiosResponse<string>> {
    return await http.post(`auth/password/change`, { password })
  }
}
