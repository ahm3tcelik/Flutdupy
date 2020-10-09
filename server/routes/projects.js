const express = require('express');
const router = express.Router();
const projects = require('../modules/projects');
const fs = require('fs');
const path = require('path');
const { zip } = require('zip-a-folder');
const upload = require('express-fileupload');
const Jimp = require('jimp');
const yaml = require('js-yaml');
const verify = require('./verifyToken');

router.use(verify);
router.use(upload());

const root = path.resolve(__dirname + '/../');

// All Projects
router.get('/', (req, res) => {
    res.send(projects.getProjects());
});

router.get('/:id', (req, res) => {
    res.send(projects.getProjects(req.params.id)[0]);
});

// Update Project
router.put('/:id', (req, res) => {
    if(!req.params.id || !req.body.name)
        return res.status(400).send('Eksik parametre');

    projects.updateProject(req.params.id, req.body.name);
    return res.send('bitti');
});

// Create Project
router.post('/', async (req, res) => {

    if(!req.body.name || !req.body.template_id) {
        res.status(404).send('Eksik Parametre');
    }
    await projects.addProject({template_id: req.body.template_id, name: req.body.name});
    res.send('Başarılı!');
});

// Delete Project by id
router.delete('/', async (req, res) => {
    if(!req.body.id) {
        res.status(400).send('Eksik Parametre');
    }
    await projects.deleteProject(req.body.id);
    res.send('bitti');
});

router.get('/app-config/:id', (req, res) => {
    if(!req.params.id)
        return res.status(400).send('Eksik parametre');

    let dest = root + '/projects/' +
        req.params.id + '/app-config.json';
    let rawdata = fs.readFileSync(dest);
    let config = JSON.parse(rawdata);
    res.send(config);
});

// Update Application id
router.put('/app-config/:id', (req, res) => {
    if(!req.params.id || !req.body.config) {
        res.status(404).send('Eksik Parametre');
    }

    let dest = root + '/projects/' +
        req.params.id + '/app-config.json';
    
    let rawdata = fs.readFileSync(dest);
    let config = JSON.parse(rawdata);

    const entries = Object.entries(req.body.config);
    entries.forEach(element => {
        if(element[0] == 'applicationId') {       
            // save for Android
            replaceFile(root + '/projects/' + req.params.id +
                '/android/app/build.gradle', config.applicationId, 
                req.body.config.applicationId);
            
            // save for ios 
            
            config[element[0]] = element[1];
        }
        else if(element[0] == 'applicationName') {
            // save for Android
            replaceFile(root + '/projects/' + req.params.id +
                '/android/app/src/main/AndroidManifest.xml',
                config.applicationName, req.body.config.applicationName);
            
            // save for ios

            config[element[0]] = element[1];
        }
        else {
            config[element[0]] = element[1];
        }
    });
    
    try {
        fs.writeFileSync(dest, JSON.stringify(config), 'utf8');
        res.send('Başarılı!');
    } catch (err) {
        res.status(404).send(err);
    }
});

// Get in App Settings
router.get('/settings/:id', (req, res) => {
    if(!req.params.id)
        return res.status(400).send('Eksik Parametre');
        
    let dest = path.resolve(__dirname + '/../projects/' 
        + req.params.id + '/assets/cfg/settings.json');

    let rawdata = fs.readFileSync(dest);
    let settings = JSON.parse(rawdata);
    
    res.send(settings);
});

// Update in App Settings
router.put('/settings/:id', (req, res) => {
    if(!req.params.id || !req.body.settings) {
        res.status(404).send('Eksik parametre');
    }
    let dest = path.resolve(__dirname + '/../projects/' 
    + req.params.id + '/assets/cfg/settings.json');

    let rawdata = fs.readFileSync(dest);
    let settings = JSON.parse(rawdata);

    const entries = Object.entries(req.body.settings);
    entries.forEach(element => {

        // set admob app id for Android
        if(element[0] == 'androidAdsAppId') { 
            replaceFile(root + '/projects/' + req.params.id + 
                '/android/app/src/main/AndroidManifest.xml',
                settings.androidAdsAppId, element[1]);
            
            settings[element[0]] = element[1];
        }

        // set admob app id for IOS
        else if(element[0] == 'iosAdsAppId') {
            settings[element[0]] = element[1];
        }
        else {
            settings[element[0]] = element[1];
        }
    });

    try {
        fs.writeFileSync(dest, JSON.stringify(settings), 'utf8');
        res.send('Başarılı!')
    } catch (err) {
        res.status(404).send(err);
    }
});

// Get app version Code
router.get('/app-version/:id', (req, res) => {
    if(!req.params.id)
        return res.status(400).send('Eksik parametre');

    const src = './projects/' + req.params.id + '/pubspec.yaml';
    try {
        const doc = yaml.safeLoad(fs.readFileSync(src, 'utf8'));
        console.log(doc.version);
        const code = doc.version.substr(doc.version.indexOf("+") + 1);
        const name = doc.version.substring(0,doc.version.indexOf("+"));
        
        res.send({
            version_name: name,
            version_code: code
        });

    } catch (err) {
        res.status(404).send('Error');
    }
});

