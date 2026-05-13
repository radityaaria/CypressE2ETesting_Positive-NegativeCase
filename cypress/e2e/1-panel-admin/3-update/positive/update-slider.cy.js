describe('Update Slider', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/sliders');
    });

    it('berhasil membuka halaman edit slider', () => {

        cy.get('table').should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/sliders/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Slider"]').clear().type(`Cypress Slider ${randomNumber}`);
        cy.get('.v-field__input[id*="Link URL"]').clear().type(`https://cypress.io/${randomNumber}`);
    
        cy.contains('Simpan Perubahan').click();

        cy.url().should('include', '/sliders/').and('include', 'mode=view');
    });

});