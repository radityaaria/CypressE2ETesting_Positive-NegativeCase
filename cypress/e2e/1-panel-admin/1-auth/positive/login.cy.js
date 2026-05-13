describe('Panel Temansantaimu', () => {
    it('login panel temansantaimu should pass', () => {
        cy.visit('/login');

        cy.get('[id*="app-text-field-Nomor"]').type(Cypress.env('USER_PHONE'));
        cy.get('[id*="app-text-field-Password"]').type(Cypress.env('USER_PASSWORD'));
        cy.get(':nth-child(2) > .v-btn').click();

        cy.wait(1000);
    });
});