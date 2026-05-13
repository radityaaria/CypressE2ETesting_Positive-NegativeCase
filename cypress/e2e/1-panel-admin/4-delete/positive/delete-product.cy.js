describe('Delete Product', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/products');
    });

    it('berhasil delete product', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });
});