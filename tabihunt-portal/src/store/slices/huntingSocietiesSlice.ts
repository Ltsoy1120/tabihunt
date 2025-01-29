import { HuntingSocietyDto } from "@/models/huntingSociety";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HunterDto, HunterData } from "../../models/hunter";
import { MembershipPriceType } from "@/models/membership";

interface HuntingSocietiesState {
  loading: boolean;
  error: any | null;
  meHuntingSocieties: HuntingSocietyDto[];
  huntingSociety: HuntingSocietyDto | null;
  meHuntingSocietyPricingType: MembershipPriceType;
}

const initialState: HuntingSocietiesState = {
  loading: false,
  error: null,
  meHuntingSocieties: [],
  huntingSociety: null,
  meHuntingSocietyPricingType: MembershipPriceType.STANDARD,
};

export const huntingSocietiesSlice = createSlice({
  name: "huntingSocieties",
  initialState,
  reducers: {
    huntingSocietiesFetching(state) {
      state.loading = true;
    },
    huntingSocietiesFetchSuccess(state) {
      state.loading = false;
    },
    huntingSocietiesFetchError(state, action: PayloadAction<any | null>) {
      state.loading = false;
      state.error = action.payload;
    },
    setMeHuntingSocieties(state, action: PayloadAction<HuntingSocietyDto[]>) {
      state.meHuntingSocieties = action.payload;
    },
    setHuntingSociety(state, action: PayloadAction<HuntingSocietyDto | null>) {
      state.huntingSociety = action.payload;
    },
    resetHuntingSocieties(state) {
      state.error = null;
      state.meHuntingSocieties = [];
      state.huntingSociety = null;
    },
    setMeHuntingSocietyPricingType(
      state,
      action: PayloadAction<MembershipPriceType>
    ) {
      state.meHuntingSocietyPricingType = action.payload;
    },
  },
});

export const {
  huntingSocietiesFetching,
  huntingSocietiesFetchSuccess,
  huntingSocietiesFetchError,
  setMeHuntingSocieties,
  setHuntingSociety,
  resetHuntingSocieties,
  setMeHuntingSocietyPricingType,
} = huntingSocietiesSlice.actions;

export default huntingSocietiesSlice.reducer;
