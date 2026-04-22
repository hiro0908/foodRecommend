type Props={
    label:string;
    value:number;
    max:number;
    unit:string;
    color:string;
};

function MiniRing({value,max,color,size=52}:{
    value: number;
    max:number;
    color:string;
    size? :number;
}){
    const pct=Math.min(value/max,1);
    const r=(size-6)/2;
    const circ=2*Math.PI*r;
    const dash=circ*pct;
    return (
        <svg
            width={size}
            height={size}
            style={{transform:"rotate(-90deg)"}}
        >
            <circle
                cx={size/2}
                cy={size/2}
                r={r}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={4}
            />
            <circle
                cx={size/2}
                cy={size/2}
                r={r}
                fill="none"
                stroke={color}
                strokeWidth={4}
                strokeDasharray={`${dash} ${circ}`}
                strokeLinecap="round"
                style={{transition:"stroke-dasharray .6s cubic-bezier(.22,1.36,1)"}}
            />
        </svg>
    );
}

export function StatCard({label,value,max,unit,color}:Props){
    const pct = Math.min(Math.round((value/max)*100),100);
    return (
        <div style={{
            background:"#171b26",
            borderRadius:14,
            padding:16,
            display:"flex",
            alignItems:"center",
            gap:14,
        }}>
            <div style={{position:"relative",flexShrink:0}}>
                <MiniRing value={value} max={max} color={color}/>
                <div style={{
                    position:"absolute",
                    inset:0,
                    display:"flex",
                    alignItems:"center",
                    justifyContent:"center",
                    fontSize:10,
                    color,
                    }}>
                    {pct}%
                </div>
            </div>
            <div>
                <div style={{fontSize:11,color:"#6b7280",marginBottom:2}}>
                    {label}
                </div>
                <div style={{fontSize:15,fontWeight:700}}>
                    {value.toFixed(value<10?1:0)}
                    <span style={{fontSize:10,fontWeight:400,color:"#6b7280",marginLeft:2}}>
                        {unit}
                    </span>
                </div>
            </div>
        </div>
    );
}