import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../store"
import { PlotDescriptionData } from "../models/plots"
import { getMeCompanyPlotDescriptionById } from "../store/actions/plotsActions"
import { setPlotDescriptionData } from "../store/slices/plotsSlice"

const usePlotDescriptionState = () => {
  const dispatch = useAppDispatch()
  const { plotDescriptionId } = useParams()
  const { plotDescriptionData, plotDescription } = useAppSelector(
    state => state.plots
  )

  const [state, setState] = useState<PlotDescriptionData>({
    plotId: plotDescriptionData?.plotId ?? plotDescription?.plot.id ?? "",
    imageUrl: plotDescriptionData?.imageUrl ?? plotDescription?.imageUrl ?? "",
    address: plotDescriptionData?.address ?? plotDescription?.address ?? "",
    phoneNumber:
      plotDescriptionData?.phoneNumber ?? plotDescription?.phoneNumber ?? "",
    email: plotDescriptionData?.email ?? plotDescription?.email ?? "",
    workingHours: {
      monday: {
        start:
          plotDescriptionData?.workingHours.monday.start ??
          plotDescription?.workingHours.monday.start ??
          "00:00",
        end:
          plotDescriptionData?.workingHours.monday.end ??
          plotDescription?.workingHours.monday.end ??
          "00:00"
      },
      tuesday: {
        start:
          plotDescriptionData?.workingHours.tuesday.start ??
          plotDescription?.workingHours.tuesday.start ??
          "00:00",
        end:
          plotDescriptionData?.workingHours.tuesday.end ??
          plotDescription?.workingHours.tuesday.end ??
          "00:00"
      },
      wednesday: {
        start:
          plotDescriptionData?.workingHours.wednesday.start ??
          plotDescription?.workingHours.wednesday.start ??
          "00:00",
        end:
          plotDescriptionData?.workingHours.wednesday.end ??
          plotDescription?.workingHours.wednesday.end ??
          "00:00"
      },
      thursday: {
        start:
          plotDescriptionData?.workingHours.thursday.start ??
          plotDescription?.workingHours.thursday.start ??
          "00:00",
        end:
          plotDescriptionData?.workingHours.thursday.end ??
          plotDescription?.workingHours.thursday.end ??
          "00:00"
      },
      friday: {
        start:
          plotDescriptionData?.workingHours.friday.start ??
          plotDescription?.workingHours.friday.start ??
          "00:00",
        end:
          plotDescriptionData?.workingHours.friday.end ??
          plotDescription?.workingHours.friday.end ??
          "00:00"
      },
      saturday: {
        start:
          plotDescriptionData?.workingHours.saturday.start ??
          plotDescription?.workingHours.saturday.start ??
          "00:00",
        end:
          plotDescriptionData?.workingHours.saturday.end ??
          plotDescription?.workingHours.saturday.end ??
          "00:00"
      },
      sunday: {
        start:
          plotDescriptionData?.workingHours.sunday.start ??
          plotDescription?.workingHours.sunday.start ??
          "00:00",
        end:
          plotDescriptionData?.workingHours.sunday.end ??
          plotDescription?.workingHours.sunday.end ??
          "00:00"
      }
    },
    aboutTranslations: [
      {
        language: "RU",
        about:
          plotDescriptionData?.aboutTranslations[0].about ??
          plotDescription?.aboutTranslations[0].about ??
          ""
      },
      {
        language: "KK",
        about:
          plotDescriptionData?.aboutTranslations[1].about ??
          plotDescription?.aboutTranslations[1].about ??
          ""
      }
    ],
    servicesTranslations: [
      {
        language: "RU",
        services:
          (plotDescriptionData?.servicesTranslations &&
            plotDescriptionData?.servicesTranslations[0]?.services) ??
          plotDescription?.servicesTranslations[0].services ??
          ""
      },
      {
        language: "KK",
        services:
          plotDescriptionData?.servicesTranslations[1].services ??
          plotDescription?.servicesTranslations[1].services ??
          ""
      }
    ]
  })

  useEffect(() => {
    const getPlotDescription = async (plotDescriptionId: string) => {
      const plotDescription = await dispatch(
        getMeCompanyPlotDescriptionById(plotDescriptionId)
      )
      if (plotDescription) {
        setState({
          plotId: plotDescriptionData?.plotId ?? plotDescription?.plot.id ?? "",
          imageUrl:
            plotDescriptionData?.imageUrl ?? plotDescription?.imageUrl ?? "",
          address:
            plotDescriptionData?.address ?? plotDescription?.address ?? "",
          phoneNumber:
            plotDescriptionData?.phoneNumber ??
            plotDescription?.phoneNumber ??
            "",
          email: plotDescriptionData?.email ?? plotDescription?.email ?? "",
          workingHours: {
            monday: {
              start:
                plotDescriptionData?.workingHours.monday.start ??
                plotDescription?.workingHours.monday.start ??
                "00:00",
              end:
                plotDescriptionData?.workingHours.monday.end ??
                plotDescription?.workingHours.monday.end ??
                "00:00"
            },
            tuesday: {
              start:
                plotDescriptionData?.workingHours.tuesday.start ??
                plotDescription?.workingHours.tuesday.start ??
                "00:00",
              end:
                plotDescriptionData?.workingHours.tuesday.end ??
                plotDescription?.workingHours.tuesday.end ??
                "00:00"
            },
            wednesday: {
              start:
                plotDescriptionData?.workingHours.wednesday.start ??
                plotDescription?.workingHours.wednesday.start ??
                "00:00",
              end:
                plotDescriptionData?.workingHours.wednesday.end ??
                plotDescription?.workingHours.wednesday.end ??
                "00:00"
            },
            thursday: {
              start:
                plotDescriptionData?.workingHours.thursday.start ??
                plotDescription?.workingHours.thursday.start ??
                "00:00",
              end:
                plotDescriptionData?.workingHours.thursday.end ??
                plotDescription?.workingHours.thursday.end ??
                "00:00"
            },
            friday: {
              start:
                plotDescriptionData?.workingHours.friday.start ??
                plotDescription?.workingHours.friday.start ??
                "00:00",
              end:
                plotDescriptionData?.workingHours.friday.end ??
                plotDescription?.workingHours.friday.end ??
                "00:00"
            },
            saturday: {
              start:
                plotDescriptionData?.workingHours.saturday.start ??
                plotDescription?.workingHours.saturday.start ??
                "00:00",
              end:
                plotDescriptionData?.workingHours.saturday.end ??
                plotDescription?.workingHours.saturday.end ??
                "00:00"
            },
            sunday: {
              start:
                plotDescriptionData?.workingHours.sunday.start ??
                plotDescription?.workingHours.sunday.start ??
                "00:00",
              end:
                plotDescriptionData?.workingHours.sunday.end ??
                plotDescription?.workingHours.sunday.end ??
                "00:00"
            }
          },
          aboutTranslations: [
            {
              language: "RU",
              about:
                plotDescriptionData?.aboutTranslations[0].about ??
                plotDescription?.aboutTranslations[0].about ??
                ""
            },
            {
              language: "KK",
              about:
                plotDescriptionData?.aboutTranslations[1].about ??
                plotDescription?.aboutTranslations[1].about ??
                ""
            }
          ],
          servicesTranslations: [
            {
              language: "RU",
              services:
                plotDescriptionData?.servicesTranslations[0].services ??
                plotDescription?.servicesTranslations[0].services ??
                ""
            },
            {
              language: "KK",
              services:
                plotDescriptionData?.servicesTranslations[1].services ??
                plotDescription?.servicesTranslations[1].services ??
                ""
            }
          ]
        })
      }
    }

    if (plotDescriptionId) {
      getPlotDescription(plotDescriptionId)
    }
  }, [plotDescriptionId, dispatch])

  useEffect(() => {
    dispatch(setPlotDescriptionData(state))
  }, [state, dispatch])

  return [state, setState] as const
}

export default usePlotDescriptionState
