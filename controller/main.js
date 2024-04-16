let getElement = (selector) => {
    return document.querySelector(selector);
}

getElement('.closeButton').onclick = function () {
    if (getElement('#login').classList == 'd-block') {
        getElement('#login').classList = 'd-none'
    } else {
        getElement('#login').classList = 'd-block'
    }
}

getElement('.user').onclick = function () {
    if (getElement('#login').classList == 'd-none') {
        getElement('#login').classList = 'd-block'
    }
}