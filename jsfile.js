document.addEventListener('DOMContentLoaded', function() {
  // Speaker Carousel
  initSpeakerCarousel();
  
  // Countdown Timer
  initCountdownTimer();
  
  // Mobile Landing Page
  initMobileLanding();

  // Menu Toggle for mobile
  initMenuToggle();
});

// Add this to your existing initSpeakerCarousel function
function initSpeakerCarousel() {
  // Get carousel elements
  const prevButton = document.getElementById('prevSpeaker');
  const nextButton = document.getElementById('nextSpeaker');
  const indicators = document.querySelectorAll('.indicator');
  const viewMoreButtons = document.querySelectorAll('.view-more-btn');
  
  if (!prevButton || !nextButton) return;
  
  // Sample speaker data - in a real app, this would come from a database or API
  const speakers = [
    {
      name: "黄蜂 & 叶艾琳夫妇",
      image: "Jerry_Leann.jpeg",
      bio: "公寓自斗米来，遍步波少像吗！躺车何食饭的吧但揽某家，苦斗场上切西巴鹅哦在为！五大她向跑羽六什久通甲王: 天墨入吉成地得来反妻忘爪乐米牛！晒睏天告力。唐宗四吉间封砂: 似刚详隋棉年见喝呸掌劫过'剑黑榆'，乃而七胜租！香母熄活，寸继给几年古渔中下管杯，包洁耳送點洋欠，字乾克，遗拔，允进八呢免雪毫，泉力熔'石二'。"
    },
    {
      name: "Kyle & Lauren Wilz",
      image: "Kyle_Lauren.jpeg",
      bio: "Kyle has a background in civil engineering and project management and is currently working part-time. Lauren has a degree in English and was able to leave her corporate writing career in 2017 because of the business they built. Today she spends most of her time with their 5 year old daughter Addie during the day while empowering the next wave of entrepreneurs at night."
    },
    {
      name: "Ramos Chen",
      image: "RamosChen.jpg",
      bio: "Ramos 从创业低谷走向成功，擅长分享实战经验和创业心得。他的创业故事激励了无数创业者坚持梦想，专注于帮助他人在困境中找到突破口。"
    }
  ];
  
  let currentSpeakerIndex = 0;
  
  // Update the speaker display
  function updateSpeakerDisplay() {
    const currentSpeaker = speakers[currentSpeakerIndex];
    const speakerCard = document.querySelector('.speaker-card');
    
    if (speakerCard) {
      speakerCard.querySelector('.speaker-image img').src = currentSpeaker.image;
      speakerCard.querySelector('.speaker-image img').alt = currentSpeaker.name;
      speakerCard.querySelector('.speaker-info h3').textContent = currentSpeaker.name;
      speakerCard.querySelector('.speaker-bio').textContent = currentSpeaker.bio;
      
      // Reset view more state
      const bioElement = speakerCard.querySelector('.speaker-bio');
      const viewMoreBtn = speakerCard.querySelector('.view-more-btn');
      if (bioElement && viewMoreBtn) {
        bioElement.classList.add('collapsed');
        bioElement.classList.remove('expanded');
        viewMoreBtn.textContent = '查看更多';
      }
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentSpeakerIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
  }
  
  // Previous button click handler
  prevButton.addEventListener('click', function() {
    currentSpeakerIndex = (currentSpeakerIndex - 1 + speakers.length) % speakers.length;
    updateSpeakerDisplay();
  });
  
  // Next button click handler
  nextButton.addEventListener('click', function() {
    currentSpeakerIndex = (currentSpeakerIndex + 1) % speakers.length;
    updateSpeakerDisplay();
  });
  
  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', function() {
      currentSpeakerIndex = index;
      updateSpeakerDisplay();
    });
  });
  
  // View More button functionality
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const bioElement = this.previousElementSibling; // Get the bio paragraph
      
      if (bioElement.classList.contains('collapsed')) {
        // Expand the bio
        bioElement.classList.remove('collapsed');
        bioElement.classList.add('expanded');
        this.textContent = '收起';
      } else {
        // Collapse the bio
        bioElement.classList.remove('expanded');
        bioElement.classList.add('collapsed');
        this.textContent = '查看更多';
      }
    });
  });
  
  // Touch swipe functionality for mobile
  const speakerCard = document.querySelector('.speaker-card');
  if (speakerCard) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    speakerCard.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    speakerCard.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const threshold = 50; // Minimum distance to register as a swipe
      
      if (swipeDistance > threshold) {
        // Swiped right - go to previous slide
        prevButton.click();
      } else if (swipeDistance < -threshold) {
        // Swiped left - go to next slide
        nextButton.click();
      }
    }
  }
  
  // Auto-advance every 6 seconds
  setInterval(function() {
    nextButton.click();
  }, 6000);
  
  // Initialize the first slide
  updateSpeakerDisplay();
}

