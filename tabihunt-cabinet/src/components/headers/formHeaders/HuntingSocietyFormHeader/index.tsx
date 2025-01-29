import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"
import { createHuntingSocietyDescription, editHuntingSocietyDescription } from "../../../../store/actions/huntingSocietyAction"

const HuntingSocietyFormHeader = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const { huntingDescriptionData, isEditing } = useAppSelector(state => state.huntingSociety)


    const steps = pathname.split('-')[0]=="/edit"
        ? [
            {
                path: `/edit-hunting-society-step1/`,
                title: "ЭТАП 1"
            },
            {
                path: `/edit-hunting-society-step2/`,
                title: "ЭТАП 2"
            },
            {
                path: `/edit-hunting-society-step3/`,
                title: "ЭТАП 3"
            },
        ]
        : [
            { path: "/new-hunting-society-step1", title: "ЭТАП 1" },
            { path: "/new-hunting-society-step2", title: "ЭТАП 2" },
            { path: "/new-hunting-society-step3", title: "ЭТАП 3" },
        ]

    const hasDataStep1 = huntingDescriptionData?.imageUrl?.trim() !== "" &&
    huntingDescriptionData?.nameTranslations[0].name !== "" &&
    huntingDescriptionData?.nameTranslations[1].name !== "" &&
    huntingDescriptionData?.aboutTranslations.some(trans => trans.about.trim() !== "" && trans.about !== "<br>") &&
    huntingDescriptionData?.instructionsTranslations.some(trans => trans.instructions.trim() !== "" && trans.instructions !== "<br>");


    const validateEmail = (value:string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            return false  
        } else {
          return true
        }
      };

    const isValidWorkingHours = () => {
        return (
            huntingDescriptionData &&Object.values(huntingDescriptionData?.workingHours).some(
                hours => hours.start !== "00:00"
            )
        )
    }
    const hasDataStep2 = hasDataStep1 && isValidWorkingHours()
    const hasDataStep3 = hasDataStep2 && huntingDescriptionData?.address&&huntingDescriptionData.email&& huntingDescriptionData.phoneNumber.length==12&&validateEmail(huntingDescriptionData.email)
    


    
    const getFormButton = () => {
        switch (true) {
            case pathname.includes("hunting-society-step1"):
                if (hasDataStep1) {
                    if(!isEditing) {
                        return (
                            <Button
                                onClick={() =>
                                    navigate(
                                        pathname.split('-')[0]==="/edit"
                                            ? `/edit-hunting-society-step2/`
                                            : "/new-hunting-society-step2"
                                    )
                                }
                            >
                                Далее
                            </Button>
                        )
                    }
                }
                return <TextButton>Заполните данные</TextButton>
            case pathname.includes("hunting-society-step2"):
                if (hasDataStep2) {
                    return (
                        <Button
                            onClick={() =>
                                navigate(
                                    pathname.split('-')[0]==="/edit"
                                        ? `/edit-hunting-society-step3/`
                                        : "/new-hunting-society-step3"
                                )
                            }
                        >
                            Далее
                        </Button>
                    )
                }
                return <TextButton>Заполните данные</TextButton>
            case pathname.includes("hunting-society-step3"):
                if(hasDataStep3) {
                    return <Button onClick={onSubmit}>Сохранить</Button>
                }
                return <TextButton>Заполните данные</TextButton>
            default:
                break
        }
    }

    const onSubmit = async () => {
        let result
        if(huntingDescriptionData && pathname.split('-')[0]==="/edit") {
            result = await dispatch(editHuntingSocietyDescription(huntingDescriptionData))
        }else {
            if(huntingDescriptionData) {
                result = await dispatch(createHuntingSocietyDescription(huntingDescriptionData))
            }   
        }
        if(result) navigate("/hunting-society")
    }
    return (
        <FormHeader
            steps={steps}
            pathname={pathname}
            getFormButton={getFormButton}
        />
    )
}

export default HuntingSocietyFormHeader
