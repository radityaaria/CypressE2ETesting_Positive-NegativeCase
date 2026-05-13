describe('Update Payment Method', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/payment-methods');
    });

    it('berhasil membuka modal edit payment method', () => {

        cy.get('table', { timeout: 10000 }).should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        // Tunggu modal terbuka
        cy.get('.v-card').should('be.visible');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-dialog .v-card').within(() => {
            // TODO: Uncomment when Nama field is editable
            // cy.get('[id*="Nama"]').eq(0).clear({ force: true }).type(`Cypress ${randomNumber}`, { force: true });
            cy.get('[id*="app-text-field-Fee (Rp)"]').each(($el) => {
                cy.wrap($el).clear({ force: true }).type(`${randomNumber * 10}`, { force: true });
            });
        });

        //BUG: Dropdown list items are rendered outside modal (teleport), so we need to handle them separately
        // cy.get('.v-dialog .v-card').within(() => {
        //     cy.get('[id*="app-select-Status"]').closest('[role="combobox"]').then(($dropdown) => {
        //         const currentStatus = $dropdown.find('.v-select__selection-text').text().trim();

        //         cy.log('Current status:', currentStatus);

        //         cy.wrap($dropdown).click();

        //         const oppositeStatus = currentStatus === 'Tidak Aktif' ? 'Aktif' : 'Tidak Aktif';
        //         cy.log('Opposite status to select:', oppositeStatus);

        //         cy.contains('.v-list-item', oppositeStatus)
        //             .should('be.visible')
        //             .click();
        //     });
        // });

        cy.contains('Simpan').click();
    });

});



