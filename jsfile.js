document.addEventListener('DOMContentLoaded', function() {
    // Get carousel elements
    const slidesContainer = document.getElementById('speakerSlides');
    const prevButton = document.getElementById('prevSpeaker');
    const nextButton = document.getElementById('nextSpeaker');
    const indicators = document.querySelectorAll('.indicator');
    const viewMoreButtons = document.querySelectorAll('.view-more-btn');
    
    // Initialize current slide index
    let currentSlide = 0;
    const slideCount = document.querySelectorAll('.speaker-slide').length;
    
    // Update slide position
    function updateSlidePosition() {
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update indicators
      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
      
      // Reset all expanded bios when changing slides
      document.querySelectorAll('.speaker-bio').forEach(bio => {
        bio.classList.add('collapsed');
        bio.classList.remove('expanded');
      });
      
      // Update "View More" button text
      viewMoreButtons.forEach(btn => {
        btn.textContent = '查看更多';
      });
    }
    
    // Previous slide button
    prevButton.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateSlidePosition();
    });
    
    // Next slide button
    nextButton.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateSlidePosition();
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function() {
        currentSlide = index;
        updateSlidePosition();
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
    let touchStartX = 0;
    let touchEndX = 0;
    
    slidesContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slidesContainer.addEventListener('touchend', function(e) {
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
    
    // Auto-advance every 6 seconds
    const autoAdvance = setInterval(function() {
      nextButton.click();
    }, 6000);
    
    // Stop auto-advance when user interacts with carousel
    const carouselElements = [prevButton, nextButton, ...indicators, ...viewMoreButtons];
    carouselElements.forEach(element => {
      element.addEventListener('click', function() {
        clearInterval(autoAdvance);
      });
    });
    
    // Initialize the first slide
    updateSlidePosition();
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Target date: March 7th, 2025 at 7:00 PM China Standard Time (UTC+8)
    // Create date object in China time
    const targetDate = new Date('2025-03-07T19:00:00+08:00');
    
    // Elements
    const daysElement = document.getElementById('countdown-days');
    const hoursElement = document.getElementById('countdown-hours');
    const minutesElement = document.getElementById('countdown-minutes');
    const secondsElement = document.getElementById('countdown-seconds');
    const userTimezoneElement = document.getElementById('user-timezone');
    
    // Display user's local timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userDate = targetDate.toLocaleString('en-US', { 
      timeZone: userTimezone,
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });
    
    userTimezoneElement.textContent = `您当地时间 | Your local time: ${userDate}`;
    
    // Previous values for animation
    let prevDays, prevHours, prevMinutes, prevSeconds;
  
    // Update the countdown
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
      const formattedDays = String(days).padStart(2, '0');
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      
      // Apply animation if values change
      if (formattedDays !== prevDays) {
        daysElement.classList.add('pulse');
        setTimeout(() => daysElement.classList.remove('pulse'), 500);
        prevDays = formattedDays;
      }
      
      if (formattedHours !== prevHours) {
        hoursElement.classList.add('pulse');
        setTimeout(() => hoursElement.classList.remove('pulse'), 500);
        prevHours = formattedHours;
      }
      
      if (formattedMinutes !== prevMinutes) {
        minutesElement.classList.add('pulse');
        setTimeout(() => minutesElement.classList.remove('pulse'), 500);
        prevMinutes = formattedMinutes;
      }
      
      if (formattedSeconds !== prevSeconds) {
        secondsElement.classList.add('pulse');
        setTimeout(() => secondsElement.classList.remove('pulse'), 500);
        prevSeconds = formattedSeconds;
      }
      
      // Update the HTML
      daysElement.textContent = formattedDays;
      hoursElement.textContent = formattedHours;
      minutesElement.textContent = formattedMinutes;
      secondsElement.textContent = formattedSeconds;
    }
    
    // Initialize and update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });


  document.addEventListener('DOMContentLoaded', function() {
    // Only show landing page on mobile devices
    if (window.innerWidth < 769) {
      const landingPage = document.getElementById('mobile-landing');
      const mainContent = document.body;
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
  });