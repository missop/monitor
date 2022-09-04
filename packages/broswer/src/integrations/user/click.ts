import { getExtends } from "./basic";
import { behaviorTypes } from "./constants";
import { BehaviorStore } from "./store";

// 监听用户点击行为
// 点击行为需要判断点击的哪个元素
const handler = (e:MouseEvent,breadcrumbs:BehaviorStore) => {
    if(e.target){
        //    先把所有元素的点击行为我们全部上报，后面再考虑黑名单
        const target = e.target as HTMLElement
        breadcrumbs.push({
            type:behaviorTypes.click,
            ...getExtends(),
            value:{
                id:target.id,
                classList:target.classList,
                tagName:target.tagName,
                text:target.textContent
            }
        });
    }
   
}

/**
 * 
 * @param elementList 需要监听点击事件的元素
 */
export const clickHandler = (breadcrumbs:BehaviorStore):void => {
    window.addEventListener('click',e=>{
        handler(e,breadcrumbs)
    })
}