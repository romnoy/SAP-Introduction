/* =========================================================
   לרקוד על עננים — סקריפט קטן לדף
   1. אנימציה עדינה כשחלקים בדף נכנסים למסך
   2. חלון הגדלה לתמונות בגלריה
   3. עדכון השנה בתחתית
   ========================================================= */

// הדף נטען עם JavaScript — אפשר להפעיל אנימציות
document.documentElement.classList.remove('no-js');

/* ---------- 1. הופעה עדינה בגלילה ---------- */
const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealItems.forEach((item) => observer.observe(item));
} else {
  // דפדפן ישן — פשוט מציגים הכול
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

/* ---------- 2. חלון הגדלה לגלריה ---------- */
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox__close');

document.querySelectorAll('.gallery__item').forEach((item) => {
  item.addEventListener('click', () => {
    const thumb = item.querySelector('img');
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = thumb.alt;
    lightbox.showModal();
  });
});

// סגירה: בכפתור ×, בלחיצה על הרקע הכהה, או במקש Escape (אוטומטי)
closeBtn.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

/* ---------- 3. השנה הנוכחית בתחתית ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
