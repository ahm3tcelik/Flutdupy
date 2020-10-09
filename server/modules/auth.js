const admins = [
    { id: 1, email: "ahm3tcelik72@gmail.com", password: "qF1S5AtpbTuBr"},
    { id: 2, email: "root@gmail.com", password: "oha15987410x"}
];

function login(email, password) {
    return admins.filter(p => p.email.trim() == email && p.password.trim() == password);
}

module.exports = {
    login
}
