import { AppDispatch } from ".."
import { accountService } from "../../services/account.service"
import {
    accountFetchError,
    accountFetchSuccess,
    accountFetching,
    setAccountInfo
} from "../slices/accountSlice"


export const getAccountInfo = () => {
    return async (dispatch: AppDispatch) => {
        try {
            dispatch(accountFetching())
            const resp = await accountService.getMyAccountInfo()
            if (resp.status === 200 && resp?.data !== undefined) {

                dispatch(setAccountInfo(resp.data))
                dispatch(accountFetchSuccess())
                return resp.status
            }
        } catch (error) {
            console.error("error from getAccountInfo", error)
            const err = error instanceof Error ? error : new Error(String(error))
            dispatch(accountFetchError(err))
        }
    }
}
