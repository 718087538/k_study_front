import request from '@/plugins/request';
import proxy from '@/utils/proxy';

export function clientCategory(params){
    return new Promise(resolve=>{
        request({
            url:proxy.lipeng+`/category`,
            method:"GET",
            params:params
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


export function videoCourse(){
  return new Promise(resolve=>{
      request({
          url:proxy.lipeng+`/videoCourse`,
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