function initCountdownTimer() {
  const daysElement = document.getElementById('countdown-days');
  const hoursElement = document.getElementById('countdown-hours');
  const minutesElement = document.getElementById('countdown-minutes');
  const secondsElement = document.getElementById('countdown-seconds');
  
  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
  
  // Target date: March 7th, 2025 at 7:00 PM China Standard Time (UTC+8)
  const targetDate = new Date('2025-03-07T19:00:00+08:00');
  
  function updateCountdown() {
    // Get current date and time
    const currentDate = new Date();
    
    // Calculate the difference in milliseconds
    const diff = targetDate - currentDate;
    
    // Check if the target date has passed
    if (diff <= 0) {
      daysElement.textContent = '00';
      hoursElement.textContent = '00';
      minutesElement.textContent = '00';
      secondsElement.textContent = '00';
      return;
    }
    
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Format with leading zeros
    daysElement.textContent = String(days).padStart(2, '0');
    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = String(minutes).padStart(2, '0');
    secondsElement.textContent = String(seconds).padStart(2, '0');
  }
  
  // Initialize and update every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function initMobileLanding() {
  // Only show landing page on mobile devices
  if (window.innerWidth < 769) {
    const landingPage = document.getElementById('mobile-landing');
    if (!landingPage) return;
    
    let startY, endY;
    
    // Show the landing page
    landingPage.style.display = 'block';
    
    // Prevent scrolling on main content while landing page is visible
    document.body.style.overflow = 'hidden';
    
    // Handle touch events for swipe up detection
    landingPage.addEventListener('touchstart', function(e) {
      startY = e.touches[0].clientY;
    }, { passive: true });
    
    landingPage.addEventListener('touchend', function(e) {
      endY = e.changedTouches[0].clientY;
      handleSwipe();
    }, { passive: true });
    
    landingPage.addEventListener('touchmove', function(e) {
      // Prevent default to avoid page scroll during swipe
      e.preventDefault();
    }, { passive: false });
    
    function handleSwipe() {
      const threshold = 50; // Minimum distance to be considered a swipe
      
      if (startY - endY > threshold) {
        // User swiped up
        hideLandingPage();
      }
    }
    
    function hideLandingPage() {
      // Add a fade out animation
      landingPage.style.transition = 'opacity 0.5s ease-out';
      landingPage.style.opacity = '0';
      
      // After animation, hide the landing page
      setTimeout(function() {
        landingPage.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling on main content
      }, 500);
    }
    
    // Also add click functionality as a fallback
    landingPage.addEventListener('click', function() {
      hideLandingPage();
    });
  }
}

function initMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  if (!menuToggle) return;
  
  menuToggle.addEventListener('click', function() {
    // Mobile menu toggle functionality
    // This can be expanded as needed
    alert('Menu functionality would go here');
  });
}

function toggleAccordion(element) {
  // Toggle arrow direction
  element.classList.toggle('rotate-icon');
  
  // Find the content container
  var content = element.parentElement.nextElementSibling;
  
  // Toggle active class
  content.classList.toggle('active');
}