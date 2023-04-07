export const emptyValidator = (data: any) => {
  if (!data) {
    return 'must not be empty'
  }

  return null
}
