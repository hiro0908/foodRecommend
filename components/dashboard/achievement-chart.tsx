import {DRI,NUTRIENT_LABELS} from "@/lib/dri/standards";
import type { NutrientKey } from "@/lib/types";

type Totals=Record<NutrientKey,number>
type Props={
    totals:Totals;
    colors:Record<NutrientKey,string>
};

export function AchievementChart({totals,colors}:Props){
    const keys=Object.keys(DRI)as NutrientKey[];
    return (
        <div style={{
            background:"#171b26",
            border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:14,
            padding:24,
        }}>
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {keys.map(key=>{
                    const pct = Math.min(Math.round(((totals[key]??0)/DRI[key])*100),150);
                    const over=pct>100;
                    const color = over?'#ff6b6b' : colors[key];

                    return(
                        <div key={key} style={{display:"flex",alignItems:"center",gap:12}}>
                            <div style={{
                                width:72,
                                fontSize:11,
                                color:"#6b7280",
                                textAlign:"right",
                                flexShrink:0,
                            }}>
                                {NUTRIENT_LABELS[key]}
                            </div>
                            <div style={{
                                flex:1,
                                height:20,
                                background:"rgba(255,255,255,0.04)",
                                borderRadius:4,
                                position:"relative",
                                overflow:"hidden",
                            }}>
                                <div style={{
                                    position:"absolute",
                                    left:0,
                                    top:0,
                                    bottom:0,
                                    width:"${(pct/150)*100}%",
                                    background:color,
                                    borderRadius:4,
                                    transition:"width .8s cubic-bezier(.22,1,36,1)",
                                    boxShadow:"0 0 10px ${color}66",
                                }}/>
                                <div style={{
                                    position:"absolute",
                                    left:"${(100 / 150) * 100}%",
                                    top:0,
                                    bottom:0,
                                    width:1,
                                    background:"rgba(255,255,255,0.2)",
                                }}/>
                            </div>
                            <div style={{
                                width:44,
                                textAlign:"right",
                                fontSize:12,
                                color:over?"#ff6b6b"
                                    :pct>=70?"#7eeaa0"
                                    :"#f9a84d",
                                flexShrink:0,
                            }}>
                                {pct}%
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{
                marginTop:16,
                paddingTop:12,
                borderTop:"1px solid rgba(255,255,255,0.07)",
                display:"flex",
                gap:16,
                fontSize:10,
                color:"#6b7280",
            }}>
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    gap:4
                }}>
                    <div style={{width:10,
                        height:3,
                        background:"rgba(255,255,255,0.2)",
                        borderRadius:1
                    }}>
                        100%
                    </div>
                </div>
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    gap:4
                }}>
                    <div style={{
                        width:10,
                        height:3,
                        background:"#ff6b6b",
                        borderRadius:1
                    }}>
                        超過
                    </div>
                </div>
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    gap:4
                }}>
                    <div style={{
                        width:10,
                        height:3,
                        background:"#f9a84d",
                        borderRadius:1
                    }}>
                        70%以上
                    </div>
                </div>
                <div style={{
                    display:"flex",
                    alignItems:"center",
                    gap:4
                }}>
                    <div style={{
                        width:10,
                        height:3,
                        background:"#f9a84d",
                        borderRadius:1
                    }}>
                        70%未満
                    </div>
                </div>
            </div>
        </div>
    );
}