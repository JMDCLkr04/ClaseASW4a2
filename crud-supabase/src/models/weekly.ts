import type { Comida } from "./comida";

export type daily = 'Mon' | 'Tus' | 'Wed'| 'Thr' | 'Fri' | 'Sat' | 'Sun';

export interface DailyFood{
    moment: string,
    food: Comida
}

export interface Weekly{
    id: number,
    created_at: string,
    week: string,
    days: {
        [day in daily]: DailyFood;
    };
}