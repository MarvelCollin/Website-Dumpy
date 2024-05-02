document.addEventListener('DOMContentLoaded', function () {

    const firebaseConfig = {
      apiKey: "AIzaSyBIlOKi4tGw5gqM8XV8hJPtIg-7avfaWxQ",
      authDomain: "bnccfrontend-b7d68.firebaseapp.com",
      projectId: "bnccfrontend-b7d68",
      storageBucket: "bnccfrontend-b7d68.appspot.com",
      messagingSenderId: "529760573068",
      appId: "1:529760573068:web:c699ea98f5a2cb070f4da9",
      measurementId: "G-H0MMYZS4YL"
    };
  
    const databaseURL = "https://bnccfrontend-b7d68-default-rtdb.firebaseio.com/registrations.json";
  
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
      event.preventDefault();
      var email = document.getElementById('inputEmail').value;
      var nama = document.getElementById('inputNama').value;
      var phone = document.getElementById('inputPhone').value;
      var event = document.getElementById('inputEvent').value;
  
      var emailError = document.getElementById('emailError');
      var namaError = document.getElementById('namaError');
      var phoneError = document.getElementById('phoneError');
      var eventError = document.getElementById('eventError');
  
      var valid = true;
  
      if (!email.includes('@')) {
        emailError.textContent = 'Email harus memiliki karakter "@"';
        valid = false;
      } else {
        emailError.textContent = '';
      }
  
      if (nama.length < 3) {
        namaError.textContent = 'Nama harus memiliki minimal 3 karakter';
        valid = false;
      } else {
        namaError.textContent = '';
      }
  
      if (!phone.startsWith('08') || phone.length < 11 || phone.length > 13) {
        phoneError.textContent = 'Nomor telepon harus dimulai dengan "08" dan memiliki panjang 11-13 digit';
        valid = false;
      } else {
        phoneError.textContent = '';
      }
  
      if (event === '') {
        eventError.textContent = 'Harap pilih event yang akan diikuti';
        valid = false;
      } else {
        eventError.textContent = '';
      }
  
      if (valid) {
        var data = JSON.stringify({
          email: email,
          nama: nama,
          phone: phone,
          event: event
        });
  
        var xhr = new XMLHttpRequest();
        xhr.open("POST", databaseURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
  
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log("Data successfully stored in Firebase");
              location.reload();
            } else {
              console.error("Error storing data: ", xhr.statusText);
              alert("Failed to submit form. Please try again later.");
            }
          }
        };
  
        xhr.send(data);
      }
    });
  });
  