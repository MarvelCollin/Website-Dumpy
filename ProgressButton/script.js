const prevButton = document.getElementById('next'); 
const nextButton = document.getElementById('prev'); 

const progress = document.getElementsByClassName('progress');

let i = 1;
update();

function update(){
    let j = 0;

    while(j < i){
        progress[j].style.border = "5px solid green";
        j++;
    }

    while(j < progress.length){
        progress[j].style.border = "5px solid grey";
        j++;
    }
}

prevButton.addEventListener('click', function() {
    i < progress.length ? i++ : i;
    update();
})

nextButton.addEventListener('click', function(){
    i > 1 ? i-- : i;
    update();
})




