describe('Create User Negative - Empty Submission', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('button Buat User harus terdisable saat semua kolom kosong', () => {
        cy.contains('Tambah User', { timeout: 10000 })
            .should('be.visible')
            .click();

        cy.contains('button', 'Buat User')
            .should('be.visible')
            .click()

        cy.screenshotFull('create-user-validation-empty-submission-button-disabled');
    });

});
