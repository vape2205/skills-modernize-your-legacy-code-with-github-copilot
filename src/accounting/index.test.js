// Pruebas unitarias para la aplicación Node.js de cuentas de estudiantes
// Basadas en el plan de pruebas COBOL

const { getAccount, creditAccount, debitAccount, viewBalance, createAccount, deactivateAccount } = require('./index');

describe('Account Management System', () => {
    let account;
    beforeEach(() => {
        account = createAccount('S12345', 'Estudiante Ejemplo', 1000.00);
    });

    test('TC01: Consultar saldo inicial de la cuenta', () => {
        expect(viewBalance(account)).toBe('Current balance: 1000.00');
    });

    test('TC02: Acreditar monto válido a la cuenta', () => {
        creditAccount(account, 100);
        expect(account.balance).toBe(1100.00);
    });

    test('TC03: Debitar monto válido de la cuenta', () => {
        debitAccount(account, 200);
        expect(account.balance).toBe(800.00);
    });

    test('TC04: Intentar debitar monto mayor al saldo disponible', () => {
        expect(() => debitAccount(account, 2000)).toThrow('Insufficient balance.');
        expect(account.balance).toBe(1000.00);
    });

    test('TC05: Acreditar monto negativo', () => {
        expect(() => creditAccount(account, -50)).toThrow('Invalid amount.');
        expect(account.balance).toBe(1000.00);
    });

    test('TC06: Debitar monto negativo', () => {
        expect(() => debitAccount(account, -50)).toThrow('Invalid amount.');
        expect(account.balance).toBe(1000.00);
    });

    test('TC07: Salir del sistema (simulado)', () => {
        // No hay estado que verificar, solo asegurarse que la función existe
        expect(typeof require('./index').exitApp).toBe('function');
    });

    test('TC08: Consultar saldo después de varias transacciones', () => {
        creditAccount(account, 100);
        debitAccount(account, 50);
        creditAccount(account, 200);
        debitAccount(account, 100);
        expect(account.balance).toBe(1150.00);
    });

    test('TC09: Validar acceso solo a cuentas existentes', () => {
        const inactive = deactivateAccount(account);
        expect(viewBalance(inactive)).toBe('No active account.');
    });
});
