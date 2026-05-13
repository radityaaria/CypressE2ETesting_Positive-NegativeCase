describe('Update Product', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/products');
    });

    it('berhasil membuka halaman edit Product', () => {

        cy.get('table', { timeout: 10000 }).should('be.visible');

        cy.get('table').find('.bx-edit-alt').first().click();

        cy.url().should('include', '/products/').and('include', 'mode=edit');

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Nama Produk"]').eq(0).clear().type(`Cypress Product ${randomNumber}`);
        cy.get('textarea.v-field__input[rows="3"]')
            .clear({ force: true })
            .type(`Deskripsi produk cypress ${randomNumber}`, { force: true });

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

        cy.get('[id*="app-select-Kategori"]').closest('[role="combobox"]').then(($dropdown) => {
            const currentKategori = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current kategori:', currentKategori);

            cy.wrap($dropdown).click();

            // Store currentKategori in Cypress.env to access outside .within()
            Cypress.env('currentKategori', currentKategori);
        });

        // Dropdown list items are rendered outside modal (teleport)
        cy.get('.v-list-item').then(($options) => {
            const currentKategori = Cypress.env('currentKategori');
            const availableOptions = [];

            $options.each((index, option) => {
                const optionText = Cypress.$(option).text().trim();
                // Hanya tambahkan opsi yang bukan current kategori
                if (optionText && optionText !== currentKategori) {
                    availableOptions.push(optionText);
                }
            });

            // Pilih opsi random yang bukan current Kategori
            if (availableOptions.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                const randomOption = availableOptions[randomIndex];

                cy.contains('.v-list-item', randomOption)
                    .scrollIntoView()
                    .click({ force: true });
            } else {
                cy.log('Tidak ada opsi lain selain current kategori');
            }
        });

        cy.get('[id*="app-select-Varian"]').closest('[role="combobox"]').then(($dropdown) => {
            const currentVarian = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current varian:', currentVarian);

            cy.wrap($dropdown).click();

            // Store currentVarian in Cypress.env to access outside .within()
            Cypress.env('currentVarian', currentVarian);
        });

        // Dropdown list items are rendered outside modal (teleport)
        cy.get('.v-list-item').then(($options) => {
            const currentVarian = Cypress.env('currentVarian');
            const availableOptions = [];

            $options.each((index, option) => {
                const optionText = Cypress.$(option).text().trim();
                // Hanya tambahkan opsi yang bukan current varian
                if (optionText && optionText !== currentVarian) {
                    availableOptions.push(optionText);
                }
            });

            // Pilih opsi random yang bukan current Varian
            if (availableOptions.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                const randomOption = availableOptions[randomIndex];

                cy.contains('.v-list-item', randomOption)
                    .scrollIntoView()
                    .click({ force: true });
            } else {
                cy.log('Tidak ada opsi lain selain current varian');
            }
        });

        cy.get('[id*="app-select-Tipe Produk"]').closest('[role="combobox"]').then(($dropdown) => {
            const currentProduk = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current Produk:', currentProduk);

            cy.wrap($dropdown).click();

            // Store currentProduk in Cypress.env to access outside .within()
            Cypress.env('currentProduk', currentProduk);
        });

        // Dropdown list items are rendered outside modal (teleport)
        cy.get('.v-list-item').then(($options) => {
            const currentProduk = Cypress.env('currentProduk');
            const availableOptions = [];

            $options.each((index, option) => {
                const optionText = Cypress.$(option).text().trim();
                // Hanya tambahkan opsi yang bukan current varian
                if (optionText && optionText !== currentProduk) {
                    availableOptions.push(optionText);
                }
            });

            // Pilih opsi random yang bukan current Varian
            if (availableOptions.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableOptions.length);
                const randomOption = availableOptions[randomIndex];

                cy.contains('.v-list-item', randomOption)
                    .scrollIntoView()
                    .click({ force: true });
            } else {
                cy.log('Tidak ada opsi lain selain current varian');
            }
        });

        cy.get('.v-field__input[id*="Maksimal User"]').clear().should('have.value', '').type(`${randomNumber}`);

        cy.get('[id*="app-select-Random Akun"]').closest('[role="combobox"]').then(($dropdown) => {
            const currentRandomAkun = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current status:', currentRandomAkun);

            cy.wrap($dropdown).click();

            const oppositeStatus = currentRandomAkun === 'Ya' ? 'Tidak' : 'Ya';
            cy.log('Opposite status to select:', oppositeStatus);

            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });

        cy.get('input[placeholder*="Email"]').eq(0).clear().type(`Email${randomNumber}`);
        cy.get('input[placeholder*="Password"]').eq(1).clear().type(`password${randomNumber}`);
        cy.get('.v-field__input[id*="Nama Paket"]').clear().should('have.value', '').type(`Paket${randomNumber}`);
        cy.get('.v-field__input[id*="Harga Dasar"]').clear().should('have.value', '').type(`${randomNumber * 100}`);

        cy.get('.app-select [role="combobox"]').filter(':has(label:contains("Status Paket"))').then(($dropdown) => {
            const currentStatus = $dropdown.find('.v-select__selection-text').text().trim();

            cy.log('Current status:', currentStatus);

            cy.wrap($dropdown).click();

            const oppositeStatus = currentStatus === 'Aktif' ? 'Tidak Aktif' : 'Aktif';
            cy.log('Opposite status to select:', oppositeStatus);

            cy.contains('.v-list-item', oppositeStatus)
                .should('be.visible')
                .click();
        });

        // Belum ada code untuk set margin dan tipe margin

        cy.contains('Simpan').click();

        cy.url().should('include', '/products/').and('include', 'mode=view');
    });
});

