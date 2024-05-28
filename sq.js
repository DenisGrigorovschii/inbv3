/ Массив для хранения транзакций
let transactions = [];

/**
 * Добавляет новую транзакцию
 */
function addTransaction() {
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');
    
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;
    const description = descriptionInput.value;
    const date = new Date().toLocaleString();
    
    const transaction = {
        id: Date.now(),
        date: date,
        amount: amount,
        category: category,
        description: description
    };
    
    transactions.push(transaction);
    renderTransaction(transaction);
    calculateTotal();
    
    amountInput.value = '';
    categoryInput.value = '';
    descriptionInput.value = '';
}

/**
 * Отображает транзакцию в таблице
 * @param {Object} transaction - Объект транзакции
 */
function renderTransaction(transaction) {
    const tableBody = document.querySelector('#transactionTable tbody');
    const row = document.createElement('tr');
    row.classList.add(transaction.amount >= 0 ? 'income' : 'expense');
    row.dataset.id = transaction.id;
    
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
        <td><button onclick="deleteTransaction(${transaction.id})">Удалить</button></td>
    `;
    
    row.addEventListener('click', () => showTransactionDetails(transaction));
    
    tableBody.appendChild(row);
}

/**
 * Удаляет транзакцию по ID
 * @param {number} id - ID транзакции
 */
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    const row = document.querySelector(`tr[data-id="${id}"]`);
    row.remove();
    calculateTotal();
}

/**
 * Вычисляет общую сумму транзакций
 */
function calculateTotal() {
    const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
    document.getElementById('totalAmount').innerText = totalAmount;
}

/**
 * Отображает полное описание транзакции
 * @param {Object} transaction - Объект транзакции
 */
function showTransactionDetails(transaction) {
    const detailsDiv = document.getElementById('transactionDetails');
    detailsDiv.innerHTML = `
        <h3>Детали транзакции</h3>
        <p>ID: ${transaction.id}</p>
        <p>Дата и Время: ${transaction.date}</p>
        <p>Категория: ${transaction.category}</p>
        <p>Описание: ${transaction.description}</p>
        <p>Сумма: ${transaction.amount}</p>
    `;
}

// Добавляем обработчик события на форму
document.getElementById('transactionForm').addEventListener('submit', (event) => {
    event.preventDefault();
    addTransaction();
});
