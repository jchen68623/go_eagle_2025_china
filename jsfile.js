document.addEventListener('DOMContentLoaded', function() {
  // Inject header
  injectHeader();

  // Setup header scroll behavior
  initHeaderScrollBehavior();

  // 
  initAccordions();
  
  // Speaker Carousel
  initSpeakerCarousel();
  
  // Countdown Timer
  initCountdownTimer();
  
  // Mobile Landing Page
  initMobileLanding();

  // Menu Toggle for mobile
  initMenuToggle();
});

function injectHeader() {
  const headerContainer = document.getElementById('header-container');
  if (!headerContainer) return;
  
  // Get page title from the document title or use a default
  let pageTitle = document.title.replace(' - 做雄鹰领导力', '').replace('做雄鹰领导力 - ', '');
  
  // If we're on the homepage, just show the main title
  if (pageTitle === '主页' || window.location.pathname.endsWith('index.html')) {
    pageTitle = '做雄鹰领导力';
  }
  
  headerContainer.innerHTML = `
    <!-- Page Header -->
    <div class="page-header" id="pageHeader">
      <h1 class="site-title">${pageTitle}</h1>
      <button class="mobile-menu-toggle" id="menuToggle">☰</button>
    </div>
    
    <!-- Mobile Menu -->
    <div class="mobile-menu" id="mobileMenu">
      <button class="mobile-menu-close" id="menuClose">✕</button>
      <ul class="menu-items">
        <li><a href="index.html">主页</a></li>
        <li><a href="preparation.html">活动准备须知</a></li>
      </ul>
    </div>
    <div class="mobile-menu-overlay" id="menuOverlay"></div>
  `;
}

function initHeaderScrollBehavior() {
  const header = document.getElementById('pageHeader');
  if (!header) return;
  
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // If scrolling down and we're past the header's height
    if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
      header.classList.add('hidden');
    } 
    // If scrolling up
    else if (scrollTop < lastScrollTop) {
      header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
  }, { passive: true });
}

