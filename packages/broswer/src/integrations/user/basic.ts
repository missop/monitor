export interface PageInformation {
    host: string;
    hostname: string;
    href: string;
    protocol: string;
    origin: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    // CPU核数
    hardwareConcurrency:number;
    // 内存
    deviceMemory:number;
    // 网页标题
    title: string;
    // 浏览器的语种 (eg:zh) ; 这里截取前两位，有需要也可以不截取
    language: string;
    // 用户 userAgent 信息
    userAgent?: string;
    // 屏幕宽高 (eg:1920x1080)  屏幕宽高意为整个显示屏的宽高
    winScreen: string;
    // 文档宽高 (eg:1388x937)   文档宽高意为当前页面显示的实际宽高（有的同学喜欢半屏显示）
    docScreen: string;
  }
// 收集基本信息
export const getPageInfo = (): PageInformation => {
    const { host, hostname, href, protocol, origin, port, pathname, search, hash } = window.location;
    const { width, height } = window.screen;
    const { language, userAgent,hardwareConcurrency } = navigator;
  
    return {
    hardwareConcurrency,
    deviceMemory:(navigator as any).deviceMemory,
      host,
      hostname,
      href,
      protocol,
      origin,
      port,
      pathname,
      search,
      hash,
      title: document.title,
      language: language.substr(0, 2),
      userAgent,
      winScreen: `${width}x${height}`,
      docScreen: `${document.documentElement.clientWidth || document.body.clientWidth}x${
        document.documentElement.clientHeight || document.body.clientHeight
      }`,
    };
  };

export const getExtends = (): { pageUrl: string; timestamp: number | string } => {
    return {
        pageUrl: getPageInfo().pathname,
        timestamp: new Date().getTime(),
    };
};