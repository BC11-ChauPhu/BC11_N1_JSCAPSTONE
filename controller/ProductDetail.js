let products = []

let pushProducts = (data) => {
    products.push(...data)
}


let getProduct = () => {
    let objAxios = axios({
        method: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product'
    })
    objAxios.then(function (result) {
        showProductFeatures(result.data.content)
        pushProducts(result.data.content)
    }).catch(function (error) {
        console.log(error)
    })
}

getProduct()

let showProductFeatures = (products) => {
    let content = ''
    products.slice(8, 11).map(function (product) {
        content += `
        <div class="item">
            <div class="item-inner">
                <div class="item-img">
                    <a href="#">
                        <img src=${product.image}>
                    </a>
                </div>
                <div class="item-body">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="price mt-2">
                        <span><i class="fa-solid fa-tag" aria-hidden="true"></i>$${product.price}</span>
                        <button class="buyButtonInverted" type="button" data-id="${product.id}">
                            <i class="fa-solid fa-cart-plus" aria-hidden="true"></i>
                            Buy Now
                        </button>
                    </div>
                </div>
        </div>
    </div>
        `
    })

    getElement('#catalouge-item').innerHTML = content
}

