import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { foodMaster } from './schema';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db  = drizzle(sql);

  await db.insert(foodMaster).values([
    { name: '白米（中盛り）',     category: '主食',  calories: 252, protein: 3.8,  iron: 0.1, calcium: 3,   vitaminC: 0,   servingSize: '160g' },
    { name: '鮭の塩焼き',         category: '主菜',  calories: 133, protein: 22.3, iron: 0.5, calcium: 14,  vitaminC: 0,   servingSize: '1切れ' },
    { name: '豆腐の味噌汁',       category: '汁物',  calories: 58,  protein: 4.2,  iron: 1.1, calcium: 80,  vitaminC: 0,   servingSize: '1杯' },
    { name: 'ほうれん草のお浸し', category: '副菜',  calories: 25,  protein: 2.6,  iron: 2.0, calcium: 69,  vitaminC: 35,  servingSize: '1小鉢' },
    { name: 'バナナ',             category: '果物',  calories: 86,  protein: 1.1,  iron: 0.3, calcium: 6,   vitaminC: 16,  servingSize: '1本' },
    { name: '牛乳',               category: '飲み物', calories: 67, protein: 3.3,  iron: 0.0, calcium: 110, vitaminC: 1,   servingSize: '200ml' },
    { name: '鶏むね肉（蒸し）',   category: '主菜',  calories: 121, protein: 24.4, iron: 0.4, calcium: 4,   vitaminC: 3,   servingSize: '100g' },
    { name: 'ブロッコリー',       category: '副菜',  calories: 37,  protein: 4.3,  iron: 1.0, calcium: 50,  vitaminC: 120, servingSize: '80g' },
    { name: '全粒粉パン',         category: '主食',  calories: 264, protein: 9.1,  iron: 2.8, calcium: 23,  vitaminC: 0,   servingSize: '2枚' },
    { name: 'ヨーグルト（無糖）', category: '乳製品', calories: 62, protein: 3.6,  iron: 0.0, calcium: 120, vitaminC: 1,   servingSize: '100g' },
  ]);

  console.log('✅ 食品マスタの初期データを投入しました');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});