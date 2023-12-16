var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productSale = document.getElementById("productSale")
var productDescription = document.getElementById("productDescription")
var products = [];
var productUpdate = document.getElementById("update")
var productEdit = document.getElementById("edit")
var selectedProductIndex;

if (localStorage.getItem("Data") != null) {
products = JSON.parse(localStorage.getItem("Data"))

display()
}

function addProduct() {
    var product = {
        name: productName.value,
        price: Number(productPrice.value),
        category: productCategory.value,
        sale: productSale.checked,
        description: productDescription.value,
    }
    products.push(product) 
    display()

    localStorage.setItem("Data", JSON.stringify(products))

    clearForm()

    return product
}

function display() {
    var result = ``
    for (var i = 0; i < products.length; i++) {
        var productSaleValue;
        if (products[i].sale) {
            productSaleValue = 'Yes'
        } else {
            productSaleValue = "No"
        }

        result += `<tr>
        <td>`+ (i+1) +`</td>
        <td>`+ products[i].name +`</td>
        <td>`+ products[i].price +`</td>
        <td>`+ products[i].category +`</td>
        <td>`+ productSaleValue +`</td>
        <td>`+ products[i].description +`</td>
        <td> <button onclick="getToUpdateProduct(`+i+`)" class="btn btn-warning"> Update</button> </td>
        <td> <button onclick="deleteProduct(`+i+`)" class="btn btn-danger"> Delete</button> </td>
    </tr>`
    }
    document.getElementById("myData").innerHTML = result
}

function deleteProduct(i) {
    products.splice(i,1)
    display()
    localStorage.setItem("Data",JSON.stringify(products))
}

function clearForm() {
    productName.value = ""
    productPrice.value = ""
    productSale.checked = false
    productCategory.value = "tv"
    productDescription.value = ""
}

function getToUpdateProduct(index) {
    selectedProductIndex = index
    productUpdate.classList.remove("d-none")
    productEdit.classList.add("d-none")
    productName.value = products[index].name
    productPrice.value = products[index].price
    productCategory.value = products[index].category
    productSale.checked = products[index].sale
    productDescription.value = products[index].description
}

function editProduct() {
    var product = {
        name: productName.value,
        price: Number(productPrice.value),
        category: productCategory.value,
        sale: productSale.checked,
        description: productDescription.value,
    }
    products[selectedProductIndex] = product;
    console.log(selectedProductIndex,product);
    localStorage.setItem("Data", JSON.stringify(products))
    productUpdate.classList.add("d-none")
    productEdit.classList.remove("d-none")
    display();
    clearForm();
}