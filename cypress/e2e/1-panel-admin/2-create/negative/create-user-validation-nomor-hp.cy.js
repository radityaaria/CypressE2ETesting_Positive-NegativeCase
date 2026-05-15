describe('Create User Negative - Validation Nomor HP', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/users');
    });

    it('kolom Nomor HP wajib diisi dan hanya menerima input angka dengan awalan 08 atau 628', () => {
        cy.contains('Tambah User', { timeout: 10000 })
            .should('be.visible')
            .click();

        const randomNumber = Math.floor(Math.random() * 1000);

        // Isi semua kolom lain dengan data valid
        cy.get('[id*="app-text-field-Username"]').clear().type('Automation_Cypress' + randomNumber);
        cy.get('[id*="app-text-field-Email"]').clear().type('cypress' + randomNumber + '@example.com');
        cy.get('[id*="app-text-field-Password"]').clear().type('2wsx1qaz');
        cy.get('[id*="app-text-field-Konfirmasi"]').clear().type('2wsx1qaz');
        cy.get('[id*="app-select-Peran"]').parent().parent().click();
        cy.contains('.v-list-item', 'SuperAdmin').should('be.visible').click();

        // Isi nomor HP dengan format yang salah (tanpa awalan 08/628)
        cy.get('[id*="app-text-field-Nomor"]').clear().type('12345678');

        cy.contains('button', 'Buat User').click();

        cy.get('body').should(($body) => {
            const t = $body.text();
            expect(/nomor.*08|nomor.*628|awalan.*08|prefix|format.*nomor|nomor.*valid|nomor.*wajib/i.test(t)).to.be.true;
        });

        cy.screenshotFull('create-user-validation-nomor-hp-format-salah');
    });

});
