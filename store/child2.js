export const state = () =>({
    num:5,
});
export const mutations = {
    getNum(state,num) {  //数量
        state.num= num
    }
};