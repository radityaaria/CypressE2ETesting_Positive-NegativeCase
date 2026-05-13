describe('Update Categories', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/categories');
    });

    it('berhasil membuka halaman edit categories', () => {

        cy.get('table').should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/categories/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Kategori"]').clear().type(`Cypress Category ${randomNumber}`);
    
        cy.contains('Simpan Perubahan').click();

        cy.url().should('include', '/categories/').and('include', 'mode=view');
    });

});