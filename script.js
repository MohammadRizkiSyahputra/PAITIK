// COURSES
const courses = [
    { id: 1, title: "Hakikat Manusia Menurut Ajaran Islam", description: "Pertemuan 1", image: "./images/ppt1.jpg" },
    { id: 2, title: "Agama Islam dan Ruang Lingkupnya", description: "Pertemuan 2", image: "./images/ppt2.png" },
    { id: 3, title: "Sumber-sumber Ajaran Islam", description: "Pertemuan 3", image: "./images/ppt3.jpg" },
    { id: 4, title: "Hukum Islam (Syariah) dan HAM dalam Islam", description: "Pertemuan 4", image: "./images/ppt4.jpg" },
    { id: 5, title: "Perkembangan IPTEKS dalam Islam", description: "Pertemuan 5", image: "./images/ppt5.png" },
    { id: 6, title: "Kerukunan Umat Beragama", description: "Pertemuan 6", image: "./images/ppt6.jpg" },
    { id: 7, title: "Masyarakat Madani dalam Islam", description: "Pertemuan 7", image: "./images/ppt7.jpg" },
    { id: 8, title: "Kebudayaan Islam", description: "Pertemuan 8", image: "./images/ppt8.png" },
    { id: 9, title: "Sistem Politik dalam Islam", description: "Pertemuan 9", image: "./images/ppt9.png" },
    { id: 10, title: "Ekonomi Islam", description: "Pertemuan 10", image: "./images/ppt10.jpg" },
    { id: 11, title: "Keluarga dalam Islam", description: "Pertemuan 11", image: "./images/ppt11.png" },
    { id: 12, title: "Akhlak, Etika, Moral dalam Islam", description: "Pertemuan 12", image: "./images/ppt12.png" }
];

let currentPage = 1;
const coursesPerPage = 6;

