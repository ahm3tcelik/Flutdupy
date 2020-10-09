const templates = [
    { id: 1, name: 'Music Player', image: 'https://resim.com' },
    { id: 2, name: 'Cloud Music Player', image: 'https://resim.com' }
];

function getTemplates(id = -1) {

    if(id == -1) 
        return templates;

    return templates.filter(p => p.id == id);
}

module.exports = {
    getTemplates
}
