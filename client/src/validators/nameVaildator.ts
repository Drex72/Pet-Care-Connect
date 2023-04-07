export const nameValidator = (data: string) => {
  let error = null

  if (data.length === 0) error = 'is required'

  if (data.length < 3) error = 'must be at least 3 characters long'

  return error
}
