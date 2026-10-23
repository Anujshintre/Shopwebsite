const D = loadData();
const $ = (s) => document.querySelector(s);
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const c = D.contact;

document.title = D.shop.name + " | " + D.shop.tagline;
$("#brand").innerHTML = `<img src="${esc(D.shop.logo)}" alt="${esc(D.shop.name)} logo"><span>${esc(D.shop.name)}</span>`;
$("#intro-logo").src = D.shop.logo;
$("#intro-name").textContent = D.shop.name;

$("#heroInner").innerHTML = D.hero.map((h, i) => `
  <div class="carousel-item ${i ? "" : "active"}" data-bs-interval="5500">
    <img src="${esc(h.img)}" alt="${esc(h.title)}">
    <div class="hero-cap"><h1>${esc(h.title)}</h1><p>${esc(h.sub)}</p><a href="#occasions" class="btn-shop">View collection</a></div>
  </div>`).join("");

$("#strip").innerHTML = `
  <div class="row g-3 mb-5">${D.strip.images.map((s, i) => `<div class="col-6" data-aos="zoom-in" data-aos-delay="${i * 150}"><div class="zoom"><img src="${esc(s)}" alt=""></div></div>`).join("")}</div>
  <div class="text-center" data-aos="fade-up"><h2>${esc(D.strip.title)}</h2><p class="lead-s">${esc(D.strip.text)}</p><a href="#occasions" class="btn-maroon">View collection</a></div>`;

$("#occTitle").textContent = D.occasionsTitle;
$("#occGrid").innerHTML = D.occasions.map((o, i) => `
  <div class="col-6 col-lg-3" data-aos="fade-up" data-aos-delay="${i * 120}">
    <a class="occ" href="https://wa.me/${esc(c.whatsapp)}?text=${encodeURIComponent("Hi, I want to see the " + o.label + " collection")}" target="_blank" rel="noopener">
      <div class="zoom"><img src="${esc(o.img)}" alt="${esc(o.label)}"></div><span>${esc(o.label)}</span></a>
  </div>`).join("");

$("#craftL").style.backgroundImage = `url("${D.craft.imgLarge}")`;
$("#craftR").innerHTML = `<h2>${esc(D.craft.title)}</h2><p>${esc(D.craft.text)}</p><img src="${esc(D.craft.imgSmall)}" class="craft-s" alt="">`;

$("#reviews").innerHTML = D.reviews.map((r, i) => `
  <div class="col-md-4" data-aos="flip-up" data-aos-delay="${i * 150}">
    <div class="review"><img src="${esc(r.img)}" alt="${esc(r.name)}"><p>“${esc(r.text)}”</p><h6>${esc(r.name)}</h6></div>
  </div>`).join("");

const map = encodeURIComponent(c.mapQuery || c.address);
$("#contactBox").innerHTML = `
  <h3>${esc(D.shop.name)}</h3>
  <p><i class="bi bi-geo-alt"></i> ${esc(c.address)}</p>
  <p><i class="bi bi-clock"></i> ${esc(c.hours)}</p>
  <p><i class="bi bi-telephone"></i> <a href="tel:${esc(c.phone.replace(/\s/g, ""))}">${esc(c.phone)}</a></p>
  <p><i class="bi bi-instagram"></i> <a href="https://instagram.com/${esc(c.instagram)}" target="_blank" rel="noopener">@${esc(c.instagram)}</a></p>
  <a class="btn-maroon" href="https://www.google.com/maps/search/?api=1&query=${map}" target="_blank" rel="noopener">Get directions</a>`;
$("#mapFrame").src = `https://www.google.com/maps?q=${map}&output=embed`;
$("#wa").href = `https://wa.me/${c.whatsapp}`;
$("#foot").textContent = `© ${new Date().getFullYear()} ${D.shop.name}. ${D.shop.tagline}.`;

// page-load intro, then reveal; navbar shadow on scroll
window.addEventListener("load", () => setTimeout(() => $("#intro").classList.add("done"), 1100));
addEventListener("scroll", () => $(".navbar").classList.toggle("scrolled", scrollY > 40), { passive: true });
AOS.init({ duration: 800, once: true, offset: 80, disable: matchMedia("(prefers-reduced-motion: reduce)").matches });
