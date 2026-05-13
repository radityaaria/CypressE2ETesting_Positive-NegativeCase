describe('Update Settings', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/settings/edit');
    });

    it('berhasil membuka halaman edit Settings', () => {

        const files = ['test-image.png', 'test-image2.png', 'test-image3.png'];
        const logoIndex = Math.floor(Math.random() * files.length);
        const logoLoginIndex = Math.floor(Math.random() * files.length);
        const faviconIndex = Math.floor(Math.random() * files.length);

        cy.contains('label', 'Pilih Logo').parent().find('input[type="file"]')
        .selectFile(`cypress/fixtures/${files[logoIndex]}`, { force: true });

        cy.contains('label', 'Pilih Logo Login').parent().find('input[type="file"]')
        .selectFile(`cypress/fixtures/${files[logoLoginIndex]}`, { force: true });

        cy.contains('label', 'Pilih Favicon').parent().find('input[type="file"]')
        .selectFile(`cypress/fixtures/${files[faviconIndex]}`, { force: true });

        const randomNumber = Math.floor(Math.random() * 100);
        cy.get('.v-field__input[id*="Frontend URL"]').clear().type(`https://dev.temansantaimu${randomNumber}.com`);
        cy.get('.v-field__input[id*="Deskripsi"]').clear().type(`Platform Top Up Game Tercepat, Termurah, dan Terpercaya di Indonesia${randomNumber}.`);
        cy.get('.v-field__input[id*="Hak Cipta"]').clear().type(`© 2026 Topup Game App${randomNumber}. All rights reserved.`);

        cy.get('.v-field__input[id*="YouTube"]').clear().type(`https://tiktok.com/@topupgame${randomNumber}_id`);
        cy.get('.v-field__input[id*="Threads"]').clear().type(`https://www.threads.com/@nabilchiheb/post/DXHbq4gAiC1?xmt=AQF0WvqZehAta_JK7IoX9invPt3FWFpcfsN3o849LoxvGA${randomNumber}`);
        cy.get('.v-field__input[id*="Instagram"]').clear().type(`https://instagram.com/topupgame_id${randomNumber}`);
        cy.get('.v-field__input[id*="TikTok"]').clear().type(`https://tiktok.com/@topupgame_id${randomNumber}`);

        cy.get('.v-field__input[id*="Email"]').clear().type(`support${randomNumber}@topupgame.com`);
        cy.get('.v-field__input[id*="WhatsApp"]').clear().type(`628${randomNumber*1000000}`);

        cy.contains('button', 'Simpan Perubahan').click();

        cy.url().should('include', '/settings');

    });
});

