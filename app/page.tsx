"use client";
import {useState} from "react";
import {Header} from "@/components/dashboard/header";
import { TabBar }  from '@/components/dashboard/tab-bar';
import { MealForm }  from '@/components/dashboard/meal-form';
import { FoodTag }  from '@/components/dashboard/food-tag';
import { NutrientBar }  from '@/components/dashboard/nutrient-bar';
import { DeficiencyAlert } from '@/components/dashboard/deficiency-alert';
import { StatCard }   from '@/components/dashboard/stat-card';
import { AchievementChart }  from '@/components/dashboard/achievement-chart';
import { CalorieBreakDown }  from '@/components/dashboard/calorie-breakdown';
import { DRI, NUTRIENT_LABELS, NUTRIENT_UNITS }        from '@/lib/dri/standards';
import type { FoodItem, NutrientKey }                  from '@/lib/types';



const COLORS: Record<NutrientKey, string> = {
  calories: '#f9a84d',
  protein:  '#5b8fff',
  iron:     '#7eeaa0',
  calcium:  '#c084fc',
  vitaminC: '#fb7185',
};

type MealRecord = {
  food: FoodItem;
  qty:  number;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'record' | 'stats'>('record');
  const [records,   setRecords]   = useState<MealRecord[]>([]);

  // 栄養素の合計を計算
  const totals = records.reduce((acc, { food, qty }) => {
    (Object.keys(DRI) as NutrientKey[]).forEach(k => {
      acc[k] = (acc[k] ?? 0) + food[k] * qty;
    });
    return acc;
  }, {} as Record<NutrientKey, number>);

  // 食事を追加
  function handleAdd(food: FoodItem, qty: number) {
    setRecords(r => [...r, { food, qty }]);
  }

  // 食事を削除
  function handleRemove(index: number) {
    setRecords(r => r.filter((_, i) => i !== index));
  }

  const nutrientKeys = Object.keys(DRI) as NutrientKey[];

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>


      <Header />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 16px' }}>

    
        <div style={{ marginBottom: 24 }}>
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>


        {activeTab === 'record' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

    
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <MealForm onAdd={handleAdd} />

              <div style={{
                background:   '#171b26',
                border:       '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14,
                padding:      20,
              }}>
                <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 14, fontWeight: 700 }}>
                  今日の食事
                  <span style={{ color: '#e8eaf0', marginLeft: 6 }}>{records.length}</span>
                  品目
                </div>
                {records.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#6b7280', fontSize: 13, padding: '20px 0' }}>
                    食品を追加してください
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {records.map((r, i) => (
                      <FoodTag
                        key={i}
                        food={r.food}
                        qty={r.qty}
                        onRemove={() => handleRemove(i)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <DeficiencyAlert totals={totals} />
            </div>

        
            <div style={{
              background:   '#171b26',
              border:       '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding:      20,
            }}>
              <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 18, fontWeight: 700 }}>
                今日の栄養素（DRI比較）
              </div>
              {nutrientKeys.map((k) => (
                <NutrientBar
                  key={k}
                  label={NUTRIENT_LABELS[k]}
                  value={totals[k] ?? 0}
                  max={DRI[k]}
                  unit={NUTRIENT_UNITS[k]}
                  color={COLORS[k]}
                />
              ))}
              <div style={{
                marginTop:      20,
                paddingTop:     16,
                borderTop:      '1px solid rgba(255,255,255,0.07)',
                display:        'flex',
                justifyContent: 'space-between',
                alignItems:     'center',
              }}>
                <span style={{ fontSize: 11, color: '#6b7280' }}>合計カロリー</span>
                <div>
                  <span style={{ fontSize: 22, fontWeight: 700, color: '#f9a84d' }}>
                    {(totals.calories ?? 0).toFixed(0)}
                  </span>
                  <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 3 }}>
                    / {DRI.calories} kcal
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
              {nutrientKeys.map(k => (
                <StatCard
                  key={k}
                  label={NUTRIENT_LABELS[k]}
                  value={totals[k] ?? 0}
                  max={DRI[k]}
                  unit={NUTRIENT_UNITS[k]}
                  color={COLORS[k]}
                />
              ))}
            </div>

            <AchievementChart totals={totals} colors={COLORS} />

            <CalorieBreakDown records={records} />
          </div>
        )}
      </div>
    </div>
  );
}