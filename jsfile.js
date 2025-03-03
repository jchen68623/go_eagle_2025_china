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

function initSpeakerCarousel() {
  // Get carousel elements
  const prevButton = document.getElementById('prevSpeaker');
  const nextButton = document.getElementById('nextSpeaker');
  const speakerCardContainer = document.getElementById('speakerCardContainer');
  const indicatorsContainer = document.getElementById('speakerIndicators');
  
  if (!prevButton || !nextButton || !speakerCardContainer || !indicatorsContainer) return;
  
  // Speaker data
  const speakers = [
    {
      name: "陈子全&唐婉君",
      image: "assets/Phillip_Winnie.png",
      bio: "陈先生与唐小姐均曾就职于IBM公司，凭借卓越的专业能力与不懈努力，在90年代初期实现了典型的'美国梦'。然而，他们并未满足于稳定的职业生涯，而是选择开启副业创业之旅，积极探索新的发展机遇。凭借前瞻性的商业眼光与坚定的执行力，他们在2000年初成功实现了财务与职业的双重自由。目前，陈先生与唐小姐定居于美国北卡罗莱纳州，经营多项自主业务，展现出卓越的企业家精神与多元化发展能力。他们的女儿思思在父母的全职陪伴下健康成长，现于北卡州立大学攻读心理学博士学位，与此同时，陈先生与唐小姐早年在中国创立的业务已深深扎根，即便在他们未直接参与的情况下，依然保持蓬勃发展，为无数创业者与追梦者提供了宝贵的经验与启发。"
    },
    {
      name: "Kyle & Lauren Wilz",
      image: "assets/Kyle_Lauren.jpeg",
      bio: "Kyle拥有土木工程和项目管理专业背景，目前兼职工程管理，Lauren女士毕业于英语专业，曾任职于企业写作领域。得益于双方共同创立的业务发展，Lauren女士于2017年成功实现了职业转型，告别了传统职场生涯。如今，Lauren女士白天主要陪伴他们五岁的女儿Addie，致力于家庭教育的投入；晚间则积极投身于创业指导工作，为新一代创业者提供支持与赋能。Kyle与Lauren通过灵活的时间管理与职业规划，实现了家庭与事业的平衡发展，同时也在不断探索个人价值与社会贡献的更多可能性。"
    },
    {
      name: "谭洪川Jerry&任莹玥Leann",
      image: "assets/Jerry_Leann.jpeg",
      bio: "Jerry现任纽约知名法资银行资深总监Leann女士曾担任资深数据分析师。两人在学生时期便开启了创业之旅，凭借出色的执行力，和创业前辈的帮助，Leann女士在22岁时即实现了职业自由，成功转型为全职创业者。目前，Jerry与Leann以全球化视野规划事业与生活，每年在美国和中国均衡分配时间，实现了真正的全球居民生活方式。他们以高效的时间管理和多元化的发展策略，积极拓展国际业务，致力于将自身的专业知识与实践经验分享给更多创业者。"
    },
    {
      name: "陈笑涵Sean&黄宇Blair",
      image: "assets/Sean_Blair.jpg",
      bio: ""
    },
    {
      name: "黄铮Johnny&叶艾琳Irene",
      image: "assets/Johnny_Irene.jpeg",
      bio: "Johnny与Irene在B象限企业家的路上不断成长，他们对全职创业与职业人生进行了深度思考和实践。Johnny凭借科班的商科背景，在外企工作多年，对数字化营销和商业策略有深刻见解。Irene作为一位财务专业人士，在企业财务和个人财富规划方面拥有丰富经验。两人在创业过程中不断强化团队意识和长期发展观念，在中国和美国两地拓展业务，始终坚持以人为本的核心价值观。他们在家庭与事业的平衡中找到了自己的节奏，并致力于帮助更多有志之士实现自由创业的梦想。"
    },
    {
      name: "陈九如Ramos",
      image: "assets/RamosChen.jpg",
      bio: "陈九如（Ramos）是一位技术背景出身的企业家，曾在早期初创公司及咨询担任重要职位。从大学时期的副业项目起步，逐步将其发展为可规模化、可持续的商业版图。作为前初创公司CTO及工程师，他深知生活不止是工作，秉持全方位成功的理念，注重财务、人际关系、个人成长及社会影响力的平衡发展。也得益于不懈努力和自我突破，在副业创业中取得了傲人的里程碑"
    },
    {
      name: "雷瀚鸣Oliver",
      image: "assets/OliverLei.jpg",
      bio: ""
    }
  ];
  
  let currentSpeakerIndex = 0;
  
  // Create indicator dots based on number of speakers
  function createIndicators() {
    indicatorsContainer.innerHTML = '';
    speakers.forEach((speaker, index) => {
      const dot = document.createElement('span');
      dot.className = 'indicator' + (index === 0 ? ' active' : '');
      dot.setAttribute('data-index', index);
      dot.addEventListener('click', () => {
        currentSpeakerIndex = index;
        updateSpeakerDisplay();
      });
      indicatorsContainer.appendChild(dot);
    });
  }
  
  // Create speaker card HTML
  function createSpeakerCard(speaker) {
    return `
      <div class="speaker-card">
        <div class="speaker-image">
          <img src="${speaker.image}" alt="${speaker.name}">
        </div>
        <div class="speaker-info">
          <h3>${speaker.name}</h3>
          <div class="bio-container">
            <p class="speaker-bio collapsed">${speaker.bio}</p>
            ${speaker.bio ? '<span class="view-more-btn">查看更多</span>' : ''}
          </div>
        </div>
      </div>
    `;
  }
  
  // Update speaker display
  function updateSpeakerDisplay() {
    const currentSpeaker = speakers[currentSpeakerIndex];
    
    // Update speaker card
    speakerCardContainer.innerHTML = createSpeakerCard(currentSpeaker);
    
    // Add event listener to view more button if it exists
    const viewMoreBtn = speakerCardContainer.querySelector('.view-more-btn');
    if (viewMoreBtn) {
      viewMoreBtn.addEventListener('click', function() {
        const bioElement = this.previousElementSibling;
        
        if (bioElement.classList.contains('collapsed')) {
          bioElement.classList.remove('collapsed');
          bioElement.classList.add('expanded');
          this.textContent = '收起';
        } else {
          bioElement.classList.remove('expanded');
          bioElement.classList.add('collapsed');
          this.textContent = '查看更多';
        }
      });
    }
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      if (index === currentSpeakerIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
    
    // Add touch swipe functionality
    const speakerCard = speakerCardContainer.querySelector('.speaker-card');
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
        const threshold = 50;
        
        if (swipeDistance > threshold) {
          prevButton.click();
        } else if (swipeDistance < -threshold) {
          nextButton.click();
        }
      }
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
  
  // Initialize
  createIndicators();
  updateSpeakerDisplay();
  
  // Auto-advance every 6 seconds
  setInterval(function() {
    nextButton.click();
  }, 6000);
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