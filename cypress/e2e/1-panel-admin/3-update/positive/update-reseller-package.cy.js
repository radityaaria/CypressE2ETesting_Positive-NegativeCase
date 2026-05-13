describe('Update Reseller Package', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/reseller-packages');
    });

    it('berhasil membuka halaman edit reseller package', () => {

        cy.get('table', { timeout: 10000 }).should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/reseller-packages/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Paket"]').clear().type(`Cypress Package ${randomNumber}`);
        cy.get('.v-field__input[id*="Badge Text"]').clear().type(`Cypress Reseller ${randomNumber}`);
        cy.get('.v-field__input[id*="Level Margin"]').clear().type(`${randomNumber}`);

        cy.get('[id*="app-select-Status"]').closest('[role="combobox"]').then(($dropdown) => {
            const currentStatus = $dropdown.find('.v-select__selection-text').text().trim();

            cy.wrap($dropdown).click();

            const oppositeStatus = currentStatus === 'Aktif' ? 'Nonaktif' : 'Aktif';
            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });

        cy.contains(".v-card", "Varian Durasi").within(() => {
            cy.get("tbody tr").first().find("input").eq(0).clear().type(`${randomNumber}`);
            cy.get("tbody tr").first().find("input").eq(1).clear().type(`${randomNumber * 1000}`);
            cy.get("tbody tr").first().find("input").eq(2).clear().type(`${randomNumber * 1000}`);
            cy.get("tbody tr").first().find("input").eq(3).clear().type(`${randomNumber}%`);
        });

        cy.contains(".v-card", "Fitur").within(() => {
            cy.get(".app-text-field input").first().clear().type(`Cypress Feature ${randomNumber}`);
        });

        cy.contains('Simpan').click();
        
        cy.url().should('include', '/reseller-packages/').and('include', 'mode=edit');
    });

});
