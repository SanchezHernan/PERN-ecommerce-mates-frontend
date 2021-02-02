class Auth {
    constructor() {
        this.autenticated = false;
    }

    login() {
        this.autenticated = true;
        console.log('auth');
    }

    logout() {
        this.autenticated = false;
    }

    isAuthenticated() {
        return this.autenticated;
    }
}

export default new Auth();