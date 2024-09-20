document.addEventListener("DOMContentLoaded", () => {
  const func = async () => {
    try {
      const arrayText = await window.files.analiceText();
      const div = document.getElementById("content");
      arrayText.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        div.appendChild(p);
      });
    } catch (error) {
      console.error(error);
    }
  };

  func();
});
