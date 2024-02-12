// Mengambil elemen root HTML
const root = document.querySelector('html')

// Membuat elemen kursor utama
const cursor = document.createElement('div')
cursor.classList.add('cursor') // Menambahkan kelas CSS 'cursor'
root.appendChild(cursor) // Menambahkan elemen kursor ke dalam root HTML

// Membuat elemen kursor pengikut
const follower = document.createElement('div')
follower.classList.add('cursor', 'follower') // Menambahkan kelas CSS 'cursor' dan 'cursor__follower'
root.appendChild(follower) // Menambahkan elemen kursor pengikut ke dalam root HTML

// Set posisi awal elemen pengikut
follower.style.left = (follower.clientWidth / 2 * -1) + 'px'; // Set posisi kiri ke 50% dari lebar
follower.style.top = (follower.clientHeight / 2 * -1) + 'px'; // Set posisi atas ke 50% dari tinggi

// Mendengarkan pergerakan mouse
root.addEventListener('mousemove', (e) => {
  setPosition(follower, e) // Menetapkan posisi kursor pengikut
  setPosition(cursor, e) // Menetapkan posisi kursor utama
})

// Fungsi untuk menetapkan posisi kursor
function setPosition(element, e) {
  element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)` // Mengatur transformasi CSS untuk mengikuti pergerakan mouse
}
