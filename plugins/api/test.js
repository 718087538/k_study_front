import request from '@/plugins/request';
import proxy from '@/utils/proxy';

export function test(){
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