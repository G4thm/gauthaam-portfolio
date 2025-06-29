'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
        
        // Hide sidebar specifically for Resume tab
        if (this.innerHTML.toLowerCase() === 'resume') {
          sidebar.style.display = 'none';
          // Add classes for proper layout adjustment
          const main = document.querySelector('main');
          const mainContent = document.querySelector('.main-content');
          if (main) main.classList.add('sidebar-hidden');
          if (mainContent) mainContent.classList.add('full-width');
        } else {
          // Show sidebar for other tabs
          sidebar.style.display = 'block';
          // Remove layout adjustment classes
          const main = document.querySelector('main');
          const mainContent = document.querySelector('.main-content');
          if (main) main.classList.remove('sidebar-hidden');
          if (mainContent) mainContent.classList.remove('full-width');
        }
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}

// Email copy functionality
function copyEmail() {
  const email = 'gauthaampremkumar@gmail.com';
  
  // Try using the modern Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(() => {
      showCopyNotification('Email copied to clipboard!');
    }).catch(err => {
      // Fallback for older browsers
      fallbackCopyTextToClipboard(email);
    });
  } else {
    // Fallback for older browsers
    fallbackCopyTextToClipboard(email);
  }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showCopyNotification('Email copied to clipboard!');
    } else {
      showCopyNotification('Failed to copy email');
    }
  } catch (err) {
    showCopyNotification('Failed to copy email');
  }
  
  document.body.removeChild(textArea);
}

// Show notification when email is copied
function showCopyNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--orange-yellow-crayola);
    color: var(--smoky-black);
    padding: 12px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notification);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 300);
  }, 3000);
}

// Certificate Modal Functions
let currentCertificatePdf = '';

function openCertificateModal(pdfPath, certificateTitle) {
  const modal = document.getElementById('certificateModal');
  const iframe = document.getElementById('certificatePdf');
  const title = document.getElementById('certificateTitle');
  
  currentCertificatePdf = pdfPath;
  title.textContent = certificateTitle;
  iframe.src = pdfPath;
  
  modal.style.display = 'block';
  // Force a reflow to ensure the display change takes effect before adding active class
  modal.offsetHeight;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeCertificateModal() {
  const modal = document.getElementById('certificateModal');
  const iframe = document.getElementById('certificatePdf');
  
  modal.classList.remove('active');
  
  // Wait for the transition to complete before hiding the modal
  setTimeout(() => {
    modal.style.display = 'none';
    iframe.src = ''; // Clear the iframe to stop loading
  }, 300);
  
  document.body.style.overflow = 'auto'; // Restore scrolling
}

function downloadCertificate() {
  if (currentCertificatePdf) {
    const link = document.createElement('a');
    link.href = currentCertificatePdf;
    link.download = currentCertificatePdf.split('/').pop(); // Get filename from path
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function openFullscreen() {
  if (currentCertificatePdf) {
    window.open(currentCertificatePdf, '_blank');
  }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeCertificateModal();
  }
});

// Prevent modal from closing when clicking inside the modal content
document.querySelector('.certificate-modal').addEventListener('click', function(event) {
  event.stopPropagation();
});

// Resume functionality
function viewResumeFullscreen() {
  const resumePath = './assets/Resume/Gauthaam CV.pdf';
  window.open(resumePath, '_blank');
}

// Enhanced Contact Form Handling with working email solutions
const contactForm = document.querySelector("[data-form]");
const formMessage = document.getElementById("form-message");
const messageText = document.getElementById("message-text");

// Form submission handler
if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Show loading state
    const submitBtn = document.querySelector("[data-form-btn]");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<ion-icon name="sync-outline"></ion-icon><span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Check if we're on Netlify (has netlify forms)
    if (contactForm.hasAttribute('netlify')) {
      sendWithNetlifyForms(formData, submitBtn, originalText);
    } else {
      // Fallback to other methods
      sendWithFormspree(formData, submitBtn, originalText);
    }
  });
}

