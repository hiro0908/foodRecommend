import { CATEGORY_COLORS} from "@/lib/dri/standards";
import type {FoodItem} from "@/lib/types";

type Props = {
    food: FoodItem;
    qty: number;
    onRemove: ()=>void;
}
export function FoodTag({food,qty,onRemove}:Props){
    const color = CATEGORY_COLORS[food.category]??"#888";
    return (
    <div style={{
      display:      'inline-flex',
      alignItems:   'center',
      gap:          6,
      background:   '#1e2333',
      border:       `1px solid ${color}33`,  
      borderRadius: 8,                       
      padding:      '5px 10px',
      fontSize:     12,
    }}>
      <span style={{
        width:        6,
        height:       6,
        borderRadius: '50%',
        background:   color,  
        flexShrink:   0,
      }}/>
            <span style={{color:"#e8eaf0"}}>
                {food.name}
            </span>
            {qty!=1&&(
                <span style={{ color: '#6b7280', fontFamily: 'monospace'}}>
                    ✖{qty}
                </span>
            )}
            <button
                onClick={onRemove} 
                style={{
                    background:"none",
                    border:"none",
                    color:"#6b7280",
                    cursor:"pointer",
                    fontSize:13,
                    lineHeight:1,
                    padding:1,
                    transition:'color .15s',
                }}
                onMouseOver = {e=>e.currentTarget.style.color="#ff6b6b"}
                onMouseOut  = {e=>e.currentTarget.style.color="#6b7280"}
            >
                ✖
            </button>
        </div>
    );
};