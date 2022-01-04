type TUnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type TRenameMultiUtil<
  T,
  R extends { [K in keyof R]: K extends keyof T ? PropertyKey : 'Error: one or more keys does not exist' }
> = Omit<T, keyof R> & TUnionToIntersection<{ [P in keyof R & keyof T]: { [PP in R[P]]: T[P] } }[keyof R & keyof T]>;

export type TOptionalUtil<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
