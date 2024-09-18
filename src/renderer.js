document.addEventListener("DOMContentLoaded", () => {
  const func = async () => {
    try {
      const text = await window.files.extractTextFromImage();
      const message = await window.files.readFiles(text);
      document.getElementById("message").innerHTML = message;
    } catch (error) {
      console.error(error);
    }
  };

  func();
});
