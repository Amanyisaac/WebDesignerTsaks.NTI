document.addEventListener('DOMContentLoaded', () => {
    const effectButtons = document.querySelectorAll('.effect-btn');
    
     const originalContent = {};

    effectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.card');
            const effect = event.target.dataset.effect;
            const cardId = card.dataset.cardId;

             if (!originalContent[cardId]) {
                originalContent[cardId] = {
                    title: card.querySelector('h2').textContent,
                    paragraph: card.querySelector('p').textContent
                };
            }

             const allEffects = [
                'change-color-shadow', 'change-title-color', 'border-rotate', 'image-effect',
                'image-text-effect', 'fade-effect', 'zoom-rotate', 'pulse-effect',
                'glow-elevate', 'change-background', 'shake-bounce', 'flip-grayscale',
                'text-shadow', 'float-border', 'rotate-image', 'neon-border',
                'change-button-color', 'squeeze-effect', 'blur-effect', 'gradient-rotate',
                'star-effect'
            ];
            allEffects.forEach(effectClass => {
                card.classList.remove(effectClass);
            });
            
             card.querySelector('img').style = '';
            card.querySelector('h2').style = '';
            card.querySelector('p').style = '';
            card.querySelectorAll('.effect-btn').forEach(btn => btn.style = '');

             card.querySelector('h2').textContent = originalContent[cardId].title;
            card.querySelector('p').textContent = originalContent[cardId].paragraph;

             switch (effect) {
                case 'change-color-shadow':
                case 'change-title-color':
                case 'border-rotate':
                case 'image-effect':
                case 'image-text-effect':
                case 'fade-effect':
                case 'zoom-rotate':
                case 'pulse-effect':
                case 'glow-elevate':
                case 'change-background':
                case 'shake-bounce':
                case 'flip-grayscale':
                case 'text-shadow':
                case 'float-border':
                case 'rotate-image':
                case 'neon-border':
                case 'change-button-color':
                case 'squeeze-effect':
                case 'blur-effect':
                case 'gradient-rotate':
                case 'star-effect':
                    card.classList.add(effect);
                    break;
                case 'change-text':
                    card.querySelector('h2').textContent = 'New Title!';
                    card.querySelector('p').textContent = 'The text has been changed dynamically!';
                    break;
                case 'toggle-content':
                     card.querySelector('p').style.opacity = card.querySelector('p').style.opacity === '0' ? '1' : '0';
                    break;
                case 'change-font':
                    card.querySelector('p').style.fontFamily = 'serif';
                    card.querySelector('p').style.fontSize = '1.1rem';
                    break;
                default:
                    console.log('No effect found for:', effect);
            }
        });
    });
});