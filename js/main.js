/* js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SISTEMA DE TEMA (DARK / LIGHT MODE)
    const themeToggle = document.getElementById('themeToggle');
    const moonIcon = document.getElementById('moonIcon');
    const sunIcon = document.getElementById('sunIcon');

    // Recupera o tema salvo ou adota 'dark' como padrão de engenharia
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateToggleIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        // Aplica o tema
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            // Se está escuro, mostra o sol (botão para ir pro claro)
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            // Se está claro, mostra a lua (botão para ir pro escuro)
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }


    // 2. Navbar State on Scroll (Glassmorphism Effect)
    const nav = document.querySelector('nav');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });


    // 3. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // 4. SISTEMA DE TRADUÇÃO (i18n)
    const translations = {
      pt: {
        nav_home: "Início",
        nav_identidade: "Identidade",
        nav_servicos: "Serviços",
        nav_time: "Time",
        nav_contato: "Contato",
        hero_title: "Saia da bolha comum",
        hero_btn: "Inicializar Infraestrutura",
        sobre_sec_title: "Quem nós somos",
        sobre_title: "A Excelência como Padrão",
        sobre_text: "Inspirada na origem grega de algo grandioso, a TERA nasceu para romper o comum. Enquanto muitos se mantêm seguros na bolha de padrões previsíveis, nós somos o elemento que projeta para fora, desafiando limites em um mercado saturado. Nossa missão é clara: ajudar marcas a abandonarem o convencional para atingirem um novo patamar de excelência. Mais do que resultados, entregamos a evolução necessária para quem ousa ir além. Na TERA, o sucesso é o resultado natural de quem escolhe romper barreiras todos os dias.",
        serv_sec_title: "Nossos Serviços",
        serv_1_tit: "Presença Digital",
        serv_1_desc: "Criamos e otimizamos sites de alta performance. Seja do zero ou revitalizando uma estrutura existente, focamos em design funcional e experiência do usuário para converter visitantes em clientes.",
        serv_2_tit: "Infraestrutura de Rede",
        serv_2_desc: "Projetamos e gerenciamos redes estáveis e seguras. Garantimos que sua conexão e sistemas internos funcionem sem interrupções, suportando o crescimento da sua operação.",
        serv_3_tit: "Design Estratégico",
        serv_3_desc: "Traduzimos o DNA da sua marca em elementos visuais que comunicam autoridade. Criamos logos, layouts e materiais que posicionam sua empresa acima do mercado comum.",
        serv_4_tit: "Gestão Administrativa",
        serv_4_desc: "Cuidamos da burocracia para que você foque no crescimento. Organizamos processos internos e fluxos de trabalho administrativos, trazendo ordem e clareza para o dia a dia.",
        serv_5_tit: "Controle Financeiro",
        serv_5_desc: "Gerenciamos e otimizamos a saúde financeira do seu negócio. Do controle de contas à análise de viabilidade, garantimos que seus recursos sejam aplicados com máxima eficiência.",
        serv_6_tit: "Suporte e Performance",
        serv_6_desc: "Garantimos que sua estrutura digital nunca pare. Realizamos ajustes, correções e otimizações contínuas em sites e sistemas, assegurando que tudo funcione com máxima velocidade e segurança.",
        team_sec_title: "Nosso time",
        team_1_role: "Gestor de Desenvolvimento",
        team_2_role: "Gestor ADM/Financeiro",
        team_3_role: "Gestor de Design",
        contact_title: "Vamos conversar?",
        contact_desc: "Nossa equipe de especialistas está pronta para ouvir você. Conecte-se conosco para traçar o melhor plano de ação para a sua empresa.",
        contact_wpp: "Mandar Mensagem",
        contact_ig: "Nosso Instagram",
        footer_text: "TERA Engenharia e Automação © 2026. Todos os direitos reservados.",
        footer_title_atendimento: "CENTRAL DE ATENDIMENTO",
        footer_address: "Avenida Brasil, 2000 - Parque Residencial Nardini, Americana - SP",
        footer_title_redes: "REDES GLOBAIS",
        footer_copyright: "© 2026 TERA Engenharia & Tecnologia. Todos os direitos reservados."
      },
      en: {
        nav_home: "Home",
        nav_identidade: "Identity",
        nav_servicos: "Services",
        nav_time: "Team",
        nav_contato: "Contact",
        hero_title: "Break out of the ordinary",
        hero_btn: "Initialize Infrastructure",
        sobre_sec_title: "Who We Are",
        sobre_title: "Excellence as the Standard",
        sobre_text: "Inspired by the Greek origin of something grand, TERA was born to break the ordinary. While many remain safely inside the bubble of predictable patterns, we are the element that projects outward, defying limits in a saturated market. Our mission is clear: to help brands abandon the conventional to reach a new level of excellence. More than just results, we deliver the evolution necessary for those who dare to go beyond. At TERA, success is the natural result for those who choose to break barriers every single day.",
        serv_sec_title: "Our Services",
        serv_1_tit: "Digital Presence",
        serv_1_desc: "We create and optimize high-performance websites. Whether from scratch or revitalizing an existing structure, we focus on functional design and user experience to convert visitors into clients.",
        serv_2_tit: "Network Infrastructure",
        serv_2_desc: "We design and manage stable and secure networks. We guarantee that your connection and internal systems work without interruptions, supporting your operation's growth.",
        serv_3_tit: "Strategic Design",
        serv_3_desc: "We translate your brand's DNA into visual elements that communicate authority. We create logos, layouts, and materials that position your company above the common market.",
        serv_4_tit: "Administrative Management",
        serv_4_desc: "We handle the bureaucracy so you can focus on growth. We organize internal processes and administrative workflows, bringing order and clarity to your daily routine.",
        serv_5_tit: "Financial Control",
        serv_5_desc: "We manage and optimize your business's financial health. From account control to feasibility analysis, we ensure your resources are applied with maximum efficiency.",
        serv_6_tit: "Support & Performance",
        serv_6_desc: "We guarantee your digital structure never stops. We perform continuous adjustments, corrections, and optimizations on websites and systems, ensuring everything operates with maximum speed and security.",
        team_sec_title: "Our Team",
        team_1_role: "Development Manager",
        team_2_role: "Admin/Financial Manager",
        team_3_role: "Design Manager",
        contact_title: "Let's talk?",
        contact_desc: "Our team of experts is ready to listen to you. Connect with us to chart the best action plan for your company.",
        contact_wpp: "Send Message",
        contact_ig: "Our Instagram",
        footer_text: "TERA Engineering and Automation © 2026. All rights reserved.",
        footer_title_atendimento: "SUPPORT CENTER",
        footer_address: "Brasil Avenue, 2000 - Nardini Residential Park, Americana - SP",
        footer_title_redes: "GLOBAL NETWORKS",
        footer_copyright: "© 2026 TERA Engineering & Technology. All rights reserved."
      }
    };

    const langToggle = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('lang') || 'pt';

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });
        // O botão exibe a língua para a qual PODEMOS trocar (Se tá em PT, o botão diz EN)
        langToggle.textContent = lang === 'pt' ? 'EN' : 'PT';
        localStorage.setItem('lang', lang);
    }

    applyLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        applyLanguage(currentLang);
    });
});
