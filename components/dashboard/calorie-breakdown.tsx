import { CATEGORY_COLORS } from "@/lib/dri/standards";
import type { FoodItem } from "@/lib/types";

type MealRecord={
    food:FoodItem;
    qty:number;
};
type Props={
    records:MealRecord[];
};
export function CalorieBreakDown({records}:Props){
    const totalCalories = records.reduce(
        (sum,r)=>sum+r.food.calories*r.qty,0
    );
    return (
        <div style={{
            background:"#171b26",
            border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:14,
            padding:24,
        }}>
            <div style={{
                fontSize:11,
                color:"#6b7280",
                marginBottom:16,
                fontWeight:700,
            }}>
                {records.length===0?(
                    <div style={{
                        textAlign:"center",
                        color:"#6b7280",
                        fontSize:13,
                        padding:"16px 0"
                    }}>
                        食事の記録がありません
                    </div>
                    ):(
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        gap:10
                    }}>
                        {records.map((r,i)=>{
                            const cal=r.food.calories*r.qty;
                            const pct = totalCalories>0?(cal/totalCalories)*100:0;
                            const color = CATEGORY_COLORS[r.food.category]??"#888";
                            return (
                                <div key={i} style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:10,
                                }}>
                                    <div style={{
                                        width:6,
                                        height:6,
                                        borderRadius:"50%",
                                        background:color,
                                        flexShrink:0,
                                    }}/>
                                    <div style={{
                                        width:130,
                                        fontSize:12,
                                        overflow:"hidden",
                                        textOverflow:"elipsis",
                                        whiteSpace:"nowrap",
                                    }}>
                                        {r.food.name}
                                        {r.qty>1&&(
                                            <span style={{
                                                color:"#6b7280",
                                                fontSize:10,
                                                marginLeft:4
                                            }}>
                                                ×{r.qty}
                                            </span>
                                        )}
                                    </div>
                                    <div style={{
                                        flex:1,
                                        height:6,
                                        background:"rgba(255,255,255,0.04)",
                                        borderRadius:99,
                                        overflow:"hidden",
                                    }}>
                                        <div style={{
                                            height:"100%",
                                            width:`${pct}%`,
                                            background:color,
                                            borderRadius:99,
                                            transition:"width .6s cubic-bezier(.22,1,.36,1)",
                                        }}/>
                                    </div>

                                    <div style={{
                                        width:52,
                                        textAlign:"right",
                                        fontSize:11,
                                        color:"#6b7280",
                                    }}>
                                        {cal.toFixed(0)}kcal
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}