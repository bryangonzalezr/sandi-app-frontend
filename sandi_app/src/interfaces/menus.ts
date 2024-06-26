import { Menuday } from './menuday'

export interface Menus{
    timespan: number,
    menus: Menuday[],
    total_calories: number
}