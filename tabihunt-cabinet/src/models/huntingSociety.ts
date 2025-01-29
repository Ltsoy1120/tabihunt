export interface DayHours {
    start: string
    end: string
  }
  export interface WorkingHours {
    [key: string]: DayHours
  }

  export interface HuntingAboutTranslation {
    language: "KK" | "RU"
    about: string
  }
  
  export interface HuntingInstructionsTranslationDto {
    language: "KK" | "RU"
    instructions: string
  }
  export interface HuntingNameTranslation {
    language: "KK" | "RU"
    name: string
  }


export interface HuntingSocietyData {
    imageUrl: string,
    address: string,
    phoneNumber: string,
    email: string,
    workingHours:WorkingHours,
    nameTranslations:HuntingNameTranslation[],
    aboutTranslations:HuntingAboutTranslation[],
    instructionsTranslations:HuntingInstructionsTranslationDto[]
}