function initSpeakerCarousel() {
  // Get carousel elements
  const speakerCardContainer = document.getElementById('speakerCardContainer');
  const indicatorsContainer = document.getElementById('speakerIndicators');
  
  if (!speakerCardContainer || !indicatorsContainer) return;
  
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
      bio: "Jerry现任纽约知名法资银行资深总监Leann女士曾担任资深数据分析师。两人在学生时期便开启了创业之旅，凭借出色的执行力，和创业前辈的帮助，Leann女士在24岁时即实现了职业自由，成功转型为全职创业者。目前，Jerry与Leann以全球化视野规划事业与生活，每年在美国和中国均衡分配时间，实现了真正的全球居民生活方式。他们以高效的时间管理和多元化的发展策略，积极拓展国际业务，致力于将自身的专业知识与实践经验分享给更多创业者。"
    },
    {
      name: "陈笑涵Sean&黄宇Blair",
      image: "assets/Sean_Blair.jpg",
      bio: "黄宇与陈笑涵是一对充满创业精神的夫妻。黄宇女士本硕分别毕业于美国印第安纳大学和伊利诺伊大学，现任职于一家世界五十强企业担任项目管理职务。她自本科期间便开始副业创业，成功创造了数倍于主业的被动收入，并即将于今年实现提前退休的目标。陈笑涵先生就读于美国印第安纳大学信息学专业期间便开启创业之旅，大三时副业年流水已近两百万。凭借多年积累，他于28岁时实现提前退休，如今专注于自由生活与团队赋能。两人共同展现了通过副业创业实现财务自由与生活平衡的典范，期待他们分享更多宝贵经验。"
    },
    {
      name: "黄铮Johnny&叶艾琳Irene",
      image: "assets/Johnny_Irene.jpeg",
      bio: "黄铮先生与叶艾琳女士均毕业于美国纽约州知名高等学府，黄铮先生拥有金融与IT领域的双重专业背景，现任职于纽约一家顶尖投行担任项目经理，叶艾琳女士主修神经科学，本科期间同时修读医学预科课程，现于一家上市公司担任高管两人在校期间便分别开启了创业之旅，他们的业务已在中国及美国多个州成功拓展，建立了非常多元化的团队，也为家庭创造了另一份全职水准的现金流，他们的创业故事与成功经验也激励着无数年轻创业者，为创新与创业生态注入了持续的动力与灵感。"
    },
    {
      name: "陈九如Ramos",
      image: "assets/RamosChen.jpg",
      bio: "陈九如（Ramos）是一位技术背景出身的企业家，曾在早期初创公司及咨询担任重要职位。从大学时期的副业项目起步，逐步将其发展为可规模化、可持续的商业版图。作为前初创公司CTO及工程师，他深知生活不止是工作，秉持全方位成功的理念，注重财务、人际关系、个人成长及社会影响力的平衡发展。也得益于不懈努力和自我突破，在副业创业中取得了傲人的里程碑"
    },
    {
      name: "雷瀚鸣Oliver",
      image: "assets/OliverLei.jpg",
      bio: "雷瀚鸣（Oliver）先生的职业旅程充满转折与启发。大学期间从体育管理到心理学，再到国际研究，最终选择了哲学。尽管对哲学充满热情，但在人生/副业导师的建议下，他意识到学术道路并非唯一选择，于是决定转向MBA进入IT与商业分析领域，同时发展副业创业。他从初级业务分析师起步，逐步晋升为项目经理，目前担任合规业务分析师。同时兼顾副业，并创造了傲人的现金流，为构建与个人原则相符的生活方式打下坚实的经济基础"
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
  
  // Create the multi-card container HTML with previous, current and next cards
  function updateSpeakerDisplay() {
    // Clear the container
    speakerCardContainer.innerHTML = '';
    
    // Create a multi-card container
    const multiCardContainer = document.createElement('div');
    multiCardContainer.className = 'multi-card-container';
    speakerCardContainer.appendChild(multiCardContainer);
    
    // Calculate indices for previous, current, and next cards
    const totalSpeakers = speakers.length;
    const prevIndex = (currentSpeakerIndex - 1 + totalSpeakers) % totalSpeakers;
    const nextIndex = (currentSpeakerIndex + 1) % totalSpeakers;
    
    // Add previous card (left side)
    const prevCard = createSpeakerCard(speakers[prevIndex]);
    prevCard.classList.add('prev');
    multiCardContainer.appendChild(prevCard);
    
    // Add current card (center/focused)
    const currentCard = createSpeakerCard(speakers[currentSpeakerIndex]);
    currentCard.classList.add('active');
    multiCardContainer.appendChild(currentCard);
    
    // Add next card (right side)
    const nextCard = createSpeakerCard(speakers[nextIndex]);
    nextCard.classList.add('next');
    multiCardContainer.appendChild(nextCard);
    
    // Set up event listeners for each card
    setupCardEventListeners(prevCard, currentCard, nextCard);
    
    // Update indicators
    updateIndicators();
  }
  
  // Create a single speaker card
  function createSpeakerCard(speaker) {
    const card = document.createElement('div');
    card.className = 'speaker-card';
    
    card.innerHTML = `
      <div class="speaker-image">
        <img src="${speaker.image}" alt="${speaker.name}">
      </div>
      <div class="speaker-info">
        <h3>${speaker.name}</h3>
        <div class="bio-container">
          <p class="speaker-bio collapsed">${speaker.bio}</p>
          ${speaker.bio ? '<span class="view-more-btn under-line">查看更多</span>' : ''}
        </div>
      </div>
    `;
    
    return card;
  }
  
  // Set up event listeners for the cards
  function setupCardEventListeners(prevCard, currentCard, nextCard) {
    // Previous card click handler
    prevCard.addEventListener('click', function() {
      // If the current card is expanded, do nothing.
      if (currentCard.classList.contains('expanded')) return;
      
      currentSpeakerIndex = (currentSpeakerIndex - 1 + speakers.length) % speakers.length;
      updateSpeakerDisplay();
    });
    
    // Next card click handler
    nextCard.addEventListener('click', function() {
      // If the current card is expanded, do nothing.
      if (currentCard.classList.contains('expanded')) return;
      
      currentSpeakerIndex = (currentSpeakerIndex + 1) % speakers.length;
      updateSpeakerDisplay();
    });
    
    // View more button handler for the current card
    const viewMoreBtn = currentCard.querySelector('.view-more-btn');
    if (viewMoreBtn) {
      // Only show on mobile
      if (window.innerWidth >= 769) {
        viewMoreBtn.style.display = 'none';
      }
      
      viewMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();  // Prevent any other click handlers from firing
      
        const card = currentCard;
        const bioElement = card.querySelector('.speaker-bio');
        console.log("View More clicked; current bio classes:", bioElement.classList);
      
        if (!card.classList.contains('expanded')) {
          // Expand the bio
          bioElement.classList.remove('collapsed');
          bioElement.classList.add('expanded');
          card.classList.add('expanded');
          this.textContent = '收起';
        } else {
          // Collapse the bio
          bioElement.classList.remove('expanded', 'scrollable');
          bioElement.classList.add('collapsed');
          card.classList.remove('expanded');
          const overlay = document.querySelector('.speaker-overlay');
          if (overlay) overlay.classList.remove('active');
          this.textContent = '查看更多';
        }
      });
    }
    
    // Add touch swipe functionality to all cards
    const cardContainer = currentCard.parentNode;
    let touchStartX = 0;
    let touchEndX = 0;
    
    cardContainer.addEventListener('touchstart', function(e) {
      // Don't allow swiping if overlay is active
      if (document.querySelector('.speaker-overlay.active')) return;
      
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    cardContainer.addEventListener('touchend', function(e) {
      // Don't allow swiping if overlay is active
      if (document.querySelector('.speaker-overlay.active')) return;
      
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
      // If the current card is expanded, ignore swipes.
      if (currentCard.classList.contains('expanded')) return;
    
      const swipeDistance = touchEndX - touchStartX;
      const threshold = 50;
      
      if (swipeDistance > threshold) {
        currentSpeakerIndex = (currentSpeakerIndex - 1 + speakers.length) % speakers.length;
        updateSpeakerDisplay();
      } else if (swipeDistance < -threshold) {
        currentSpeakerIndex = (currentSpeakerIndex + 1) % speakers.length;
        updateSpeakerDisplay();
      }
    }
  }
  
  // Update the indicator dots
  function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      if (index === currentSpeakerIndex) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  // Initialize
  createIndicators();
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
    const video = document.getElementById('landing-video');
    const loadingIndicator = document.querySelector('.loading-indicator');
    
    if (!landingPage || !video || !loadingIndicator) return;
    
    let startY, endY;
    
    // Show the landing page
    landingPage.style.display = 'block';
    
    // Prevent scrolling on main content while landing page is visible
    document.body.style.overflow = 'hidden';
    
    // Add play button for browsers that block autoplay
    const playButton = document.createElement('button');
    playButton.className = 'video-play-button';
    playButton.innerHTML = '<span>▶</span>';
    video.parentNode.appendChild(playButton);
    
    // Function to attempt autoplay with different methods
    function attemptAutoplay() {
      // Promise-based attempt to play
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          // Autoplay started successfully
          playButton.style.display = 'none';
          console.log('Autoplay successful');
        }).catch(error => {
          // Autoplay was prevented
          console.log('Autoplay prevented:', error);
          playButton.style.display = 'flex'; // Show play button
        });
      }
    }
    
    // Try to autoplay when metadata is loaded
    video.addEventListener('loadedmetadata', function() {
      attemptAutoplay();
    });
    
    // Hide loading indicator once video is loaded enough to play
    video.addEventListener('canplay', function() {
      loadingIndicator.style.opacity = '0';
      setTimeout(function() {
        loadingIndicator.style.display = 'none';
      }, 500);
      
      // Try autoplay again when can play
      attemptAutoplay();
    });
    
    // Play button click handler
    playButton.addEventListener('click', function() {
      video.play();
      playButton.style.display = 'none';
    });
    
    // If video takes too long to load or fails, hide loading indicator after 5 seconds
    setTimeout(function() {
      if (loadingIndicator.style.display !== 'none') {
        loadingIndicator.style.opacity = '0';
        setTimeout(function() {
          loadingIndicator.style.display = 'none';
        }, 500);
      }
    }, 5000);
    
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
      
      // After animation, hide the landing page and pause the video to save resources
      setTimeout(function() {
        landingPage.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling on main content
        video.pause(); // Pause the video when hidden
      }, 500);
    }
    
    // Only dismiss when clicking on the text container or swipe indicator
    const textContainer = document.querySelector('.landing-text-container');
    if (textContainer) {
      textContainer.addEventListener('click', function(e) {
        // Don't include the play button in the clickable area
        if (e.target !== playButton && !playButton.contains(e.target)) {
          hideLandingPage();
        }
      });
    }
  }
}

