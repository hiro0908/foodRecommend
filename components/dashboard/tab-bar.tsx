'use client';
type Tab="record"|"stats";

type Props = {
    activeTab: Tab,
    onTabChange: (tab: Tab)=>void;
};

export function TabBar({activeTab,onTabChange}: Props){
    const tabs: {id:Tab;label:string}[]=[
        {id:"record",label:"食事記録"},
        {id:"stats",label:"栄養分析"},
    ];
    return (
        <div style={{
            display:"flex",
            gap:2,
            background:'#171b26',
            borderRadius:10,
            padding:4,
            border:'1px solid rgba(255,255,255,0.07)',
            width:'fit-content',
        }}>
            {tabs.map(tab=>(
                <button
                    key={tab.id}
                    onClick={()=>onTabChange(tab.id)}
                    style={{
                        padding:'6px 18px',
                        borderRadius:7,
                        border:"none",
                        cursor:"pointer",
                        fontSize:12,
                        fontWeight:700,
                        background:activeTab === tab.id ? '#7eeaa0' : 'transparent',
                        color:activeTab === tab.id ? '#0f1117'  : '#6b7280',
                        transition:'all .2s',
                    }}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}