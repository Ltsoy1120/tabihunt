import { huntingSocietiesService } from "@/services/huntingSocieties.service";
import { AppDispatch } from "..";
import {
  huntingSocietiesFetchError,
  huntingSocietiesFetching,
  huntingSocietiesFetchSuccess,
  setHuntingSociety,
  setMeHuntingSocieties,
  setMeHuntingSocietyPricingType,
} from "../slices/huntingSocietiesSlice";

// Получить все мои сообщества
export const getMeHuntingSocieties = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntingSocietiesFetching());
      const resp = await huntingSocietiesService.getMeHuntingSocieties();
      if (resp.data) {
        dispatch(setMeHuntingSocieties(resp.data.content));
        dispatch(huntingSocietiesFetchSuccess());
        return resp.data.content;
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      dispatch(huntingSocietiesFetchError(errMessage));
    }
  };
};

// Получить сообщества по ID
export const getHuntingSocietyById = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntingSocietiesFetching());
      const resp = await huntingSocietiesService.getHuntingSocietyById(id);
      if (resp.data) {
        dispatch(setHuntingSociety(resp.data));
        dispatch(huntingSocietiesFetchSuccess());
        return resp.data;
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      dispatch(huntingSocietiesFetchError(errMessage));
    }
  };
};

// Получить тип цены за продление членства по ID сощбщества
export const getMeHuntingSocietyPricingType = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(huntingSocietiesFetching());
      const resp = await huntingSocietiesService.getMeHuntingSocietyPricingType(
        id
      );
      if (resp.data) {
        dispatch(setMeHuntingSocietyPricingType(resp.data));
        dispatch(huntingSocietiesFetchSuccess());
        return resp.data;
      }
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : String(error);
      dispatch(huntingSocietiesFetchError(errMessage));
    }
  };
};
