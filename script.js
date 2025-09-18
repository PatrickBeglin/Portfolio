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
      const footerHost = document.getElementById('footer-placeholder');
      if (footerHost) {
        footerHost.innerHTML = await res.text();
      }
    } catch (e) {
      console.error('Error loading footer:', e);
    }
  }
  

document.addEventListener('DOMContentLoaded', () => {
    loadHeader(); // Load the header
    loadFooter(); // load the footer
    


    const images = ['tropp4.jpg', 'menos1.jpg', '../skok/banner-2.png','coi/mockup2.png', 'binder/final-design4.jpg', 'tennis/Home_page.jpg'];
    
    let currentIndex = 0;

    const mainImage = document.getElementById('right-image');


    const moveThreshold = 100;

    let x = 0;
    let y = 0;
    let isImageChanging = false;
    

    const image_data = [
        {
            link: 'tropp.html',
            textLeft: '01',
            textRight: 'Tropp'
        },
        {
            link: 'menos.html',
            textLeft: '02',
            textRight: 'Menos'
        },
        {
            link: 'skok.html',
            textLeft: '03',
            textRight: 'Skok'
        },
        {
            link: 'coi.html',
            textLeft: '04',
            textRight: 'COI'
        },
        {
            link: 'binder.html',
            textLeft: '05',
            textRight: 'Binder'
        },
        {
            link: 'tennis.html',
            textLeft: '06',
            textRight: 'Tennis Wearable'
        }

    ]


    const imageIdx = {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6
        }

    function handleLinkSwitch(currentIndex){
        var currentLinkIdx = imageIdx[currentIndex]
        var link = document.getElementById('image-link')
        link.href = image_data[currentLinkIdx].link

        var textLeft = document.getElementById('bottom-left')
        var textRight = document.getElementById('bottom-right')

        textLeft.textContent = image_data[currentLinkIdx].textLeft
        textRight.textContent = image_data[currentLinkIdx].textRight
    }

   

    // changes image if you move 20 or more
    function handleImageSwitch(event) {
        if (isImageChanging) return;

        const distanceMoved = Math.sqrt(
            Math.pow(event.clientX - x, 2) + Math.pow(event.clientY - y, 2)
        );

        if (distanceMoved > moveThreshold) {
            isImageChanging = true;

            currentIndex = (currentIndex + 1) % images.length;  // increments by one and wraps around length of images
            handleLinkSwitch(currentIndex)
            
            mainImage.src = images[currentIndex];

            x = event.clientX;
            y = event.clientY;

            mainImage.addEventListener('load', () => { // load triggers when it has fully loaded
                isImageChanging = false; // if loaded then its not changing
            }, { once: true }); // runs once
        }
    }
    mainImage.src = images[currentIndex];
    mainImage.addEventListener('mousemove', handleImageSwitch);





   
   
   // for the main page nav bar 
   
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








// below this is for nav bar

const works = [
    {
        title: "Tropp",
        image: "tropp/final-design.jpg",
        link: "tropp.html"
    },
    {
        title: "COI",
        image: "coi/mockup.png",
        link: "coi.html"
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
        title: "Menos",
        image: "menos/menos2.jpg",
        link: "menos.html"
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
