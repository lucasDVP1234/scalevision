// DATA : Vidéos + Logos par catégorie + Texte de fond
const contentData = {
    ecom: {
        bgText: "E-COMMERCE",
        videos: [
            { src: "https://d213aukarjntl4.cloudfront.net/video1.mp4", title: "Unboxing Produit" },
            { src: "https://d213aukarjntl4.cloudfront.net/paulo1.webm", title: "Témoignage Client" },
            { src: "https://d213aukarjntl4.cloudfront.net/elea.mov", title: "Problem / Solution" },
            { src: "https://d213aukarjntl4.cloudfront.net/silene2.mov", title: "Lifestyle Vibe" }
        ],
        // Remplace par les vrais logos de tes clients E-com
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png", // Horace
            "https://ugcademie.s3.eu-north-1.amazonaws.com/8.png",  // Cuisinella
            "https://ugcademie.s3.eu-north-1.amazonaws.com/4.png",  // Le Grand Dressing
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/8.png"
        ]
    },
    app: {
        bgText: "APPLICATIONS",
        videos: [
            { src: "https://d213aukarjntl4.cloudfront.net/remi.mov", title: "App Walkthrough" },
            { src: "https://d213aukarjntl4.cloudfront.net/video1.mp4", title: "User Experience" },
            { src: "https://d213aukarjntl4.cloudfront.net/anne.mov", title: "Feature Focus" },
            { src: "https://d213aukarjntl4.cloudfront.net/paulo1.webm", title: "Download CTA" }
        ],
        // Logos Apps (Tinder, Happn, etc.)
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/2.png", // Happn
            "https://ugcademie.s3.eu-north-1.amazonaws.com/7.png", // TikTok
            "https://ugcademie.s3.eu-north-1.amazonaws.com/6.png", // Babbel
            "https://ugcademie.s3.eu-north-1.amazonaws.com/2.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/7.png"
        ]
    },
    saas: {
        bgText: "SAAS B2B",
        videos: [
            { src: "https://d213aukarjntl4.cloudfront.net/elea.mov", title: "B2B Explainer" },
            { src: "https://d213aukarjntl4.cloudfront.net/silene2.mov", title: "Case Study" },
            { src: "https://d213aukarjntl4.cloudfront.net/remi.mov", title: "Founder Story" },
            { src: "https://d213aukarjntl4.cloudfront.net/video1.mp4", title: "Pain Point" }
        ],
        // Logos B2B
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png", // CPF
            "https://ugcademie.s3.eu-north-1.amazonaws.com/9.png", // ESDES
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/9.png"
        ]
    },
    info: {
        bgText: "FORMATION",
        videos: [
            { src: "https://d213aukarjntl4.cloudfront.net/anne.mov", title: "Masterclass" },
            { src: "https://d213aukarjntl4.cloudfront.net/paulo1.webm", title: "Student Win" },
            { src: "https://d213aukarjntl4.cloudfront.net/video1.mp4", title: "Value Bomb" },
            { src: "https://d213aukarjntl4.cloudfront.net/elea.mov", title: "Webinar" }
        ],
        // Logos Infopreneurs
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png", // France Relance
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png"
        ]
    }
};

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
    filterVideos('ecom'); // Charge E-com par défaut
});

JavaScript
function filterVideos(category) {
    const grid = document.getElementById('gallery-grid');
    const logoTrack = document.getElementById('logo-track');
    const bgWatermark = document.getElementById('bg-watermark');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // On récupère les données
    const data = contentData[category];

    // 1. Mise à jour visuelle des boutons (Active state)
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-filter') === category) btn.classList.add('active');
    });

    // 2. Animation du Texte de Fond
    if(bgWatermark) {
        gsap.to(bgWatermark, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => {
            bgWatermark.innerText = data.bgText;
            gsap.to(bgWatermark, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
        }});
    }

    // CHECK IMPORTANT : Est-ce qu'il y a déjà des cartes ?
    // Si c'est le premier chargement, grid.children.length sera 0
    const hasCards = grid.children.length > 0;
    
    const tl = gsap.timeline();

    // 3. Sortie (On ne le fait QUE s'il y a déjà des choses à faire disparaître)
    if (hasCards) {
        tl.to(".portfolio-card", { opacity: 0, y: 20, duration: 0.3, stagger: 0.05 })
          .to(".logo-item", { opacity: 0, scale: 0.5, duration: 0.2 }, "<");
    }

    // 4. Injection du nouveau contenu (HTML)
    tl.add(() => {
        // On vide la grille
        grid.innerHTML = '';
        logoTrack.innerHTML = '';

        // On injecte les nouvelles Vidéos
        data.videos.forEach(item => {
            // Note: On met opacity-0 ici, GSAP va le passer à 1 juste après
            grid.innerHTML += `
                <div class="portfolio-card group cursor-pointer opacity-0 translate-y-4">
                    <video src="${item.src}" class="w-full h-full object-cover" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>
                    <div class="absolute inset-0 video-overlay opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                        <span class="text-scalePink text-xs font-bold uppercase tracking-widest mb-1">${data.bgText}</span>
                        <h3 class="text-xl font-bold leading-none text-white">${item.title}</h3>
                    </div>
                </div>`;
        });

        // On injecte les nouveaux Logos
        if (data.logos) {
            const allLogos = [...data.logos, ...data.logos]; // Dupliqué pour effet infini
            allLogos.forEach(logoUrl => {
                logoTrack.innerHTML += `<img src="${logoUrl}" class="logo-item opacity-0">`;
            });
        }
    });

    // 5. Animation d'entrée (Sur les éléments NOUVELLEMENT créés)
    tl.to(".portfolio-card", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" })
      .to(".logo-item", { opacity: 0.6, scale: 1, duration: 0.4, stagger: 0.05 }, "-=0.3");
}