import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import generalErrorSlice from "./slices/generalErrorSlice"
import authSlice from "./slices/authSlice"
import accountSlice from "./slices/accountSlice"
import plotsSlice from "./slices/plotsSlice"
import limitsSlice from "./slices/limitsSlice"
import animalsSlice from "./slices/animalsSlice"
import companySlice from "./slices/companySlice"
import huntsmenSlice from "./slices/huntsmenSlice"
import vouchersSlice from "./slices/vouchersSlice"
import membershipsSlice from "./slices/membershipsSlice"
import huntersSlice from "./slices/huntersSlice"
import limitedAnimalsSlice from "./slices/limitedAnimalsSlice"
import huntingSocietySlice from "./slices/huntingSocietySlice"
import reportsSlice from "./slices/reportsSlice"
import PurchaseVoucherSlice from "./slices/PurchaseVoucherSlice"

const rootReducer = combineReducers({
  generalError: generalErrorSlice,
  auth: authSlice,
  account: accountSlice,
  company: companySlice,
  plots: plotsSlice,
  animals: animalsSlice,
  limitedAnimals: limitedAnimalsSlice,
  limits: limitsSlice,
  reports: reportsSlice,
  huntsmen: huntsmenSlice,
  vouchers: vouchersSlice,
  hunters: huntersSlice,
  memberships: membershipsSlice,
  huntingSociety: huntingSocietySlice,
  purchasedVoucher: PurchaseVoucherSlice,
})

function setupStore() {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          // Игнорируем action с типом 'plots/setPlotDescriptionData'
          ignoredActions: ["plots/setPlotDescriptionData"],
          // Игнорируем путь состояния, где ожидаются несериализуемые данные
          ignoredPaths: ["plots.plotDescriptionData.imageUrl"]
        }
      })
  })
}

export const store = setupStore()

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