function displayCourses(page) {
  const courseContainer = document.getElementById('course-container');
  
  // Reduce fade-out duration
  courseContainer.classList.add('opacity-0', 'translate-y-10');
  
  // Reduce timeout
  setTimeout(() => {
    courseContainer.innerHTML = ''; 

    const start = (page - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const paginatedCourses = courses.slice(start, end);

    paginatedCourses.forEach((course, index) => {
      const courseCard = document.createElement('div');
      courseCard.className = `
        bg-white 
        rounded-2xl 
        overflow-hidden 
        shadow-lg 
        transition-all 
        duration-300  // Reduced from 500 to 300
        transform 
        opacity-0 
        translate-y-10
        hover:-translate-y-2  // Reduced from -translate-y-3
        hover:shadow-xl       // Slightly less dramatic shadow
        border 
        border-gray-100 
        hover:border-blue-500
        flex 
        flex-col
        group  // Added group for easier hover states
      `;

      courseCard.innerHTML = `
        <div class="h-48 overflow-hidden flex items-center justify-center bg-gray-100">
          <img 
            src="${course.image}" 
            alt="${course.title}" 
            class="w-full h-full object-contain p-4 transform transition-transform duration-200 group-hover:scale-105"  // Faster, subtler scale
          >
        </div>
        <div class="p-6 flex-grow flex flex-col">
          <h2 class="text-2xl font-bold text-gray-800 mb-3 transition-colors duration-200 group-hover:text-blue-600">${course.title}</h2>
          <p class="text-gray-600 mb-4 flex-grow line-clamp-3">${course.description}</p>
          <div class="flex items-center justify-between mt-auto">
            <a 
              href="materi.html?courseId=${course.id}" 
              class="
                px-6 
                py-2 
                bg-gradient-to-r 
                from-blue-500 
                to-purple-600 
                text-white 
                rounded-full 
                hover:from-blue-600 
                hover:to-purple-700 
                transition-all 
                duration-200  // Reduced duration
                flex 
                items-center 
                gap-2
              "
            >
              Mulai Belajar
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      `;
      
      courseContainer.appendChild(courseCard);
    });

    // Reduce fade-in delay
    courseContainer.offsetHeight;
    courseContainer.classList.remove('opacity-0', 'translate-y-10');
    
    // Faster, more subtle staggered animation
    const courseCards = courseContainer.children;
    Array.from(courseCards).forEach((card, index) => {
      card.style.transitionDelay = `${index * 50}ms`;  // Reduced from 100ms
      card.classList.remove('opacity-0', 'translate-y-10');
    });
  }, 200);  // Reduced from 300ms
}

function setupPagination() {
  const paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = ''; // Clear existing pagination

  const totalPages = Math.ceil(courses.length / coursesPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.innerText = i;
    button.className = `
      ${i === currentPage 
        ? 'bg-blue-500 text-white scale-110 ring-4 ring-blue-300' 
        : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
      } 
      px-4 
      py-2 
      rounded-full 
      transition-all 
      duration-300 
      ease-in-out 
      transform 
      hover:scale-110 
      focus:outline-none 
      focus:ring-2 
      focus:ring-blue-300 
      shadow-md 
      relative 
      overflow-hidden
    `;

    // Add a ripple effect
    button.innerHTML = `
      <span class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        ${i === currentPage ? 'bg-white/20' : 'bg-blue-500/20'} 
        rounded-full transition-all duration-500 ease-in-out scale-0 group-hover:scale-[20]">
      </span>
      <span class="relative z-10">${i}</span>
    `;

    // Stagger animation
    button.style.transitionDelay = `${(i - 1) * 50}ms`;

    // Add enter and exit animations
    button.classList.add(
      'opacity-0', 
      'translate-y-10', 
      'transition-all', 
      'duration-500', 
      'ease-out'
    );

    // Trigger reflow to ensure animation works
    button.offsetHeight;

    // Remove initial animation classes
    button.classList.remove('opacity-0', 'translate-y-10');

    button.addEventListener('click', () => {
      // Remove active state from all buttons
      Array.from(paginationContainer.children).forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white', 'scale-110', 'ring-4', 'ring-blue-300');
        btn.classList.add('bg-gray-200', 'text-gray-700');
      });

      // Add active state to clicked button
      button.classList.remove('bg-gray-200', 'text-gray-700');
      button.classList.add('bg-blue-500', 'text-white', 'scale-110', 'ring-4', 'ring-blue-300');

      // Page change logic
      currentPage = i;
      displayCourses(currentPage);
      setupPagination();
    });

    // Add hover and focus states
    button.addEventListener('mouseenter', () => {
      if (i !== currentPage) {
        button.classList.add('scale-110');
      }
    });

    button.addEventListener('mouseleave', () => {
      if (i !== currentPage) {
        button.classList.remove('scale-110');
      }
    });

    paginationContainer.appendChild(button);
  }
}

// Function to display greetings based on the time of the day
    function Greeting() {
      const hour = new Date().getHours();
      const greetingElement = document.getElementById('greeting');
  
      if (hour >= 5 && hour < 12) {
        greetingElement.textContent = "Halo, Selamat Pagi";
      } else if (hour >= 12 && hour < 15) {
        greetingElement.textContent = "Halo, Selamat Siang";
      } else if (hour >= 15 && hour < 18) {
        greetingElement.textContent = "Halo, Selamat Sore";
      } else {
        greetingElement.textContent = "Halo, Selamat Malam";
      }
    }

// scrollintoview
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animthis');

  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              if (entry.isIntersecting) {
                  // When the element enters the viewport
                  entry.target.classList.add('opacity-100', 'animate-fade-in');
                  entry.target.classList.remove('opacity-0', 'animate-fade-out');
              } else {
                  // When the element leaves the viewport
                  entry.target.classList.remove('opacity-100', 'animate-fade-in');
                  entry.target.classList.add('opacity-0', 'animate-fade-out');
              }
          });
      },
      { threshold: 0.2 } // Adjust this to control visibility threshold
  );

  animatedElements.forEach((el) => {
      el.classList.add('opacity-0'); // Initially hidden
      observer.observe(el);
  });
}

function setupsmoothscroll() {
    if (!('scrollBehavior' in document.documentElement.style)) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
              window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth',
              });
            }
          });
        });
      }
}

