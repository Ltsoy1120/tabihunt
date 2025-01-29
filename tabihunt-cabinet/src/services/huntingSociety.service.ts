import { HuntingSocietyData } from "../models/huntingSociety"
import http from "./http.service"

export const huntingSocietyService = {
    async getHuntingSocietyDescriptions() {
        return await http.get(`companies/me/hunting-societies`)
    },
    async createHuntingSocietyDescription(payload: HuntingSocietyData) {
        return await http.post(`companies/me/hunting-societies`, payload)
    },
    async editHuntingSocietyDescription(payload: HuntingSocietyData) {
        return await http.patch(`companies/me/hunting-societies`, payload)
    },
}