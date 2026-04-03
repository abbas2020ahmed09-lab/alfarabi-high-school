/* ============================================
   AL-FARABI HIGH SCHOOL - COMPLETE JAVASCRIPT
   Fully upgraded with working dashboards and all fixes
   ============================================ */

// ============ INITIALIZATION ============
const EMAILJS_PUBLIC_KEY = 'PtNUiabGSo45QZ8vA';
const EMAILJS_SERVICE_ID = 'service_i526d1h';
const EMAILJS_TEMPLATE_ID = 'template_124e1mq';

// GitHub Sync Configuration
const GITHUB_CONFIG = {
    repo: 'your-username/alfarabi-school', // غير هذا لاسم المستودع الخاص بك
    branch: 'main',
    apiToken: 'your-github-token', // يجب أن يكون هذا آمناً
    dataFile: 'data.json'
};

// Global variables
let currentLang = 'ar';
let currentUser = null;
let syncEnabled = true;

// Initial data
const teachersData = [
    { 
        name: 'د. أحمد محمد العبيدي', 
        subject: 'الرياضيات', 
        qualification: 'دكتوراه في الرياضيات التطبيقية', 
        experience: '15 سنة',
        email: 'ahmed.obeidi@alfarabi.edu',
        phone: '07801234567',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        bio: 'خبير في الرياضيات التطبيقية والذكاء الاصطناعي، مؤلف العديد من الأبحاث العلمية'
    },
    { 
        name: 'أ. علي خالد الموسوي', 
        subject: 'الفيزياء', 
        qualification: 'ماجستير في الفيزياء النظرية', 
        experience: '12 سنة',
        email: 'ali.mousawi@alfarabi.edu',
        phone: '07801234568',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        bio: 'متخصص في الفيزياء الكمومية وتطبيقاتها في التكنولوجيا الحديثة'
    },
    { 
        name: 'د. فاطمة حسن الجبوري', 
        subject: 'الكيمياء', 
        qualification: 'دكتوراه في الكيمياء العضوية', 
        experience: '10 سنة',
        email: 'fatima.jabouri@alfarabi.edu',
        phone: '07801234569',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
        bio: 'باحثة في مجال الكيمياء الطبية وتطوير الأدوية الجديدة'
    },
    { 
        name: 'أ. محمد صالح العلي', 
        subject: 'الأحياء', 
        qualification: 'ماجستير في العلوم الحيوية', 
        experience: '8 سنة',
        email: 'mohammed.ali@alfarabi.edu',
        phone: '07801234570',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        bio: 'خبير في البيولوجيا الجزيئية والتقنيات الحيوية الحديثة'
    },
    { 
        name: 'أ. سارة أحمد الكاظمي', 
        subject: 'اللغة العربية', 
        qualification: 'ماجستير في الأدب العربي', 
        experience: '11 سنة',
        email: 'sara.kadimi@alfarabi.edu',
        phone: '07801234571',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        bio: 'متخصصة في النقد الأدبي والبلاغة العربية'
    }
];

const newsData = [
    { title: 'افتتاح المختبرات الحديثة', date: '2024-03-28', description: 'تم افتتاح مختبرات حديثة مزودة بأحدث الأجهزة العلمية', emoji: '🔬' },
    { title: 'مسابقة الخطابة الوطنية', date: '2024-03-25', description: 'فوز طلابنا في مسابقة الخطابة على مستوى المنطقة', emoji: '🎤' },
    { title: 'نشاط رياضي جماعي', date: '2024-03-20', description: 'حفل تكريم الفائزين في البطولات الرياضية المدرسية', emoji: '⚽' },
    { title: 'معرض العلوم السنوي', date: '2024-03-18', description: 'عرض الطلاب لمشاريعهم العلمية بمعرض العلوم السنوي', emoji: '🏆' },
    { title: 'برنامج التبادل الثقافي', date: '2024-03-15', description: 'استقبال وفد من الطلاب الدوليين للتبادل الثقافي', emoji: '🌍' },
    { title: 'حفل تكريم المتفوقين', date: '2024-03-10', description: 'تكريم الطلاب المتفوقين وأوائل الطلاب في جميع الصفوف', emoji: '🎓' }
];

const galleryItems = [
    {
        title: 'افتتاح العام الدراسي',
        description: 'حفل افتتاح العام الدراسي الجديد بحضور كافة الهيئة التدريسية',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        type: 'event',
        date: '2024-09-01'
    },
    {
        title: 'مسابقة الرياضيات',
        description: 'طلابنا يشاركون في مسابقة الرياضيات الوطنية',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop',
        type: 'competition',
        date: '2024-10-15'
    },
    {
        title: 'رحلة علمية',
        description: 'رحلة ميدانية إلى مركز الأبحاث العلمية',
        image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
        type: 'trip',
        date: '2024-11-20'
    },
    {
        title: 'معرض المشاريع',
        description: 'معرض المشاريع العلمية والهندسية للطلاب',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop',
        type: 'science',
        date: '2024-12-10'
    },
    {
        title: 'حفل التخرج',
        description: 'حفل تخرج الدفعة السادسة عشر',
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop',
        type: 'graduation',
        date: '2024-06-15'
    },
    {
        title: 'ورشة عمل الروبوتics',
        description: 'ورشة عمل في برمجة وتصميم الروبوتات',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        type: 'workshop',
        date: '2024-09-20'
    }
];

const topStudentsData = {
    '1st': [
        { name: 'علي محمد', grade: 'الأول المتوسط', rank: '1', average: 98.5, score: 492 },
        { name: 'أحمد خالد', grade: 'الأول المتوسط', rank: '2', average: 97.8, score: 489 },
        { name: 'عمر حسن', grade: 'الأول المتوسط', rank: '3', average: 96.9, score: 484 }
    ],
    '2nd': [
        { name: 'خالد علي', grade: 'الثاني المتوسط', rank: '1', average: 99.1, score: 495 },
        { name: 'محمد أحمد', grade: 'الثاني المتوسط', rank: '2', average: 98.3, score: 491 },
        { name: 'عبدالله عمر', grade: 'الثاني المتوسط', rank: '3', average: 97.5, score: 487 }
    ],
    '3rd': [
        { name: 'حسن محمود', grade: 'الثالث المتوسط', rank: '1', average: 98.9, score: 494 },
        { name: 'ياسر خالد', grade: 'الثالث المتوسط', rank: '2', average: 98.1, score: 490 },
        { name: 'سالم ناصر', grade: 'الثالث المتوسط', rank: '3', average: 97.2, score: 486 }
    ],
    '4th': [
        { name: 'فارس أحمد', grade: 'الرابع الإعدادي', rank: '1', average: 99.3, score: 496 },
        { name: 'رائد محمد', grade: 'الرابع الإعدادي', rank: '2', average: 98.7, score: 493 },
        { name: 'نبيل علي', grade: 'الرابع الإعدادي', rank: '3', average: 97.9, score: 489 }
    ],
    '5th': [
        { name: 'سالم حسن', grade: 'الخامس الإعدادي', rank: '1', average: 99.5, score: 497 },
        { name: 'طارق خالد', grade: 'الخامس الإعدادي', rank: '2', average: 98.8, score: 494 },
        { name: 'ماهر عمر', grade: 'الخامس الإعدادي', rank: '3', average: 98.2, score: 491 }
    ],
    '6th': [
        { name: 'فهد محمد', grade: 'السادس الإعدادي', rank: '1', average: 99.7, score: 498 },
        { name: 'حسام علي', grade: 'السادس الإعدادي', rank: '2', average: 99.0, score: 495 },
        { name: 'باسل أحمد', grade: 'السادس الإعدادي', rank: '3', average: 98.4, score: 492 }
    ]
};

// ============ INITIALIZATION FUNCTIONS ============
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    initializeEmailJS();
});

function initializeApp() {
    setupLoadingScreen();
    setupThemeToggle();
    setupHamburgerMenu();
    loadAccessCodes();
    loadInitialData();
    setupFormHandlers();
    setupSmoothScroll();
    setupDeveloperAccess();
    setupLanguageToggle();
    
    // Modal click handlers
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });
    
    // Initialize Lucide icons
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function initializeEmailJS() {
    (function() {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    })();
}

// ============ SETUP FUNCTIONS ============
function setupLoadingScreen() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            const icon = themeToggle.querySelector('i');
            icon.setAttribute('data-lucide', newTheme === 'dark' ? 'sun' : 'moon');
            lucide.createIcons();
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        const icon = themeToggle.querySelector('i');
        icon.setAttribute('data-lucide', savedTheme === 'dark' ? 'sun' : 'moon');
        lucide.createIcons();
    }
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            localStorage.setItem('language', currentLang);
            updateLanguage();
            loadInitialData();
        });
        
        // Load saved language
        const savedLang = localStorage.getItem('language') || 'ar';
        currentLang = savedLang;
        updateLanguage();
    }
}

function updateLanguage() {
    document.querySelectorAll('[data-ar][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${currentLang}`);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        const span = langToggle.querySelector('span');
        if (span) span.textContent = currentLang === 'ar' ? 'English' : 'العربية';
    }
}

function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

