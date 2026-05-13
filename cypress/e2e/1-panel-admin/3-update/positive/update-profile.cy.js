describe('Update Profile', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/admin-profile');
    });

    it('berhasil membuka halaman edit Profile', () => {

        //Informasi Pribadi
        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Username"]').clear().should('have.value', '').type(`Cypress_User_${randomNumber}`);
        cy.get('.v-field__input[id*="Alamat Email"]').clear().should('have.value', '').type(`Cypress${randomNumber}@example.com`);
        cy.get('.v-field__input[id*="Nomor Telepon"]').clear().should('have.value', '').type(`628${randomNumber * 10000000}`);

        cy.contains('Simpan Perubahan').click();

        //Change Password
        const verifyPasswordMatch = () => {
            const password = `${randomNumber * 1000000}`;
            cy.get('.v-field__input[id*="Password Baru"]').first().clear().type(password);
            cy.get('.v-field__input[id*="Konfirmasi Password"]').last().clear().type(password);

            cy.get('.v-field__input[id*="Konfirmasi Password"]').last().should('have.value', password);
        };

        verifyPasswordMatch();
        cy.get('.v-field__input[id*="Konfirmasi Password"]').last().clear().type(`${randomNumber * 1000000}`);

        cy.contains('Perbarui Password').click(); 

    });
});

