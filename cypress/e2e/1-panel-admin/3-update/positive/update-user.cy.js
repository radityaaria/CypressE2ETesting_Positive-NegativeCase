describe('Update Users', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('berhasil membuka form update user', () => {
        cy.get('table').should('be.visible');

        //data baris pertama
        cy.get('table').find('.bx-edit-alt').first().click();

        //navigasi ke halaman edit user
        cy.url().should('include', '/users/').and('include', 'mode=edit');

        //get current role dari dropdown
        cy.get('.v-select__selection-text').then(($selection) => {
            const currentRole = $selection.text().trim();

            // Klik dropdown Peran
            cy.get('.bx-shield').closest('[role="combobox"]').click();

            // get all option available
            cy.get('.v-list-item').then(($options) => {
                const allowedRoles = ['SuperAdmin', 'Test QA'];
                const availableOptions = [];
                $options.each((index, option) => {
                    const optionText = Cypress.$(option).text().trim();
                    // Hanya tambahkan opsi yang ada di allowedRoles dan bukan current role
                    if (optionText && optionText !== currentRole && allowedRoles.includes(optionText)) {
                        availableOptions.push(optionText);
                    }
                });

                // Pilih opsi random yang bukan current role
                if (availableOptions.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableOptions.length);
                    const randomOption = availableOptions[randomIndex];

                    cy.contains('.v-list-item', randomOption)
                        .should('be.visible')
                        .click();
                } else {
                    cy.log('Tidak ada opsi lain selain current role');
                }
            });
        });

        // status - detect prefill & select opposite status
        cy.get('.bx-check-circle').closest('[role="combobox"]').then(($dropdown) => {
            // Get current status
            const currentStatus = $dropdown.find('.v-select__selection-text').text().trim();

            cy.wrap($dropdown).click();

            const oppositeStatus = currentStatus === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });
        cy.contains('button', 'Simpan Perubahan').click();

        cy.url().should('include', '/users/').and('include', 'mode=view');
    });

});
