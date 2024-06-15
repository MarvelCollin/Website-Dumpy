window.onload = function () {
    const canvas = document.getElementById("box"); // Mendapatkan elemen canvas
    const ctx = canvas.getContext("2d"); // Mendapatkan konteks 2D
    const checkpointSize = 20; // Ukuran checkpoint
    const shooterWidth = 20; // Lebar penembak
    const shooterHeight = 40; // Tinggi penembak
    let shooterX = canvas.width / 2 - shooterWidth / 2; // Posisi awal penembak (sumbu x)
    let shooterY = canvas.height - shooterHeight; // Posisi awal penembak (sumbu y)
    let mouseX, mouseY; // Variabel untuk menyimpan posisi kursor
    let balls = []; // Array untuk menyimpan bola yang ditembakkan
    let lastShotTime = 0; // Waktu terakhir tembakan dilakukan
  
    // Mendengarkan pergerakan kursor
    canvas.addEventListener("mousemove", function (event) {
      mouseX = event.clientX - canvas.getBoundingClientRect().left; // Mengambil posisi x kursor
      mouseY = event.clientY - canvas.getBoundingClientRect().top; // Mengambil posisi y kursor
    });
  
    // Mendengarkan tombol keyboard yang ditekan
    document.addEventListener("keydown", function (event) {
      if (event.key === "x" && Date.now() - lastShotTime >= 10) {
        // Jika tombol 'x' ditekan dan sudah melewati 300ms
        shoot(); // Panggil fungsi shoot untuk menembak
        lastShotTime = Date.now(); // Perbarui waktu terakhir tembakan dilakukan
      }
    });
  
    // Menggambar penembak
    function drawShooter() {
      ctx.fillStyle = "black"; // Warna hitam
      ctx.fillRect(shooterX, shooterY, shooterWidth, shooterHeight); // Menggambar penembak
    }
  
    // Menggambar checkpoint
    function drawCheckpoint() {
      ctx.fillStyle = "red"; // Warna merah
      ctx.fillRect(
        canvas.width / 2 - checkpointSize / 2,
        canvas.height - checkpointSize,
        checkpointSize,
        checkpointSize
      ); // Menggambar checkpoint
    }
  
    // Fungsi untuk menembak
    function shoot() {
      const dx = mouseX - (shooterX + shooterWidth / 2); // Perbedaan posisi x antara kursor dan penembak
      const dy = mouseY - shooterY; // Perbedaan posisi y antara kursor dan penembak
      const distance = Math.sqrt(dx * dx + dy * dy); // Menghitung jarak antara kursor dan penembak
      const speedFactor = 10; // Faktor kecepatan tembakan
      const speedX = (dx / distance) * speedFactor; // Kecepatan tembakan pada sumbu x
      const speedY = (dy / distance) * speedFactor; // Kecepatan tembakan pada sumbu y
      balls.push({ x: shooterX + shooterWidth / 2, y: shooterY, speedX, speedY }); // Menambahkan bola baru ke array
    }
  
    // Menggambar bola-bola yang sedang terbang
    function drawBalls() {
      ctx.fillStyle = "blue"; // Warna biru
      balls.forEach((ball) => {
        ctx.beginPath(); // Mulai path baru
        ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2); // Menggambar lingkaran sebagai bola
        ctx.fill(); // Mengisi bola dengan warna
      });
    }
  
    // Mengupdate posisi bola-bola yang sedang terbang
    function updateBalls() {
      balls.forEach((ball) => {
        ball.x += ball.speedX; // Update posisi bola pada sumbu x
        ball.y += ball.speedY; // Update posisi bola pada sumbu y
      });
      balls = balls.filter(
        (ball) =>
          ball.x >= 0 &&
          ball.x <= canvas.width &&
          ball.y >= 0 &&
          ball.y <= canvas.height
      ); // Menghapus bola yang keluar dari canvas
    }
  
    // Menghapus gambar yang sudah ada di canvas
    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus semua isi canvas
    }
  
    // Fungsi untuk menggambar semua elemen di canvas
    function draw() {
      clearCanvas(); // Menghapus gambar yang sudah ada
      drawCheckpoint(); // Menggambar checkpoint
      drawShooter(); // Menggambar penembak
      drawBalls(); // Menggambar bola-bola yang sedang terbang
      updateBalls(); // Mengupdate posisi bola-bola yang sedang terbang
      requestAnimationFrame(draw); // Meminta browser untuk menggambar frame berikutnya
    }
  
    draw(); // Memulai loop untuk menggambar elemen-elemen di canvas
  };
  