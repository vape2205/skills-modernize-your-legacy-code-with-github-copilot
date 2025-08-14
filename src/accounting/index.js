// Aplicación Node.js: Sistema de Gestión de Cuentas de Estudiantes
// Basado en la lógica y flujo de datos del sistema COBOL


// --- Refactor para pruebas unitarias y CLI ---
function createAccount(studentId, name, initialBalance = 1000.00) {
    return {
        balance: initialBalance,
        active: true,
        studentId,
        name
    };
}

function viewBalance(account) {
    if (!account.active) {
        return 'No active account.';
    }
    return `Current balance: ${account.balance.toFixed(2)}`;
}

function creditAccount(account, amount) {
    if (!account.active) throw new Error('No active account.');
    if (isNaN(amount) || amount <= 0) throw new Error('Invalid amount.');
    account.balance += amount;
    return account.balance;
}

function debitAccount(account, amount) {
    if (!account.active) throw new Error('No active account.');
    if (isNaN(amount) || amount <= 0) throw new Error('Invalid amount.');
    if (amount > account.balance) throw new Error('Insufficient balance.');
    account.balance -= amount;
    return account.balance;
}

function deactivateAccount(account) {
    account.active = false;
    return account;
}

function getAccount(account) {
    return account;
}

function exitApp() {
    // Solo para CLI, no hace nada en pruebas
    process.exit(0);
}

// CLI interactivo (solo si se ejecuta directamente)
if (require.main === module) {
    const readline = require('readline');
    let account = createAccount('S12345', 'Estudiante Ejemplo', 1000.00);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    function showMenu() {
        console.log('--------------------------------');
        console.log('Account Management System');
        console.log('1. View Balance');
        console.log('2. Credit Account');
        console.log('3. Debit Account');
        console.log('4. Exit');
        console.log('--------------------------------');
        rl.question('Enter your choice (1-4): ', handleMenu);
    }
    function handleMenu(choice) {
        switch (choice.trim()) {
            case '1':
                console.log(viewBalance(account));
                showMenu();
                break;
            case '2':
                rl.question('Enter credit amount: ', (amount) => {
                    try {
                        creditAccount(account, parseFloat(amount));
                        console.log(`Amount credited. New balance: ${account.balance.toFixed(2)}`);
                    } catch (e) {
                        console.log(e.message);
                    }
                    showMenu();
                });
                break;
            case '3':
                rl.question('Enter debit amount: ', (amount) => {
                    try {
                        debitAccount(account, parseFloat(amount));
                        console.log(`Amount debited. New balance: ${account.balance.toFixed(2)}`);
                    } catch (e) {
                        console.log(e.message);
                    }
                    showMenu();
                });
                break;
            case '4':
                console.log('Exiting the program. Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid option. Try again.');
                showMenu();
        }
    }
    showMenu();
}

module.exports = {
    createAccount,
    viewBalance,
    creditAccount,
    debitAccount,
    deactivateAccount,
    getAccount,
    exitApp
};
