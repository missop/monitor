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


import {init} from '@sentry/browser'

class WebSdk {
  constructor(options){
    init({
      // 如果不填dsn的话不执行beforeSend，beforeBreadcrumb
      dsn:'https://examplePublicKey@o0.ingest.sentry.io/0',
      beforeSend(ev,it){
        console.log("beforeSend",ev,it)
        const blob = new Blob([JSON.stringify(ev)],{type:'application/json; charset=UTF-8'})
    
        // navigator.sendBeacon('http://localhost:3000/api',blob)
      },
      beforeBreadcrumb(b,h){
        console.log("beforeBreadcrumb",b,h)
      }
    })
  }
}
