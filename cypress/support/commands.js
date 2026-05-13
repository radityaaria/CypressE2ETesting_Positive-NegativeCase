Cypress.Commands.add('login', () => {
    const phone = Cypress.env('USER_PHONE');
    const password = Cypress.env('USER_PASSWORD');

    cy.session(['admin-login-basic', phone], () => {
        cy.visit('/login');
        cy.contains('Nomor').parent().find('input').type(phone);
        cy.get('input[type="password"]').type(password);
        cy.contains('Masuk').click();

        cy.url().should('not.include', '/login');
    });
});