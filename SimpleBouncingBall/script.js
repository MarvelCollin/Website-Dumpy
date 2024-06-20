window.onload = function () {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // Set shadow properties
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

  // Create an image object
  const img = new Image();
  img.src = "https://via.placeholder.com/150"; // Replace with your image URL

  // Draw the image when it has loaded
  img.onload = function () {
    ctx.drawImage(img, 100, 100, 150, 150);
  };
};
