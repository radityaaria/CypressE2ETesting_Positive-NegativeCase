describe('Delete Types', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/types');
    });

    it('berhasil delete type', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});