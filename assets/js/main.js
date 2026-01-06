// ===================================
// Мобильное меню
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});

// ===================================
// Фильтрация каталога
// ===================================

const filterButtons = document.querySelectorAll('.filter-btn');
const solutionCards = document.querySelectorAll('.solution-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Убираем active у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем active к текущей
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        
        solutionCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'flex';
                // Анимация появления
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===================================
// Форма обратной связи
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Кнопка отправки
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        
        // Показываем загрузку
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        submitBtn.disabled = true;
        
        // Имитация отправки (в реальности здесь будет AJAX запрос)
        setTimeout(() => {
            // Скрываем загрузку
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            
            // Показываем сообщение об успехе
            showFormMessage('success', 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
            
            // Очищаем форму
            contactForm.reset();
            
            // В реальном проекте здесь был бы AJAX запрос:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showFormMessage('success', 'Спасибо! Ваше сообщение отправлено.');
                    contactForm.reset();
                } else {
                    showFormMessage('error', 'Произошла ошибка. Попробуйте еще раз.');
                }
            })
            .catch(error => {
                showFormMessage('error', 'Произошла ошибка. Попробуйте еще раз.');
            })
            .finally(() => {
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            });
            */
        }, 1500);
    });
}

function showFormMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ===================================
// Плавная прокрутка к якорям
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===================================
// Анимация при скролле
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдаем за элементами
document.querySelectorAll('.feature-card, .solution-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===================================
// Валидация формы
// ===================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateField(this);
    });
    
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });
});

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Проверка обязательных полей
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
    }
    
    // Проверка email
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    }
    
    // Проверка телефона (опционально)
    if (field.type === 'tel' && value !== '') {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        isValid = phoneRegex.test(value);
    }
    
    // Добавляем/убираем класс ошибки
    if (!isValid) {
        field.classList.add('error');
        field.style.borderColor = '#f56565';
    } else {
        field.classList.remove('error');
        field.style.borderColor = '#e2e8f0';
    }
    
    return isValid;
}

// ===================================
// Маска для телефона
// ===================================

const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = '7' + value.substring(1);
            }
            
            let formatted = '+7';
            if (value.length > 1) {
                formatted += ' (' + value.substring(1, 4);
            }
            if (value.length >= 5) {
                formatted += ') ' + value.substring(4, 7);
            }
            if (value.length >= 8) {
                formatted += '-' + value.substring(7, 9);
            }
            if (value.length >= 10) {
                formatted += '-' + value.substring(9, 11);
            }
            
            e.target.value = formatted;
        }
    });
}

// ===================================
// Консоль для разработчика
// ===================================

console.log('%c🚀 BitrixDev Website', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cСайт разработан для демонстрации решений Битрикс24', 'color: #718096; font-size: 12px;');


