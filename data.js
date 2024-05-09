// load data from LocalStorage one page load
window.onload = function () {
    loadData()
}

// Add Data to Table
function addData() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let food = document.getElementById("food").value;
    let price = document.getElementById("price").value;
    // create a new Row in the table 
    const tableBody = document.getElementById("table-body")
    const newRow = document.createElement("tr")
    newRow.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
    <td>${email}</td>
    <td>${food}</td>
    <td>${price}</td>
    <td><button onclick="editRow(this)">update</button></td>
    <td><button onclick="deleteRow(this)">Delete</button></td>
    `
    tableBody.appendChild(newRow);
    saveData(name, address, email, food, price, payment)
}

// updateData 
function updateData() {
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let food = document.getElementById("food").value;
    let price = document.getElementById("price").value;

    // find and update the selected row in tha table
    const selectedRow = document.querySelector('tr.selected')
    if (selectedRow) {
        selectedRow.cells[0].innerText = name;
        selectedRow.cells[1].innerText = address;
        selectedRow.cells[2].innerText = email;
        selectedRow.cells[3].innerText = food;
        selectedRow.cells[4].innerText = price;
        const rowIndex = selectedRow.rowIndex - 1;
        updateLocalStorage(rowIndex, name, address, email, food, price)

        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
        document.getElementById("food").value = "";
        document.getElementById("price").value = "";

        selectedRow.classList.remove("selected");
    }
}

// Edit Row Data in table 
function editRow(button) {
    const row = button.parentNode.parentNode;
    document.getElementById("name").value = row.cells[0].textContent;
    document.getElementById("address").value = row.cells[2].textContent;
    document.getElementById("email").value = row.cells[7].textContent;
    document.getElementById("food").value = row.cells[4].textContent;
    document.getElementById("price").value = row.cells[5].textContent;
    row.classList.add("selected");

}

// Delete Data
function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row)
    const rowIndex = row.rowIndex - 1;
    deleteFromLocalStorage(rowIndex);
}

// SaveData 

function saveData(name,address, email, food , price) {

    let data = localStorage.getItem('tableData')
    if (!data) {
        data = []
    } else {
        data = JSON.parse(data)
    }
    data.push({ name:name, address:address, email:email, food:food, price: price })
    localStorage.setItem('tableData', JSON.stringify(data))
}



// LoadData
function loadData() {
    const data = JSON.parse(localStorage.getItem('tableData'))
    if (data) {
        const tableBody = document.getElementById("table-body")
        data.forEach(item => {
            const newRow = document.createElement('tr')
            newRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.address}</td>
            <td>${item.email}</td>
            <td>${item.food}</td>
            <td>${item.price}</td>
            <td class="bg-blue-500 rounded-lg"><button onclick="editRow(this)">update</button></td>
            <td class="bg-orange-500 rounded-md px-2 ml-2"><button onclick="deleteRow(this)">Delete</button></td>
            `
            tableBody.appendChild(newRow)
        })
    }
}

function updateLocalStorage(rowIndex, name, address, email, food, price) {
    let data = JSON.parse(localStorage.getItem('tableData'));
    if (data) {
        data[rowIndex] = { name: name, address: address, email: email, food: food, price: price }
        localStorage.setItem('tableData', JSON.stringify(data))
    }
}

// deleteFromLocalStorage
function deleteFromLocalStorage(rowIndex) {
    let data = JSON.parse(localStorage.getItem('tableData'));
    if (data) {
        data.splice(rowIndex, 1)
        localStorage.setItem('tableData', JSON.stringify(data))
    }
}

