export function getSrc(path, count){
    let paths = [];
    let link;
    for(let i = 1; i <= count; i++){
        link = '../assets/' + path + '_' + i + '.png';
        paths.push(link);
    }
    return paths;
}