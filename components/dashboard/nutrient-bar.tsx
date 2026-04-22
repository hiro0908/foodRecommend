type Props = {
    label:string;
    value:number;
    max:number;
    unit:string;
    color:string;
}

export function NutrientBar({label,value,max,unit,color}:Props){
    const pct = Math.min((value/max)*100,100);//進捗
    const over = value > max;
    const barColor = over ? '#ff6b6b' : color;
    return (
        <div style={{marginBottom : 14}}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 5,
                alignItems: "baseline"
            }}>
                <span style={{fontSize: 12, color: '#6b7280'}}>
                    {label}
                </span>
                <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                    <span style={{
                        fontSize:13,
                        color: over?'#ff6b6b' : '#e8eaf0',
                        fontWeight:500,
                    }}>
                        {value.toFixed(1)}
                    </span>
                    <span style={{fontSize:10,color:'#6b7280' }}>
                        / {max}{unit}
                    </span>
                </div>
            </div>
            <div style={{
                height:5,
                background:'rgba(255,255,255,0.06)',
                borderRadius:99,
                overflow:"hidden",
                }}>
                <div style={{
                    height:"100%",
                    width: `${pct}%`,
                    background: barColor,
                    borderRadius:99,
                    transition:'width .6s cubic-bezier(.22,1,.36,1)',
                    boxShadow:`0 0 8px ${barColor}88`,
                }}/>
            </div>
            {over &&(
                <div style={{fontSize:10,color:'#ff6b6b',marginTop:3,textAlign:"right"}}>
                    +{(value-max).toFixed(1)}{unit}超過
                </div>
            )}
        </div>
    );
}