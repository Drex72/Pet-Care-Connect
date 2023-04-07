export const passwordValidator = (data: string) => {
  if (data.length === 0) {
    return 'is required'
  }

  if (data.length < 8) {
    return 'must be at least 8 characters long'
  }

  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

  const valid = passwordRegex.test(data)

  return valid ? null : 'is invalid'
}
