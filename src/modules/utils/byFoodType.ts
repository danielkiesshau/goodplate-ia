import { FOOD_TYPES, RecognizedItem } from "../interfaces"

export const byFoodType = (
  food: FOOD_TYPES, 
  foodType: RecognizedItem
): boolean => {
  return (food as String) === foodType.name
} 