describe('Update Variants', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/variants');
    });

    it('berhasil membuka halaman edit variants', () => {

        cy.get('table').should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/variants/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Varian"]').clear().type(`Cypress Variant ${randomNumber}`);
        
        cy.contains('Simpan Perubahan').click();

        cy.url().should('include', '/variants/').and('include', 'mode=view');
    });

});