describe('Delete Role', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/roles');
    });

    it('berhasil delete role', () => {
        //select baris data pertama pada table
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});