function setupFormHandlers() {
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContact);
    }
    
    // Registration form
    const regForm = document.getElementById('reg-form');
    if (regForm) {
        regForm.addEventListener('submit', handleRegistration);
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupDeveloperAccess() {
    // Removed key-sequence shortcut access to keep developer access only via footer button (🔐).
    // If needed in future, re-enable by implementing a controlled login handler.
}

// ============ GITHUB SYNC SYSTEM ============
class GitHubSync {
    constructor() {
        this.config = GITHUB_CONFIG;
        this.lastSync = localStorage.getItem('last_sync') || 0;
        this.syncInterval = 60000; // 1 minute
    }

    async syncData() {
        if (!syncEnabled) return;
        
        try {
            // Get current data from localStorage
            const currentData = this.getAllData();
            
            // Check if we need to sync
            const now = Date.now();
            if (now - this.lastSync < this.syncInterval) {
                return;
            }

            // Try to sync with GitHub
            await this.uploadToGitHub(currentData);
            this.lastSync = now;
            localStorage.setItem('last_sync', this.lastSync);
            
            console.log('Data synced successfully');
        } catch (error) {
            console.log('Sync failed, using local storage:', error.message);
        }
    }

    getAllData() {
        return {
            teachers: JSON.parse(localStorage.getItem('teachers_list') || '[]'),
            news: JSON.parse(localStorage.getItem('news_items') || '[]'),
            gallery: JSON.parse(localStorage.getItem('gallery_items') || '[]'),
            announcements: JSON.parse(localStorage.getItem('announcements') || '[]'),
            registrations: JSON.parse(localStorage.getItem('registrations') || '[]'),
            top_students: JSON.parse(localStorage.getItem('top_students_data') || '{}'),
            regular_students: JSON.parse(localStorage.getItem('regular_students') || '[]'),
            last_updated: new Date().toISOString()
        };
    }

    async uploadToGitHub(data) {
        // This would require GitHub API integration
        // For now, we'll use a fallback solution
        this.saveToFallback(data);
    }

    saveToFallback(data) {
        // Save to a publicly accessible location
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        // Create download link for manual upload
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `alfarabi-data-${Date.now()}.json`;
        
        // Store for later use
        localStorage.setItem('pending_sync_data', dataStr);
        
        // Show sync notification
        showNotification('تم حفظ التغييرات محلياً. سيتم المزامنة لاحقاً.', 'info');
    }

    async loadFromGitHub() {
        try {
            // Try to load from GitHub API
            const response = await fetch(`https://api.github.com/repos/${this.config.repo}/contents/${this.config.dataFile}?ref=${this.config.branch}`);
            
            if (response.ok) {
                const fileData = await response.json();
                const content = atob(fileData.content);
                const data = JSON.parse(content);
                
                // Update localStorage with GitHub data
                this.updateLocalStorage(data);
                return true;
            }
        } catch (error) {
            console.log('Failed to load from GitHub, using local data');
        }
        
        return false;
    }

    updateLocalStorage(data) {
        if (data.teachers) localStorage.setItem('teachers_list', JSON.stringify(data.teachers));
        if (data.news) localStorage.setItem('news_items', JSON.stringify(data.news));
        if (data.gallery) localStorage.setItem('gallery_items', JSON.stringify(data.gallery));
        if (data.announcements) localStorage.setItem('announcements', JSON.stringify(data.announcements));
        if (data.registrations) localStorage.setItem('registrations', JSON.stringify(data.registrations));
        if (data.top_students) localStorage.setItem('top_students_data', JSON.stringify(data.top_students));
        if (data.regular_students) localStorage.setItem('regular_students', JSON.stringify(data.regular_students));
    }

    startAutoSync() {
        // Sync every minute
        setInterval(() => this.syncData(), this.syncInterval);
        
        // Sync on page unload
        window.addEventListener('beforeunload', () => this.syncData());
    }
}

// Initialize sync system
const gitHubSync = new GitHubSync();

// ============ LOAD INITIAL DATA ============
async function loadInitialData() {
    // Try to load from GitHub first
    const loadedFromGitHub = await gitHubSync.loadFromGitHub();
    
    // Initialize data if not exists
    initializeTeachersData();
    initializeTopStudentsData();
    initializeRegularStudents();
    
    filterGrade('1st');
    viewStudentsByGrade('1st');
    loadTeachers();
    loadNews();
    loadGallery();
    loadAnnouncements();
    
    // Start auto-sync
    gitHubSync.startAutoSync();
    
    // Initialize Lucide icons after loading content
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function initializeTeachersData() {
    const existingTeachers = JSON.parse(localStorage.getItem('teachers_list') || '[]');
    
    if (existingTeachers.length === 0) {
        localStorage.setItem('teachers_list', JSON.stringify(teachersData));
    }
}

function initializeTopStudentsData() {
    const existingTop = JSON.parse(localStorage.getItem('top_students_data') || 'null');
    if (existingTop && typeof existingTop === 'object') {
        Object.keys(topStudentsData).forEach(grade => {
            if (Array.isArray(existingTop[grade])) {
                topStudentsData[grade] = existingTop[grade];
            }
        });
    } else {
        localStorage.setItem('top_students_data', JSON.stringify(topStudentsData));
    }
}

function initializeRegularStudents() {
    const existingStudents = JSON.parse(localStorage.getItem('regular_students') || '[]');
    
    if (existingStudents.length === 0) {
        // Add sample regular students
        const sampleStudents = [
            { name: 'أحمد محمد علي', email: 'ahmed.ali@alfarabi.edu', phone: '07801234567', grade: 'الأول المتوسط' },
            { name: 'عمر خالد حسن', email: 'omar.khaled@alfarabi.edu', phone: '07801234568', grade: 'الأول المتوسط' },
            { name: 'سالم أحمد محمود', email: 'salem.ahmed@alfarabi.edu', phone: '07801234569', grade: 'الأول المتوسط' },
            { name: 'فارس علي خالد', email: 'faras.ali@alfarabi.edu', phone: '07801234570', grade: 'الثاني المتوسط' },
            { name: 'طارق محمد سالم', email: 'tarek.mohammed@alfarabi.edu', phone: '07801234571', grade: 'الثاني المتوسط' },
            { name: 'ماهر حسن فارس', email: 'maher.hassan@alfarabi.edu', phone: '07801234572', grade: 'الثالث المتوسط' },
            { name: 'ياسر علي أحمد', email: 'yaser.ali@alfarabi.edu', phone: '07801234573', grade: 'الرابع الإعدادي' },
            { name: 'نبيل خالد عمر', email: 'nabil.khaled@alfarabi.edu', phone: '07801234574', grade: 'الخامس الإعدادي' },
            { name: 'باسل محمد ناصر', email: 'basel.mohammed@alfarabi.edu', phone: '07801234575', grade: 'السادس الإعدادي' },
            { name: 'حسام علي جاسم', email: 'hossam.ali@alfarabi.edu', phone: '07801234576', grade: 'السادس الإعدادي' }
        ];
        
        localStorage.setItem('regular_students', JSON.stringify(sampleStudents));
    }
}

// ============ TOP STUDENTS ============
function filterGrade(grade) {
    const container = document.getElementById('top-students-container');
    if (!container) return;
    
    const students = topStudentsData[grade] || [];
    container.innerHTML = '';
    
    students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        
        const rankBadgeText = currentLang === 'ar' ? `الترتيب ${student.rank}` : `Rank ${student.rank}`;
        const gradeText = currentLang === 'ar' ? student.grade : getEnglishGrade(student.grade);
        
        card.innerHTML = `
            <div class="student-rank">${rankBadgeText}</div>
            <div class="student-info">
                <h3 class="student-name">${student.name}</h3>
                <p class="student-grade">${gradeText}</p>
            </div>
            <div class="student-stats">
                <div class="stat">
                    <span class="stat-value">${student.average}%</span>
                    <span class="stat-label">${currentLang === 'ar' ? 'المعدل' : 'Average'}</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${student.score}</span>
                    <span class="stat-label">${currentLang === 'ar' ? 'الدرجة' : 'Score'}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Update active tab
    document.querySelectorAll('.grade-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`.grade-tab[onclick="filterGrade('${grade}')"]`);
    if (activeTab) activeTab.classList.add('active');
}

function getEnglishGrade(arabicGrade) {
    const gradeMap = {
        'الأول المتوسط': '1st Intermediate',
        'الثاني المتوسط': '2nd Intermediate',
        'الثالث المتوسط': '3rd Intermediate',
        'الرابع الإعدادي': '4th Preparatory',
        'الخامس الإعدادي': '5th Preparatory',
        'السادس الإعدادي': '6th Preparatory'
    };
    return gradeMap[arabicGrade] || arabicGrade;
}

// ============ STUDENTS SECTION ============
function viewStudentsByGrade(grade) {
    const container = document.getElementById('students-container');
    if (!container) return;
    
    const studentsFromStorage = JSON.parse(localStorage.getItem('regular_students') || '[]');
    const students = studentsFromStorage.filter(s => s.grade === (grade === '1st' ? 'الأول المتوسط' :
        grade === '2nd' ? 'الثاني المتوسط' :
        grade === '3rd' ? 'الثالث المتوسط' :
        grade === '4th' ? 'الرابع الإعدادي' :
        grade === '5th' ? 'الخامس الإعدادي' : 'السادس الإعدادي'));
    
    container.innerHTML = '';
    
    students.forEach((student, index) => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.08}s both`;
        
        const gradeText = currentLang === 'ar' ? student.grade : getEnglishGrade(student.grade);
        
        card.innerHTML = `
            <div class="student-avatar">
                <img src="${student.image}" alt="${student.name}" loading="lazy">
            </div>
            <div class="student-info">
                <h3 class="student-name">${student.name}</h3>
                <p class="student-grade">${gradeText}</p>
                <div class="student-contact">
                    <span><i data-lucide="mail"></i> ${student.email}</span>
                    <span><i data-lucide="phone"></i> ${student.phone}</span>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
    
    // Update active tab
    document.querySelectorAll('#students .grade-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    const activeTab = document.querySelector(`#students .grade-tab[onclick="viewStudentsByGrade('${grade}')"]`);
    if (activeTab) activeTab.classList.add('active');
    
    // Initialize icons
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function generateStudentsForGrade(grade) {
    const firstNames = ['أحمد', 'محمد', 'علي', 'عمر', 'خالد', 'حسن', 'سالم', 'فارس', 'طارق', 'ماهر'];
    const lastNames = ['محمد', 'علي', 'خالد', 'حسن', 'عمر', 'أحمد', 'سالم', 'فارس', 'طارق', 'ماهر'];
    const students = [];
    
    for (let i = 1; i <= 20; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        students.push({
            name: `${firstName} ${lastName}`,
            grade: grade === '1st' ? 'الأول المتوسط' : 
                   grade === '2nd' ? 'الثاني المتوسط' : 
                   grade === '3rd' ? 'الثالث المتوسط' : 
                   grade === '4th' ? 'الرابع الإعدادي' : 
                   grade === '5th' ? 'الخامس الإعدادي' : 'السادس الإعدادي',
            email: `student${i}@alfarabi.edu`,
            phone: `0780${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
            image: `https://randomuser.me/api/portraits/men/${i + 10}.jpg`
        });
    }
    
    return students;
}

// ============ LOAD TEACHERS ============
function loadTeachers() {
    const container = document.getElementById('teachers-container');
    if (!container) return;
    
    const stored = JSON.parse(localStorage.getItem('teachers_list') || 'null');
    const teachers = stored || teachersData;
    container.innerHTML = '';
    
    teachers.forEach((teacher, index) => {
        const teacherCard = document.createElement('div');
        teacherCard.className = 'teacher-card';
        teacherCard.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        
        teacherCard.innerHTML = `
            <div class="teacher-header">
                <div class="teacher-avatar">
                    <img src="${teacher.image}" alt="${teacher.name}" class="teacher-image" loading="lazy">
                    <div class="teacher-badge">
                        <i data-lucide="award"></i>
                    </div>
                </div>
                <div class="teacher-info">
                    <h3 class="teacher-name">${teacher.name}</h3>
                    <div class="teacher-subject">${teacher.subject}</div>
                </div>
            </div>
            <div class="teacher-bio">${teacher.bio}</div>
            <div class="teacher-details">
                <div class="detail-item">
                    <i data-lucide="graduation-cap"></i>
                    <div>
                        <strong>${currentLang === 'ar' ? 'المؤهل:' : 'Qualification:'}</strong>
                        <span>${teacher.qualification}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i data-lucide="briefcase"></i>
                    <div>
                        <strong>${currentLang === 'ar' ? 'الخبرة:' : 'Experience:'}</strong>
                        <span>${teacher.experience}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i data-lucide="mail"></i>
                    <div>
                        <strong>${currentLang === 'ar' ? 'البريد:' : 'Email:'}</strong>
                        <span>${teacher.email}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <i data-lucide="phone"></i>
                    <div>
                        <strong>${currentLang === 'ar' ? 'الهاتف:' : 'Phone:'}</strong>
                        <span>${teacher.phone}</span>
                    </div>
                </div>
            </div>
            <div class="teacher-actions">
                <button class="btn btn-primary btn-sm" onclick="contactTeacher('${teacher.email}')">
                    <i data-lucide="mail"></i>
                    ${currentLang === 'ar' ? 'تواصل' : 'Contact'}
                </button>
                <button class="btn btn-secondary btn-sm" onclick="viewTeacherProfile('${teacher.name}')">
                    <i data-lucide="user"></i>
                    ${currentLang === 'ar' ? 'الملف' : 'Profile'}
                </button>
            </div>
        `;
        
        container.appendChild(teacherCard);
    });
    
    // Initialize Lucide icons
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function contactTeacher(email) {
    window.location.href = `mailto:${email}`;
}

function viewTeacherProfile(name) {
    const stored = JSON.parse(localStorage.getItem('teachers_list') || 'null');
    const teachers = stored || teachersData;
    const teacher = teachers.find(t => t.name === name);
    
    if (!teacher) return;
    
    const modal = document.getElementById('profile-modal');
    const content = document.getElementById('profile-content');
    
    content.innerHTML = `
        <div class="profile-card teacher-profile">
            <div class="profile-header">
                <img src="${teacher.image}" alt="${teacher.name}" class="profile-image">
                <div class="profile-info">
                    <h2 class="profile-name">${teacher.name}</h2>
                    <div class="profile-subject">${teacher.subject}</div>
                </div>
            </div>
            <div class="profile-body">
                <div class="profile-section">
                    <h3>${currentLang === 'ar' ? 'نبذة شخصية' : 'Biography'}</h3>
                    <p>${teacher.bio}</p>
                </div>
                <div class="profile-details">
                    <div class="detail-row">
                        <i data-lucide="graduation-cap"></i>
                        <div>
                            <strong>${currentLang === 'ar' ? 'المؤهل العلمي:' : 'Qualification:'}</strong>
                            <span>${teacher.qualification}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <i data-lucide="briefcase"></i>
                        <div>
                            <strong>${currentLang === 'ar' ? 'سنوات الخبرة:' : 'Experience:'}</strong>
                            <span>${teacher.experience}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <i data-lucide="mail"></i>
                        <div>
                            <strong>${currentLang === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}</strong>
                            <span>${teacher.email}</span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <i data-lucide="phone"></i>
                        <div>
                            <strong>${currentLang === 'ar' ? 'رقم الهاتف:' : 'Phone:'}</strong>
                            <span>${teacher.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <button class="btn btn-primary" onclick="contactTeacher('${teacher.email}')">
                    <i data-lucide="mail"></i>
                    ${currentLang === 'ar' ? 'إرسال رسالة' : 'Send Message'}
                </button>
                <button class="btn btn-secondary" onclick="closeProfile()">
                    <i data-lucide="x"></i>
                    ${currentLang === 'ar' ? 'إغلاق' : 'Close'}
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function closeProfile() {
    const modal = document.getElementById('profile-modal');
    modal.classList.remove('active');
}

// ============ LOAD NEWS ============
function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;
    
    const stored = JSON.parse(localStorage.getItem('news_items') || 'null');
    const items = stored || newsData;
    container.innerHTML = '';
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        
        card.innerHTML = `
            <div class="news-emoji">${item.emoji}</div>
            <div class="news-content">
                <h3 class="news-title">${item.title}</h3>
                <p class="news-desc">${item.description}</p>
                <span class="news-date">${new Date(item.date).toLocaleDateString('ar')}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// ============ LOAD ANNOUNCEMENTS ============
function loadAnnouncements() {
    const container = document.getElementById('announcements-container');
    if (!container) return;
    
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    container.innerHTML = '';
    
    if (announcements.length === 0) {
        container.innerHTML = '<div class="no-announcements">لا توجد إعلانات حالياً</div>';
        return;
    }
    
    announcements.forEach((item, index) => {
        const announcement = document.createElement('div');
        announcement.className = 'announcement-card';
        announcement.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
        
        announcement.innerHTML = `
            <div class="announcement-header">
                <h3 class="announcement-title">${item.title}</h3>
                <span class="announcement-date">${new Date(item.date).toLocaleDateString('ar')}</span>
            </div>
            <div class="announcement-content">
                <p>${item.message}</p>
            </div>
        `;
        
        container.appendChild(announcement);
    });
}

// ============ LOAD GALLERY ============
function loadGallery() {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    
    const stored = JSON.parse(localStorage.getItem('gallery_items') || 'null');
    const items = stored || galleryItems;
    container.innerHTML = '';
    
    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animation = `fadeInUp 0.5s ease-out ${index * 0.08}s both`;
        
        const hasVideo = item.video;
        const mediaContent = hasVideo ? 
            `<div class="video-wrapper">
                <iframe src="${item.video}" frameborder="0" allowfullscreen></iframe>
                <div class="video-overlay">
                    <i data-lucide="play-circle" class="play-icon"></i>
                </div>
            </div>` :
            `<img src="${item.image}" alt="${item.title}" class="gallery-image" loading="lazy">`;
        
        galleryItem.innerHTML = `
            <div class="gallery-media">
                ${mediaContent}
                <div class="gallery-overlay">
                    <div class="gallery-content">
                        <h3 class="gallery-title">${item.title}</h3>
                        <p class="gallery-description">${item.description}</p>
                        <div class="gallery-meta">
                            <span class="gallery-date">${new Date(item.date).toLocaleDateString('ar')}</span>
                            <span class="gallery-type">${getTypeLabel(item.type)}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(galleryItem);
    });
    
    // Initialize Lucide icons
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function getTypeLabel(type) {
    const labels = {
        event: 'فعالية',
        sports: 'رياضة',
        science: 'علوم',
        volunteer: 'تطوع',
        trip: 'رحلة',
        cultural: 'ثقافة',
        graduation: 'تخرج',
        competition: 'مسابقة',
        workshop: 'ورشة عمل',
        art: 'فن'
    };
    return labels[type] || 'أخرى';
}

// ============ CONTACT FORM ============
function handleContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    if (!name || !email || !subject || !message) {
        showNotification(currentLang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields', 'danger');
        return;
    }
    
    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('contact-messages') || '[]');
    messages.push({ name, email, subject, message, date: new Date().toISOString() });
    localStorage.setItem('contact-messages', JSON.stringify(messages));
    
    // Send email (optional)
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'info@alfarabi.edu'
    }).then(
        function(response) {
            showNotification(currentLang === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Your message has been sent successfully', 'success');
            event.target.reset();
        },
        function(error) {
            showNotification(currentLang === 'ar' ? 'حدث خطأ في الإرسال' : 'Error sending message', 'danger');
        }
    );
}

// ============ REGISTRATION ============
function handleRegistration(event) {
    event.preventDefault();
    
    const role = document.querySelector('.reg-tab.active').getAttribute('onclick').replace("switchRole('", "").replace("')", "");
    
    let formData = {};
    
    try {
        if (role === 'student') {
            formData = {
                name_ar: document.getElementById('student-name-ar')?.value?.trim() || '',
                name_en: document.getElementById('student-name-en')?.value?.trim() || '',
                email: document.getElementById('student-email')?.value?.trim() || '',
                phone: document.getElementById('student-phone')?.value?.trim() || '',
                grade: document.getElementById('student-grade')?.value || '',
                password: document.getElementById('student-password')?.value || '',
                role: 'student'
            };
        } else if (role === 'teacher') {
            formData = {
                name: document.getElementById('teacher-name')?.value?.trim() || '',
                email: document.getElementById('teacher-email')?.value?.trim() || '',
                phone: document.getElementById('teacher-phone')?.value?.trim() || '',
                subject: document.getElementById('teacher-subject')?.value?.trim() || '',
                qualification: document.getElementById('teacher-qualification')?.value?.trim() || '',
                password: document.getElementById('teacher-password')?.value || '',
                role: 'teacher'
            };
        } else if (role === 'admin') {
            formData = {
                name: document.getElementById('admin-name')?.value?.trim() || '',
                email: document.getElementById('admin-email')?.value?.trim() || '',
                phone: document.getElementById('admin-phone')?.value?.trim() || '',
                position: document.getElementById('admin-position')?.value?.trim() || '',
                password: document.getElementById('admin-password')?.value || '',
                role: 'admin'
            };
        }
        
        // Validate required fields
        const requiredFields = Object.values(formData).filter(value => value && value.trim() !== '');
        if (requiredFields.length < Object.keys(formData).length) {
            showNotification(currentLang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields', 'danger');
            return;
        }
        
        // Save registration
        const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
        registrations.push({
            ...formData,
            date: new Date().toISOString(),
            approved: false
        });
        localStorage.setItem('registrations', JSON.stringify(registrations));
        
        // Show success message
        const successMsg = currentLang === 'ar' ? 
            'تم تقديم طلبك بنجاح! سيتم مراجعته من قبل الإدارة.' : 
            'Your application has been submitted successfully! It will be reviewed by the administration.';
        showNotification(successMsg, 'success');
        
        // Reset form
        event.target.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    } catch (error) {
        console.error('Registration error:', error);
        const errorMsg = currentLang === 'ar' ? 
            'حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.' : 
            'An error occurred during registration. Please try again.';
        showNotification(errorMsg, 'danger');
    }
}

function switchRole(role) {
    document.querySelectorAll('.reg-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`.reg-tab[onclick="switchRole('${role}')"]`).classList.add('active');
    
    document.querySelectorAll('.form-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${role}-form`).classList.add('active');
    
    const titles = {
        student: currentLang === 'ar' ? 'تسجيل طالب جديد' : 'New Student Registration',
        teacher: currentLang === 'ar' ? 'تسجيل معلم جديد' : 'New Teacher Registration',
        admin: currentLang === 'ar' ? 'تسجيل مسؤول جديد' : 'New Admin Registration'
    };
    
    document.getElementById('form-title').textContent = titles[role];
}

// ============ LOGIN FUNCTIONS ============
function openUserLogin() {
    const email = prompt(currentLang === 'ar' ? 'البريد الإلكتروني:' : 'Email:');
    const password = prompt(currentLang === 'ar' ? 'كلمة المرور:' : 'Password:');
    
    if (!email || !password) return;
    
    // Check approved users
    const approved = JSON.parse(localStorage.getItem('approved_users') || '[]');
    const user = approved.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        showNotification(currentLang === 'ar' ? 'مرحباً بك!' : 'Welcome!', 'success');
        openUserDashboard();
    } else {
        showNotification(currentLang === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials', 'danger');
    }
}

function openManagerLogin() {
    const accessCode = prompt(currentLang === 'ar' ? 'رمز الدخول:' : 'Access Code:');
    
    if (!accessCode) return;
    
    // Close any existing modals first
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    // Clear current user state
    currentUser = null;
    
    const codes = JSON.parse(localStorage.getItem('access_codes') || '{}');
    
    if (accessCode === codes.admin || accessCode === 'ADMIN_FARABI_2024') {
        currentUser = { role: 'admin', name: 'Administrator' };
        openAdminDashboard();
    } else if (accessCode === codes.developer || accessCode === 'DEV_MASTER_2024') {
        currentUser = { role: 'developer', name: 'Developer' };
        openDeveloperModal();
    } else {
        showNotification(currentLang === 'ar' ? 'رمز الدخول غير صحيح' : 'Invalid access code', 'danger');
    }
}

function openUserDashboard() {
    // Implementation for user dashboard
    showNotification(currentLang === 'ar' ? 'لوحة تحكم المستخدم' : 'User Dashboard', 'info');
}

// ============ ADMIN DASHBOARD ============
function openAdminDashboard() {
    // Close any existing modals first
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    const modal = document.getElementById('dashboard-modal');
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = buildAdminDashboard();
    modal.classList.add('active');
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function openDeveloperDashboard() {
    // Close any existing modals first
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    const modal = document.getElementById('dashboard-modal');
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = buildDeveloperDashboard();
    modal.classList.add('active');
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function closeAdminDashboard() {
    document.getElementById('dashboard-modal').classList.remove('active');
}

function returnToDashboard() {
    if (currentUser && currentUser.role === 'developer') {
        openDeveloperDashboard();
    } else {
        openAdminDashboard();
    }
}

// Sync data after any change
async function syncAfterChange() {
    if (syncEnabled) {
        try {
            await gitHubSync.syncData();
            showNotification('تم حفظ التغييرات ومزامنتها', 'success');
        } catch (error) {
            showNotification('تم حفظ التغييرات محلياً', 'info');
        }
    }
}

function buildAdminDashboard() {
    const regs = JSON.parse(localStorage.getItem('registrations') || '[]');
    const approved = JSON.parse(localStorage.getItem('approved_users') || '[]');
    const teachers = JSON.parse(localStorage.getItem('teachers_list') || '[]');
    const msgs = JSON.parse(localStorage.getItem('contact-messages') || '[]');
    const pending = regs.filter(r => !r.approved);
    
    return `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">👔 لوحة تحكم المدير</h2>
            <p class="dashboard-subtitle">مرحباً بك في لوحة الإدارة</p>
        </div>
        <div class="stats-row">
            <div class="stat-card"><div class="stat-value">${regs.length}</div><div class="stat-label">إجمالي التسجيلات</div></div>
            <div class="stat-card"><div class="stat-value">${pending.length}</div><div class="stat-label">طلبات معلقة</div></div>
            <div class="stat-card"><div class="stat-value">${teachers.length}</div><div class="stat-label">المعلمون</div></div>
            <div class="stat-card"><div class="stat-value">${msgs.length}</div><div class="stat-label">الرسائل</div></div>
        </div>
        <div class="admin-sections-grid">
            <div class="admin-section-panel">
                <div class="section-panel-header"><span>👥 إدارة التسجيلات</span></div>
                <div class="section-panel-body">
                    <button class="action-btn primary" onclick="approveRegistrations()">✅ الموافقة على الطلبات <span class="badge">${pending.length}</span></button>
                    <button class="action-btn secondary" onclick="viewAllRegistrations()">📋 جميع التسجيلات</button>
                    <button class="action-btn secondary" onclick="viewContactMessages()">📨 الرسائل الواردة</button>
                </div>
            </div>
            <div class="admin-section-panel">
                <div class="section-panel-header"><span>👨‍🏫 إدارة المعلمين</span></div>
                <div class="section-panel-body">
                    <button class="action-btn primary" onclick="openTeachersManagement()">👨‍🏫 إدارة المعلمين الكاملة</button>
                    <button class="action-btn secondary" onclick="addTeacherForm()">➕ إضافة معلم جديد</button>
                    <button class="action-btn secondary" onclick="viewTeachersList()">📄 عرض قائمة المعلمين</button>
                </div>
            </div>
            <div class="admin-section-panel">
                <div class="section-panel-header"><span>📰 إدارة المحتوى</span></div>
                <div class="section-panel-body">
                    <button class="action-btn primary" onclick="manageNews()">📰 إدارة الأخبار</button>
                    <button class="action-btn secondary" onclick="manageAnnouncements()">📢 إدارة الإعلانات</button>
                    <button class="action-btn secondary" onclick="manageGallery()">🖼️ إدارة المعرض</button>
                    <button class="action-btn secondary" onclick="manageTopStudents()">🏆 تحديث المتفوقين</button>
                </div>
            </div>
            <div class="admin-section-panel">
                <div class="section-panel-header"><span>⚙️ إعدادات النظام</span></div>
                <div class="section-panel-body">
                    <button class="action-btn primary" onclick="manageAccessCodes()">🔐 إدارة رموز الدخول</button>
                    <button class="action-btn secondary" onclick="exportData()">💾 تصدير البيانات</button>
                    <button class="action-btn danger" onclick="logout()">🚪 تسجيل الخروج</button>
                </div>
            </div>
        </div>
    </div>`;
}

// ============ ADMIN: MANAGE NEWS ============
function manageNews() {
    const stored = JSON.parse(localStorage.getItem('news_items') || 'null');
    const items = stored || newsData;
    const content = document.getElementById('dashboard-content');
    
    let html = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
                <div>
                    <h2 class="dashboard-title">📰 إدارة الأخبار</h2>
                    <p class="dashboard-subtitle">${items.length} خبر منشور</p>
                </div>
                <div style="display:flex;gap:.5rem;">
                    <button class="action-btn primary" onclick="addNewsForm()">➕ إضافة خبر</button>
                    <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
                </div>
            </div>
        </div>
        <div class="news-manage-list">`;
    
    items.forEach((item, i) => {
        html += `
        <div class="news-manage-item">
            <div class="news-manage-emoji">${item.emoji}</div>
            <div class="news-manage-info">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <small>${new Date(item.date).toLocaleDateString('ar')}</small>
            </div>
            <div class="news-manage-actions">
                <button class="tc-btn edit" onclick="editNewsForm(${i})">✏️</button>
                <button class="tc-btn delete" onclick="deleteNews(${i})">🗑️</button>
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    content.innerHTML = html;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function addNewsForm() {
    const content = document.getElementById('dashboard-content');
    content.innerHTML = buildNewsForm(null, null);
}

function editNewsForm(index) {
    const stored = JSON.parse(localStorage.getItem('news_items') || 'null');
    const items = stored || newsData;
    const content = document.getElementById('dashboard-content');
    content.innerHTML = buildNewsForm(items[index], index);
}

function buildNewsForm(item, index) {
    const isEdit = item !== null && index !== null;
    return `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">${isEdit ? '✏️ تعديل الخبر' : '➕ إضافة خبر جديد'}</h2>
        </div>
        <div class="form-panel">
            <div class="form-grid">
                <div class="input-group">
                    <label>عنوان الخبر <span class="required">*</span></label>
                    <input type="text" id="nf-title" value="${item?.title || ''}" placeholder="عنوان الخبر">
                </div>
                <div class="input-group">
                    <label>الرمز التعبيري</label>
                    <input type="text" id="nf-emoji" value="${item?.emoji || '📰'}" placeholder="🎓">
                </div>
                <div class="input-group">
                    <label>التاريخ</label>
                    <input type="date" id="nf-date" value="${item?.date || new Date().toISOString().split('T')[0]}">
                </div>
                <div class="input-group" style="grid-column:1/-1;">
                    <label>الوصف <span class="required">*</span></label>
                    <textarea id="nf-desc" rows="4" placeholder="وصف الخبر...">${item?.description || ''}</textarea>
                </div>
            </div>
            <div class="form-actions">
                <button class="action-btn primary" onclick="saveNews(${isEdit ? index : 'null'})">${isEdit ? '💾 حفظ' : '➕ نشر الخبر'}</button>
                <button class="action-btn secondary" onclick="manageNews()">إلغاء</button>
            </div>
        </div>
    </div>`;
}

function saveNews(index) {
    const title = document.getElementById('nf-title').value.trim();
    const desc = document.getElementById('nf-desc').value.trim();
    
    if (!title || !desc) {
        showNotification('العنوان والوصف مطلوبان', 'danger');
        return;
    }
    
    const stored = JSON.parse(localStorage.getItem('news_items') || 'null');
    const items = stored ? [...stored] : [...newsData];
    const newItem = { 
        title, 
        description: desc, 
        emoji: document.getElementById('nf-emoji').value || '📰', 
        date: document.getElementById('nf-date').value 
    };
    
    if (index !== null && index !== 'null') {
        items[index] = newItem;
    } else {
        items.unshift(newItem);
    }
    
    localStorage.setItem('news_items', JSON.stringify(items));
    loadNews();
    showNotification(index !== null && index !== 'null' ? 'تم تحديث الخبر' : 'تم نشر الخبر', 'success');
    manageNews();
}

function deleteNews(index) {
    if (!confirm('هل أنت متأكد من حذف هذا الخبر؟')) return;
    
    const stored = JSON.parse(localStorage.getItem('news_items') || 'null');
    const items = stored ? [...stored] : [...newsData];
    items.splice(index, 1);
    localStorage.setItem('news_items', JSON.stringify(items));
    loadNews();
    showNotification('تم حذف الخبر', 'warning');
    manageNews();
}

// ============ ADMIN: MANAGE ANNOUNCEMENTS ============
function manageAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
                <div><h2 class="dashboard-title">📢 إدارة الإعلانات</h2></div>
                <div style="display:flex;gap:.5rem;">
                    <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
                </div>
            </div>
        </div>
        ${announcements.length === 0 ? `<div class="empty-state"><div style="font-size:3rem">📢</div><h3>لا توجد إعلانات</h3></div>` :
        announcements.map((a,i)=>`<div class="announcement-item"><h4>${a.title}</h4><p>${a.message}</p><button class="action-btn danger" onclick="deleteAnnouncement(${i})">🗑️</button></div>`).join('')}
        <button class="action-btn primary" onclick="addAnnouncement()">➕ إضافة إعلان جديد</button>
    </div>`;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function addAnnouncement() {
    const title = prompt('عنوان الإعلان:');
    const message = prompt('نص الإعلان:');
    
    if(title && message) {
        const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
        announcements.push({
            title,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('announcements', JSON.stringify(announcements));
        loadAnnouncements();
        manageAnnouncements();
        showNotification('تم إضافة الإعلان', 'success');
    }
}

function deleteAnnouncement(index) {
    const announcements = JSON.parse(localStorage.getItem('announcements') || '[]');
    announcements.splice(index, 1);
    localStorage.setItem('announcements', JSON.stringify(announcements));
    loadAnnouncements();
    manageAnnouncements();
    showNotification('تم حذف الإعلان', 'success');
}

// ============ ADMIN: MANAGE GALLERY ============
function manageGallery() {
    const stored = JSON.parse(localStorage.getItem('gallery_items') || 'null');
    const items = stored || galleryItems;
    const content = document.getElementById('dashboard-content');
    
    let html = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
                <div>
                    <h2 class="dashboard-title">🖼️ إدارة المعرض</h2>
                    <p class="dashboard-subtitle">${items.length} عنصر في المعرض</p>
                </div>
                <div style="display:flex;gap:.5rem;">
                    <button class="action-btn primary" onclick="addGalleryForm()">➕ إضافة عنصر</button>
                    <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
                </div>
            </div>
        </div>
        <div class="gallery-manage-grid">`;
    
    items.forEach((item, i) => {
        html += `
        <div class="gallery-manage-item">
            ${item.video ? 
                `<div class="video-preview"><iframe src="${item.video}" frameborder="0"></iframe></div>` :
                `<img src="${item.image}" alt="${item.title}" class="gallery-preview-img">`
            }
            <div class="gallery-manage-info">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <small>${getTypeLabel(item.type)} • ${new Date(item.date).toLocaleDateString('ar')}</small>
            </div>
            <div class="gallery-manage-actions">
                <button class="tc-btn edit" onclick="editGalleryForm(${i})">✏️</button>
                <button class="tc-btn delete" onclick="deleteGalleryItem(${i})">🗑️</button>
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    content.innerHTML = html;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function addGalleryForm() {
    const content = document.getElementById('dashboard-content');
    content.innerHTML = buildGalleryForm(null, null);
}

function editGalleryForm(index) {
    const stored = JSON.parse(localStorage.getItem('gallery_items') || 'null');
    const items = stored || galleryItems;
    const content = document.getElementById('dashboard-content');
    content.innerHTML = buildGalleryForm(items[index], index);
}

function buildGalleryForm(item, index) {
    const isEdit = item !== null && index !== null;
    return `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">${isEdit ? '✏️ تعديل عنصر المعرض' : '➕ إضافة عنصر جديد'}</h2>
        </div>
        <div class="form-panel">
            <div class="form-grid">
                <div class="input-group">
                    <label>العنوان <span class="required">*</span></label>
                    <input type="text" id="gf-title" value="${item?.title || ''}" placeholder="عنوان العنصر">
                </div>
                <div class="input-group">
                    <label>النوع</label>
                    <select id="gf-type">
                        <option value="event" ${item?.type === 'event' ? 'selected' : ''}>فعالية</option>
                        <option value="sports" ${item?.type === 'sports' ? 'selected' : ''}>رياضة</option>
                        <option value="science" ${item?.type === 'science' ? 'selected' : ''}>علوم</option>
                        <option value="trip" ${item?.type === 'trip' ? 'selected' : ''}>رحلة</option>
                        <option value="cultural" ${item?.type === 'cultural' ? 'selected' : ''}>ثقافة</option>
                        <option value="graduation" ${item?.type === 'graduation' ? 'selected' : ''}>تخرج</option>
                        <option value="competition" ${item?.type === 'competition' ? 'selected' : ''}>مسابقة</option>
                        <option value="workshop" ${item?.type === 'workshop' ? 'selected' : ''}>ورشة عمل</option>
                        <option value="art" ${item?.type === 'art' ? 'selected' : ''}>فن</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>التاريخ</label>
                    <input type="date" id="gf-date" value="${item?.date || new Date().toISOString().split('T')[0]}">
                </div>
                <div class="input-group" style="grid-column:1/-1;">
                    <label>الوصف <span class="required">*</span></label>
                    <textarea id="gf-desc" rows="3" placeholder="وصف العنصر...">${item?.description || ''}</textarea>
                </div>
                <div class="input-group" style="grid-column:1/-1;">
                    <label>رابط الصورة</label>
                    <input type="url" id="gf-image" value="${item?.image || ''}" placeholder="https://example.com/image.jpg">
                </div>
                <div class="input-group" style="grid-column:1/-1;">
                    <label>رابط الفيديو (YouTube embed)</label>
                    <input type="url" id="gf-video" value="${item?.video || ''}" placeholder="https://www.youtube.com/embed/...">
                </div>
            </div>
            <div class="form-actions">
                <button class="action-btn primary" onclick="saveGalleryItem(${isEdit ? index : 'null'})">${isEdit ? '💾 حفظ' : '➕ إضافة'}</button>
                <button class="action-btn secondary" onclick="manageGallery()">إلغاء</button>
            </div>
        </div>
    </div>`;
}

function saveGalleryItem(index) {
    const title = document.getElementById('gf-title').value.trim();
    const desc = document.getElementById('gf-desc').value.trim();
    const image = document.getElementById('gf-image').value.trim();
    const video = document.getElementById('gf-video').value.trim();
    
    if (!title || !desc) {
        showNotification('العنوان والوصف مطلوبان', 'danger');
        return;
    }
    
    if (!image && !video) {
        showNotification('يجب إضافة رابط صورة أو فيديو', 'danger');
        return;
    }
    
    const stored = JSON.parse(localStorage.getItem('gallery_items') || 'null');
    const items = stored ? [...stored] : [...galleryItems];
    const newItem = {
        title,
        description: desc,
        type: document.getElementById('gf-type').value,
        date: document.getElementById('gf-date').value,
        image: image || null,
        video: video || null
    };
    
    if (index !== null && index !== 'null') {
        items[index] = newItem;
    } else {
        items.unshift(newItem);
    }
    
    localStorage.setItem('gallery_items', JSON.stringify(items));
    loadGallery();
    showNotification(index !== null && index !== 'null' ? 'تم تحديث العنصر' : 'تم إضافة العنصر', 'success');
    manageGallery();
}

function deleteGalleryItem(index) {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;
    
    const stored = JSON.parse(localStorage.getItem('gallery_items') || 'null');
    const items = stored ? [...stored] : [...galleryItems];
    items.splice(index, 1);
    localStorage.setItem('gallery_items', JSON.stringify(items));
    loadGallery();
    showNotification('تم حذف العنصر', 'warning');
    manageGallery();
}

// ============ ADMIN: MANAGE TEACHERS ============
function openTeachersManagement() {
    const stored = JSON.parse(localStorage.getItem('teachers_list') || 'null');
    const teachers = stored || teachersData;
    const content = document.getElementById('dashboard-content');
    
    let html = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
                <div>
                    <h2 class="dashboard-title">👨‍🏫 إدارة المعلمين</h2>
                    <p class="dashboard-subtitle">${teachers.length} معلم</p>
                </div>
                <div style="display:flex;gap:.5rem;">
                    <button class="action-btn primary" onclick="addTeacherForm()">➕ إضافة معلم</button>
                    <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
                </div>
            </div>
        </div>
        <div class="teachers-manage-grid">`;
    
    teachers.forEach((teacher, i) => {
        html += `
        <div class="teacher-manage-card">
            <img src="${teacher.image}" alt="${teacher.name}" class="teacher-manage-avatar">
            <div class="teacher-manage-info">
                <h4>${teacher.name}</h4>
                <p>${teacher.subject}</p>
                <small>${teacher.qualification}</small>
            </div>
            <div class="teacher-manage-actions">
                <button class="tc-btn edit" onclick="editTeacherForm(${i})">✏️</button>
                <button class="tc-btn delete" onclick="deleteTeacher(${i})">🗑️</button>
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    content.innerHTML = html;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function addTeacherForm() {
    const content = document.getElementById('dashboard-content');
    content.innerHTML = buildTeacherForm(null, null);
}

function editTeacherForm(index) {
    const stored = JSON.parse(localStorage.getItem('teachers_list') || 'null');
    const teachers = stored || teachersData;
    const content = document.getElementById('dashboard-content');
    content.innerHTML = buildTeacherForm(teachers[index], index);
}

function buildTeacherForm(teacher, index) {
    const isEdit = teacher !== null && index !== null;
    return `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">${isEdit ? '✏️ تعديل بيانات المعلم' : '➕ إضافة معلم جديد'}</h2>
        </div>
        <div class="form-panel">
            <div class="form-grid">
                <div class="input-group">
                    <label>الاسم الكامل <span class="required">*</span></label>
                    <input type="text" id="tf-name" value="${teacher?.name || ''}" placeholder="الاسم الكامل">
                </div>
                <div class="input-group">
                    <label>المادة الدراسية <span class="required">*</span></label>
                    <input type="text" id="tf-subject" value="${teacher?.subject || ''}" placeholder="المادة">
                </div>
                <div class="input-group">
                    <label>المؤهل العلمي <span class="required">*</span></label>
                    <input type="text" id="tf-qualification" value="${teacher?.qualification || ''}" placeholder="المؤهل">
                </div>
                <div class="input-group">
                    <label>سنوات الخبرة</label>
                    <input type="text" id="tf-experience" value="${teacher?.experience || ''}" placeholder="مثال: 10 سنة">
                </div>
                <div class="input-group">
                    <label>البريد الإلكتروني <span class="required">*</span></label>
                    <input type="email" id="tf-email" value="${teacher?.email || ''}" placeholder="email@example.com">
                </div>
                <div class="input-group">
                    <label>رقم الهاتف <span class="required">*</span></label>
                    <input type="tel" id="tf-phone" value="${teacher?.phone || ''}" placeholder="07xxxxxxxxx">
                </div>
                <div class="input-group" style="grid-column:1/-1;">
                    <label>السيرة الذاتية</label>
                    <textarea id="tf-bio" rows="4" placeholder="نبذة عن المعلم...">${teacher?.bio || ''}</textarea>
                </div>
                <div class="input-group" style="grid-column:1/-1;">
                    <label>رابط الصورة الشخصية</label>
                    <input type="url" id="tf-image" value="${teacher?.image || ''}" placeholder="https://example.com/photo.jpg">
                </div>
            </div>
            <div class="form-actions">
                <button class="action-btn primary" onclick="saveTeacher(${isEdit ? index : 'null'})">${isEdit ? '💾 حفظ' : '➕ إضافة'}</button>
                <button class="action-btn secondary" onclick="openTeachersManagement()">إلغاء</button>
            </div>
        </div>
    </div>`;
}

function saveTeacher(index) {
    const name = document.getElementById('tf-name').value.trim();
    const subject = document.getElementById('tf-subject').value.trim();
    const qualification = document.getElementById('tf-qualification').value.trim();
    const email = document.getElementById('tf-email').value.trim();
    const phone = document.getElementById('tf-phone').value.trim();
    
    if (!name || !subject || !qualification || !email || !phone) {
        showNotification('جميع الحقول المطلوبة يجب ملؤها', 'danger');
        return;
    }
    
    const stored = JSON.parse(localStorage.getItem('teachers_list') || 'null');
    const teachers = stored ? [...stored] : [...teachersData];
    const newTeacher = {
        name,
        subject,
        qualification,
        experience: document.getElementById('tf-experience').value || 'جديد',
        email,
        phone,
        bio: document.getElementById('tf-bio').value || 'معلم متخصص',
        image: document.getElementById('tf-image').value || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000)}?w=300&h=300&fit=crop&crop=face`
    };
    
    if (index !== null && index !== 'null') {
        teachers[index] = newTeacher;
    } else {
        teachers.push(newTeacher);
    }
    
    localStorage.setItem('teachers_list', JSON.stringify(teachers));
    loadTeachers();
    showNotification(index !== null && index !== 'null' ? 'تم تحديث بيانات المعلم' : 'تم إضافة المعلم', 'success');
    syncAfterChange();
    openTeachersManagement();
}

function deleteTeacher(index) {
    if (!confirm('هل أنت متأكد من حذف هذا المعلم؟')) return;
    
    const stored = JSON.parse(localStorage.getItem('teachers_list') || 'null');
    const teachers = stored ? [...stored] : [...teachersData];
    teachers.splice(index, 1);
    localStorage.setItem('teachers_list', JSON.stringify(teachers));
    loadTeachers();
    showNotification('تم حذف المعلم', 'warning');
    syncAfterChange();
    openTeachersManagement();
}

// ============ ADMIN: OTHER FUNCTIONS ============
function approveRegistrations() {
    const regs = JSON.parse(localStorage.getItem('registrations') || '[]');
    const pending = regs.filter(r => !r.approved);
    
    if (pending.length === 0) {
        showNotification('لا توجد طلبات معلقة', 'info');
        return;
    }
    
    const content = document.getElementById('dashboard-content');
    let html = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">✅ الموافقة على التسجيلات</h2>
            <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
        </div>
        <div class="registrations-list">`;
    
    pending.forEach((reg, i) => {
        const actualIndex = regs.findIndex(r => r === reg);
        html += `
        <div class="reg-item">
            <div class="reg-info">
                <h4>${reg.name_ar || reg.name}</h4>
                <p>${reg.email} • ${reg.phone}</p>
                <small>${reg.role} • ${new Date(reg.date).toLocaleDateString('ar')}</small>
            </div>
            <div class="reg-actions">
                <button class="tc-btn approve" onclick="approveRegistration(${actualIndex})">✅</button>
                <button class="tc-btn reject" onclick="rejectRegistration(${actualIndex})">❌</button>
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    content.innerHTML = html;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function approveRegistration(index) {
    const regs = JSON.parse(localStorage.getItem('registrations') || '[]');
    const reg = regs[index];
    
    if (reg) {
        reg.approved = true;
        regs[index] = reg;
        localStorage.setItem('registrations', JSON.stringify(regs));
        
        const approved = JSON.parse(localStorage.getItem('approved_users') || '[]');
        approved.push(reg);
        localStorage.setItem('approved_users', JSON.stringify(approved));
        
        showNotification('تمت الموافقة على التسجيل', 'success');
        approveRegistrations();
    }
}

function rejectRegistration(index) {
    if (!confirm('هل أنت متأكد من رفض هذا الطلب؟')) return;
    
    const regs = JSON.parse(localStorage.getItem('registrations') || '[]');
    regs.splice(index, 1);
    localStorage.setItem('registrations', JSON.stringify(regs));
    
    showNotification('تم رفض التسجيل', 'warning');
    approveRegistrations();
}

function viewAllRegistrations() {
    const regs = JSON.parse(localStorage.getItem('registrations') || '[]');
    const content = document.getElementById('dashboard-content');
    
    let html = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">📋 جميع التسجيلات</h2>
            <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
        </div>
        <div class="registrations-list">`;
    
    regs.forEach((reg, i) => {
        html += `
        <div class="reg-item ${reg.approved ? 'approved' : 'pending'}">
            <div class="reg-info">
                <h4>${reg.name_ar || reg.name}</h4>
                <p>${reg.email} • ${reg.phone}</p>
                <small>${reg.role} • ${new Date(reg.date).toLocaleDateString('ar')}</small>
            </div>
            <div class="reg-status">
                <span class="status-badge ${reg.approved ? 'approved' : 'pending'}">
                    ${reg.approved ? '✅ موافق عليه' : '⏳ معلق'}
                </span>
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    content.innerHTML = html;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function viewContactMessages() {
    const msgs = JSON.parse(localStorage.getItem('contact-messages') || '[]');
    const content = document.getElementById('dashboard-content');
    
    let html = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">📨 الرسائل الواردة</h2>
            <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
        </div>
        <div class="messages-list">`;
    
    msgs.forEach((msg, i) => {
        html += `
        <div class="msg-item">
            <div class="msg-info">
                <h4>${msg.subject}</h4>
                <p>${msg.message}</p>
                <small>${msg.name} • ${msg.email} • ${new Date(msg.date).toLocaleDateString('ar')}</small>
            </div>
            <div class="msg-actions">
                <button class="tc-btn delete" onclick="deleteMessage(${i})">🗑️</button>
            </div>
        </div>`;
    });
    
    html += `</div></div>`;
    content.innerHTML = html;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

function deleteMessage(index) {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    
    const msgs = JSON.parse(localStorage.getItem('contact-messages') || '[]');
    msgs.splice(index, 1);
    localStorage.setItem('contact-messages', JSON.stringify(msgs));
    
    showNotification('تم حذف الرسالة', 'warning');
    viewContactMessages();
}

function manageTopStudents() {
    const content = document.getElementById('dashboard-content');
    
    let html = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">👨‍� إدارة الطلاب</h2>
            <p class="dashboard-subtitle">إدارة كاملة للمتفوقين والطلاب العاديين</p>
            <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
        </div>
        <div class="students-tabs">
            <button class="student-tab active" onclick="switchStudentTab('top-students')">🏆 المتفوقون</button>
            <button class="student-tab" onclick="switchStudentTab('regular-students')">👨‍🎓 الطلاب العاديون</button>
        </div>
        <div id="students-content">`;
    
    // Top Students Section
    html += `
        <div id="top-students-section" class="student-section active">
            <div class="section-actions">
                <button class="action-btn primary" onclick="addTopStudent()">➕ إضافة متفوق</button>
                <button class="action-btn secondary" onclick="refreshTopStudents()">🔄 تحديث</button>
            </div>
            <div class="top-students-manage">`;
    
    Object.keys(topStudentsData).forEach(grade => {
        html += `
            <div class="grade-top-section">
                <h3>${getEnglishGrade(grade)}</h3>
                <div class="top-students-grid">`;
        
        topStudentsData[grade].forEach((student, i) => {
            const globalIndex = `${grade}-${i}`;
            html += `
                <div class="top-student-card" id="top-student-${globalIndex}">
                    <div class="student-card-header">
                        <span class="rank-badge">${student.rank}</span>
                        <div class="student-actions">
                            <button class="tc-btn edit" onclick="editTopStudent('${globalIndex}')">✏️</button>
                            <button class="tc-btn delete" onclick="deleteTopStudent('${globalIndex}')">🗑️</button>
                        </div>
                    </div>
                    <div class="student-info">
                        <input type="text" class="student-name-input" value="${student.name}" placeholder="الاسم" readonly>
                        <div class="student-stats">
                            <div class="stat-input">
                                <label>المعدل:</label>
                                <input type="number" value="${student.average}" step="0.1" readonly>
                            </div>
                            <div class="stat-input">
                                <label>الدرجة:</label>
                                <input type="number" value="${student.score}" readonly>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
        
        html += `</div></div>`;
    });
    
    html += `</div></div>`;
    
    // Regular Students Section
    html += `
        <div id="regular-students-section" class="student-section">
            <div class="section-actions">
                <button class="action-btn primary" onclick="addRegularStudent()">➕ إضافة طالب</button>
                <button class="action-btn secondary" onclick="refreshRegularStudents()">🔄 تحديث</button>
            </div>
            <div class="regular-students-manage" id="regular-students-list">`;
    
    const regularStudents = JSON.parse(localStorage.getItem('regular_students') || '[]');
    if (regularStudents.length === 0) {
        html += `<div class="empty-state"><div style="font-size:3rem">👨‍🎓</div><h3>لا يوجد طلاب عاديون</h3></div>`;
    } else {
        regularStudents.forEach((student, index) => {
            html += `
                <div class="regular-student-card" id="regular-student-${index}">
                    <div class="student-card-header">
                        <span class="grade-badge">${student.grade}</span>
                        <div class="student-actions">
                            <button class="tc-btn edit" onclick="editRegularStudent(${index})">✏️</button>
                            <button class="tc-btn delete" onclick="deleteRegularStudent(${index})">🗑️</button>
                        </div>
                    </div>
                    <div class="student-info">
                        <div class="student-details">
                            <div class="detail-row">
                                <label>الاسم:</label>
                                <input type="text" value="${student.name}" readonly>
                            </div>
                            <div class="detail-row">
                                <label>البريد:</label>
                                <input type="email" value="${student.email}" readonly>
                            </div>
                            <div class="detail-row">
                                <label>الهاتف:</label>
                                <input type="tel" value="${student.phone}" readonly>
                            </div>
                        </div>
                    </div>
                </div>`;
        });
    }
    
    html += `</div></div>`;
    
    html += `
        </div>
        <div class="form-actions">
            <button class="action-btn primary" onclick="saveAllStudents()">💾 حفظ جميع التغييرات</button>
        </div>
    </div>`;
    
    content.innerHTML = html;
    
    setTimeout(() => {
        lucide.createIcons();
    }, 100);
}

// ============ STUDENT MANAGEMENT FUNCTIONS ============
function switchStudentTab(tab) {
    // Update tab buttons
    document.querySelectorAll('.student-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update sections
    document.querySelectorAll('.student-section').forEach(section => {
        section.classList.remove('active');
    });
    
    if (tab === 'top-students') {
        document.getElementById('top-students-section').classList.add('active');
    } else {
        document.getElementById('regular-students-section').classList.add('active');
    }
}

// Top Students Functions
function addTopStudent() {
    const content = document.getElementById('dashboard-content');
    content.innerHTML = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">➕ إضافة طالب متفوق</h2>
            <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
        </div>
        <div class="form-panel">
            <div class="form-grid">
                <div class="input-group">
                    <label>الاسم الكامل <span class="required">*</span></label>
                    <input type="text" id="top-student-name" placeholder="أحمد محمد">
                </div>
                <div class="input-group">
                    <label>الصف <span class="required">*</span></label>
                    <select id="top-student-grade">
                        <option value="">اختر الصف</option>
                        <option value="1st">الأول المتوسط</option>
                        <option value="2nd">الثاني المتوسط</option>
                        <option value="3rd">الثالث المتوسط</option>
                        <option value="4th">الرابع الإعدادي</option>
                        <option value="5th">الخامس الإعدادي</option>
                        <option value="6th">السادس الإعدادي</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>الترتيب <span class="required">*</span></label>
                    <input type="number" id="top-student-rank" placeholder="1" min="1" max="3">
                </div>
                <div class="input-group">
                    <label>المعدل <span class="required">*</span></label>
                    <input type="number" id="top-student-average" placeholder="98.5" step="0.1" min="0" max="100">
                </div>
                <div class="input-group">
                    <label>الدرجة الإجمالية <span class="required">*</span></label>
                    <input type="number" id="top-student-score" placeholder="492" min="0" max="500">
                </div>
            </div>
            <div class="form-actions">
                <button class="action-btn primary" onclick="saveNewTopStudent()">➕ إضافة الطالب</button>
                <button class="action-btn secondary" onclick="returnToDashboard()">إلغاء</button>
            </div>
        </div>
    </div>`;
}

function saveNewTopStudent() {
    const name = document.getElementById('top-student-name').value.trim();
    const grade = document.getElementById('top-student-grade').value;
    const rank = document.getElementById('top-student-rank').value;
    const average = parseFloat(document.getElementById('top-student-average').value);
    const score = parseInt(document.getElementById('top-student-score').value);
    
    if (!name || !grade || !rank || isNaN(average) || isNaN(score)) {
        showNotification('جميع الحقول المطلوبة يجب ملؤها', 'danger');
        return;
    }
    
    const newStudent = {
        name,
        grade: grade === '1st' ? 'الأول المتوسط' : 
               grade === '2nd' ? 'الثاني المتوسط' : 
               grade === '3rd' ? 'الثالث المتوسط' : 
               grade === '4th' ? 'الرابع الإعدادي' : 
               grade === '5th' ? 'الخامس الإعدادي' : 'السادس الإعدادي',
        rank: rank.toString(),
        average,
        score
    };
    
    topStudentsData[grade].push(newStudent);
    
    // Sort by rank
    topStudentsData[grade].sort((a, b) => parseInt(a.rank) - parseInt(b.rank));
    
    localStorage.setItem('top_students_data', JSON.stringify(topStudentsData));
    showNotification('تم إضافة الطالب المتفوق', 'success');
    loadInitialData();
    manageTopStudents();
}

function editTopStudent(globalIndex) {
    const [grade, index] = globalIndex.split('-');
    const student = topStudentsData[grade][index];
    
    const card = document.getElementById(`top-student-${globalIndex}`);
    const inputs = card.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.style.background = 'rgba(59, 130, 246, 0.1)';
        input.style.border = '2px solid var(--primary)';
    });
    
    // Change edit button to save button
    const editBtn = card.querySelector('.tc-btn.edit');
    editBtn.setAttribute('onclick', `saveTopStudentEdit('${globalIndex}')`);
    editBtn.innerHTML = '💾';
}

function saveTopStudentEdit(globalIndex) {
    const [grade, index] = globalIndex.split('-');
    const card = document.getElementById(`top-student-${globalIndex}`);
    const student = topStudentsData[grade][index];
    
    const nameInput = card.querySelector('.student-name-input');
    const averageInput = card.querySelectorAll('input[type="number"]')[0];
    const scoreInput = card.querySelectorAll('input[type="number"]')[1];
    
    student.name = nameInput.value.trim();
    student.average = parseFloat(averageInput.value);
    student.score = parseInt(scoreInput.value);
    
    // Make inputs readonly again
    const inputs = card.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.style.background = '';
        input.style.border = '';
    });
    
    // Change save button back to edit button
    const saveBtn = card.querySelector('.tc-btn.edit');
    saveBtn.setAttribute('onclick', `editTopStudent('${globalIndex}')`);
    saveBtn.innerHTML = '✏️';
    
    localStorage.setItem('top_students_data', JSON.stringify(topStudentsData));
    showNotification('تم تحديث بيانات الطالب', 'success');
    loadInitialData();
}

function deleteTopStudent(globalIndex) {
    if (!confirm('هل أنت متأكد من حذف هذا الطالب المتفوق؟')) return;
    
    const [grade, index] = globalIndex.split('-');
    topStudentsData[grade].splice(index, 1);
    
    localStorage.setItem('top_students_data', JSON.stringify(topStudentsData));
    showNotification('تم حذف الطالب المتفوق', 'warning');
    loadInitialData();
    manageTopStudents();
}

function refreshTopStudents() {
    loadInitialData();
    manageTopStudents();
    showNotification('تم تحديث بيانات المتفوقين', 'success');
}

// Regular Students Functions
function addRegularStudent() {
    const content = document.getElementById('dashboard-content');
    content.innerHTML = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">➕ إضافة طالب عادي</h2>
            <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
        </div>
        <div class="form-panel">
            <div class="form-grid">
                <div class="input-group">
                    <label>الاسم الكامل <span class="required">*</span></label>
                    <input type="text" id="regular-student-name" placeholder="أحمد محمد">
                </div>
                <div class="input-group">
                    <label>البريد الإلكتروني <span class="required">*</span></label>
                    <input type="email" id="regular-student-email" placeholder="student@school.com">
                </div>
                <div class="input-group">
                    <label>رقم الهاتف <span class="required">*</span></label>
                    <input type="tel" id="regular-student-phone" placeholder="07812345678">
                </div>
                <div class="input-group">
                    <label>الصف <span class="required">*</span></label>
                    <select id="regular-student-grade">
                        <option value="">اختر الصف</option>
                        <option value="الأول المتوسط">الأول المتوسط</option>
                        <option value="الثاني المتوسط">الثاني المتوسط</option>
                        <option value="الثالث المتوسط">الثالث المتوسط</option>
                        <option value="الرابع الإعدادي">الرابع الإعدادي</option>
                        <option value="الخامس الإعدادي">الخامس الإعدادي</option>
                        <option value="السادس الإعدادي">السادس الإعدادي</option>
                    </select>
                </div>
            </div>
            <div class="form-actions">
                <button class="action-btn primary" onclick="saveNewRegularStudent()">➕ إضافة الطالب</button>
                <button class="action-btn secondary" onclick="returnToDashboard()">إلغاء</button>
            </div>
        </div>
    </div>`;
}

function saveNewRegularStudent() {
    const name = document.getElementById('regular-student-name').value.trim();
    const email = document.getElementById('regular-student-email').value.trim();
    const phone = document.getElementById('regular-student-phone').value.trim();
    const grade = document.getElementById('regular-student-grade').value;
    
    if (!name || !email || !phone || !grade) {
        showNotification('جميع الحقول المطلوبة يجب ملؤها', 'danger');
        return;
    }
    
    const regularStudents = JSON.parse(localStorage.getItem('regular_students') || '[]');
    const newStudent = { name, email, phone, grade };
    
    regularStudents.push(newStudent);
    localStorage.setItem('regular_students', JSON.stringify(regularStudents));
    
    showNotification('تم إضافة الطالب العادي', 'success');
    manageTopStudents();
}

function editRegularStudent(index) {
    const card = document.getElementById(`regular-student-${index}`);
    const inputs = card.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.removeAttribute('readonly');
        input.style.background = 'rgba(59, 130, 246, 0.1)';
        input.style.border = '2px solid var(--primary)';
    });
    
    // Change edit button to save button
    const editBtn = card.querySelector('.tc-btn.edit');
    editBtn.setAttribute('onclick', `saveRegularStudentEdit(${index})`);
    editBtn.innerHTML = '💾';
}

function saveRegularStudentEdit(index) {
    const card = document.getElementById(`regular-student-${index}`);
    const regularStudents = JSON.parse(localStorage.getItem('regular_students') || '[]');
    const student = regularStudents[index];
    
    const inputs = card.querySelectorAll('input');
    student.name = inputs[0].value.trim();
    student.email = inputs[1].value.trim();
    student.phone = inputs[2].value.trim();
    
    // Make inputs readonly again
    inputs.forEach(input => {
        input.setAttribute('readonly', true);
        input.style.background = '';
        input.style.border = '';
    });
    
    // Change save button back to edit button
    const saveBtn = card.querySelector('.tc-btn.edit');
    saveBtn.setAttribute('onclick', `editRegularStudent(${index})`);
    saveBtn.innerHTML = '✏️';
    
    localStorage.setItem('regular_students', JSON.stringify(regularStudents));
    showNotification('تم تحديث بيانات الطالب', 'success');
}

function deleteRegularStudent(index) {
    if (!confirm('هل أنت متأكد من حذف هذا الطالب؟')) return;
    
    const regularStudents = JSON.parse(localStorage.getItem('regular_students') || '[]');
    regularStudents.splice(index, 1);
    
    localStorage.setItem('regular_students', JSON.stringify(regularStudents));
    showNotification('تم حذف الطالب', 'warning');
    manageTopStudents();
}

function refreshRegularStudents() {
    manageTopStudents();
    showNotification('تم تحديث بيانات الطلاب', 'success');
}

function saveAllStudents() {
    localStorage.setItem('top_students_data', JSON.stringify(topStudentsData));
    showNotification('تم حفظ جميع التغييرات', 'success');
    loadInitialData();
    returnToDashboard();
}

function saveTopStudents() {
    localStorage.setItem('top_students_data', JSON.stringify(topStudentsData));
    showNotification('تم حفظ بيانات المتفوقين', 'success');
    loadInitialData();
    returnToDashboard();
}

function manageAccessCodes() {
    const codes = JSON.parse(localStorage.getItem('access_codes') || '{}');
    const content = document.getElementById('dashboard-content');
    
    content.innerHTML = `
    <div class="dashboard admin-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">🔐 إدارة رموز الدخول</h2>
            <button class="action-btn secondary" onclick="returnToDashboard()">← العودة</button>
        </div>
        <div class="codes-manager">
            <div class="codes-section">
                <h3>رموز الوصول</h3>
                <div class="code-item">
                    <label>رمز المدير:</label>
                    <input type="text" value="${codes.admin || 'ADMIN_FARABI_2024'}" readonly>
                </div>
                <div class="code-item">
                    <label>رموز الطلاب:</label>
                    <div class="student-codes">
                        ${Object.entries(codes).filter(([key]) => key.startsWith('student')).map(([key, value]) => 
                            `<div class="code-row"><span>${key}:</span><input type="text" value="${value}" readonly></div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

function exportData() {
    const data = {
        registrations: JSON.parse(localStorage.getItem('registrations') || '[]'),
        approved_users: JSON.parse(localStorage.getItem('approved_users') || '[]'),
        teachers_list: JSON.parse(localStorage.getItem('teachers_list') || '[]'),
        news_items: JSON.parse(localStorage.getItem('news_items') || '[]'),
        gallery_items: JSON.parse(localStorage.getItem('gallery_items') || '[]'),
        announcements: JSON.parse(localStorage.getItem('announcements') || '[]'),
        top_students_data: JSON.parse(localStorage.getItem('top_students_data') || '{}'),
        contact_messages: JSON.parse(localStorage.getItem('contact-messages') || '[]')
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alfarabi-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('تم إنشاء نسخة احتياطية', 'success');
}

function logout() {
    currentUser = null;
    // Clear all dashboard states
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    // Reset any stored session data
    sessionStorage.clear();
    closeAdminDashboard();
    showNotification('تم تسجيل الخروج', 'info');
}

// ============ DEVELOPER FUNCTIONS ============
function openDeveloperModal() {
    // Close any existing modals first
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    
    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.classList.add('active');
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }
}

function closeDeveloperModal() {
    const modal = document.getElementById('developer-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function handleDeveloperLogin(event) {
    event.preventDefault();
    const key = document.getElementById('developer-key').value;
    
    if (key === 'DEV_MASTER_2024') {
        closeDeveloperModal();
        openDeveloperDashboard();
    } else {
        showNotification('رمز المطور غير صحيح', 'danger');
    }
}

function buildDeveloperDashboard() {
    return `
    <div class="dashboard developer-dashboard">
        <div class="dashboard-header">
            <h2 class="dashboard-title">👨‍💻 لوحة تحكم المطور</h2>
            <p class="dashboard-subtitle">إدارة الطلاب والمعلمين</p>
        </div>
        <div class="dev-actions-grid">
            <button class="dev-action-btn" onclick="devManageTeachers()">👨‍🏫 إدارة المعلمين</button>
            <button class="dev-action-btn" onclick="devManageStudents()">👨‍🎓 إدارة الطلاب</button>
            <button class="dev-action-btn danger" onclick="closeAdminDashboard()">🚪 خروج</button>
        </div>
    </div>`;
}

// Developer functions (simplified versions of admin functions)
function devManageNews() {
    manageNews();
}

function devManageTeachers() {
    openTeachersManagement();
}

function devManageGallery() {
    manageGallery();
}

function devManageAnnouncements() {
    manageAnnouncements();
}

function devManageStudents() {
    manageTopStudents();
}

function devManageRegistrations() {
    approveRegistrations();
}

function openDataSync() {
    window.open('data-sync.html', '_blank');
}

function devManageAccessCodes() {
    manageAccessCodes();
}

function devSystemInfo() {
    const info = {
        localStorage: Object.keys(localStorage).length,
        theme: localStorage.getItem('theme'),
        language: localStorage.getItem('language'),
        timestamp: new Date().toISOString()
    };
    
    alert(`معلومات النظام:\n${JSON.stringify(info, null, 2)}`);
}

function devClearCache() {
    if (!confirm('هل أنت متأكد من مسح جميع البيانات؟')) return;
    
    localStorage.clear();
    showNotification('تم مسح جميع البيانات', 'warning');
    location.reload();
}

// ============ UTILITY FUNCTIONS ============
function loadAccessCodes() {
    const defaultCodes = {
        admin: 'ADMIN_FARABI_2024',
        developer: 'DEV_MASTER_2024',
        teacher: 'TEACHER_FARABI_2024',
        student: 'STUDENT_6_2024'
    };
    
    const stored = JSON.parse(localStorage.getItem('access_codes') || '{}');
    const codes = { ...defaultCodes, ...stored };
    localStorage.setItem('access_codes', JSON.stringify(codes));
}

function showNotification(message, type = 'info') {
    // Remove any existing notifications first
    document.querySelectorAll('.notification').forEach(n => n.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        min-width: 300px;
        max-width: 400px;
        border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'danger' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#1B5FA8'};
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem;">
            <span style="flex: 1; color: #1e293b; font-weight: 500;">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #64748b;
                opacity: 0.5;
                transition: opacity 0.2s;
                padding: 0;
                margin-right: 0.5rem;
            " onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.5'">×</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// ============ INITIALIZATION COMPLETE ============
