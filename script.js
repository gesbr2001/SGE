let productList = [];
let currentId = 0;

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    
    if (productName === "" || productQuantity === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    
    currentId++;
    const product = {
        id: currentId,
        name: productName,
        quantity: parseInt(productQuantity)
    };
    
    productList.push(product);
    document.getElementById('productName').value = "";
    document.getElementById('productQuantity').value = "";
    renderProductTable();
}

function renderProductTable() {
    const tableBody = document.querySelector('#productTable tbody');
    tableBody.innerHTML = "";
    
    productList.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td><input type="number" value="${product.quantity}" onchange="updateProduct(${product.id}, this.value)"></td>
            <td>
                <button class="delete" onclick="removeProduct(${product.id})">Remover</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function updateProduct(id, newQuantity) {
    const product = productList.find(p => p.id === id);
    if (product) {
        product.quantity = parseInt(newQuantity);
    }
}

function removeProduct(id) {
    productList = productList.filter(p => p.id !== id);
    renderProductTable();
}


/*-------------------------------------*/



document.getElementById('toggle-theme-btn').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    
    // Salvar o tema no localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Carregar o tema salvo no localStorage
window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme + '-mode');
    } else {
        // Definir tema padrão como claro
        document.body.classList.add('light-mode');
    }
};