import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  ChecklistDto,
  CompanyDto,
  UpdateCurrentCompanyData
} from "../../models/companies"

interface LimitsState {
  loading: boolean
  error: string | null
  checklist: ChecklistDto | null
  meCompany: CompanyDto | null
  membershipPrice: UpdateCurrentCompanyData | null
}

const initialState: LimitsState = {
  loading: false,
  error: null,
  checklist: null,
  meCompany: null,
  membershipPrice: null
}

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyFetching(state) {
      state.loading = true
    },
    companyFetchSuccess(state) {
      state.loading = false
    },
    companyFetchError(state, action: PayloadAction<string | null>) {
      state.loading = false
      state.error = action.payload
    },
    setChecklist(state, action: PayloadAction<ChecklistDto>) {
      state.checklist = action.payload
    },
    setMeCompany(state, action: PayloadAction<CompanyDto>) {
      state.meCompany = action.payload
    },
    setMembershipPrice(state, action: PayloadAction<UpdateCurrentCompanyData>) {
      state.membershipPrice = action.payload
    }
  }
})

export const {
  companyFetching,
  companyFetchSuccess,
  companyFetchError,
  setChecklist,
  setMeCompany,
  setMembershipPrice
} = companySlice.actions

export default companySlice.reducer
