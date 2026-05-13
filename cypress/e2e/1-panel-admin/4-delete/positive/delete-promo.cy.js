describe('Delete Promo', () => {

    beforeEach(() => {
        cy.login();
    });

    it('berhasil delete Promo', () => {

        cy.visit('/promo');

        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});