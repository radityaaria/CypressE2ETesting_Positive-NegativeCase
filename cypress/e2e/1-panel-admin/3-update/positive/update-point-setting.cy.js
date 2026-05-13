describe('Update Point Setting', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/point-settings');
    });

    it('berhasil membuka modal edit point setting', () => {

        cy.get('table', { timeout: 10000 }).should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        // Tunggu modal terbuka
        cy.get('.v-card').should('be.visible');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-dialog .v-card').within(() => {
            cy.get('[id*="app-select-Varian"]').closest('[role="combobox"]').then(($dropdown) => {
                const currentVariant = $dropdown.find('.v-select__selection-text').text().trim();

                cy.wrap($dropdown).click();

                // Store currentVariant in Cypress.env to access outside .within()
                Cypress.env('currentVariant', currentVariant);
            });
        });

        // Dropdown list items are rendered outside modal (teleport)
        cy.get('.v-list-item').then(($options) => {
            const currentVariant = Cypress.env('currentVariant');
            const availableOptions = [];

            $options.each((index, option) => {
                const optionText = Cypress.$(option).text().trim();
                // Hanya tambahkan opsi yang bukan current variant
                if (optionText && optionText !== currentVariant) {
                    availableOptions.push(optionText);
                }
            });

            // Pilih opsi random yang bukan current variant
            if (availableOptions.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                const randomOption = availableOptions[randomIndex];

                cy.contains('.v-list-item', randomOption)
                    .scrollIntoView()
                    // .should('be.visible')
                    .click();
            } else {
                cy.log('Tidak ada opsi lain selain current variant');
            }
        });

        // Handle Tipe Produk dropdown
        cy.get('.v-dialog .v-card').within(() => {
            cy.get('[id*="app-select-Tipe Produk"]').closest('[role="combobox"]').then(($dropdown) => {
                const currentType = $dropdown.find('.v-select__selection-text').text().trim();

                cy.wrap($dropdown).click();

                // Store currentType in Cypress.env to access outside .within()
                Cypress.env('currentType', currentType);
            });
        });

        // Dropdown list items are rendered outside modal (teleport)
        cy.get('.v-list-item').then(($options) => {
            const currentType = Cypress.env('currentType');
            const availableOptions = [];

            $options.each((index, option) => {
                const optionText = Cypress.$(option).text().trim();
                // Hanya tambahkan opsi yang bukan current type
                if (optionText && optionText !== currentType) {
                    availableOptions.push(optionText);
                }
            });

            // Pilih opsi random yang bukan current type
            if (availableOptions.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                const randomOption = availableOptions[randomIndex];

                cy.contains('.v-list-item', randomOption)
                    .scrollIntoView()
                    // .should('be.visible')
                    .click();
            } else {
                cy.log('Tidak ada opsi lain selain current type');
            }
        });

        cy.get('.v-dialog .v-card').within(() => {
            cy.get('[id*="app-text-field-Konversi Point (Rp)"]')
                .clear()
                .type(`${randomNumber * 10}`);
        });

        cy.contains('Simpan').click();
    });

});



