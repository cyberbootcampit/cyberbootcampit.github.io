const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const year = document.querySelector('[data-year]');
const currentPage = document.body.dataset.page;

if (year) year.textContent = new Date().getFullYear();

const setHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

document.querySelectorAll('[data-page-link]').forEach((link) => {
  const isCurrent = link.dataset.pageLink === currentPage;
  link.classList.toggle('is-current', isCurrent);
  if (isCurrent) link.setAttribute('aria-current', 'page');
});

const setMobileNavState = (open) => {
  header?.classList.toggle('nav-open', open);
  document.body.classList.toggle('nav-is-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
  menuToggle?.setAttribute('aria-label', open ? 'Chiudi navigazione' : 'Apri navigazione');
};

const closeMobileNav = () => {
  setMobileNavState(false);
};

menuToggle?.addEventListener('click', () => {
  setMobileNavState(!header?.classList.contains('nav-open'));
});

siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeMobileNav();
}));

const registrationNotices = Array.from(document.querySelectorAll('[data-registration-notice]'));

const closeRegistrationNotices = () => {
  registrationNotices.forEach((notice) => {
    notice.removeAttribute('data-open');
    notice.querySelector('[role="tooltip"]').setAttribute('aria-hidden', 'true');
  });
};

registrationNotices.forEach((notice) => {
  const trigger = notice.querySelector('[data-registration-trigger]');
  const tooltip = notice.querySelector('[role="tooltip"]');
  const show = () => {
    closeRegistrationNotices();
    notice.setAttribute('data-open', '');
    tooltip.setAttribute('aria-hidden', 'false');
  };

  notice.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') show();
  });
  notice.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse' && !trigger.matches(':focus-visible')) {
      notice.removeAttribute('data-open');
      tooltip.setAttribute('aria-hidden', 'true');
    }
  });
  trigger.addEventListener('focus', show);
  trigger.addEventListener('click', show);
  trigger.addEventListener('blur', () => {
    notice.removeAttribute('data-open');
    tooltip.setAttribute('aria-hidden', 'true');
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('[data-registration-notice]')) closeRegistrationNotices();
  if (header?.classList.contains('nav-open') && !event.target.closest('[data-header]')) closeMobileNav();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeRegistrationNotices();
    closeMobileNav();
  }
});
window.addEventListener('resize', () => {
  closeRegistrationNotices();
  if (window.innerWidth > 980) closeMobileNav();
});
menuToggle?.addEventListener('click', closeRegistrationNotices);

const setAccordionIcon = (detail) => {
  const icon = detail.querySelector('summary i');
  if (icon) icon.textContent = detail.open ? '\u00d7' : '+';
};

document.querySelectorAll('[data-accordion-group] details').forEach((detail) => {
  setAccordionIcon(detail);
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      const group = detail.closest('[data-accordion-group]');
      group?.querySelectorAll('details').forEach((other) => {
        if (other !== detail) {
          other.open = false;
          setAccordionIcon(other);
        }
      });
    }
    setAccordionIcon(detail);
  });
});
