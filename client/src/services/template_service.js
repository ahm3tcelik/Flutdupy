import axios from 'axios';
import store from '@/store';

const url = process.env.NODE_ENV == 'development' ?
    'http://localhost:3000/api/projects' : '/api/templates';

class TemplateService {
    
    static async getTemplates() {
        try {
            const res = await axios.get(url + '/', {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? res.data : [];
        } catch (err) {
            console.error(err);
            return [];
        }
    }
}

export default TemplateService;
