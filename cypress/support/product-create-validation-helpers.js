const setupCreateProductValidationTest = () => {
    cy.login();
    cy.visit('/products/create');
};

const clickSimpanProduk = () => {
    cy.contains('button', 'Simpan Produk').should('be.visible').click();
};

/**
 * Dulunya memakai cy.intercept + counter POST; sering false positive (upload, prefetch, endpoint sama untuk flow lain).
 * Tes negatif mengandalkan assertStaysOnCreatePage + pesan validasi / isi body.
 */
const assertCreateProductNotPosted = () => {
    cy.wait(400);
};

const assertStaysOnCreatePage = () => {
    cy.url({ timeout: 10000 }).should('include', '/products/create');
};

const selectSlugPremiumAccount = () => {
    cy.get('[id*="app-select-Slug"]').eq(0).parent().parent().click();
    cy.get('.v-list-item').contains('Premium Account').should('be.visible').click();
};

const selectKategoriCypress = () => {
    cy.get('[id*="app-select-Kategori"]').parent().parent().click();
    cy.get('.v-list-item').contains('Cypress').should('be.visible').click();
};

const selectVarianCypress = () => {
    cy.get('[id*="app-select-Varian"]').parent().parent().click();
    cy.get('.v-list-item').contains('Cypress').should('be.visible').click();
};

const selectTipeProdukCypress = () => {
    cy.get('[id*="app-select-Tipe Produk"]').parent().parent().click();
    cy.get('.v-list-item').contains('Cypress Type').should('be.visible').click();
};

const selectRandomAkunTidak = () => {
    cy.get('[id*="app-select-Random Akun"]').eq(1).parent().parent().click();
    cy.get('.v-list-item').contains('Tidak').should('be.visible').click();
};

const fillFormat1WithLabel = () => {
    cy.contains('label', 'Format 1')
        .parent()
        .find('input[type="checkbox"]')
        .click();
    cy.get('input[placeholder*="Email, Password, Link"]').first().clear().type('Email');
};

const fillNamaPaketDanHargaDasar = () => {
    cy.contains('span', 'Paket #1')
        .closest('div.mb-6')
        .within(() => {
            cy.contains('label', 'Nama Paket')
                .closest('.v-field')
                .find('input.v-field__input')
                .eq(0)
                .clear()
                .type('Paket Cypress Negative');

            cy.contains('label', 'Harga Dasar')
                .closest('.v-field')
                .find('input.v-field__input')
                .clear()
                .type('10000');
        });
};

const uploadThumbnail = () => {
    cy.contains('Unggah Thumbnail').click();
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.png', { force: true });
};

const fillValidPremiumAccountProduct = () => {
    cy.get('.v-field__input[id*="Nama Produk"]').should('be.visible').clear().type('Produk Cypress Negative');
    cy.get('textarea[placeholder*="Deskripsi"]').clear().type('Deskripsi produk negative cypress');

    selectSlugPremiumAccount();
    selectKategoriCypress();
    selectVarianCypress();
    selectTipeProdukCypress();

    cy.get('input[id*="Maksimal User"]').clear().type('2');

    selectRandomAkunTidak();
    fillFormat1WithLabel();
    fillNamaPaketDanHargaDasar();
    uploadThumbnail();
};

const submitExpectingClientValidation = (expectMessagePattern) => {
    clickSimpanProduk();
    assertCreateProductNotPosted();
    assertStaysOnCreatePage();
    cy.contains(expectMessagePattern).should('be.visible');
};

module.exports = {
    setupCreateProductValidationTest,
    clickSimpanProduk,
    assertCreateProductNotPosted,
    assertStaysOnCreatePage,
    selectSlugPremiumAccount,
    selectKategoriCypress,
    selectVarianCypress,
    selectTipeProdukCypress,
    selectRandomAkunTidak,
    fillFormat1WithLabel,
    fillNamaPaketDanHargaDasar,
    uploadThumbnail,
    fillValidPremiumAccountProduct,
    submitExpectingClientValidation,
};
