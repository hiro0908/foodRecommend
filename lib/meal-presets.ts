import type { FoodItem } from '@/lib/types';

export type MealCategory = 'ごはん' | 'パン' | '麺' | '肉' | '魚';
export type PortionSize  = '大盛り' | '普通' | '少なめ';

export const MEAL_CATEGORIES: MealCategory[] = ['ごはん', 'パン', '麺', '肉', '魚'];
export const PORTION_SIZES: PortionSize[]     = ['大盛り', '普通', '少なめ'];

export const MEAL_PRESETS: Record<MealCategory, Record<PortionSize, FoodItem>> = {
  'ごはん': {
    '大盛り': { id:101, name:'白米（大盛り）', category:'主食', calories:336, protein:5.1,  iron:0.1, calcium:4,  vitaminC:0, selectSize:'220g' },
    '普通':   { id:102, name:'白米（普通）',   category:'主食', calories:252, protein:3.8,  iron:0.1, calcium:3,  vitaminC:0, selectSize:'160g' },
    '少なめ': { id:103, name:'白米（少なめ）', category:'主食', calories:168, protein:2.5,  iron:0.1, calcium:2,  vitaminC:0, selectSize:'110g' },
  },
  'パン': {
    '大盛り': { id:104, name:'食パン（大盛り）', category:'主食', calories:264, protein:9.1, iron:0.8, calcium:28, vitaminC:0, selectSize:'2枚' },
    '普通':   { id:105, name:'食パン（普通）',   category:'主食', calories:132, protein:4.6, iron:0.4, calcium:14, vitaminC:0, selectSize:'1枚' },
    '少なめ': { id:106, name:'食パン（少なめ）', category:'主食', calories:66,  protein:2.3, iron:0.2, calcium:7,  vitaminC:0, selectSize:'半枚' },
  },
  '麺': {
    '大盛り': { id:107, name:'うどん（大盛り）', category:'主食', calories:357, protein:10.2, iron:0.6, calcium:18, vitaminC:0, selectSize:'300g' },
    '普通':   { id:108, name:'うどん（普通）',   category:'主食', calories:238, protein:6.8,  iron:0.4, calcium:12, vitaminC:0, selectSize:'200g' },
    '少なめ': { id:109, name:'うどん（少なめ）', category:'主食', calories:119, protein:3.4,  iron:0.2, calcium:6,  vitaminC:0, selectSize:'100g' },
  },
  '肉': {
    '大盛り': { id:110, name:'鶏むね肉（大盛り）', category:'主菜', calories:242, protein:48.8, iron:0.8, calcium:8, vitaminC:6, selectSize:'200g' },
    '普通':   { id:111, name:'鶏むね肉（普通）',   category:'主菜', calories:121, protein:24.4, iron:0.4, calcium:4, vitaminC:3, selectSize:'100g' },
    '少なめ': { id:112, name:'鶏むね肉（少なめ）', category:'主菜', calories:61,  protein:12.2, iron:0.2, calcium:2, vitaminC:2, selectSize:'50g'  },
  },
  '魚': {
    '大盛り': { id:113, name:'鮭の塩焼き（大盛り）', category:'主菜', calories:266, protein:44.6, iron:1.0, calcium:28, vitaminC:0, selectSize:'2切れ' },
    '普通':   { id:114, name:'鮭の塩焼き（普通）',   category:'主菜', calories:133, protein:22.3, iron:0.5, calcium:14, vitaminC:0, selectSize:'1切れ' },
    '少なめ': { id:115, name:'鮭の塩焼き（少なめ）', category:'主菜', calories:67,  protein:11.2, iron:0.3, calcium:7,  vitaminC:0, selectSize:'半切れ' },
  },
};