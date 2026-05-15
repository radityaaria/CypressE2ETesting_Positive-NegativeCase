describe('Create User Negative - Validation Konfirmasi Password', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('kolom Konfirmasi Password harus sama dengan kolom Password', () => {
        let createUserRequestCount = 0;

        cy.intercept('POST', '**/users**', (req) => {
            createUserRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah User', { timeout: 10000 })
            .should('be.visible')
            .click();

        const randomNumber = Math.floor(Math.random() * 1000);

        // Isi semua kolom lain dengan data valid
        cy.get('[id*="app-text-field-Nomor"]').clear().type('08' + randomNumber * 1000000);
        cy.get('[id*="app-text-field-Username"]').clear().type('Automation_Cypress' + randomNumber);
        cy.get('[id*="app-text-field-Email"]').clear().type('cypress' + randomNumber + '@example.com');
        cy.get('[id*="app-select-Peran"]').parent().parent().click();
        cy.contains('.v-list-item', 'SuperAdmin').should('be.visible').click();

        // Isi password dan konfirmasi password dengan value berbeda
        cy.get('[id*="app-text-field-Password"]').clear().type('2wsx1qaz');
        cy.get('[id*="app-text-field-Konfirmasi"]').clear().type('passwordberbeda');

        cy.contains('button', 'Buat User').click();

        cy.wait(500).then(() => {
            expect(createUserRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/konfirmasi.*tidak sama|password.*tidak.*cocok|tidak.*sama|konfirmasi.*cocok|password.*sama/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-user-validation-konfirmasi-password-tidak-sama');
    });

});
