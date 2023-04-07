export const emailValidator = (data: string) => {
  let error = null

  if (data.length === 0) return 'must not be empty'

  const regexp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )

  const valid = regexp.test(data)

  if (!valid) error = 'is invalid'

  return error
}
