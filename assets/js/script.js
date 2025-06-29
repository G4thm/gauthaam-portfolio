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

// Enhanced Contact Form Handling with Netlify Forms
const contactForm = document.querySelector("[data-form]");
const formMessage = document.getElementById("form-message");
const messageText = document.getElementById("message-text");

// Check if we're on the thank you page (after successful submission)
if (window.location.pathname === '/thank-you' || window.location.search.includes('success=true')) {
  // Redirect back to home page after showing success
  setTimeout(() => {
    window.location.href = '/#contact';
  }, 3000);
}

// Form submission handler
if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    // For Netlify Forms, we'll let it submit naturally but add some UX improvements
    
    // Show loading state
    const submitBtn = document.querySelector("[data-form-btn]");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<ion-icon name="sync-outline"></ion-icon><span>Sending...</span>';
    submitBtn.disabled = true;
    
    // Show a loading message
    showMessage("📤 Submitting your message...", "info");
    
    // Let the form submit naturally to Netlify
    // Don't prevent default - let Netlify handle it
    
    // Optional: Add a small delay to show the loading state
    setTimeout(() => {
      // The form will submit naturally after this delay
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1000);
  });
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