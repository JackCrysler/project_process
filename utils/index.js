function cipher(payload, pwd = 'jack') {
    const crypto = require('crypto');
    const hmac = crypto.createHmac('sha256', pwd);

    hmac.update(payload);
    return hmac.digest('hex')
}
module.exports = {
    cipher
}