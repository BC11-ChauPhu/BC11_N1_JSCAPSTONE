// let getElement = (selector) => {
//     return document.querySelector(selector);
// }

let getProduct = () => {
    let objAxios = axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product'
    })
    objAxios.then(function(result){
        console.log(result)
    }).catch(function(error){
        console.log(error)
    })
}

getProduct()