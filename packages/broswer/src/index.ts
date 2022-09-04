import Core from "../../core/src";
import UserMonitor from "./integrations/user";

// 参数结构
interface Options {

}
// 服务于 Web 的SDK，继承了 Core 上的与平台无关方法;
export class WebSdk extends Core {
   public userMonitor!:UserMonitor;

   constructor(options:Options){
    super();
    this.userMonitor  = new UserMonitor(this,options)
   }

   // 处理options
   public initOptions = (options:Options) => {

   }

   // 实现上报的具体方法
   // 这里我们采用sendBeacon(post) + ajax(get)
   public transport = () => {
      
   }
}
  
  export default WebSdk;