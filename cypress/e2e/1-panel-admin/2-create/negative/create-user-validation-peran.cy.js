describe('Create User Negative - Validation Peran', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('dropdown Peran wajib memilih salah satu opsi', () => {
        let createUserRequestCount = 0;

        cy.intercept('POST', '**/users**', (req) => {
            createUserRequestCount += 1;
            req.continue();
        });

        cy.contains('Tambah User', { timeout: 10000 })
            .should('be.visible')
            .click();

        const randomNumber = Math.floor(Math.random() * 1000);

        // Isi semua kolom lain dengan data valid, kecuali dropdown Peran
        cy.get('[id*="app-text-field-Nomor"]').clear().type('08' + randomNumber * 1000000);
        cy.get('[id*="app-text-field-Username"]').clear().type('Automation_Cypress' + randomNumber);
        cy.get('[id*="app-text-field-Email"]').clear().type('cypress' + randomNumber + '@example.com');
        cy.get('[id*="app-text-field-Password"]').clear().type('2wsx1qaz');
        cy.get('[id*="app-text-field-Konfirmasi"]').clear().type('2wsx1qaz');

        // Sengaja tidak memilih Peran

        cy.contains('button', 'Buat User').click();

        cy.wait(500).then(() => {
            expect(createUserRequestCount).to.eq(0);
        });

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/peran.*wajib|wajib.*peran|peran.*dipilih|role.*wajib/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-user-validation-peran-wajib-dipilih');
    });

});
