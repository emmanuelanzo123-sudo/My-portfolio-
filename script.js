
// ==================================
// XY / PERSONAL PORTFOLIO JAVASCRIPT
// ==================================


// 1. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.innerHTML = isOpen
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });

  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}


// 2. AUTOMATIC COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// 3. CONTACT FORM

const YOUR_EMAIL = "anzoemmanuel0@gmail.com";

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

if (contactForm) {

  contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    if (formStatus) {
      formStatus.textContent = "Please wait while your message is being sent...";
      formStatus.style.color = "blue";
    }

    try {

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      data._subject = "New Message From Emmanuel's Portfolio";
      data._template = "table";
      data._replyto = data.email;

      const response = await fetch(
        `https://formsubmit.co/ajax/${YOUR_EMAIL}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },

          body: JSON.stringify(data)
        }
      );

      const responseText = await response.text();

      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          "Unexpected response from the email service. Check your internet connection."
        );
      }

      if (!response.ok) {
        throw new Error(
          result.message || `Server error: ${response.status}`
        );
      }

      if (String(result.success).toLowerCase() !== "true") {
        throw new Error(
          result.message || "The email service did not accept your message."
        );
      }

      if (formStatus) {
        formStatus.textContent =
          "SUCCESS! Your message has been sent. Thank you for contacting me.";
        formStatus.style.color = "green";
      }

      contactForm.reset();

    } catch (error) {

      console.error("Contact Form Error:", error);

      if (formStatus) {
        formStatus.textContent =
          "ERROR: " + error.message;
        formStatus.style.color = "red";
      }

    } finally {

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML =
          'Send Message <i class="fas fa-paper-plane"></i>';
      }

    }

  });

}
