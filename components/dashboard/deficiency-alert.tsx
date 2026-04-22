import { DRI, NUTRIENT_LABELS } from '@/lib/dri/standards';
import type { NutrientKey } from '@/lib/types';

type Totals = Record<NutrientKey, number>;

type Props = {
  totals: Totals;
};

export function DeficiencyAlert({ totals }: Props) {
  // DRI基準値の70%未満の栄養素を抽出
  const deficient = (Object.keys(DRI) as NutrientKey[]).filter(
    key => (totals[key] ?? 0) < DRI[key] * 0.7
  );

  // 全栄養素が70%以上なら良好メッセージを表示
  if (deficient.length === 0) {
    return (
      <div style={{
        background:   'rgba(126,234,160,0.08)',
        border:       '1px solid rgba(126,234,160,0.2)',
        borderRadius: 10,
        padding:      '12px 16px',
        display:      'flex',
        alignItems:   'center',
        gap:          10,
        fontSize:     13,
      }}>
        <span style={{ fontSize: 18 }}>✓</span>
        <span style={{ color: '#7eeaa0' }}>
          今日の栄養バランスは良好です
        </span>
      </div>
    );
  }

  // 不足している栄養素を一覧表示
  return (
    <div style={{
      background:   'rgba(255,107,107,0.07)',
      border:       '1px solid rgba(255,107,107,0.2)',
      borderRadius: 10,
      padding:      '12px 16px',
      fontSize:     13,
    }}>
      {/* タイトル */}
      <div style={{ color: '#ff6b6b', marginBottom: 8, fontWeight: 700 }}>
        不足している栄養素
      </div>

      {/* 不足栄養素のタグ一覧 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {deficient.map(key => {
          const pct = Math.round(((totals[key] ?? 0) / DRI[key]) * 100);
          return (
            <div key={key} style={{
              background:   'rgba(255,107,107,0.12)',
              border:       '1px solid rgba(255,107,107,0.25)',
              borderRadius: 6,
              padding:      '3px 10px',
              color:        '#ffaaaa',
              fontSize:     12,
            }}>
              {NUTRIENT_LABELS[key]}
              <span style={{ opacity: 0.7, marginLeft: 4 }}>
                {pct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}