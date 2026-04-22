type Props = {
    date?:Date;
};

export function Header({date = new Date()}: Props){
    const formatted = date.toLocaleDateString("ja-JP",{
        month: "long",
        day: "numeric",
        weekday: "short",
    }); 


    return(
        <header style={{
                borderBottom:   "1px solid rgba(255,255,255,0.07)",
                padding:        "0 24px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                height:         56,
                background:     "black",
        }}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{
                    width:28,
                    height:28,
                    borderRadius:8,
                    background:'linear-gradient(135deg,#7eeaa0,#5b8fff)',
                    display:"flex",
                    alignItems:"flex",
                    justifyContent:"center",
                    fontSize:    14,
                }}>

                </div>
                <span style = {{ fontWeight: 900,fontSize: 15}}>栄養評価アプリべーた</span>
                <span style = {{
                    fontSize: 9,
                    padding: "2px 7px",
                    borderRadius: 4,
                    background:"rgba((126,234,160,0.15))",
                    color: '#7eeaa0',
                }}>

                </span>
            </div>
            <div style={{ fontSize:12,color:'#6b7280'}}>
                {formatted}
            </div>
        </header>
    )
};