// Method 1: Netlify Forms (works automatically on Netlify)
function sendWithNetlifyForms(formData, submitBtn, originalText) {
  // Submit to Netlify's form handler
  fetch('/', {
    method: 'POST',
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(response => {
    if (response.ok) {
      showMessage("✅ Thank you! Your message has been sent successfully. I'll get back to you soon!", "success");
      contactForm.reset();
      submitBtn.setAttribute("disabled", "");
    } else {
      // Fallback to direct email methods
      sendWithDirectEmail(formData, submitBtn, originalText);
    }
  })
  .catch(error => {
    console.error('Netlify Forms Error:', error);
    // Fallback to direct email methods
    sendWithDirectEmail(formData, submitBtn, originalText);
  })
  .finally(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

// Method 2: Direct email sending
function sendWithDirectEmail(formData, submitBtn, originalText) {
  const data = {
    to: 'gauthaampremkumar@gmail.com',
    from: formData.get('email'),
    subject: `Portfolio Contact: ${formData.get('subject')}`,
    html: `
      <h3>New Portfolio Contact</h3>
      <p><strong>Name:</strong> ${formData.get('name')}</p>
      <p><strong>Email:</strong> ${formData.get('email')}</p>
      <p><strong>Subject:</strong> ${formData.get('subject')}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.get('message').replace(/\n/g, '<br>')}</p>
    `
  };
  
  // Try multiple email services
  Promise.all([
    sendWithEmailService1(data),
    sendWithEmailService2(data)
  ])
  .then(results => {
    if (results.some(result => result.success)) {
      showMessage("✅ Message sent successfully! I'll get back to you soon!", "success");
      contactForm.reset();
      submitBtn.setAttribute("disabled", "");
    } else {
      sendWithEnhancedMailto(formData, submitBtn, originalText);
    }
  })
  .catch(error => {
    console.error('Direct email error:', error);
    sendWithEnhancedMailto(formData, submitBtn, originalText);
  });
}

// Email Service 1: Simple email API
function sendWithEmailService1(data) {
  return fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(response => ({ success: response.ok }))
  .catch(() => ({ success: false }));
}

// Email Service 2: Alternative service
function sendWithEmailService2(data) {
  return fetch('https://formsubmit.co/gauthaampremkumar@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: data.from,
      email: data.from,
      subject: data.subject,
      message: data.html
    })
  })
  .then(response => ({ success: response.ok }))
  .catch(() => ({ success: false }));
}

// Method 1: Formspree - Reliable email service
function sendWithFormspree(formData, submitBtn, originalText) {
  // Create a simple fetch request to a working Formspree endpoint
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    _replyto: formData.get('email'),
    _subject: `Portfolio Contact from ${formData.get('name')}`
  };
  
  fetch('https://formspree.io/f/mkgwgrdz', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      showMessage("✅ Thank you! Your message has been sent successfully. I'll get back to you soon!", "success");
      contactForm.reset();
      submitBtn.setAttribute("disabled", "");
    } else {
      // Try alternative email service
      sendWithEmailto(formData, submitBtn, originalText);
    }
  })
  .catch(error => {
    console.error('Formspree Error:', error);
    // Try alternative email service
    sendWithEmailto(formData, submitBtn, originalText);
  })
  .finally(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

// Method 2: Alternative email service
function sendWithEmailto(formData, submitBtn, originalText) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
    to: 'gauthaampremkumar@gmail.com'
  };
  
  // Try a simple API that forwards emails
  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      service_id: 'default_service',
      template_id: 'default_template',
      user_id: 'public_key',
      template_params: data
    })
  })
  .then(response => {
    if (response.ok) {
      showMessage("✅ Message sent successfully! I'll get back to you soon!", "success");
      contactForm.reset();
      submitBtn.setAttribute("disabled", "");
    } else {
      // Final fallback to enhanced mailto
      sendWithEnhancedMailto(formData, submitBtn, originalText);
    }
  })
  .catch(error => {
    console.error('Alternative service error:', error);
    // Final fallback to enhanced mailto  
    sendWithEnhancedMailto(formData, submitBtn, originalText);
  });
}

// Method 3: EmailJS backup (if configured)
function tryEmailJSBackup(formData) {
  if (typeof emailjs !== 'undefined' && window.emailjsConfigured) {
    const templateParams = {
      from_name: formData.get('name'),
      from_email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      to_email: 'gauthaampremkumar@gmail.com'
    };
    
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(() => console.log('EmailJS backup sent successfully'))
      .catch(error => console.log('EmailJS backup failed:', error));
  }
}

// Method 4: Enhanced mailto fallback (last resort)
function sendWithEnhancedMailto(formData, submitBtn, originalText) {
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  const emailBody = `Hi Gauthaam,

I'm reaching out through your portfolio website.

Contact Details:
• Name: ${name}
• Email: ${email}
• Subject: ${subject}

Message:
${message}

Best regards,
${name}

---
This message was sent from your portfolio contact form.`;

  const mailtoUrl = `mailto:gauthaampremkumar@gmail.com?subject=${encodeURIComponent('Portfolio Contact: ' + subject)}&body=${encodeURIComponent(emailBody)}`;
  
  try {
    window.location.href = mailtoUrl;
    showMessage("📧 Email client opened! Please send the message from your email app.", "info");
    
    // Also copy to clipboard as backup
    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailBody).then(() => {
        setTimeout(() => {
          showMessage("📋 Message also copied to clipboard as backup!", "info");
        }, 2000);
      });
    }
    
    contactForm.reset();
    submitBtn.setAttribute("disabled", "");
  } catch (error) {
    showMessage("📱 Please contact me directly at: gauthaampremkumar@gmail.com", "info");
  }
}

// Show message function
function showMessage(message, type) {
  if (messageText && formMessage) {
    messageText.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = "block";
    
    // Hide message after 7 seconds
    setTimeout(function() {
      formMessage.style.display = "none";
    }, 7000);
  }
}