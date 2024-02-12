const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const progress = document.getElementsByClassName('progress');


let i = 1;
update();

function update(){
    if(i == 1){
        prevButton.style.backgroundColor = "grey";
    } else if(i == progress.length){
        nextButton.style.backgroundColor = "grey";
    } else {
        nextButton.style.backgroundColor = "green";
        prevButton.style.backgroundColor = "green";
        
    }

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
    i > 1 ? i-- : i;
    update();
})

nextButton.addEventListener('click', function(){
    i < progress.length ? i++ : i;
    update();
})




