// --- 1. DATA (Contenu) ---
const contentData = {
    ecom: {
        bgText: "E-COMMERCE",
        videos: [
            { src: "https://d213aukarjntl4.cloudfront.net/leclerc.mp4", title: "Unboxing Produit" },
            { src: "https://d2ahkzba9leo8q.cloudfront.net/paulo1.webm", title: "Témoignage Client" },
            { src: "https://d213aukarjntl4.cloudfront.net/combray.mp4", title: "Problem / Solution" },
            { src: "https://d213aukarjntl4.cloudfront.net/dieti1.mp4", title: "Lifestyle Vibe" }
        ],
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/8.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/4.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png"
        ]
    },
    app: {
        bgText: "APPLICATIONS",
        videos: [
            { src: "https://d213aukarjntl4.cloudfront.net/gymlib.mp4", title: "App Walkthrough" },
            { src: "https://d213aukarjntl4.cloudfront.net/swissroc.mp4", title: "User Experience" },
            { src: "https://d213aukarjntl4.cloudfront.net/coupon1.mp4", title: "Feature Focus" },
            { src: "https://d213aukarjntl4.cloudfront.net/delup.webm", title: "Download CTA" }
        ],
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/2.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/7.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/6.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/2.png"
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
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/9.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png"
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
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png"
        ]
    }
};

// --- 2. INITIALISATION & FONCTIONS ---
document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // Initialiser le Portfolio
    filterVideos('ecom');

    // Animation de la ligne centrale
    gsap.to("#line-fill", {
        height: "100%", ease: "none",
        scrollTrigger: { trigger: "#process", start: "top center", end: "bottom center", scrub: 0.5 }
    });
    // Animation du point
    gsap.to("#line-head", {
        top: "100%", ease: "none",
        scrollTrigger: { trigger: "#process", start: "top center", end: "bottom center", scrub: 0.5 }
    });

    // Animation des Étapes
    document.querySelectorAll(".process-step").forEach((step) => {
        gsap.to(step, {
            opacity: 1, filter: "blur(0px)", transform: "scale(1)", duration: 0.6, ease: "back.out(1.2)",
            scrollTrigger: { trigger: step, start: "top 70%", toggleActions: "play none none none" }
        });
    });

    ScrollTrigger.create({
        trigger: "[data-index='5']", start: "top 70%",
        onEnter: () => {
            document.querySelectorAll('.counter-anim').forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = target === 100 ? '%' : (target === 15 ? 'x' : '+');
                gsap.to(counter, { innerText: target, duration: 2, snap: { innerText: 1 }, onUpdate: function() { this.targets()[0].innerHTML = Math.ceil(this.targets()[0].innerText) + suffix; } });
            });
        }
    });

    // --- ANIMATIONS SECTION 4 (PACKS) ---
    // Animation d'apparition
    gsap.from(".pricing-card", {
        scrollTrigger: { trigger: "#packs", start: "top 75%" },
        y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out"
    });

    // Effet 3D Tilt sur les cartes
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4; 
            const rotateY = ((x - centerX) / centerX) * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    /* --- SECTION 5 : FAQ ACCORDION --- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            // 1. Fermer tous les autres (Accordéon strict)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    gsap.to(otherItem.querySelector('.faq-answer'), {
                        height: 0,
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                }
            });

            // 2. Toggle l'élément cliqué
            if (isOpen) {
                // Si ouvert -> On ferme
                item.classList.remove('active');
                gsap.to(answer, {
                    height: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            } else {
                // Si fermé -> On ouvre
                item.classList.add('active');
                gsap.set(answer, { height: "auto" }); // On prépare la hauteur auto
                gsap.from(answer, {
                    height: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            }
        });
    });
    /* --- SECTION AGENCE : ANIMATION --- */
    gsap.from(".polaroid-card", {
        scrollTrigger: {
            trigger: "#agence",
            start: "top 70%"
        },
        y: 200,
        opacity: 0,
        rotation: 0, // Elles partent droites et prennent leur angle CSS à l'arrivée
        duration: 1,
        stagger: 0.1, // Effet cascade
        ease: "back.out(1.5)" // Effet rebond
    });
});

// Fonction de filtre (Portfolio)
function filterVideos(category) {
    const grid = document.getElementById('gallery-grid');
    const logoTrack = document.getElementById('logo-track');
    const bgWatermark = document.getElementById('bg-watermark');
    const buttons = document.querySelectorAll('.filter-btn-neon');
    const data = contentData[category];

    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.getAttribute('data-filter') === category) btn.classList.add('active');
    });

    if(bgWatermark) {
        gsap.to(bgWatermark, { opacity: 0, scale: 0.8, duration: 0.3, onComplete: () => {
            bgWatermark.innerText = data.bgText;
            gsap.to(bgWatermark, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
        }});
    }

    const injectAndAnimateIn = () => {
        if(!grid) return;
        grid.innerHTML = '';
        data.videos.forEach(item => {
            grid.innerHTML += `
                <div class="portfolio-card group cursor-pointer opacity-0 translate-y-4 rounded-3xl border border-white/10 bg-black overflow-hidden relative aspect-[9/16] transition-all duration-500">
                    <video src="${item.src}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" muted loop playsinline onmouseover="this.play()" onmouseout="this.pause()"></video>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                    <div class="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span class="inline-block px-2 py-1 bg-scalePink text-white text-[9px] font-black uppercase rounded mb-2">${data.bgText}</span>
                        <h3 class="text-lg font-bold leading-tight text-white">${item.title}</h3>
                    </div>
                    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100">
                        <i class="fas fa-play text-white text-sm"></i>
                    </div>
                </div>`;
        });

        if(logoTrack) {
            logoTrack.innerHTML = '';
            if (data.logos) {
                const allLogos = [...data.logos, ...data.logos]; 
                allLogos.forEach(logoUrl => {
                    logoTrack.innerHTML += `<img src="${logoUrl}" class="logo-item opacity-0 h-8 object-contain mx-8 brightness-0 invert">`;
                });
            }
        }

        gsap.to(".portfolio-card", { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" });
        gsap.to(".logo-item", { opacity: 0.6, scale: 1, duration: 0.4, stagger: 0.05, delay: 0.2 });
    };

    if (grid && grid.children.length > 0) {
        const tl = gsap.timeline({ onComplete: injectAndAnimateIn });
        tl.to(".portfolio-card", { opacity: 0, y: 20, duration: 0.3, stagger: 0.05 })
          .to(".logo-item", { opacity: 0, scale: 0.5, duration: 0.2 }, "<");
    } else {
        injectAndAnimateIn();
    }
}