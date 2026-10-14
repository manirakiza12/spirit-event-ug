'use strict';
const chatToggle = document.querySelector('#chatToggle');
const chatPanel = document.querySelector('#chatPanel');
function setChatOpen(open) {
  chatPanel.hidden = !open;
  chatToggle.setAttribute('aria-expanded', String(open));
  chatToggle.setAttribute('aria-label', open ? 'Close event planning chat' : 'Open event planning chat');
  if (open) document.querySelector('#chatClose').focus();
  else chatToggle.focus();
}
chatToggle.addEventListener('click', () => setChatOpen(chatPanel.hidden));
document.querySelector('#chatClose').addEventListener('click', () => setChatOpen(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !chatPanel.hidden) setChatOpen(false);
});
const answers = {
  equipment: 'We offer sound systems, microphones, tents, chairs, stage setup, music equipment and event production support. Tell Jimmy your date and venue to check what is available.',
  booking: 'Use the booking form to share your event date, location and equipment needs. It prepares a WhatsApp message for you to send. Jimmy will discuss availability, pricing and the details with you.',
  location: 'You can find Spirit Events at Media Plaza, Kira Road, Kampala, Uganda. Call +256 756 408 204 to discuss your event or arrange a visit.'
};
document.querySelectorAll('[data-answer]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#chatAnswer').textContent = answers[button.dataset.answer];
  });
});
