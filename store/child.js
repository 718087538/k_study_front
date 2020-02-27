export const state = () =>({
    price:10,   //单价
});
export const mutations = {
    getPrice(state,price) {  
        state.price= price
    }
};