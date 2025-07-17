// Reload the page if a chunk fails to load (e.g., after a deployment)
window.addEventListener("error", function (e) {
  if (e && e.message && e.message.includes("ChunkLoadError")) {
    // Optionally, you can show a message to the user here before reloading
    window.location.reload();
  }
});
