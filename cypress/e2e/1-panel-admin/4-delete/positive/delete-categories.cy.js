describe('Delete Categories', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/categories');
    });

    it('berhasil delete categories', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});



