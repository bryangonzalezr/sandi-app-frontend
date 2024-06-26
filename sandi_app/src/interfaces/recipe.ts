import { Ingredient } from './ingredient'

export interface Recipe{
    label: string,
    diet_labels: string[],
    health_labels: string[],
    cautions: string[],
    ingredient_lines: string[],
    ingredients: Ingredient[],
    calories: number,
    glycemic_index: number,
    inflammatory_index: number,
    cuisine_type: string[],
    meal_type: string[],
    dish_type: string[],
    instructions: string[]
}