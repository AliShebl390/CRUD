var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productSale = document.getElementById("productSale")
var productDescription = document.getElementById("productDescription")
var pros = []
var lastData = null
var searchValue = document.getElementById("searchvalue")

if (localStorage.getItem("data") != null){
    pros = JSON.parse(localStorage.getItem("data"))
    see()
}

function addPro() {
var pro = {
    name: productName.value,
    price: Number(productPrice.value),
    category: productCategory.value,
    sale: productSale.checked,
    description: productDescription.value
}
    pros.push(pro)
    localStorage.setItem("data",JSON.stringify(pros))
    see()
    clearForm()
}

function see() {
    var res = ``
    var saleValue = ''
    for (let i = 0; i < pros.length; i++) {
        if (pros[i].sale) {
            saleValue = "Yes"
        } else {    saleValue = "No"       }
        res += `<tr>
        <td>`+(i+1)+`</td>
        <td>`+pros[i].name+`</td>
        <td>`+pros[i].price+`</td>
        <td>`+pros[i].category+`</td>
        <td>`+saleValue+`</td>
        <td>`+pros[i].description+`</td>
        <td><button onclick="getDataToUpdate(`+i+`)" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick="del(`+i+`)" class="btn btn-outline-danger">Delete</button></td>
    </tr>`
    }
    document.getElementById("data").innerHTML = res
}

function del(i) {
    pros.splice(i,1)
    localStorage.setItem("data",JSON.stringify(pros))
    see()
}

function clearForm() {
    document.getElementById("productName").value = ""
    document.getElementById("productPrice").value = ""
    document.getElementById("productCategory").value = "tv"
    document.getElementById("productDescription").value = ""
    document.getElementById("productSale").checked = false
}

function getDataToUpdate(i) {
    lastData = i

    productName.value = pros[i].name 
    productPrice.value = pros[i].price 
    productCategory.value = pros[i].category 
    productSale.checked = pros[i].sale 
    productDescription.value = pros[i].description 
    document.getElementById("edit").classList.remove("d-none")
    document.getElementById("add").classList.add("d-none")
}

function editPro() {
    var pro = {
        name: productName.value,
        price: Number(productPrice.value),
        category: productCategory.value,
        sale: productSale.checked,
        description: productDescription.value
    }
        pros[lastData] = pro
        localStorage.setItem("data",JSON.stringify(pros))
        document.getElementById("add").classList.remove("d-none")
        document.getElementById("edit").classList.add("d-none")
        see()
        clearForm()
    }
    function search() {
        var res = ``
        var searchVal = searchValue.value.toLowerCase()
        var saleValue = ""
        for (let i = 0; i < pros.length; i++) {
            if (pros[i].sale) {
                saleValue = "Yes"
            } else {    saleValue = "No"}
            if (pros[i].name.toLowerCase().includes(searchVal) || pros[i].category.toLowerCase().includes(searchVal))
            res += `<tr>
            <td>`+(i+1)+`</td>
            <td>`+pros[i].name.toLowerCase().replace(searchVal,"<span class='bg-info'>"+searchVal+"</span>") +`</td>
            <td>`+pros[i].price+`</td>
            <td>`+pros[i].category.toLowerCase().replace(searchVal,"<span class='bg-info'>"+searchVal+"</span>") +`</td>
            <td>`+saleValue+`</td>
            <td>`+pros[i].description+`</td>
            <td><button onclick="getDataToUpdate(`+i+`)" class="btn btn-outline-warning">Update</button></td>
            <td><button onclick="del(`+i+`)" class="btn btn-outline-danger">Delete</button></td>
        </tr>`
        }
        document.getElementById("data").innerHTML = res
    }

    function removeAll() {
        pros = []
        localStorage.setItem("data",JSON.stringify(pros))
        see()
    }