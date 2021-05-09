import request from '@/plugins/request';
import proxy from '@/utils/proxy';
//获得课程章节和详情
export function getCourseInfo(params) {
    return new Promise(resolve => {
        request({
            url: proxy.lipeng + `/client/courseInfo`, method: "GET", params
        }).then(res => {
            resolve(res.data.data)
        })
    });
}

//获得课程的列表
export function videoCourse(params) {
    return new Promise(resolve => {
        request({
            url: proxy.lipeng + `/client/videoCourse`, method: "GET", params
        }).then(res => {
            resolve(res.data.data)
        })
    });
}


export function clientCategory(params) {
    return new Promise(resolve => {
        request({
            url: proxy.lipeng + `/client/category`,
            method: "GET",
            params: params
        }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.data)
            } else {
                console.error(res.data.message);
            }
        }).catch(err => {
            console.error(err);
        })
    });
}


export function indexCategory() {
    return new Promise(resolve => {
        request({
            url: proxy.lipeng + `/client/indexCategory`,
            method: "GET",
            params: null
        }).then(res => {
            if (res.data.code == 200) {
                resolve(res.data.data)
                //   resolve(res.data.data)
            } else {
                console.error(res.data.message);
            }
        }).catch(err => {
            console.error(err);
        })
    });
}