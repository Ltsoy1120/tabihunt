export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#!"№;%:?*()_+/\\/.])[A-Za-z\d#!"№;%:?*()_+/\\/.]{8,}$/
  if (!passwordRegex.test(password)) {
    return 'Пароль должен содержать латинские буквы верхнего и нижнего регистра, цифры и символы #!"№;%:?*()_+/\\/. и быть не менее 8 символов.'
  }
  return ""
}

export const validatePasswordRepeat = (
  password: string,
  repeatPassword: string
) => {
  if (password !== repeatPassword) {
    return "Пароли не совпадают."
  }
  return ""
}

export function validateIin(iin: string) {
  const regex = /^[0-9]{12}$/
  const iinArr = iin.match(/(\d)/g)
  let controlNum = null

  if (iinArr?.length === 12) {
    controlNum =
      (1 * Number(iinArr[0]) +
        2 * Number(iinArr[1]) +
        3 * Number(iinArr[2]) +
        4 * Number(iinArr[3]) +
        5 * Number(iinArr[4]) +
        6 * Number(iinArr[5]) +
        7 * Number(iinArr[6]) +
        8 * Number(iinArr[7]) +
        9 * Number(iinArr[8]) +
        10 * Number(iinArr[9]) +
        11 * Number(iinArr[10])) %
      11

    if (controlNum === 10) {
      controlNum =
        (3 * Number(iinArr[0]) +
          4 * Number(iinArr[1]) +
          5 * Number(iinArr[2]) +
          6 * Number(iinArr[3]) +
          7 * Number(iinArr[4]) +
          8 * Number(iinArr[5]) +
          9 * Number(iinArr[6]) +
          10 * Number(iinArr[7]) +
          11 * Number(iinArr[8]) +
          1 * Number(iinArr[9]) +
          2 * Number(iinArr[10])) %
        11
    }
  }

  if (!iin.match(regex)) {
    return {
      isInvalid: true,
      message: "ИИН должен содержать 12 цифр"
    }
  } else if (iinArr && iinArr[11] !== String(controlNum)) {
    return {
      isInvalid: true,
      message: "ИИН не корректный"
    }
  } else if (iin.length === 12 && !!iin.match(regex)) {
    return {
      isInvalid: false,
      message: ""
    }
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const cleanedPhoneNumber = phoneNumber.replace(/[\s()]/g, '');
  const emailRegex = /^\+7[0-9]{10,10}/
  return emailRegex.test(cleanedPhoneNumber)
}

export const validateNumber = (value: string): boolean => {
  const numberRegex = /^\d*$/
  return numberRegex.test(value)
}
