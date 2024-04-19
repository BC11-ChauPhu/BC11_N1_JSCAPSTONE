let showProductPreview = (products) => {
    console.log(products)
    let content = ''
    let key = 0
    products.slice(0, 3).map(function (product, index) {
        // console.log(product.description)
        content += `
        <div id="carousel-item-${key + index}" class="carousel-item">
            <div class="inner-content">
                <div class="carousel-img-wrapper">
                    <img src=${product.image}>
                </div>
                <div class="carousel-description d-block w-50">
                    <h5>${product.name}</h5>
                    <p>'${product.description}'</p>
                    <div class="carousel-price">
                        <button class="buyButtonInverted d-inline-flex">             
                            <a href="./assets/sass/pages/Interface/ProductDetail.html">
                                <i class="fa-solid fa-cart-shopping"></i>
                                Buy Now
                            </a>
                        </button>
                        <span><i class="fa-solid fa-tag" aria-hidden="true"></i> $${product.price}</span>
                    </div>
                    
                </div>
            </div>
        </div>
        `


        getElement('.carousel-inner').innerHTML = content
        getElement('#carousel-item-0').classList = 'carousel-item active'
    })
}

let showProductFeatures = (products) => {
    let content = ''
    products.map(function (product) {
        content += `
        <div class="featured-item col-4">
            <img src=${product.image} alt="">
            <div class="featured-text">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <div class="price d-flex justify-content-between align-items-center">
                    <button class="buyButtonInverted d-inline-flex align-items-center">
                        <i class="fa-solid fa-cart-shopping mr-2"></i>
                        Buy Now
                    </button>
                    <span><i class="fa-solid fa-tag" aria-hidden="true"></i> $${product.price}</span>
                </div>
            </div>
        </div>
        `
    })

    getElement('#catalouge-item').innerHTML = content

}

let getProduct = () => {
    let objAxios = axios({
        meothod: 'get',
        url: 'https://shop.cyberlearn.vn/api/Product'
    })
    objAxios.then(function (result) {
        // console.log(result.data.content)
        showProductPreview(result.data.content)
        showProductFeatures(result.data.content)
    }).catch(function (error) {
        console.log(error)
    })

}

getProduct()

