let getElement = (selector) => {
    return document.querySelector(selector);
}

// popup start
const showPopuoBtn = document.querySelector(".login-btn");
const hidePopuoBtn = document.querySelector(".form-popup .close-btn");
const formPopup = document.querySelector(".form-popup");



const loginSingupLink = document.querySelectorAll(".form-box .bottom-link a");

// show form popup
showPopuoBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup");
})


// hide form popup
hidePopuoBtn.addEventListener("click", () => {
    showPopuoBtn.click()
})


loginSingupLink.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        // console.log(link.id);
        // nếu id  = signup-link sẽ thêm show-signup và ngược lại
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup");
    })
})

// show - hide pass

const eyeIconList = document.querySelectorAll('.fa-eye');
const passwordList = document.querySelectorAll('.pass');
// console.log(eyeIconList, passwordList);
for (let i = 0; i < eyeIconList.length; i++) {
    eyeIconList[i].addEventListener("click", () => {
        if (passwordList[i].type === "password") {
            passwordList[i].type = "text";
            eyeIconList[i].classList.replace("fa-eye", "fa-eye-slash");
            eyeIconList[i].style.color = "#00bcd4";
        } else {
            passwordList[i].type = "password";
            eyeIconList[i].classList.replace("fa-eye-slash", "fa-eye");
            eyeIconList[i].style.color = "#717171";
        }
    })
}


function setLocalStorage(info) {
    //*luu mang sinh vien xuong  localstorage
    //localstorage: object co san cua js, setItem("ten localStorage", chuoi JSON): phuong thhuc luu xuong cola
    // chuyen tu array object => jons => stringify
    localStorage.setItem("info", JSON.stringify(info));
}


// Validation
class Validation {

    //* Kiểm tra rỗng
    kiemTraRong = function (value, idSpan, message) {
        if (value !== "") {
            //hop le
            document.querySelector(idSpan).innerHTML = "";
            document.querySelector(idSpan).style.display = "none";
            return true;
        }

        //khong hop le
        document.querySelector(idSpan).innerHTML = message;
        document.querySelector(idSpan).style.display = "block";
        return false;
    }

    //* kiem tra dinh dang email
    kiemTraEmail = function (value, idSpan, message) {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(pattern)) {
            //* hop le
            document.querySelector(idSpan).innerHTML = "";
            document.querySelector(idSpan).style.display = "none";
            return true;
        }
        //! khong hop le
        document.querySelector(idSpan).innerHTML = message;
        document.querySelector(idSpan).style.display = "block";
        return false;
    }
}

const validation = new Validation();


function loginAccount() {
    let loginEmail = document.querySelector("#emailLogin").value;
    let loginPass = document.querySelector("#passLogin").value;


    // console.log(loginEmail, loginPass);

    let isValid = true;

    // kiểm tra email
    isValid &= validation.kiemTraRong(loginEmail, "#spanEmailLogin", "Chưa nhập Email!") && validation.kiemTraEmail(loginEmail, "#spanEmailLogin", "Email sai dinh dang");

    // kiểm tra password
    isValid &= validation.kiemTraRong(loginPass, "#spanPassLogin", "Chưa nhập Password!");




    if (isValid) {
        let objPromise = axios({
            method: 'post',
            url: 'https://shop.cyberlearn.vn/api/Users/signin',
            data: {
                "email": loginEmail,
                "password": loginPass,
            }
        })

        // console.log("obj", objPromise);

        objPromise.then(function (response) {
            document.body.classList.remove('show-popup');
            document.querySelector("#emailLogin").value = "";
            document.querySelector("#passLogin").value = "";
            setLocalStorage(response.data);
            alert("Thành công đăng nhập")
            console.log("OK", response);
        }).catch(function (error) {
            alert(error.message)
        });


    }
}

function signupAccount() {
    let emailSignup = document.querySelector("#emailSignup").value;
    let passSignup = document.querySelector("#passSignup").value;
    let passConfirm = document.querySelector("#passConfirm").value
    let nameSignup = document.querySelector("#nameSignup").value
    let phoneSignup = document.querySelector("#phoneSignup").value

    // Lấy tất cả các input radio có cùng tên
    const radioButtons = document.getElementsByName('options');

    let selectedValue

    // Duyệt qua từng input radio để kiểm tra xem input nào đã được chọn
    radioButtons.forEach(radioButton => {
        if (radioButton.checked) {
            // Nếu input này đã được chọn, lấy giá trị của nó và gán vào biến selectedValue
            selectedValue = radioButton.value;
        }
    });
    let gender = selectedValue === "male" ? true : false;


    // console.table(emailSignup, passSignup, passConfirm, nameSignup, phoneSignup, gender)



    let isValid = true;

    // kiểm tra email
    isValid &= validation.kiemTraRong(emailSignup, "#spanEmailSigup", "Chưa nhập Email!") && validation.kiemTraEmail(emailSignup, "#spanEmailSigup", "Email sai dinh dang");


    // kiểm tra password
    isValid &= validation.kiemTraRong(passSignup, "#spanPasslSigup", "Chưa nhập Password!");

    //kiểm tra passcofirm
    isValid &= validation.kiemTraRong(passConfirm, "#spanPassConfirmSigup", "Chưa nhập Password Confirm!");

    //kiểm tra  name
    isValid &= validation.kiemTraRong(nameSignup, "#spanNameSigup", "Chưa nhập Name!");


    isValid &= validation.kiemTraRong(phoneSignup, "#spanPhoneSigup", "Chưa nhập Phone!");



    if (isValid) {
        // Perform login action here
        // Send a POST request
        let objPromise = axios({
            method: 'post',
            url: 'https://shop.cyberlearn.vn/api/Users/signup',
            data: {
                "email": emailSignup,
                "password": passSignup,
                "name": nameSignup,
                "gender": gender,
                "phone": phoneSignup,
            }
        })

        // console.log("obj", objPromise);

        objPromise.then(function (response) {
            alert("Thành công đăng nhập")
            console.log("OK", response);
        }).catch(function (error) {
            alert(error.message)
            alert("Thất bại")
        });


    }


}
// popup end