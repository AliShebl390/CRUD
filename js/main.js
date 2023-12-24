var productName = document.getElementById("productName");
let productAlert = document.querySelector(".nameAlert");
var productPrice = document.getElementById("productPrice");
let priceAlert = document.querySelector(".priceAlert");
var productCategory = document.getElementById("productCategory");
var productSale = document.getElementById("productSale");
var productDescription = document.getElementById("productDescription");
let descAlert = document.querySelector(".descAlert");
var products = [];
var lastData = null;
var searchValue = document.getElementById("searchvalue");
let sumAll = document.querySelector("#sumAll");
let sumDiv = document.querySelector(".sum");

if (localStorage.getItem("data") != null) {
    products = JSON.parse(localStorage.getItem("data"));
    display();
    displaySum();
}

function addProduct() {
    if (
        validateName() == true &&
        validateDesc() == true &&
        validateNumber() == true
    ) {
        var pro = {
            name: productName.value,
            price: Number(productPrice.value),
            category: productCategory.value,
            sale: productSale.checked,
            description: productDescription.value,
        };
        products.push(pro);
        localStorage.setItem("data", JSON.stringify(products));
        display();
        clearForm();
        displaySum();
    }
}

function display() {
    var res = ``;
    var saleValue = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].sale) {
            saleValue = "Yes";
        } else {
            saleValue = "No";
        }
        res +=
            `<tr>
        <td>` +
            (i + 1) +
            `</td>
        <td>` +
            products[i].name +
            `</td>
        <td>` +
            products[i].price +
            `</td>
        <td>` +
            products[i].category +
            `</td>
        <td>` +
            saleValue +
            `</td>
        <td>` +
            products[i].description +
            `</td>
        <td><button onclick="getDataToUpdate(` +
            i +
            `)" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="del(` +
            i +
            `)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`;
    }
    document.getElementById("data").innerHTML = res;
}

function del(i) {
    products.splice(i, 1);
    localStorage.setItem("data", JSON.stringify(products));
    display();
}

function clearForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productCategory").value = "tv";
    document.getElementById("productDescription").value = "";
    document.getElementById("productSale").checked = false;
    productName.classList.remove("is-valid");
    productName.classList.remove("is-invalid");
    productDescription.classList.remove("is-valid");
    productDescription.classList.remove("is-invalid");
    productPrice.classList.remove("is-valid");
    productPrice.classList.remove("is-invalid");
}

function getDataToUpdate(i) {
    lastData = i;

    productName.value = products[i].name;
    productPrice.value = products[i].price;
    productCategory.value = products[i].category;
    productSale.checked = products[i].sale;
    productDescription.value = products[i].description;
    document.getElementById("edit").classList.remove("d-none");
    document.getElementById("add").classList.add("d-none");
}

function editProduct() {
    var pro = {
        name: productName.value,
        price: Number(productPrice.value),
        category: productCategory.value,
        sale: productSale.checked,
        description: productDescription.value,
    };
    products[lastData] = pro;
    localStorage.setItem("data", JSON.stringify(products));
    document.getElementById("add").classList.remove("d-none");
    document.getElementById("edit").classList.add("d-none");
    display();
    clearForm();
}

function search() {
    var res = ``;
    var searchVal = searchValue.value.toLowerCase();
    var saleValue = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].sale) {
            saleValue = "Yes";
        } else {
            saleValue = "No";
        }
        if (
            products[i].name.toLowerCase().includes(searchVal) ||
            products[i].category.toLowerCase().includes(searchVal)
        )
            res +=
                `<tr>
            <td>` +
                (i + 1) +
                `</td>
            <td>` +
                products[i].name
                    .toLowerCase()
                    .replace(
                        searchVal,
                        "<span class='bg-info'>" + searchVal + "</span>"
                    ) +
                `</td>
            <td>` +
                products[i].price +
                `</td>
            <td>` +
                products[i].category
                    .toLowerCase()
                    .replace(
                        searchVal,
                        "<span class='bg-info'>" + searchVal + "</span>"
                    ) +
                `</td>
            <td>` +
                saleValue +
                `</td>
            <td>` +
                products[i].description +
                `</td>
            <td><button onclick="getDataToUpdate(` +
                i +
                `)" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="del(` +
                i +
                `)" class="btn btn-outline-danger">Delete</button></td>
        </tr>`;
    }
    document.getElementById("data").innerHTML = res;
}

function removeAll() {
    products = [];
    localStorage.setItem("data", JSON.stringify(products));
    display();
    displaySum();
}

productName.addEventListener("input", validateName);
function validateName() {
    let nameRegex = /^[a-zA-Z0-9\s]{2,20}[0-9]{0,4}/;
    if (nameRegex.test(productName.value) == true) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        productAlert.classList.add("d-none");
        return true;
    } else {
        productAlert.classList.remove("d-none");
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
        return false;
    }
}

productPrice.addEventListener("input", validateNumber);
function validateNumber() {
    let numRegex = /^[0-9]{1,8}$/;
    if (numRegex.test(productPrice.value) == true) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        priceAlert.classList.add("d-none");
        return true;
    } else {
        priceAlert.classList.remove("d-none");
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        return false;
    }
}

productDescription.addEventListener("input", validateDesc);
function validateDesc() {
    let descRegex = /[A-Za-z]{2,100}[0-9]{0,}/;
    if (descRegex.test(productDescription.value) == true) {
        productDescription.classList.add("is-valid");
        productDescription.classList.remove("is-invalid");
        descAlert.classList.add("d-none");
        return true;
    } else {
        descAlert.classList.remove("d-none");
        productDescription.classList.remove("is-valid");
        productDescription.classList.add("is-invalid");
        return true;
    }
}

function displaySum() {
    if (products.length) {
        sumAll.classList.remove("d-none");
        sumDiv.classList.remove("d-none");
        sumAll.addEventListener("click", sum);
        function sum() {
            let result = 0;
            for (let i = 0; i < products.length; i++) {
                result += products[i].price;
            }
            sumDiv.innerHTML = `<p class="m-3 fw-bold  bg-success text-white p-4">Total Prices are: ${result}<p/>`;
        }
    } else {
        sumAll.classList.add("d-none");
        sumDiv.classList.add("d-none");
        sumDiv.innerHTML = ``;
    }
}
