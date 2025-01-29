import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { configureStore, combineReducers } from "@reduxjs/toolkit"
// import generalErrorSlice from "./slices/generalErrorSlice"
import authSlice from "./slices/authSlice"
import huntersSlice from "./slices/huntersSlice"
import commonSlice from "./slices/commonSlice"
import vouchersSlice from "./slices/vouchersSlice"
import huntingSocietiesSlice from "./slices/huntingSocietiesSlice"
import membershipsSlice from "./slices/membershipsSlice"

const rootReducer = combineReducers({
  // generalError: generalErrorSlice,
  common: commonSlice,
  auth: authSlice,
  hunters: huntersSlice,
  vouchers: vouchersSlice,
  huntingSocieties: huntingSocietiesSlice,
  memberships: membershipsSlice
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
