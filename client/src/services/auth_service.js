import axios from 'axios';
import store from '../store';

const url = process.env.NODE_ENV == 'development' ?
    'http://localhost:3000/api/projects' : '/api/user';

class AuthService {
    static async login(email, password) {
        console.log(window.location.host);
        try {
            const res = await axios.post(url + '/login', {
                "email": email,
                "password": password
            });
            store.dispatch("auth/fetchAuth", {loggedIn: true, token: res.data});
            return 1;

        } catch (err) {
            store.dispatch("auth/fetchAuth", {loggedIn: false, token: ''});
            console.error(err);
            return 0;
        }
    }
    static logOut() {
        store.dispatch('auth/fetchAuth', {loggedIn: false, token: ''});
    }
}

export default AuthService;