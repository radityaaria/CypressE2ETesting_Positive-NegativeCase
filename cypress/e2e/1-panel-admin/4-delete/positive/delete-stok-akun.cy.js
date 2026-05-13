describe('Delete Stok Akun', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/stok-akun');
    });

    it('berhasil delete Stok Akun', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });
});