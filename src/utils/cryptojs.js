import CryptoJS from 'crypto-js';

export default {

    key: 'M1JyMHpsbXpPMUlUQWVZUQ', // 必须是16位

    // 加密
    encrypt: function (text) {
        let encrypted = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(text),
            CryptoJS.enc.Utf8.parse(window.atob(this.key)),
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            }
        );
        return encrypted.toString();
    },

    // 解密
    decrypt: function (text) {
        let decString = ''
        try {
            let decrypted = CryptoJS.AES.decrypt(
                text,
                CryptoJS.enc.Utf8.parse(window.atob(this.key)),
                {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                }
            );
            decString = CryptoJS.enc.Utf8.stringify(decrypted).toString();
            if (decString.charAt(0) === "{" || decString.charAt(0) === "[") {
                decString = JSON.parse(decString);
            }
        } catch (e) {
            console.warn('解密失败')
        }
        return decString;
    }

};


