export interface Step {
  _id: any,
  name: String,
  description: String,
  order: Number,
  deadline: Date | null,
  status: String,
}

export interface Event {
  _id: any,
  title: String,
  description: String,
  steps: Step[]
}