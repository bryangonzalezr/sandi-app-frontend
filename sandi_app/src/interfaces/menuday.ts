import { Recipe } from './recipe'

export interface Menuday {
    recipes: Recipe[],
    total_calories: number
}