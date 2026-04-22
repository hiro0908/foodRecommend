export type NutrientKey = 'calories' | 'protein' | 'iron' | 'calcium' | 'vitaminC';

export type FoodItem = {
    id: number,
    name: string,
    category: string,
    calories: number,
    protein: number,
    iron: number,
    calcium: number,
    vitaminC: number,
    selectSize: string | null //1回あたりの標準的な摂取目安量
};

export type MealRecord = {
    food: FoodItem,
    qty: number //個数
}