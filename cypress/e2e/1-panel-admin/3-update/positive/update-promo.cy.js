describe('Update Promo', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/promo');
    });

    it('berhasil membuka halaman edit Promo', () => {

        cy.get('table', { timeout: 10000 }).should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/promo/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        
        cy.get('[role="combobox"]').filter(':has(label:contains("Status"))').then(($dropdown) => {
            const currentStatus = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current status:', currentStatus);

            cy.wrap($dropdown).click();

            const oppositeStatus = currentStatus === 'Aktif' ? 'Tidak Aktif' : 'Aktif';

            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });
        
        cy.get('[role="combobox"]').filter(':has(label:contains("Tipe Durasi"))').then(($dropdown) => {
            const currentTipe = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current Tipe:', currentTipe);

            cy.wrap($dropdown).click();

            const oppositeStatus = currentTipe === 'Harian' ? 'Bulanan' : 'Harian';

            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });

        cy.get('[role="combobox"]').filter(':has(label:contains("Tipe Diskon"))').then(($dropdown) => {
            const currentDiskon = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current Tipe:', currentDiskon);

            cy.wrap($dropdown).click();

            const oppositeStatus = currentDiskon === 'Rupiah' ? 'Persen' : 'Rupiah';

            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });

        cy.get('.v-field__input[id*="Kode Promo"]').clear().type(`Promo${randomNumber}`);
        cy.get('.v-field__input[id*="Nama Promo"]').clear().type(`Cypress Promo ${randomNumber}`);
        cy.get('.v-field__input[id*="Durasi"]').clear().type(`${randomNumber}`);
        cy.get('.v-field__input[id*="Nilai Potongan"]').clear().type(`${randomNumber * 100}`);
        cy.get('.v-field__input[id*="Maksimal User"]').clear().type(`${randomNumber}`);
        cy.get('.v-field__input[id*="Maksimal Potongan"]').clear().type(`${randomNumber * 100}`);
        cy.get('.v-field__input[id*="Minimal Pembelian"]').clear().type(`${randomNumber * 1000}`);

        cy.contains('Unggah Thumbnail').click();
        const files = ['test-image.png', 'test-image2.png', 'test-image3.png'];
        const randomIndex = Math.floor(Math.random() * files.length);
        const randomFile = files[randomIndex];
        cy.get('input[type="file"]').selectFile(`cypress/fixtures/${randomFile}`, {force: true});
        
        cy.contains('Simpan').click();

        cy.url().should('include', '/promo/').and('include', 'mode=view');
    });
});

