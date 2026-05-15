describe('Create User Negative - Validation Password', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('kolom Password harus minimal 6 karakter', () => {
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

        // Isi password kurang dari 6 karakter
        cy.get('[id*="app-text-field-Password"]').clear().type('12345');
        cy.get('[id*="app-text-field-Konfirmasi"]').clear().type('12345');

        cy.contains('button', 'Buat User').click();

        cy.wait(500).then(() => {
            expect(createUserRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/password.*minimal|password.*6|minimal.*6.*karakter|password.*karakter/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-user-validation-password-minimal-6-karakter');
    });

});
