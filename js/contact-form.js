document.getElementById("contact-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const form = e.target;
    await fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      body: new FormData(form),
    });
    alert("Message sent!");
    form.reset();
  });
  