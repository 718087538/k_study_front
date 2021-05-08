const onlineIP = "http://127.0.0.1:8080"


//全局变量
let lipeng = "";
if (process.server) {
    console.log("走了服务器端应用>>>>>>>>")
    // 服务端不用走本地代理
    lipeng = process.env.NODE_ENV === "development" ? onlineIP : "http://127.0.0.1:8080";
    // lipeng = process.env.NODE_ENV === "development" ? onlineIP + "/admin" : "http://127.0.0.1:8080";
}

if (process.client) {
    //客户端走本地代理
    // lipeng = process.env.NODE_ENV === "development" ? onlineIP + "/client" : "/test";
    lipeng = process.env.NODE_ENV === "development" ? onlineIP: "/test";
}

export default {
    lipeng
}