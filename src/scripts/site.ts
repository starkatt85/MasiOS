const scrambleTargets = document.querySelectorAll<HTMLElement>("[data-scramble]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

scrambleTargets.forEach((target) => {
  const finalText = target.dataset.scramble ?? target.textContent ?? "";
  const characterPool =
    target.dataset.scramblePool ??
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&?";

  if (reducedMotion) {
    target.textContent = finalText;
    return;
  }

  let frame = 0;
  const totalFrames = Math.ceil(Array.from(finalText).length * 1.8);
  const scramble = () => {
    target.textContent = Array.from(finalText)
      .map((character, index) => {
        if (/\s|[()-]/u.test(character)) return character;
        return index < frame
          ? character
          : characterPool[Math.floor(Math.random() * characterPool.length)];
      })
      .join("");
    frame += 1;
    if (frame <= totalFrames) window.setTimeout(scramble, 45);
    else target.textContent = finalText;
  };
  scramble();
});

const galleryTargets = document.querySelectorAll<HTMLElement>(".gallery-reveal");
const serviceCardTargets = document.querySelectorAll<HTMLElement>(".service-card-scroll");

if (reducedMotion) {
  galleryTargets.forEach((target) => target.style.setProperty("--gallery-progress", "1"));
  serviceCardTargets.forEach((target) => {
    target.style.setProperty("--service-progress", "1");
    target.style.setProperty("--service-rotation", "0deg");
  });
} else {
  let framePending = false;
  const updateScrollEffects = () => {
    const viewportHeight = window.innerHeight;
    const start = viewportHeight * 0.92;
    const end = viewportHeight * 0.5;
    const progressFor = (target: HTMLElement) =>
      Math.max(0, Math.min(1, (start - target.getBoundingClientRect().top) / (start - end)));

    galleryTargets.forEach((target) => {
      target.style.setProperty("--gallery-progress", progressFor(target).toFixed(3));
    });
    serviceCardTargets.forEach((target) => {
      const progress = progressFor(target);
      const direction = target.dataset.flipDirection === "right" ? 1 : -1;
      target.style.setProperty("--service-progress", progress.toFixed(3));
      target.style.setProperty("--service-rotation", `${(direction * 75 * (1 - progress)).toFixed(2)}deg`);
    });
    framePending = false;
  };
  const requestUpdate = () => {
    if (!framePending) {
      framePending = true;
      window.requestAnimationFrame(updateScrollEffects);
    }
  };
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  updateScrollEffects();
}
