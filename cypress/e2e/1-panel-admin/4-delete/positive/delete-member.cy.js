describe('Delete Member', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/members');
    });

    it('berhasil menghapus member', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});