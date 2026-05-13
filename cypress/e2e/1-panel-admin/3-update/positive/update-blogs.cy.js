describe('Update Blog', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/blogs');
    });

    it('berhasil membuka halaman edit blogs', () => {

        cy.get('table').should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/blogs/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Judul Blog"]').clear().type(`Cypress Blog ${randomNumber}`);
        cy.get('.v-field__input[id*="Link URL"]').clear().type(`https://cypress.io/${randomNumber}`);
        cy.get('.ProseMirror').type('Ini adalah konten blog untuk testing Cypress ' + randomNumber);
        
        cy.contains('Simpan').click();

        cy.url().should('include', '/blogs/').and('include', 'mode=view');
    });

});



