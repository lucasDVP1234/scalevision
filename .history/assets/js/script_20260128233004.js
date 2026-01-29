// --- 1. DATA (Contenu) ---
const contentData = {
    ecom: {
        bgText: "E-COMMERCE",
        videos: [
            { src: "https://d3qck34svcw0mn.cloudfront.net/leclerc.mp4", title: "Leclerc" },
            { src: "https://d2ahkzba9leo8q.cloudfront.net/paulo1.webm", title: "Zeway" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/combray.mp4", title: "Combray" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/dieti1.mp4", title: "Dieti Natura" }
        ],
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/8.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/4.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png"
        ]
    },
    app: {
        bgText: "APPLICATIONS",
        videos: [
            { src: "https://d3qck34svcw0mn.cloudfront.net/gymlib.mp4", title: "Gymlib" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/qualiretraite.mp4", title: "QualiRetraite" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/coupon1.mp4", title: "Coupon Network" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/delup.mp4", title: "Delupay" }
        ],
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/2.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/7.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/6.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/2.png"
        ]
    },
    saas: {
        bgText: "SAAS B2B",
        videos: [
            { src: "https://d3qck34svcw0mn.cloudfront.net/orni.mp4", title: "Ornikar" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/cfc.mp4", title: "Cofondateur" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/wecandoo1.mp4", title: "Wecandoo" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/born.mp4", title: "Born4You" }
        ],
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/9.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png"
        ]
    },
    info: {
        bgText: "FORMATION",
        videos: [
            { src: "https://d3qck34svcw0mn.cloudfront.net/clc.mp4", title: "CLC" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/swissroc2.mp4", title: "SwissRoc" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/ugcademie.mp4", title: "UGCademie" },
            { src: "https://d3qck34svcw0mn.cloudfront.net/pulse1.mp4", title: "Pulse US" }
        ],
        logos: [
            "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/5.png",
            "https://ugcademie.s3.eu-north-1.amazonaws.com/10.png", "https://ugcademie.s3.eu-north-1.amazonaws.com/3.png"
        ]
    }
};

// --- 2. INITIALISATION & FONCTIONS ---
document.addEventListener("DOMContentLoaded", () => {

    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy-video"));

    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(video) {
                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }
                    // Si c'est une balise video directe sans source enfant
                    if(video.target.dataset.src) {
                        video.target.src = video.target.dataset.src;
                    }
                    
                    video.target.load();
                    video.target.classList.remove("lazy-video");
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function(lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
    
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

// Fonction pour le Lazy Play au survol
function lazyPlay(videoElement) {
    // On vérifie si la vidéo a une source chargée
    if (!videoElement.src && videoElement.dataset.src) {
        videoElement.src = videoElement.dataset.src;
        videoElement.load();
    }
    var playPromise = videoElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Lecture automatique empêchée par le navigateur");
        });
    }
}

// Fonction de filtre (Portfolio)
// Fonction pour le Lazy Play au survol
function lazyPlay(videoElement) {
    // On vérifie si la vidéo a une source chargée
    if (!videoElement.src && videoElement.dataset.src) {
        videoElement.src = videoElement.dataset.src;
        videoElement.load();
    }
    var playPromise = videoElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Lecture automatique empêchée par le navigateur");
        });
    }
}