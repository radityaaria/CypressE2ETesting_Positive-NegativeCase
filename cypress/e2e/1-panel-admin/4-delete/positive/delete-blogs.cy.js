describe('Delete Blogs', () => {

    beforeEach(() => {
        cy.login();
    });

    it('berhasil delete Blog', () => {

        cy.visit('/blogs');

        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});