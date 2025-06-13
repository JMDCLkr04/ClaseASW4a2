import type { ExerciseCat } from "./excerciseCat";

export interface exercise{
    id: number,
    name: string,
    type: ExerciseCat
    description: string,
    duration: string,
    intensity: string
}