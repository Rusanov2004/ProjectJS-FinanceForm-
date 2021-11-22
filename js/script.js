let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0], 
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    inputsChooseExpenses = document.getElementsByClassName('expenses-item'),
    expensesButton = document.getElementsByTagName('button')[0],
    optionalExpensesButton = document.getElementsByTagName('button')[1],
    countBudgetButton = document.getElementsByTagName('button')[2],
    inputsOptionalExpenses = document.querySelectorAll('.optionalexpenses-item'),

    inputChooseIncome = document.querySelector('#income'),
    checkboxSavings = document.querySelector('#savings'),
    inputSum = document.querySelector('#sum'),
    inputPercent = document.querySelector('#percent'),
    inputYear = document.querySelector('.year-value'),
    inputMonth = document.querySelector('.month-value'),
    inputDay = document.querySelector('.day-value');

let money, time;


startBtn.addEventListener('click', function() {
    time = prompt("Add date in format YYYY MM DD", 'With space...');
    money = +prompt("Your budget a month", '');
    
    while(isNaN(money) || money == '' || money == null) {
        money = +prompt("Your budget a month", '');
    }
    appData.timeData = time;
    appData.budget = money;
    budgetValue.textContent = money.toFixed() + 'lv';
    inputYear.value = new Date(Date.parse(time)).getFullYear();
    inputMonth.value = new Date(Date.parse(time)).getMonth() + 1;
    inputDay.value = new Date(Date.parse(time)).getDate();

    expensesButton.disabled = false;
    optionalExpensesButton.disabled = false;
    countBudgetButton.disabled = false;
});

expensesButton.addEventListener('click', function() {
    if (expensesButton.disabled == false) {
        let sum = 0;
        for (let i = 0; i < inputsChooseExpenses.length; i++) {
            let a = inputsChooseExpenses[i].value,
                b = inputsChooseExpenses[++i].value;
        
        
            if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50 ) {
                console.log("done");            
                appData.expenses[a] = b;
                sum += + b;
            } else {
                i = i - 1;
            }
        }
            expensesValue.textContent = sum + 'lv';
    }else{
        expensesValue.textContent = 'Firstable start the program!';
    }
});

optionalExpensesButton.addEventListener('click', function() {
    if (optionalExpensesButton.disabled == false) {
        for (let i = 0; i < inputsOptionalExpenses.length; i++) {
            let a = inputsOptionalExpenses[i].value;
            appData.optionalExpenses[i] = a;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + '; ';
        }
    }else{
        optionalExpensesValue.textContent = 'Firstable start the program!';
    }        
});  

countBudgetButton.addEventListener('click', function() {
    if (countBudgetButton.disabled == false) {
        if(appData.budget != undefined) {
            let moneyPerDay = (appData.budget / 30).toFixed();
            dayBudgetValue.textContent = moneyPerDay + 'lv';
    
            if (moneyPerDay < 100) {
                levelValue.textContent = "MInimal level";
            } else if (moneyPerDay > 100 && moneyPerDay < 2000) {
                levelValue.textContent = "Medium level";
            } else if (moneyPerDay > 2000) {
                levelValue.textContent = "Really good level";
            } else {
                levelValue.textContent = "Try again. Error!";
            }
        }else{
            dayBudgetValue.textContent = 'Nothing found';
            levelValue.textContent = 'Nothing found';
        }
    }else{
        dayBudgetValue.textContent = 'Firstable start the program!';
        levelValue.textContent = 'Firstable start the program!';
    }
    
    
});

inputChooseIncome.addEventListener('change', function() {
    let a = inputChooseIncome.value;
    appData.income = a.split(', ');
    incomeValue.textContent = appData.income;
});

checkboxSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    }else if(appData.savings == false) {
        appData.savings = true;
    }else{
        alert('problem');
    }
});

inputSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        monthIncome = sum/100/12*percent;
        yearIncome = sum/100*percent;

        monthSavingsValue.textContent = monthIncome.toFixed(2) + 'lv'; 
        yearSavingsValue.textContent = yearIncome.toFixed(2) + 'lv';
    }else{
        monthSavingsValue.textContent = 'check the checkbox firstable';
        yearSavingsValue.textContent = 'check the checkbox firstable';
    }
});

inputPercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +inputSum.value,
            percent = +inputPercent.value;

        monthIncome = sum/100/12*percent;
        yearIncome = sum/100*percent;

        monthSavingsValue.textContent = monthIncome.toFixed(2) + 'lv'; 
        yearSavingsValue.textContent = yearIncome.toFixed(2) + 'lv';
    }else{
        monthSavingsValue.textContent = 'check the checkbox firstable';
        yearSavingsValue.textContent = 'check the checkbox firstable';
    }
});

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};