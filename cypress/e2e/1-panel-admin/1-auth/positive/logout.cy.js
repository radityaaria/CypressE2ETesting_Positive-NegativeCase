describe('Logout', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/admin-profile');
    });

    it('berhasil halaman profile', () => {
        cy.get('.bg-error.v-btn').contains('Keluar').click();
        cy.get('.swal2-confirm').click();

        cy.url().should('include', '/login');
    });

});