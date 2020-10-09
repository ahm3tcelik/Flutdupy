import axios from 'axios';
import store from '@/store';

const url = process.env.NODE_ENV == 'development' ?
    'http://localhost:3000/api/projects' : '/api/projects';

class ProjectService {
    static async getProjects() {
        try {
            const res = await axios.get(url + '/', {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? res.data : [];
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    static async getProjectById(project_id) {
        try {
            const res = await axios.get(url + '/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? res.data : {};
        } catch (err) {
            console.error(err);
            return {};
        }
    }

    static async setProject(project_id, project_name) {
        try {
            const res = await axios.put(url + '/' + project_id, {
                name: project_name
            },
            {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? 1 : 0;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    static async addProject(template_id, name) {
        try {
            const res = await axios.post(url + '/' , {
                template_id: template_id,
                name: name
            }, 
            {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? 1 : 0;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    static async deleteProject(project_id) {
        try {
            const res = await axios.delete(url + '/', {
                headers: {
                    'auth-token': store.getters['auth/token']
                },
                id: project_id
            });
            return res.status == 200 ? 1 : 0;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    static async getAppConfig(project_id) {
        try {
            const res = await axios.get(url + '/app-config/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? res.data : {};
        } catch (e) {
            console.error(e);
            return {};
        }
    }

    static async setAppConfig(project_id, config) {
        try {
            const res = await axios.put(url + '/app-config/' + project_id,{
                config: config
            },
            {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? 1 : 0;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async getAppVersion(project_id) {
        try {
            const res = await axios.get(url + '/app-version/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? res.data : {};
        } catch (e) {
            console.error(e);
            return {};
        }
    }

    static async setAppVersion(project_id, version) {
        try {
            const res = await axios.put(url + '/app-version/' + project_id,{
                version: version
            },
            {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? 1 : 0;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async getAppIcon(project_id) {
        try {
            const res = await axios.get(url + '/app-icon/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                },
                responseType: 'blob'
            });
            return URL.createObjectURL(res.data);

        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async setAppIcon(project_id, iconFile) {
        let bodyFormData = new FormData();
        bodyFormData.append('icon', iconFile);
        try {
            const res = await axios.put(url + '/app-icon/' + project_id, bodyFormData, {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? 1 : 0;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async getInAppSettings(project_id) { // getAdsConfig() - same file
        try {
            const res = await axios.get(url + '/settings/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? res.data : {};
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    static async setInAppSettings(project_id, settings) { // setAdsConfig() - same file
        try {
            const res = await axios.put(url + '/settings/' + project_id, {
                settings: settings
            },
            {
                headers: {
                    'auth-token': store.getters['auth/token']
                }
            });
            return res.status == 200 ? 1 : 0;
        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    static async setGoogleServices(project_id, file) {

        let bodyFormData = new FormData();
        bodyFormData.append('file', file);

        try {
            const res = await axios.put(url + '/google-services/' + project_id,
                bodyFormData,
                {
                    headers: {
                        'auth-token': store.getters['auth/token']
                    }
                });
            return res.status == 200 ? 1 : 0;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async getAppBackground(project_id) {
        try {
            const res = await axios.get(url + '/app-background/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                },
                responseType: 'blob'
            });
            return URL.createObjectURL(res.data);

        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static getAppBackgroundUrl(project_id) {
        return url + '/app-background/' + project_id;
    }

    static async setAppBackground(project_id, backgroundFile) {
        let bodyFormData = new FormData();
        bodyFormData.append('background', backgroundFile);
        try {
            const res = await axios.put(url + '/app-background/' + project_id,
                bodyFormData, {
                    headers: {
                        'auth-token': store.getters['auth/token']
                    }
                });
            return res.status == 200 ? 1 : 0;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async getSplashImage(project_id) {
        try {
            const res = await axios.get(url + '/splash-image/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                },
                responseType: 'blob'});
            return URL.createObjectURL(res.data);

        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async setSplashImage(project_id, splashImageFile) {
        let bodyFormData = new FormData();
        bodyFormData.append('splash_image', splashImageFile);
        try {
            const res = await axios.put(url + '/splash-image/' + project_id,
                bodyFormData, {
                    headers: {
                        'auth-token': store.getters['auth/token']
                    }
                });
            return res.status == 200 ? 1 : 0;
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    static async getDownload(project_id) {
        try {
            const res = await axios.get(url + '/download/' + project_id, {
                headers: {
                    'auth-token': store.getters['auth/token']
                },
                responseType: 'blob',
            });

            const fileUrl = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', project_id + '.zip');
            document.body.appendChild(link);
            link.click();

            return 1;

        } catch (err) {
            console.error(err);
            return 0;
        }
    }

    static getDownloadLink(project_id) {
        return url + '/download/' + project_id;
    }
}

export default ProjectService;

