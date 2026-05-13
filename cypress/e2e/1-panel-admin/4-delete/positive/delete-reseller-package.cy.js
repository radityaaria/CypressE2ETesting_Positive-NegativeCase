describe('Delete Reseller Package', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages');
    });

    it('berhasil menghapus Reseller Package', () => {
        //hapus baris data terakhir (last)
        cy.get('.bx-trash').last().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });
});