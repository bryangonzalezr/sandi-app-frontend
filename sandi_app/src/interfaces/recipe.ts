import { Ingredient } from './ingredient'
import { Digest } from './digest'

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
    total_weight: number,
    cuisine_type: string[],
    meal_type: string[],
    dish_type: string[],
    instructions: string[],
    total_nutrients: {
      ENERC_KCAL: {
          label: string,
          quantity: number,
          unit: string
        },
        FAT: {
          label: string,
          quantity: number,
          unit: string
        },
        FASAT: {
          label: string,
          quantity: number,
          unit: string
        },
        FATRN: {
          label: string,
          quantity: number,
          unit: string
        },
        FAMS: {
          label: string,
          quantity: number,
          unit: string
        },
        FAPU: {
          label: string,
          quantity: number,
          unit: string
        },
        CHOCDF: {
          label: string,
          quantity: number,
          unit: string
        },
        'CHOCDF.net': {
          label: string,
          quantity: number,
          unit: string
        },
        FIBTG: {
          label: string,
          quantity: number,
          unit: string
        },
        SUGAR: {
          label: string,
          quantity: number
          unit: string
        },
        'SUGAR.added': {
          label: string,
          quantity: number,
          unit: string
        },
        PROCNT: {
          label: string,
          quantity: number,
          unit: string
        },
        CHOLE: {
          label: string,
          quantity: number,
          unit: string
        },
        NA: {
          label: string,
          quantity: number,
          unit: string
        },
        CA: {
          label: string,
          quantity: number,
          unit: string
        },
        MG: {
          label: string,
          quantity: number,
          unit: string
        },
        K: {
          label: string,
          quantity: number,
          unit: string
        },
        FE: {
          label: string,
          quantity: number,
          unit: string
        },
        ZN: {
          label: string,
          quantity: number,
          unit: string
        },
        P: {
          label: string,
          quantity: number,
          unit: string
        },
        VITA_RAE: {
          label: string,
          quantity: number,
          unit: string
        },
        VITC: {
          label: string,
          quantity: number,
          unit: string
        },
        THIA: {
          label: string,
          quantity: number,
          unit: string
        },
        RIBF: {
          label: string,
          quantity: number,
          unit: string
        },
        NIA: {
          label: string ,
          quantity: number,
          unit: string
        },
        VITB6A: {
          label: string,
          quantity: number,
          unit: string
        },
        FOLDFE: {
          label: string,
          quantity: number,
          unit: string
        },
        FOLFD: {
          label: string,
          quantity: number,
          unit: string
        },
        FOLAC: {
          label: string,
          quantity: number
          unit: string
        },
        VITB12: {
          label: string,
          quantity: number,
          unit: string
        },
        VITD: {
          label: string,
          quantity: number,
          unit: string
        },
        TOCPHA: {
          label: string,
          quantity: number,
          unit: string
        },
        VITK1: {
          label: string,
          quantity: number,
          unit: string
        },
        WATER: {
          label: string,
          quantity: number,
          unit: string
        }
    },
    total_daily: {
      ENERC_KCAL: {
          label: string,
          quantity: number,
          unit: string
        },
        FAT: {
          label: string,
          quantity: number,
          unit: string
        },
        FASAT: {
          label: string,
          quantity: number,
          unit: string
        },
        CHOCDF: {
          label: string,
          quantity: number,
          unit: string
        },
        FIBTG: {
          label: string,
          quantity: number,
          unit: string
        },
        PROCNT: {
          label: string,
          quantity: number,
          unit: string
        },
        CHOLE: {
          label: string,
          quantity: number,
          unit: string
        },
        NA: {
          label: string,
          quantity: number,
          unit: string
        },
        CA: {
          label: string,
          quantity: number,
          unit: string
        },
        MG: {
          label: string,
          quantity: number,
          unit: string
        },
        K: {
          label: string,
          quantity: number,
          unit: string
        },
        FE: {
          label: string,
          quantity: number,
          unit: string
        },
        ZN: {
          label: string,
          quantity: number,
          unit: string
        },
        P: {
          label: string,
          quantity: number,
          unit: string
        },
        VITA_RAE: {
          label: string,
          quantity: number,
          unit: string
        },
        VITC: {
          label: string,
          quantity: number,
          unit: string
        },
        THIA: {
          label: string,
          quantity: number,
          unit: string
        },
        RIBF: {
          label: string,
          quantity: number,
          unit: string
        },
        NIA: {
          label: string,
          quantity: number,
          unit: string
        },
        VITB6A: {
          label: string,
          quantity: number,
          unit: string
        },
        FOLDFE: {
          label: string,
          quantity: number,
          unit: string
        },
        VITB12: {
          label: string,
          quantity: number,
          unit: string
        },
        VITD: {
          label: string,
          quantity: number,
          unit: string
        },
        TOCPHA: {
          label: string,
          quantity: number,
          unit: string
        },
        VITK1: {
          label: string,
          quantity: number,
          unit: string
        }
    },
    digest:
      {
        label: string,
        tag: string,
        schemaOrgTag: string,
        total: string,
        hasRDI: string,
        daily: string,
        unit: string,
        sub: Digest[]
      }[]
}