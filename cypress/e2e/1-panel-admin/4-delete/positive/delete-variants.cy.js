describe('Delete Variants', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/variants');
    });

    it('berhasil delete Variants', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});