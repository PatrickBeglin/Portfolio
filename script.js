async function loadHeader() {
    try {
        const response = await fetch('header.html');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const headerHTML = await response.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;
    } catch (error) {
        console.error('Error loading header:', error);
        // Handle error, e.g., display a fallback header
        document.getElementById('header-placeholder').innerHTML = "<p>Error loading header</p>";
    }
}

async function loadFooter() {
    try {
      const res = await fetch('footer.html');
      if (!res.ok) throw new Error(res.status);
      document
        .getElementById('footer-placeholder')
        .innerHTML = await res.text();
    } catch (e) {
      console.error('Error loading footer:', e);
    }
  }
  

document.addEventListener('DOMContentLoaded', () => {
    loadHeader(); // Load the header
    loadFooter();
    
    const images = ['tropp4.jpg', 'tropp/final-design4.jpg', 'menos1.jpg', 'tropp/final-design3.jpg', 'menos2.jpg', 'binder/final-design3.jpg'];
    let currentIndex = 0;

    const mainImage = document.getElementById('main-image');

    const moveThreshold = 20;

    let x = 0;
    let y = 0;
    let isImageChanging = false;

    function handleImageSwitch(event) {
        if (isImageChanging) return;

        const distanceMoved = Math.sqrt(
            Math.pow(event.clientX - x, 2) + Math.pow(event.clientY - y, 2)
        );

        if (distanceMoved > moveThreshold) {
            isImageChanging = true;

            currentIndex = (currentIndex + 1) % images.length;

            mainImage.src = images[currentIndex];

            x = event.clientX;
            y = event.clientY;

            mainImage.addEventListener('load', () => {
                isImageChanging = false;
            }, { once: true });
        }
    }
    mainImage.src = images[currentIndex];
    mainImage.addEventListener('mousemove', handleImageSwitch);

    // Get references to the bottom-tab-starter and bottom-tab elements
    const bottomTabStarter = document.querySelector('.bottom-tab-starter');
    const bottomTab = document.querySelector('.bottom-tab');

    // Add event listeners for hover
    bottomTabStarter.addEventListener('mouseenter', () => {
        bottomTabStarter.classList.add('hidden');
        bottomTab.classList.add('visible');
    });

    bottomTab.addEventListener('mouseleave', () => {
        bottomTabStarter.classList.remove('hidden');
        bottomTab.classList.remove('visible');
    });
    
});

const works = [
    {
        title: "Tropp",
        image: "tropp/final-design.jpg",
        link: "tropp.html"
    },
    {
        title: "Menos",
        image: "menos/menos2.jpg",
        link: "menos.html"
    },
    {
        title: "Binder",
        image: "binder/final-design.jpg",
        link: "binder.html"
    },
    {
        title: "Skok",
        image: "skok/banner-2.png",
        link: "skok.html"
    },
    {
        title: "COI",
        image: "coi/mockup.png",
        link: "coi.html"
    }
];

// Get the current page's filename (e.g., "tropp.html")
const currentPage = window.location.pathname.split("/").pop();

// Filter out the current page's work
const filteredWorks = works.filter(work => work.link !== currentPage);

// Generate the navigation bar
function generateNavBar() {
    const navBar = document.createElement("div");
    navBar.id = "nav-bar";

    filteredWorks.forEach(work => {
        const navItem = document.createElement("a");
        navItem.href = work.link;
        navItem.className = "nav-item";

        const img = document.createElement("img");
        img.src = work.image;
        img.alt = work.title;

        const title = document.createElement("p");
        title.textContent = work.title;

        navItem.appendChild(img);
        navItem.appendChild(title);
        navBar.appendChild(navItem);
    });

    // Append the navigation bar to the placeholder
    const placeholder = document.getElementById("nav-bar-placeholder");
    placeholder.appendChild(navBar);
}

// Generate the navigation bar when the page loads
document.addEventListener("DOMContentLoaded", generateNavBar);