function initMenuToggle() {
  const menuToggle = document.getElementById('menuToggle');
  const menuClose = document.getElementById('menuClose');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  
  if (!menuToggle) return;
  
  menuToggle.addEventListener('click', function() {
    if (mobileMenu && menuOverlay) {
      mobileMenu.classList.add('active');
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      // Fallback for old functionality
      alert('Menu functionality would go here');
    }
  });
  
  if (menuClose && mobileMenu && menuOverlay) {
    function closeMenu() {
      mobileMenu.classList.remove('active');
      menuOverlay.classList.remove('active');
      document.body.style.overflow = 'auto'; // Enable scrolling
    }
    
    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);
  }
}

// Replace your existing toggleAccordion function in jsfile.js with this
function toggleAccordion(element) {
  // Toggle arrow direction
  element.classList.toggle('rotate-icon');
  
  // Find the content container
  var content = element.parentElement.nextElementSibling;
  
  // Toggle active class
  content.classList.toggle('active');
  
  // Add smooth animation
  if (content.classList.contains('active')) {
    content.style.maxHeight = content.scrollHeight + "px";
  } else {
    content.style.maxHeight = "0px";
  }
}

// You may also want to add this initialization function to your existing DOMContentLoaded event listener
function initAccordions() {
  // Make sure all active accordions have proper max-height on page load
  document.querySelectorAll('.accordion-content.active').forEach(function(accordion) {
    accordion.style.maxHeight = accordion.scrollHeight + "px";
  });
}