// Update app version name,code
router.put('/app-version/:id', (req, res) => {
    if(!req.params.id || !req.body.version)
        return res.status(400).send('Eksik parametre');
    
    const src = './projects/' + req.params.id + '/pubspec.yaml';
    try {
        const doc = yaml.safeLoad(fs.readFileSync(src, 'utf8'));
        doc.version = req.body.version.version_name + 
            '+' + req.body.version.version_code;
        const pubspec = yaml.safeDump(doc);
        
        try {
            
            fs.writeFileSync(src, pubspec, 'utf8');
            res.send('Başarılı!');

        } catch (err) {
            return res.status(404).send(err);
        }

    } catch (err) {
        res.status(404).send('Error');
    }
});

// Set google-services.json
router.put('/google-services/:id', (req, res) => {
    if(!req.files || !req.params.id) {
        res.status(404).send('Eksik parametre');
    }
    let file = req.files.file;
    file.mv('./projects/' + req.params.id + '/android/app/google-services.json', (err) => {
        if(err) {
            res.status(404).send(err);
        }
        else {
            res.send('Yüklendi');
        }
    });
});

// Set app icon
router.put('/app-icon/:id', (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.params.id) {
        return res.status(400).send('Eksik parametre');
    }

    let icon = req.files.icon;

    icon.mv('./projects/' + req.params.id + '/' + icon.name, (err) => {
        if(err) {
            res.status(404).send(err);
        }
        else {
            const resDir = './projects/' + req.params.id + '/android/app/src/main/res';
            Jimp.read('./projects/' + req.params.id + '/' + icon.name, (err, data) => {
                if(err) {
                    res.send(err);
                    return;
                }
                // generate for android   
                data.resize(192, 192).quality(60).write(resDir + '/mipmap-xxxhdpi/ic_launcher.png');
                data.resize(144, 144).quality(60).write(resDir + '/mipmap-xxhdpi/ic_launcher.png');
                data.resize(96, 96).quality(60).write(resDir + '/mipmap-xhdpi/ic_launcher.png');
                data.resize(72, 72).quality(60).write(resDir + '/mipmap-hdpi/ic_launcher.png');
                data.resize(48, 48).quality(60).write(resDir + '/mipmap-mdpi/ic_launcher.png');
                
                // generate for ios
                
                res.send('Başarılı!');
            });
        }
    });
});

// Get App Icon
router.get('/app-icon/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('Eksik Parametre');

    const src = root + /projects/ + req.params.id + 
    '/android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png';
    res.set({'Content-Type': 'image/png'});
    res.sendFile(src);
});

// Get App Background
router.get('/app-background/:id/', (req, res) => {
    
    if(!req.params.id) return res.status(400).send('Eksik Parametre');
    
    const src = root + /projects/ + req.params.id + 
    '/assets/images/background.jpg';
    res.set({'Content-Type': 'image/jpg'});
    res.sendFile(src);
});

// Update App Background
router.put('/app-background/:id/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.params.id) {
        return res.status(400).send('Eksik parametre');
    }

    let background = req.files.background;
    const src = './projects/' + req.params.id + '/assets/images/background.jpg';

    background.mv(src, (err) => {
        if(err) {
            res.status(400).send(err);
        }
        else {
            Jimp.read(src, (err, data) => {
                if(err) {
                    res.status(400).send(err);
                    return;
                }
                // generate for android   
                data.resize(150, 330).quality(60).write(src);
                
                // generate for ios
                
                res.send('Başarılı!');
            });
        }
    });
});

//Get splash image
router.get('/splash-image/:id/', (req, res) => {
    if(!req.params.id) return res.status(400).send('Eksik Parametre')

    const src = root + /projects/ + req.params.id + 
    '/android/app/src/main/res/drawable/splash_logo.png';
    res.set({'Content-Type': 'image/png'});
    res.sendFile(src);
});

// Set splash image
router.put('/splash-image/:id/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.params.id) {
        return res.status(400).send('Eksik parametre');
    }

    let splash_logo = req.files.splash_image;
    const src = './projects/' + req.params.id 
    + '/android/app/src/main/res/drawable/splash_logo.png';

    splash_logo.mv(src, (err) => {
        if(err) {
            res.status(400).send(err);
        }
        else {
            Jimp.read(src, (err, data) => {
                if(err) {
                    res.status(400).send(err);
                    return;
                }
                // generate for android   
                data.resize(150, 150).quality(60).write(src);
                
                // generate for ios 
                res.send('Başarılı!');
            });
        }
    });


});


// Download Project
router.get('/download/:id', async (req, res) => {

    if(!req.params.id)
        return res.status(400).send('Eksik Parametre!');

    const src =  __dirname + '/../projects/' + req.params.id + '/';
    const dest = __dirname + '/../temp/' + req.params.id + '.zip';

    try {
        await zip(src, dest);
        res.set({'Content-Type': 'application/zip'});
        res.sendFile(path.resolve(dest));
    } catch (err) {
        res.status(400).send(err);
    
    }
});

function replaceFile(file, oldValue, newValue) {
   fs.readFile(file, 'utf8', (err, data) =>  {
        if(err) { 
           console.log(err);
            return 0;
        }
        let result = data.replace(oldValue, newValue);
        fs.writeFile(file, result, 'utf8', (err) => {
            if(err) return 0;
            return 1;
        });
   });
}

module.exports = router;
