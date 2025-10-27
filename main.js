// Portfolio Main JavaScript - 3D Effects, Animations, and GitHub Integration

class PortfolioApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.mouse = { x: 0, y: 0 };
        this.githubUsername = 'octocat'; // Default GitHub username for demo
        this.projects = [];
        
        this.init();
    }

    init() {
        this.setup3DHero();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupMobileMenu();
        this.loadGitHubProjects();
        this.setupSmoothScrolling();
        this.setupParticleSystem();
    }

    // 3D Hero Background Setup
    setup3DHero() {
        if (typeof THREE === 'undefined') return;

        const container = document.getElementById('hero-3d');
        if (!container) return;

        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Create particle system
        this.createParticleSystem();
        
        // Add geometric shapes
        this.createGeometricShapes();

        // Camera position
        this.camera.position.z = 5;

        // Mouse interaction
        this.setupMouseInteraction();

        // Animation loop
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createParticleSystem() {
        const particleCount = 150;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;

            // Blue to purple gradient
            colors[i] = 0.2 + Math.random() * 0.3; // R
            colors[i + 1] = 0.4 + Math.random() * 0.4; // G  
            colors[i + 2] = 0.8 + Math.random() * 0.2; // B
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createGeometricShapes() {
        // Create floating geometric shapes
        const geometries = [
            new THREE.BoxGeometry(0.2, 0.2, 0.2),
            new THREE.SphereGeometry(0.1, 8, 8),
            new THREE.ConeGeometry(0.1, 0.2, 6)
        ];

        for (let i = 0; i < 20; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6),
                transparent: true,
                opacity: 0.6,
                wireframe: Math.random() > 0.5
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 15
            );

            mesh.rotation.set(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            );

            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                }
            };

            this.scene.add(mesh);
        }
    }

    setupMouseInteraction() {
        document.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.particles) {
            // Rotate particles
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;

            // Mouse interaction with particles
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.001;
                positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.001;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Animate geometric shapes
        this.scene.children.forEach(child => {
            if (child.userData && child.userData.rotationSpeed) {
                child.rotation.x += child.userData.rotationSpeed.x;
                child.rotation.y += child.userData.rotationSpeed.y;
                child.rotation.z += child.userData.rotationSpeed.z;
            }
        });

        // Camera movement based on mouse
        if (this.camera) {
            this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
            this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;
            this.camera.lookAt(this.scene.position);
        }

        if (this.renderer) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onWindowResize() {
        if (this.camera && this.renderer) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-element').forEach(el => {
            observer.observe(el);
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        setTimeout(() => {
                            bar.style.width = width + '%';
                        }, 200);
                    });
                }
            });
        });

        document.querySelectorAll('.skill-bar').forEach(bar => {
            skillObserver.observe(bar.parentElement);
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                // Simple mobile menu toggle - could be expanded
                alert('Mobile menu - Navigate to: About, Projects, Contact pages');
            });
        }
    }

    // GitHub API Integration
    async loadGitHubProjects() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.githubUsername}/repos?sort=updated&per_page=6`);
            
            if (!response.ok) {
                throw new Error('GitHub API request failed');
            }
            
            this.projects = await response.json();
            this.displayProjects();
        } catch (error) {
            console.error('Error loading GitHub projects:', error);
            this.displayFallbackProjects();
        }
    }

    displayProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = '';

        this.projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            projectsGrid.appendChild(projectCard);
        });

        // Animate project cards
        anime({
            targets: '.project-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });
    }

    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card card-3d rounded-xl p-6 reveal-element';
        card.style.animationDelay = `${index * 0.1}s`;

        const languageColor = this.getLanguageColor(project.language);
        const description = project.description || 'No description available';
        const imageIndex = (index % 5) + 1; // Cycle through available images

        card.innerHTML = `
            <div class="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <img src="https://kimi-web-img.moonshot.cn/img/images.squarespace-cdn.com/21aa0bae91740d2ad77192bb7bbd795d6db20bfa.jpg" 
                     alt="${project.name}" 
                     class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
            </div>
            <div class="flex items-center mb-2">
                <div class="w-3 h-3 rounded-full mr-2" style="background-color: ${languageColor}"></div>
                <span class="text-sm text-gray-600 code-font">${project.language || 'Unknown'}</span>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-gray-900">${project.name}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">${description}</p>
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        ${project.stargazers_count}
                    </span>
                    <span class="flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
                        </svg>
                        ${project.forks_count}
                    </span>
                </div>
                <a href="${project.html_url}" target="_blank" 
                   class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                    View Code →
                </a>
            </div>
        `;

        return card;
    }

    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'Java': '#b07219',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'C++': '#f34b7d',
            'C#': '#239120',
            'PHP': '#4F5D95',
            'Ruby': '#701516',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'Dart': '#00B4AB',
            'Vue': '#4FC08D',
            'React': '#61DAFB',
            'HTML': '#e34c26',
            'CSS': '#1572B6',
            'Shell': '#89e051',
            'Dockerfile': '#384d54'
        };
        return colors[language] || '#6b7280';
    }

    displayFallbackProjects() {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        const fallbackProjects = [
            {
                name: '3D Portfolio Website',
                description: 'Interactive portfolio with Three.js animations and modern design',
                language: 'JavaScript',
                stargazers_count: 42,
                forks_count: 15,
                html_url: '#'
            },
            {
                name: 'React Dashboard',
                description: 'Full-stack dashboard application with real-time data visualization',
                language: 'TypeScript',
                stargazers_count: 128,
                forks_count: 34,
                html_url: '#'
            },
            {
                name: 'API Microservices',
                description: 'Scalable microservices architecture with Docker and Kubernetes',
                language: 'Python',
                stargazers_count: 89,
                forks_count: 23,
                html_url: '#'
            },
            {
                name: 'Mobile App Framework',
                description: 'Cross-platform mobile development framework with native performance',
                language: 'Dart',
                stargazers_count: 156,
                forks_count: 41,
                html_url: '#'
            },
            {
                name: 'Machine Learning Toolkit',
                description: 'Python toolkit for data science and machine learning workflows',
                language: 'Python',
                stargazers_count: 203,
                forks_count: 67,
                html_url: '#'
            },
            {
                name: 'DevOps Automation',
                description: 'CI/CD pipeline automation and infrastructure as code',
                language: 'Go',
                stargazers_count: 74,
                forks_count: 18,
                html_url: '#'
            }
        ];

        this.projects = fallbackProjects;
        this.displayProjects();
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Particle System for Background Effects
    setupParticleSystem() {
        // Add floating particles to the page for additional visual effects
        this.createPageParticles();
    }

    createPageParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '1';
        document.body.appendChild(particleContainer);

        // Create floating particles
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = `rgba(${100 + Math.random() * 155}, ${150 + Math.random() * 105}, 255, ${0.3 + Math.random() * 0.4})`;
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${5 + Math.random() * 10}s ease-in-out infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            
            particleContainer.appendChild(particle);
        }
    }

    // Utility function for scrolling to sections
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Initialize the portfolio app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Global function for button clicks
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
        }
        25% { 
            transform: translateY(-10px) translateX(5px);
            opacity: 0.6;
        }
        50% { 
            transform: translateY(-5px) translateX(-5px);
            opacity: 0.8;
        }
        75% { 
            transform: translateY(-15px) translateX(3px);
            opacity: 0.5;
        }
    }
`;
document.head.appendChild(style);