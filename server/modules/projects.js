const fs = require('fs-extra');
const path = require('path');

const root = path.resolve(__dirname + '/../');

async function addProject(project) {

    let pdata = fs.readFileSync(root + '/projects.json');

    let projects = JSON.parse(pdata);

    if(projects.length == 0) {
        project.id = 1;
    }
    else {
        project.id = projects[projects.length - 1].id + 1;
    }

    projects.push(project);
    
    // save project to file

    fs.writeFile(root + '/projects.json', JSON.stringify(projects), 'utf8', async (err, data) => {
        if(err) {
            return 0;
        }

        // clone template, set to project
        const src = path.resolve('./templates/' + project.template_id + '/');
        const dest = path.resolve('./projects/' + project.id + '/');

        try {
            await fs.copy(src, dest);
          } catch (err) {
            console.error(err)
        }
        /*
        fs.copy(src, dest, err => {
            if(err) {
                console.log('hata');
                console.error(err);
                return console.error(err);}
            console.log('success');
        });
        */
    });
}

function getProjects(id = -1) { // -1 : all projects 

    let pdata = fs.readFileSync(root + '/projects.json');
    let projects = JSON.parse(pdata);

    if(id == -1) 
        return projects;

    return projects.filter(p => p.id == id);
}

function updateProject(id, name) {
    let pdata = fs.readFileSync(root + '/projects.json');
    let projects = JSON.parse(pdata);
    const index = projects.findIndex(c => c.id == id);
    projects[index].name = name;
    fs.writeFile(root + '/projects.json', JSON.stringify(projects), 'utf8', (err, data) => {
        if(err)
            return 0;
        return 1;
    });
    return -1;
}

async function deleteProject(id) {

    let pdata = fs.readFileSync(root + '/projects.json');
    let projects = JSON.parse(pdata);

    const index = projects.findIndex(c => c.id == id);

    projects.splice(index, 1);
    
    // Delete from projects.json
    fs.writeFile(root + '/projects.json', JSON.stringify(projects), 'utf8', async (err, data) => {
        if(err) {
            return 0;
        }
        try {
            await fs.remove(path.resolve('./projects/' + id + '/'));
            console.log('silindi!')
            return 1;
          } catch (err) {
            console.error(err)
            return 0;
        }
    });
}

module.exports = {
    addProject,
    getProjects,
    updateProject,
    deleteProject
}