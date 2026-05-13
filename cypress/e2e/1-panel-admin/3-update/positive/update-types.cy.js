describe('Update Types', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/types');
    });

    it('berhasil membuka halaman edit types', () => {

        cy.get('table').should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/types/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Tipe"]').clear().type(`Cypress Type ${randomNumber}`);
        cy.contains('Simpan Perubahan').click();

        cy.url().should('include', '/types/').and('include', 'mode=view');
    });

});