function animnavbar() {
  const hoverBg = document.getElementById("hover-bg");
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll("#navbar a");
  let activeSectionId = 'home'; // Default to home section

  // Function to set the position and size for the hover background on a specific link
  const setPosition = (link) => {
    if (!link || !navbar) return;

    const linkRect = link.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();

    // Calculate the exact position of the link within the navbar
    const offsetLeft = linkRect.left - navRect.left - 15; // Adjust horizontal position
    const offsetTop = linkRect.top - navRect.top + (linkRect.height / 2) - ((linkRect.height + 10) / 2); // Center vertically and adjust for background height

    // Apply transform for precise positioning of the hover background
    hoverBg.style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
    hoverBg.style.width = `${linkRect.width + 30}px`; // Add some extra width
    hoverBg.style.height = `${linkRect.height + 10}px`; // Add some extra height
    hoverBg.style.opacity = "1";
};

  // Initialize position for the first link (Homepage)
  const initializePosition = () => {
    if (links.length > 0) {
      hoverBg.style.transition = 'none';
      setPosition(links[0]);
      requestAnimationFrame(() => {
        hoverBg.style.transition = 'all 0.3s ease';
      });
    }
  };

  // Set up event listeners for all navigation links
  links.forEach((link) => {
    link.style.position = 'relative';
    link.style.zIndex = '10';

    // Hover effect: update background position
    link.addEventListener("mouseover", () => {
      setPosition(link);
    });
  });

  // Reset the hover background to the active section's link when mouse leaves the navbar
  navbar.addEventListener("mouseleave", () => {
    const correspondingLink = document.querySelector(`a[href="#${activeSectionId}"]`);
    if (correspondingLink) {
      setPosition(correspondingLink);
    }
  });

  // Call the initializePosition function after the DOM content is fully loaded
  document.addEventListener("DOMContentLoaded", initializePosition);

  // Intersection Observer to update background on section scroll and change the URL hash
  const sections = ['home', 'team', 'courses'];
  const observerOptions = {
    threshold: 0.5, // The section needs to be at least 50% in view before it's considered active
    rootMargin: "-50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
  
        // Only update the active section if the new section is different from the last one
        if (entry.intersectionRatio > 0.5 && sectionId !== activeSectionId) {
          const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
  
          // Change the URL hash when the section is in view
          if (correspondingLink) {
            window.history.pushState(null, null, `#${sectionId}`);
            activeSectionId = sectionId; // Update active section only when it's fully in view
            setPosition(correspondingLink);
          }
        }
      }
    });
  }, observerOptions);

  // Start observing the sections
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      observer.observe(section);
    }
  });
}

function video() {
  // Select all the video buttons and the video player
const buttons = document.querySelectorAll("[data-video]");
const videoPlayer = document.getElementById("videoPlayer");

// Add click event listeners to each button
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const videoSrc = button.getAttribute("data-video");
    const newTitle = button.getAttribute("data-title");

    videoPlayer.querySelector("source").src = videoSrc;
    videoPlayer.load();

    if (newTitle) {
      materiTitle.textContent = newTitle;
    }
  });
});
}

async function getPrayerTimes() {
  const response = await fetch('http://api.aladhan.com/v1/timingsByCity?city=Jakarta&country=Indonesia&method=11');
  const data = await response.json();
  const timings = data.data.timings;
  
  // Get today's date
  const today = new Date();
  const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('id-ID', options);

  const prayerTextElement = document.querySelector('#prayer-text');
  prayerTextElement.classList.add('animate-marquee');

  const prayerText = `Jadwal Shalat ${formattedDate}
    Subuh ${timings.Fajr} • 
    Dzuhur ${timings.Dhuhr} • 
    Ashar ${timings.Asr} • 
    Maghrib ${timings.Maghrib} • 
    Isya ${timings.Isha}`;
  
  prayerTextElement.textContent = prayerText;
}

// Initialize all functions after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  Greeting();
  displayCourses(currentPage);
  setupPagination();
  setupScrollAnimations();
  setupsmoothscroll();
  video();
  animnavbar();

  // Update prayer times when page loads
  getPrayerTimes();
  // Update every hour
  setInterval(getPrayerTimes, 3600000);

  
});