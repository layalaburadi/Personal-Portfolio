
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");

// Mobile navigation
menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuButton.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    menuButton.textContent = "☰";
  });
});

// Update copyright year
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Handle certificate images and links
document.querySelectorAll(".cert").forEach((card) => {
  const image = card.querySelector(".certificate-photo img");
  const photoBox = card.querySelector(".certificate-photo");
  const viewLink = card.querySelector(".view-image");

  if (!image || !photoBox) return;

  const imageSource = image.getAttribute("src") || "";

  // Hide placeholder images until a real link is added
  if (
    !imageSource.trim() ||
    imageSource.startsWith("PUT_IMAGE_LINK_HERE")
  ) {
    photoBox.classList.add("no-image");

    if (viewLink) {
      viewLink.classList.add("no-link");
    }

    return;
  }

  // Hide image if the link does not work
  image.addEventListener("error", () => {
    photoBox.classList.add("no-image");

    if (viewLink) {
      viewLink.classList.add("no-link");
    }
  });
});
