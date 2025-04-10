document.getElementById("newsletter-form")?.addEventListener("submit", async e => {
    e.preventDefault();
    const email = e.target.querySelector("input").value;
    await fetch("https://formspree.io/f/your-form-id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    alert("You're subscribed!");
  });