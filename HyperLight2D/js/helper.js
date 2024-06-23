export function getImage(path, count){
    let images = [];
    let link;
    for(let i = 1; i <= count; i++){
        link = '../assets/' + path.replace('.png', '') + '_' + i + '.png';
        // paths.push(link);
        const img = new Image();
        img.src = link;
        images.push(img); 
    }
    return images;
}

export function getSingleImage(path){
    const img = new Image();
    img.src = '../assets/' + path;
    return img;
}