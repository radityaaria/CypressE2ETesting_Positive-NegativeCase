describe('Update Member', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/members');
    });

    it('berhasil membuka halaman edit Member', () => {

        cy.get('table', { timeout: 10000 }).should('be.visible');

        cy.get('table').find('.bx-edit-alt').last().click();

        cy.url().should('include', '/members/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Username"]').clear().type(`Cypress Member ${randomNumber}`);
        cy.get('.v-field__input[id*="Nomor"]').clear().type(`628${randomNumber * 10000000}`);
        cy.get('.v-field__input[id*="Email"]').clear().type(`Cypress${randomNumber}@example.com`);


        cy.get('[id*="app-select-Level"]').closest('[role="combobox"]').then(($dropdown) => {
        const currentLevel = $dropdown.find('.v-select__selection-text').text().trim();

                cy.log('Current level:', currentLevel);

                cy.wrap($dropdown).click();

                const oppositeLevel = ['Emas', 'Perunggu', 'Platinum'].find(option => option !== currentLevel);
                cy.log('Opposite level to select:', oppositeLevel);

                cy.contains('.v-list-item', oppositeLevel)
                    .should('be.visible')
                    .click();
            });

        
        cy.get('[id*="app-select-Status"]').closest('[role="combobox"]').then(($dropdown) => {
            const currentStatus = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current status:', currentStatus);

            cy.wrap($dropdown).click();

            const oppositeStatus = currentStatus === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
            cy.log('Opposite status to select:', oppositeStatus);

            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });

        const verifyPasswordMatch = () => {
            const password = `${randomNumber * 10000}`;
            cy.get('.v-field__input[id*="Password Baru"]').first().clear().type(password);
            cy.get('.v-field__input[id*="Konfirmasi Password"]').last().clear().type(password);

            cy.get('.v-field__input[id*="Konfirmasi Password"]').last().should('have.value', password);
        };

        verifyPasswordMatch();
        cy.get('.v-field__input[id*="Konfirmasi Password"]').last().clear().type(`${randomNumber * 10000}`);

        cy.contains('Simpan Perubahan').click();

        cy.url().should('include', '/members/').and('include', 'mode=view');
    });
});

