import request from '@/plugins/request';
import proxy from '@/utils/proxy';

export function test(){
//用户名验重  false为不重复  true为重复  测试接口
    console.log(">>>>>>>>>>>>>",proxy.lipeng)

    return new Promise(resolve=>{
        request({
            url:proxy.lipeng+`/videoCourse`,
            // url:proxy.lipeng+`/admin/videoCourse`,
            method:"GET",
            params:null
        }).then(res=>{
            if(res.data.code==200){
                resolve(res.data.data)
            }else{
                console.error(res.data.message);
            }
        }).catch(err=>{
            console.error(err);
        })
    });
}