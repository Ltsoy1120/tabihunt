import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IGetAccountInfoResult } from "../../models/account"

interface AccountState {
    account: IGetAccountInfoResult
    loading: boolean
    error: Error | null
    isOtpSendToEmail: boolean
    isOtpSendToPhone: boolean
}
const initialState: AccountState = {
    account: {
        id: "",
        user: {
            id: "",
            email: "",
            phoneNumber: "",
            role: "",
            language: "RU",
            createdAt: null,
            updatedAt: null,
        },
        name: "",
        address: {
            id: "",
            region: {
                id: "",
                name: "",
                createdAt: null,
                updatedAt: null,
            },
            street: "",
            houseNumber: "",
            flatNumber: null,
            postalCode: null,
            latitude: null,
            longitude: null,
            createdAt: null,
            updatedAt: null,
        },
        bin: "",
        createdAt: null,
        updatedAt: null,
    },
    loading: false,
    error: null,
    isOtpSendToEmail: false,
    isOtpSendToPhone: false,
}

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setAccountInfo(state, action: PayloadAction<IGetAccountInfoResult>) {
            state.account = action.payload,
                state.isOtpSendToEmail = false,
                state.isOtpSendToPhone = false
        },
        clearAccountInfo(state) {
            state.account = {
                id: "",
                user: {
                    id: "",
                    email: "",
                    phoneNumber: "",
                    role: "",
                    language: "RU",
                    createdAt: null,
                    updatedAt: null,
                },
                name: "",
                address: {
                    id: "",
                    region: {
                        id: "",
                        name: "",
                        createdAt: null,
                        updatedAt: null,
                    },
                    street: "",
                    houseNumber: "",
                    flatNumber: null,
                    postalCode: null,
                    latitude: null,
                    longitude: null,
                    createdAt: null,
                    updatedAt: null,
                },
                bin: "",
                createdAt: null,
                updatedAt: null,
            }
        },
        accountFetching(state) {
            state.loading = true
        },
        accountFetchSuccess(state) {
            state.loading = false
        },
        accountFetchError(state, action: PayloadAction<Error | null>) {
            state.loading = false
            state.error = action.payload
        },
        otpSendToEmail(state) {
            state.isOtpSendToEmail = true
            state.isOtpSendToPhone = false
        },
        otpSendToPhone(state) {
            state.isOtpSendToPhone = true
            state.isOtpSendToEmail = false
        }
    }
})

export const {
    accountFetching,
    accountFetchSuccess,
    accountFetchError,
    setAccountInfo,
    clearAccountInfo,
    otpSendToEmail,
    otpSendToPhone,

} = accountSlice.actions

export default accountSlice.reducer
