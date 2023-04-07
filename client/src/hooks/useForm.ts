import { useState } from 'react'
import { Validator } from '../interfaces/Validator'

type FormError<T extends object> = {
  [Prop in keyof T]: string | null
}

export const useForm = <T extends object>(
  initialState: T,
  validators: Validator<T>
) => {
  const [form, setForm] = useState<T>(initialState)
  const getDefaultFormErrors = () => {
    const result: Record<string, null> = {}

    Object.keys(initialState).map((key) => {
      result[key] = null
      return
    })

    return result as FormError<T>
  }

  const [formErrors, setFormErrors] = useState<FormError<T>>(
    getDefaultFormErrors()
  )

  const resetFormErrors = (key?: keyof T) => {
    if (!key) {
      setFormErrors(getDefaultFormErrors())
    } else {
      setFormErrors((prev) => ({ ...prev, key: null }))
    }
  }

  const onChange = (name: keyof T, value: T[keyof T]) => {
    setForm((prev) => ({ ...prev, [name]: value }))

    const validator = validators[name as keyof T]

    const error = validator ? validator(value) : null

    setFormErrors((prev) => ({ ...prev, [name as keyof T]: error }))
  }

  const validate = (): boolean => {
    let valid = true

    Object.keys(formErrors).map((key) => {
      if (formErrors[key as keyof T]) valid = false
      return
    })

    return valid
  }

  const reset = () => {
    setForm(initialState)
    setFormErrors(getDefaultFormErrors())
  }

  return { form, onChange, reset, resetFormErrors, validate, formErrors }
}
