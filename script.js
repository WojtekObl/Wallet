const incomeSection = document.querySelector(".income-area");
const expensesSection = document.querySelector(".expenses-area");
const deleteBtn =  document.querySelector(".delete");
const availableMoney = document.querySelector(".available-money");
const addBtn = document.querySelector(".add-transaction");
const deleteAllbtn = document.querySelector(".delete-all");

const lightBtn = document.querySelector(".light");
const darkBtn = document.querySelector(".dark");

const addTransactionPanel = document.querySelector(".add-transaction-panel");
const amountInput = document.querySelector("#amount");
const nameInput = document.querySelector("#name");
const categorySelect = document.querySelector("#category");
const saveBtn = document.querySelector(".save");
const cancelBtn = document.querySelector(".cancel");

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];


const showPanel = () => {
    addTransactionPanel.style.display = "flex";
}
const closePanel = () => {
    addTransactionPanel.style.display = "none";
    clearInputs();
}

const checkForm = () => {
    if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== "none") {
        createNewTransaction();
    } else {
        alert("Wypełnij wszystkie pola!");
    }
}

const clearInputs = () => {
    nameInput.value = '';
    amountInput.value = '' 
    categorySelect.selectedIndex = 0;
}

const createNewTransaction = () => {
    const newTransacion = document.createElement("div");
    newTransacion.classList.add("transaction");
    newTransacion.setAttribute("id",ID);
    
    checkCategory(selectedCategory);
    
    newTransacion.innerHTML = `
        <p class="transaction-name">${categoryIcon}${nameInput.value}</p>
        <p class="transaction-amount">${amountInput.value}zł
        <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>
    `
    amountInput.value > 0 ? incomeSection.appendChild(newTransacion) && newTransacion.classList.add("income") : expensesSection.appendChild(newTransacion) && newTransacion.classList.add("expense")

    moneyArr.push(parseFloat(amountInput.value));
    countMoney(moneyArr);
    closePanel();
    ID++;
}

const selectCategory = () => {
    selectedCategory =  categorySelect.options[categorySelect.selectedIndex].text;
}

const countMoney = money => {
    const newMoney = money.reduce((a, b) => a  + b);
    availableMoney.textContent = `${newMoney}zł`;
}

const checkCategory = (transaction) => {
    switch(transaction) {
        case "[ + ] Przychód":
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
            break;
        case "[ - ] Zakupy":
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
            break;
        case "[ - ] Jedzenie":
            categoryIcon = '<i class="fas fa-hamburger"></i>'
            break;
        case "[ - ] Rozrywka":
            categoryIcon = '<i class="fas fa-film"></i>'
            break;
    }
}

const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    const indexOftransaction = moneyArr.indexOf(transactionAmount);

    moneyArr.splice(indexOftransaction,1);
    
    transactionToDelete.classList.contains("income") ? incomeSection.removeChild(transactionToDelete) : expensesSection.removeChild(transactionToDelete)
    
    
    
    countMoney(moneyArr);
}

const deleteAllTransactions = () => {
    incomeSection.innerHTML = "<h3>Przychody:</h3>";
    expensesSection.innerHTML = "<h3>Wydatki:</h3>";
    availableMoney.textContent = "0zł"
    moneyArr = [0];
}

const changeStyleToLight = () => {
    root.style.setProperty('--first-color','#f9f9f9');
    root.style.setProperty('--second-color','#14161f');
    root.style.setProperty('--border-color','rgba(0, 0, 0, .2)');
}
const changeStyleToDark = () => {
    root.style.setProperty('--first-color','#14161f');
    root.style.setProperty('--second-color','#f9f9f9');
    root.style.setProperty('--border-color','rgba(255, 255, 255, .4)');
}

addBtn.addEventListener("click", showPanel);
cancelBtn.addEventListener("click", closePanel);
saveBtn.addEventListener("click", checkForm);
deleteAllbtn.addEventListener("click", deleteAllTransactions)
lightBtn.addEventListener("click",  changeStyleToLight)
darkBtn.addEventListener("click", changeStyleToDark)

console.log(categorySelect.selectedIndex.value);