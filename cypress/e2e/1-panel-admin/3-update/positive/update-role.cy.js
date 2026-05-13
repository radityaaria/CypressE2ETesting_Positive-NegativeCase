describe('Update Role', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/roles');
    });

    it('berhasil membuka halaman edit roles', () => {

        cy.get('table').should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/roles/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Role"]').clear().type(`Cypress Role ${randomNumber}`);
        cy.contains('Hapus Semua').click();
        cy.contains('Simpan Perubahan').click();

        cy.url().should('include', '/roles/').and('include', 'mode=view');
    });

});