describe('Delete Sliders', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/sliders');
    });

    it('berhasil delete sliders', () => {
        cy.get('.bx-trash').first().should('be.visible').click();
        cy.get('.bg-error.v-btn').contains('Hapus').click();
    });

});