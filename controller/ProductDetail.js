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
        pushProducts(result.data.content)
        // showProductDetail(result.data.content)
        // showSimilarProducts(result.data.content)
    }).catch(function (error) {
        console.log(error)
    })
}

getProduct()

const urlParams = new URLSearchParams(window.location.search)
const myParam = urlParams.get('productid')

let getProductDetail = () => {
    let objAxios = axios({
        method: 'get',
        url: `https://shop.cyberlearn.vn/api/Product/getbyid?id=${myParam}`
    })
    objAxios.then(function (result) {
        showProductDetail(result.data.content)
    })
}

getProductDetail()

let showProductDetail = (products) => {
    let productSize = ''

    products.size.map(function (size) {
        productSize += `
        <li>
            <a class="d-inline" href="#">${size}</a>
        </li>
        `
    })

    let content = ''
    content += `
        <div class="product-header">
            <h2>${products.name}</h2>
        </div>
        <div class="product-body">
            <div class="detailed-body d-flex align-content-center">
                <div class="img-wrapper">
                    <div class="detail-body-img">
                        <img src=${products.image}>
                    </div>
                </div>

                <div class="detail-body-text">
                    <p>
                        ${products.description}
                    </p>
                    <p class="price">
                        <span>
                            <i class="fa-solid fa-tag"></i>
                            $${products.price}
                        </span>
                    </p>
                    <h2>Available Sizes</h2>
                    <ul class="detail-body-sizes">
                        
                    </ul>
                    <div class="detail-body-number">
                        
                        <div class="detail-body-number-cart">
                            <button class="buyButtonInverted" type="button" data-id = ${products.id}>
                                <i class="fa-solid fa-cart-plus"></i>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    getElement('.product-details-inner').innerHTML = content
    getElement('.detail-body-sizes').innerHTML = productSize

    let similarProducts = ''
    console.log(products.relatedProducts)
    products.relatedProducts.map(function (product) {
        similarProducts += `
        <div class="item">
            <div class="item-inner">
                <div class="item-img">
                    <a href="./ProductDetail.html?productid=${product.id}">
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

    getElement('#catalouge-item').innerHTML = similarProducts
}



