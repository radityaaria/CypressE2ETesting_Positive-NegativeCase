describe('Delete Users', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('berhasil menghapus user', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});



