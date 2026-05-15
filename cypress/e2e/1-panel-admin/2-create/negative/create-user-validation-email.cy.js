describe('Create User Negative - Validation Email', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('kolom Email opsional namun jika diisi harus format email yang valid', () => {
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
        cy.get('[id*="app-text-field-Password"]').clear().type('2wsx1qaz');
        cy.get('[id*="app-text-field-Konfirmasi"]').clear().type('2wsx1qaz');
        cy.get('[id*="app-select-Peran"]').parent().parent().click();
        cy.contains('.v-list-item', 'SuperAdmin').should('be.visible').click();

        // Isi email dengan format yang tidak valid (tanpa @ dan domain)
        cy.get('[id*="app-text-field-Email"]').clear().type('emailtidakvalid');

        cy.contains('button', 'Buat User').click();

        cy.wait(500).then(() => {
            expect(createUserRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/email.*valid|email.*format|format.*email|email.*tidak/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-user-validation-email-format-tidak-valid');
    });

});
