import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { IRootState } from '../redux/store'

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
