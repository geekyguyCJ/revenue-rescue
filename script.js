'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#nav-links');
function closeMenu(returnFocus = false) {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('is-open');
  if (returnFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation.classList.toggle('is-open', !isOpen);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-shell')) closeMenu();
});
document.addEventListener('focusin', event => {
  if (!event.target.closest('.nav-shell')) closeMenu();
});
window.matchMedia('(min-width: 961px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('will-reveal');
    observer.observe(element);
  });
}
document.querySelector('#copyright-year').textContent = new Date().getFullYear();

const form = document.querySelector('#enquiry-form');
const phone = document.querySelector('#phone');
const status = document.querySelector('#form-status');
let preparedEnquiry = '';
phone.addEventListener('input', () => phone.setCustomValidity(''));
form.addEventListener('submit', event => {
  event.preventDefault();
  const digits = phone.value.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15 || !/^[+\d\s().-]+$/.test(phone.value)) {
    phone.setCustomValidity('Please enter a valid phone number, including the area code.');
    phone.reportValidity();
    return;
  }
  phone.setCustomValidity('');
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const name = String(values.get('name')).trim();
  const business = String(values.get('business')).trim();
  if (!name || !business) {
    status.textContent = 'Please enter your name and business name.';
    document.querySelector(!name ? '#name' : '#business').focus();
    return;
  }
  preparedEnquiry = `Hi Revenue Rescue,\n\nI’d like a demo for my business.\n\nName: ${name}\nBusiness: ${business}\nPhone: ${phone.value.trim()}\n\n${String(values.get('message')).trim()}\n`;
  const subject = `Demo enquiry: ${business.replace(/[\r\n]/g, ' ')}`;
  status.textContent = 'Your email draft is ready. Review it and press Send in your email app to submit your enquiry.';
  document.querySelector('#email-fallback').hidden = false;
  document.querySelector('#enquiry-copy').value = preparedEnquiry;
  window.location.href = `mailto:hello@callrescue.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(preparedEnquiry)}`;
});
document.querySelector('#copy-enquiry').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(preparedEnquiry);
    status.textContent = 'Enquiry copied. Paste it into an email to hello@callrescue.ca and send it when you’re ready.';
  } catch {
    const copyField = document.querySelector('#enquiry-copy');
    copyField.hidden = false;
    copyField.focus();
    copyField.select();
    status.textContent = 'Select and copy the enquiry below, then paste it into your email.';
  }
});
