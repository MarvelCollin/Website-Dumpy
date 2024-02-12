const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        unactive();
        // card.style.color = 'red';
        card.classList.add('active');
    })
});

function unactive() {
    cards.forEach(card => {
        card.classList.remove('active');
    })
}