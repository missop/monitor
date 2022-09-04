import {v4} from "uuid";

/**
 * 实现与平台无关的方法
 * id的生成
 * 生命周期的处理
 */


export default class Core {
    event_id!:string; // 每次上报的id
    pvid!:string;  // 用来记录pv，这个也可以用来记录用户访问路径
    uvid!:string;  // 用来记录uv

    generateEventId():void{
        this.event_id = v4()
    }

    generatePvId(): void {
        
    }

    generateUvId(): void {
        
    }

    beforeSend(): boolean {
        return true
    }

    afterSend(): void {
        
    }

}