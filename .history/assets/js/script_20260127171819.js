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

document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calcul de la rotation
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
    
    // Animation d'apparition au scroll
    gsap.from(".pricing-card", {
        scrollTrigger: {
            trigger: "#packs",
            start: "top 70%"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
    // On enregistre le Plugin ScrollTrigger pour les animations au scroll plus tard
    gsap.registerPlugin(ScrollTrigger);
    
    // On lance la catégorie par défaut
    filterVideos('ecom');
});

/* --- SECTION 3 : TRACEUR SCROLL --- */
    
    // Animation de la ligne centrale
    gsap.to("#line-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "#process",
            start: "top center", // Commence quand le haut de la section est au milieu de l'écran
            end: "bottom center", // Finit quand le bas est au milieu
            scrub: 0.5 // Synchronisé avec le scroll (avec légère fluidité)
        }
    });
    
    // Animation de la tête de ligne (le point blanc)
    gsap.to("#line-head", {
        top: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: "#process",
            start: "top center",
            end: "bottom center",
            scrub: 0.5
        }
    });

    // Animation des Étapes (Allumage progressif et définitif)
    const steps = document.querySelectorAll(".process-step");
    
    steps.forEach((step) => {
        gsap.to(step, {
            opacity: 1,           // Devient totalement visible
            filter: "blur(0px)",  // Enlève totalement le flou
            duration: 0.8,        // Vitesse de l'animation (plus doux)
            ease: "power2.out",   // Transition naturelle
            scrollTrigger: {
                trigger: step,
                start: "top 75%", // Se déclenche quand l'élément est au 3/4 de l'écran (plus tôt)
                // C'EST ICI QUE ÇA CHANGE :
                // "play" = Joue l'anim quand on arrive
                // "none" "none" "none" = Ne fait RIEN si on remonte ou redescend. Ça reste net.
                toggleActions: "play none none none" 
            }
        });
    });

    // Animation Spéciale : Compteurs Etape 5 (Tadaa)
    // On utilise ScrollTrigger pour lancer le comptage quand on arrive en bas
    ScrollTrigger.create({
        trigger: "[data-index='5']",
        start: "top 70%",
        onEnter: () => {
            document.querySelectorAll('.counter-anim').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = target === 100 ? '%' : (target === 15 ? 'x' : '+'); // Petit suffixe stylé
                
                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    snap: { innerText: 1 }, // Compte par nombres entiers
                    onUpdate: function() {
                        this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerText) + suffix;
                    }
                });
            });
        }
    });
    
    // Animation Spéciale : Montage (Barres qui grandissent)
    // Ajout d'une animation CSS via Tailwind configuré inline
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes widthGrow {
            0% { width: 0%; opacity: 0; }
            50% { width: 80%; opacity: 1; }
            100% { width: 100%; opacity: 0; }
        }
    `;
    document.head.appendChild(style);

function filterVideos(category) {
    const grid = document.getElementById('gallery-grid');
    const logoTrack = document.getElementById('logo-track');
    const bgWatermark = document.getElementById('bg-watermark');
    const buttons = document.querySelectorAll('.filter-btn, .filter-btn-neon');
    
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

