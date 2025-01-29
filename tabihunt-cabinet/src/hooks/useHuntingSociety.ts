import { useEffect, useState } from "react"
import { HuntingSocietyData } from "../models/huntingSociety"
import { useAppDispatch, useAppSelector } from "../store"
import { setHuntingDescriptionData } from "../store/slices/huntingSocietySlice"

const useHuntingSocietyDescriptionState = () => {    

    const dispatch = useAppDispatch()

    const { huntingDescriptionData, huntingDescription } = useAppSelector(
      state => state.huntingSociety
    )

    const [state, setState] = useState<HuntingSocietyData>({
      imageUrl: huntingDescriptionData?.imageUrl ?? huntingDescription?.imageUrl ?? "",
      address: huntingDescriptionData?.address ?? huntingDescription?.address ?? "",
      phoneNumber:
        huntingDescriptionData?.phoneNumber ?? huntingDescription?.phoneNumber ?? "",
      email: huntingDescriptionData?.email ?? huntingDescription?.email ?? "",
      workingHours: {
        monday: {
          start:
          huntingDescriptionData?.workingHours.monday.start ??
          huntingDescription?.workingHours.monday.start ??
            "00:00",
          end:
          huntingDescriptionData?.workingHours.monday.end ??
          huntingDescription?.workingHours.monday.end ??
            "00:00"
        },
        tuesday: {
          start:
          huntingDescriptionData?.workingHours.tuesday.start ??
          huntingDescription?.workingHours.tuesday.start ??
            "00:00",
          end:
          huntingDescriptionData?.workingHours.tuesday.end ??
          huntingDescription?.workingHours.tuesday.end ??
            "00:00"
        },
        wednesday: {
          start:
          huntingDescriptionData?.workingHours.wednesday.start ??
          huntingDescription?.workingHours.wednesday.start ??
            "00:00",
          end:
          huntingDescriptionData?.workingHours.wednesday.end ??
          huntingDescription?.workingHours.wednesday.end ??
            "00:00"
        },
        thursday: {
          start:
          huntingDescriptionData?.workingHours.thursday.start ??
          huntingDescription?.workingHours.thursday.start ??
            "00:00",
          end:
          huntingDescriptionData?.workingHours.thursday.end ??
          huntingDescription?.workingHours.thursday.end ??
            "00:00"
        },
        friday: {
          start:
          huntingDescriptionData?.workingHours.friday.start ??
          huntingDescription?.workingHours.friday.start ??
            "00:00",
          end:
          huntingDescriptionData?.workingHours.friday.end ??
          huntingDescription?.workingHours.friday.end ??
            "00:00"
        },
        saturday: {
          start:
          huntingDescriptionData?.workingHours.saturday.start ??
          huntingDescription?.workingHours.saturday.start ??
            "00:00",
          end:
          huntingDescriptionData?.workingHours.saturday.end ??
          huntingDescription?.workingHours.saturday.end ??
            "00:00"
        },
        sunday: {
          start:
          huntingDescriptionData?.workingHours.sunday.start ??
          huntingDescription?.workingHours.sunday.start ??
            "00:00",
          end:
          huntingDescriptionData?.workingHours.sunday.end ??
          huntingDescription?.workingHours.sunday.end ??
            "00:00"
        }
      },
      aboutTranslations: [
        {
          language: "RU",
          about:
          huntingDescriptionData?.aboutTranslations[0].about ??
          huntingDescription?.aboutTranslations[0].about ??
            ""
        },
        {
          language: "KK",
          about:
          huntingDescriptionData?.aboutTranslations[1].about ??
          huntingDescription?.aboutTranslations[1].about ??
            ""
        }
      ],
      instructionsTranslations: [
        {
          language: "RU",
          instructions:
          huntingDescriptionData?.instructionsTranslations[0].instructions ??
          huntingDescription?.instructionsTranslations[0].instructions ??
            ""
        },
        {
            language: "KK",
            instructions:
            huntingDescriptionData?.instructionsTranslations[1].instructions ??
            huntingDescription?.instructionsTranslations[1].instructions  ??
              ""
        }
      ],
      nameTranslations: [
        {
          language: "RU",
          name:
          huntingDescriptionData?.nameTranslations[0].name ??
          huntingDescription?.nameTranslations[0].name ??
            ""
        },
        {
            language: "KK",
            name:
            huntingDescriptionData?.nameTranslations[1].name ??
            huntingDescription?.nameTranslations[1].name  ??
              ""
        }
      ],
    })
    useEffect(() => {
      dispatch(setHuntingDescriptionData(state))
    }, [state, dispatch])
    return [state, setState] as const
}
export default useHuntingSocietyDescriptionState