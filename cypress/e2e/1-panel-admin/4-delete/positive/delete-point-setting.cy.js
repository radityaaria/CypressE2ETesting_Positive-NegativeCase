describe('Delete Point Settings', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/point-settings');
    });

    it('berhasil delete pengaturan poin', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });
});