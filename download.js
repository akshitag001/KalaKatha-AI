const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
    { url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Madhubani_painting_at_%E0%A4%AA%E0%A4%9F%E0%A4%A8%E0%A4%BE_%E0%A4%9C%E0%A4%82%E0%A4%95%E0%A5%8D%E0%A4%B6%E0%A4%A8.jpg', name: 'bg_madhubani.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Warli_Art.JPG', name: 'bg_warli.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Pattachitra_painting.jpg', name: 'bg_pattachitra.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/d/df/Gond_painting_on_canvas.jpg', name: 'bg_gond.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Pichwai_Painting.jpg/800px-Pichwai_Painting.jpg', name: 'bg_pichwai.jpg' },
    { url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Tanjore_painting.jpg/800px-Tanjore_painting.jpg', name: 'bg_tanjore.jpg' }
];

const dest = path.join(__dirname, 'public', 'images');

images.forEach(img => {
    const file = fs.createWriteStream(path.join(dest, img.name));
    https.get(img.url, response => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log('Downloaded', img.name);
        });
    }).on('error', err => {
        fs.unlink(path.join(dest, img.name));
        console.error('Error downloading', img.name, err.message);
    });
});
