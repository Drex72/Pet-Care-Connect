// export interface Validator<T extends object, K> {
//   key: keyof T;
//   validate: (arg: K) => string | null;
// }

export type Validator<T extends object> = {
  [Prop in keyof T]?: (arg: T[Prop]) => string | null
}
