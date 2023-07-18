export interface Step {
  _id: any,
  name: string,
  description: string,
  order: number,
  deadline: Date | null,
  status: string,
}

export interface Event {
  _id: any,
  title: string,
  description: string,
  steps: Step[]
}