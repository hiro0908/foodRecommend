'use client';

import { useState }        from 'react';
import {
  MEAL_PRESETS,
  MEAL_CATEGORIES,
  PORTION_SIZES,
  type MealCategory,
  type PortionSize,
} from '@/lib/meal-presets';
import type { FoodItem } from '@/lib/types';

type Props = {
  onAdd: (food: FoodItem, qty: number) => void;
};

export function MealForm({ onAdd }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<MealCategory | null>(null);

  // カテゴリボタンのアイコン
  const CATEGORY_ICONS: Record<MealCategory, string> = {
    'ごはん': '🍚',
    'パン':   '🍞',
    '麺':     '🍜',
    '肉':     '🍗',
    '魚':     '🐟',
  };

  // 量のボタンを押したらそのまま記録
  function handlePortionSelect(portion: PortionSize) {
    if (!selectedCategory) return;
    const food = MEAL_PRESETS[selectedCategory][portion];
    onAdd(food, 1);
    setSelectedCategory(null);
  }

  return (
    <div style={{
      background:   '#171b26',
      border:       '1px solid rgba(255,255,255,0.07)',
      borderRadius: 14,
      padding:      20,
    }}>
      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 12, fontWeight: 700 }}>
        食品を追加
      </div>

      {/* カテゴリボタン */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 8 }}>
          種類を選択
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {MEAL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
              style={{
                padding:      '8px 16px',
                borderRadius: 8,
                border:       `1px solid ${selectedCategory === category
                  ? 'rgba(126,234,160,0.5)'
                  : 'rgba(255,255,255,0.07)'}`,
                background:   selectedCategory === category
                  ? 'rgba(126,234,160,0.15)'
                  : '#1e2333',
                color:        selectedCategory === category ? '#7eeaa0' : '#e8eaf0',
                fontSize:     13,
                fontWeight:   selectedCategory === category ? 700 : 400,
                cursor:       'pointer',
                transition:   'all .2s',
              }}
            >
              {CATEGORY_ICONS[category]} {category}
            </button>
          ))}
        </div>
      </div>

      {/* 量のボタン（カテゴリ選択後に表示） */}
      {selectedCategory && (
        <div>
          <div style={{ fontSize: 10, color: '#6b7280', marginBottom: 8 }}>
            {selectedCategory} の量を選択
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {PORTION_SIZES.map(portion => {
              const food = MEAL_PRESETS[selectedCategory][portion];
              return (
                <button
                  key={portion}
                  onClick={() => handlePortionSelect(portion)}
                  style={{
                    flex:         1,
                    padding:      '10px 8px',
                    borderRadius: 8,
                    border:       '1px solid rgba(255,255,255,0.07)',
                    background:   '#1e2333',
                    color:        '#e8eaf0',
                    fontSize:     12,
                    cursor:       'pointer',
                    transition:   'all .2s',
                    textAlign:    'center',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.border    = '1px solid rgba(126,234,160,0.5)';
                    e.currentTarget.style.background = 'rgba(126,234,160,0.1)';
                    e.currentTarget.style.color      = '#7eeaa0';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.border    = '1px solid rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = '#1e2333';
                    e.currentTarget.style.color      = '#e8eaf0';
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>
                    {portion}
                  </div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>
                    {food.calories}kcal
                  </div>
                  <div style={{ fontSize: 10, color: '#6b7280' }}>
                    {food.selectSize}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}