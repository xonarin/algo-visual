export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export interface IArray {
  value: string,
  state: ElementStates,
}

export interface IArraySort extends Omit<IArray, 'value'>  {
  value: number
}