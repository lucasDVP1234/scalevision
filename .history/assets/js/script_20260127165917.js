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
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/8.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/4.png",
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
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/2.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/7.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/6.png",
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
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/9.png",
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
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png"
        ]
    }
};

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
    // On enregistre le Plugin ScrollTrigger pour les animations au scroll plus tard
    gsap.registerPlugin(ScrollTrigger);
    
    // On lance la catégorie par défaut
    filterVideos('ecom');
});

function filterVideos(category) {
    const grid = document.getElementById('gallery-grid');
    const logoTrack = document.getElementById('logo-track');
    const bgWatermark = document.getElementById('bg-watermark');
    const buttons = document.querySelectorAll('.filter-btn, .filter-btn-light');
    
    // Récupération des données
    const data = contentData[category];

    // 1. Boutons Actifs
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-filter') === category) btn.classList.add('active');
    });

    // 2. Animation Background Text
    if(bgWatermark) {
        gsap.to(bgWatermark, { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.3, 
            onComplete: () => {
                bgWatermark.innerText = data.bgText;
                gsap.to(bgWatermark, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
            }
        });
    }

    // --- LOGIQUE D'ANIMATION CORRIGÉE ---
    
    // Fonction pour injecter et animer l'entrée (APPELÉE APRÈS LA SORTIE)
    const injectAndAnimateIn = () => {
        // A. Injection HTML (Vidéos)
        grid.innerHTML = '';
        data.videos.forEach(item => {
            grid.innerHTML += `
                <div class="portfolio-card group cursor-pointer opacity-0 translate-y-4">
                    <video src="${item.src}" class="w-full h-full object-cover" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>
                    <div class="absolute inset-0 video-overlay opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                        <span class="text-scalePink text-xs font-bold uppercase tracking-widest mb-1">${data.bgText}</span>
                        <h3 class="text-xl font-bold leading-none text-white">${item.title}</h3>
                    </div>
                </div>`;
        });

        // B. Injection HTML (Logos)
        logoTrack.innerHTML = '';
        if (data.logos) {
            const allLogos = [...data.logos, ...data.logos]; 
            allLogos.forEach(logoUrl => {
                logoTrack.innerHTML += `<img src="${logoUrl}" class="logo-item opacity-0">`;
            });
        }

        // C. Animation d'Entrée (Maintenant que le HTML existe !)
        // On utilise gsap.to sur les nouvelles classes
        gsap.to(".portfolio-card", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
        gsap.to(".logo-item", { opacity: 0.6, scale: 1, duration: 0.4, stagger: 0.05, delay: 0.2 });
    };

    // 3. Animation de Sortie (si contenu existant)
    if (grid.children.length > 0) {
        const tl = gsap.timeline({ onComplete: injectAndAnimateIn });
        tl.to(".portfolio-card", { opacity: 0, y: 20, duration: 0.3, stagger: 0.05 })
          .to(".logo-item", { opacity: 0, scale: 0.5, duration: 0.2 }, "<");
    } else {
        // Premier chargement : pas de sortie, on injecte direct
        injectAndAnimateIn();
    }
}