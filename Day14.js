document.addEventListener('DOMContentLoaded', () => {

    // Helper functions for common tasks
    function createOutputElement(text) {
        const p = document.createElement('p');
        p.textContent = text;
        return p;
    }

    function resetElement(element, originalHTML) {
        element.innerHTML = originalHTML;
        element.className = element.id ? element.id.replace('card-', '') + '-target' : '';
        element.style = '';
    }

    // A simple debounce function to prevent rapid function calls
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    // A place to store dynamically created elements
    const createdElements = [];

    // Card 1: Element Creation
    const creationOutput = document.getElementById('creation-output');
    document.getElementById('create-div-btn').addEventListener('click', () => {
        const div = document.createElement('div');
        div.textContent = 'New Div created!';
        div.style.padding = '0.5rem';
        div.style.marginBottom = '0.5rem';
        div.style.backgroundColor = '#d1e7dd';
        creationOutput.appendChild(div);
        createdElements.push(div);
    });

    document.getElementById('create-text-btn').addEventListener('click', () => {
        const textNode = document.createTextNode('New text node!');
        creationOutput.appendChild(textNode);
        createdElements.push(textNode);
    });

    document.getElementById('create-html-btn').addEventListener('click', () => {
        const html = '<p style="color: #0c5460; font-weight: bold;">New HTML paragraph!</p>';
        creationOutput.insertAdjacentHTML('beforeend', html);
    });

    document.getElementById('clear-all-btn').addEventListener('click', () => {
        while (creationOutput.firstChild) {
            creationOutput.removeChild(creationOutput.firstChild);
        }
        createdElements.length = 0; // Clear the array
    });

    // Card 2: Element Removal
    const removalOutput = document.getElementById('removal-output');
    const elementsToRemove = ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5'];

    document.getElementById('add-elements-btn').addEventListener('click', () => {
        removalOutput.innerHTML = '';
        elementsToRemove.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            p.style.marginBottom = '0.5rem';
            p.style.padding = '0.5rem';
            p.style.backgroundColor = '#fff3cd';
            removalOutput.appendChild(p);
        });
    });

    document.getElementById('remove-last-btn').addEventListener('click', () => {
        if (removalOutput.lastChild) {
            removalOutput.removeChild(removalOutput.lastChild);
        }
    });

    document.getElementById('remove-first-btn').addEventListener('click', () => {
        if (removalOutput.firstChild) {
            removalOutput.removeChild(removalOutput.firstChild);
        }
    });

    document.getElementById('remove-all-btn').addEventListener('click', () => {
        removalOutput.innerHTML = '';
    });

    // Card 3: Element Styling
    const styleTarget = document.getElementById('style-target');
    const originalStyle = styleTarget.style.cssText;

    document.getElementById('inline-style-btn').addEventListener('click', () => {
        styleTarget.style.cssText = `
            background-color: #f8f9fa;
            color: #000;
            font-weight: bold;
            border-color: #007bff;
            border-style: solid;
        `;
    });

    document.getElementById('toggle-class-btn').addEventListener('click', () => {
        styleTarget.classList.toggle('styled-class');
    });

    document.getElementById('get-computed-btn').addEventListener('click', () => {
        const computedStyles = window.getComputedStyle(styleTarget);
        const color = computedStyles.getPropertyValue('color');
        alert(`Computed Color: ${color}`);
    });

    document.getElementById('reset-styles-btn').addEventListener('click', () => {
        styleTarget.style.cssText = originalStyle;
        styleTarget.classList.remove('styled-class');
    });

    // Card 4: Attributes
    const attributeTarget = document.getElementById('attribute-target');
    const attributesOutput = document.getElementById('attributes-output');
    const inputField = attributeTarget.querySelector('input');
    
    document.getElementById('set-attributes-btn').addEventListener('click', () => {
        attributeTarget.setAttribute('data-id', 'demo-element-1');
        attributeTarget.setAttribute('data-active', 'true');
        inputField.setAttribute('maxlength', '10');
        attributesOutput.textContent = 'Attributes "data-id", "data-active" and "maxlength" set!';
    });

    document.getElementById('get-attributes-btn').addEventListener('click', () => {
        const dataId = attributeTarget.getAttribute('data-id');
        const dataActive = attributeTarget.getAttribute('data-active');
        const maxLength = inputField.getAttribute('maxlength');
        attributesOutput.textContent = `data-id: ${dataId || 'N/A'}\ndata-active: ${dataActive || 'N/A'}\nmaxlength: ${maxLength || 'N/A'}`;
    });

    document.getElementById('remove-attributes-btn').addEventListener('click', () => {
        attributeTarget.removeAttribute('data-id');
        attributeTarget.removeAttribute('data-active');
        inputField.removeAttribute('maxlength');
        attributesOutput.textContent = 'Attributes removed!';
    });

    document.getElementById('data-attributes-btn').addEventListener('click', () => {
        const dataSet = attributeTarget.dataset;
        attributesOutput.textContent = `data-set properties: ${JSON.stringify(dataSet)}`;
    });

    // Card 5: Content Manipulation
    const contentTarget = document.getElementById('content-target');
    const originalContent = contentTarget.innerHTML;

    document.getElementById('inner-html-btn').addEventListener('click', () => {
        contentTarget.innerHTML = `<h3><span style="color: #dc3545;">innerHTML</span> changed!</h3>`;
    });

    document.getElementById('set-content-btn').addEventListener('click', () => {
        contentTarget.textContent = 'textContent changed! This removes all HTML tags.';
    });

    document.getElementById('insert-adjacent-btn').addEventListener('click', () => {
        contentTarget.insertAdjacentHTML('afterbegin', `<p style="font-size: 0.8rem; color: #17a2b8;">(Prepended content)</p>`);
    });

    document.getElementById('reset-content-btn').addEventListener('click', () => {
        contentTarget.innerHTML = originalContent;
    });

    // Card 6: Event Handling
    const eventTarget = document.getElementById('event-target');
    let clickHandler = null;

    document.getElementById('add-events-btn').addEventListener('click', () => {
        if (clickHandler) return; // Prevent adding multiple times
        eventTarget.textContent = 'Click me to see event listeners!';
        clickHandler = () => {
            eventTarget.textContent = 'I was clicked!';
            eventTarget.classList.add('clicked');
        };
        eventTarget.addEventListener('click', clickHandler);
    });

    document.getElementById('remove-events-btn').addEventListener('click', () => {
        if (clickHandler) {
            eventTarget.removeEventListener('click', clickHandler);
            eventTarget.textContent = 'Event listener removed!';
            eventTarget.classList.remove('clicked');
            clickHandler = null;
        }
    });

    // Card 7: DOM Traversal
    const child2 = document.getElementById('child-2');
    const traversalList = document.getElementById('traversal-list');

    document.getElementById('parent-btn').addEventListener('click', () => {
        const parent = child2.parentElement;
        if (parent) {
            resetTraversalHighlight();
            parent.classList.add('highlight');
        }
    });

    document.getElementById('children-btn').addEventListener('click', () => {
        const rootElement = traversalList.querySelector('li');
        const children = rootElement.children;
        resetTraversalHighlight();
        Array.from(children).forEach(child => child.classList.add('highlight'));
    });

    document.getElementById('sibling-btn').addEventListener('click', () => {
        const nextSibling = child2.nextElementSibling;
        const prevSibling = child2.previousElementSibling;
        resetTraversalHighlight();
        if (nextSibling) nextSibling.classList.add('highlight');
        if (prevSibling) prevSibling.classList.add('highlight');
    });

    document.getElementById('query-btn').addEventListener('click', () => {
        const firstGrandchild = document.querySelector('#traversal-list li > ul > li');
        resetTraversalHighlight();
        if (firstGrandchild) firstGrandchild.classList.add('highlight');
    });

    function resetTraversalHighlight() {
        document.querySelectorAll('.traversal-list li').forEach(li => li.classList.remove('highlight'));
    }

    // Card 8: Animation
    const animationBox = document.getElementById('animation-box');
    let animationId;
    let position = 0;
    let direction = 1;

    document.getElementById('move-btn').addEventListener('click', () => {
        cancelAnimationFrame(animationId);
        function animate() {
            if (position > 200 || position < 0) {
                direction *= -1;
            }
            position += direction;
            animationBox.style.transform = `translateX(${position}px)`;
            animationId = requestAnimationFrame(animate);
        }
        animate();
    });

    document.getElementById('color-btn').addEventListener('click', () => {
        animationBox.style.transition = 'background-color 1s ease-in-out';
        animationBox.style.backgroundColor = '#dc3545';
    });

    document.getElementById('transform-btn').addEventListener('click', () => {
        animationBox.style.transition = 'transform 0.5s ease';
        animationBox.style.transform = 'rotate(45deg) scale(1.2)';
    });

    document.getElementById('stop-btn').addEventListener('click', () => {
        cancelAnimationFrame(animationId);
        animationBox.style.transition = ''; // Remove transition for instant reset
        animationBox.style.transform = 'none';
        animationBox.style.backgroundColor = '#007bff';
    });
    
    // Card 9: Class Manipulation
    const classTarget = document.getElementById('class-target');
    
    document.getElementById('add-class-btn').addEventListener('click', () => {
        classTarget.classList.add('active-class');
        alert('Class "active-class" added!');
    });

    document.getElementById('remove-class-btn').addEventListener('click', () => {
        classTarget.classList.remove('active-class');
        alert('Class "active-class" removed!');
    });

    document.getElementById('toggle-class-btn-2').addEventListener('click', () => {
        classTarget.classList.toggle('active-class');
        alert('Class "active-class" toggled!');
    });

    document.getElementById('check-class-btn').addEventListener('click', () => {
        const hasClass = classTarget.classList.contains('active-class');
        alert(`Does it have "active-class"? ${hasClass ? 'Yes' : 'No'}`);
    });

    document.getElementById('replace-class-btn').addEventListener('click', () => {
        classTarget.classList.replace('active-class', 'new-class');
        alert('Replaced "active-class" with "new-class"!');
    });

    // Card 10: Form Manipulation
    const demoForm = document.getElementById('demo-form');
    
    document.getElementById('fill-form-btn').addEventListener('click', () => {
        demoForm.elements['name'].value = 'John Doe';
        demoForm.elements['color'].value = 'blue';
        demoForm.elements['subscribe'].checked = true;
    });

    document.getElementById('get-values-btn').addEventListener('click', () => {
        const name = demoForm.elements['name'].value;
        const color = demoForm.elements['color'].value;
        const subscribed = demoForm.elements['subscribe'].checked;
        alert(`Name: ${name}\nColor: ${color}\nSubscribed: ${subscribed}`);
    });

    document.getElementById('reset-form-btn').addEventListener('click', () => {
        demoForm.reset();
    });

    // Card 11: Local Storage
    const storageInput = document.getElementById('storage-input');
    const storageOutput = document.getElementById('storage-output');
    
    document.getElementById('set-item-btn').addEventListener('click', () => {
        localStorage.setItem('demo-key', storageInput.value);
        storageOutput.textContent = `Set item: demo-key -> "${storageInput.value}"`;
    });

    document.getElementById('get-item-btn').addEventListener('click', () => {
        const value = localStorage.getItem('demo-key');
        storageOutput.textContent = `Get item: demo-key -> "${value}"`;
    });

    document.getElementById('store-object-btn').addEventListener('click', () => {
        const user = { name: 'Jane', id: 123 };
        localStorage.setItem('user-object', JSON.stringify(user));
        storageOutput.textContent = `Stored object: ${JSON.stringify(user)}`;
    });

    document.getElementById('clear-storage-btn').addEventListener('click', () => {
        localStorage.clear();
        storageOutput.textContent = 'Local storage cleared!';
    });

    // Card 12: Advanced DOM
    const advancedTarget = document.getElementById('advanced-target');
    
    // Clone Element
    document.getElementById('clone-btn').addEventListener('click', () => {
        const clonedNode = advancedTarget.cloneNode(true);
        clonedNode.id = 'cloned-element';
        clonedNode.textContent = 'I am a cloned element!';
        clonedNode.classList.add('cloned');
        advancedTarget.parentNode.appendChild(clonedNode);
    });

    // Debounce
    const debouncedFunction = debounce(() => {
        advancedTarget.textContent = 'Debounce completed!';
        advancedTarget.classList.add('debounced');
        setTimeout(() => {
            advancedTarget.textContent = 'Original Element (Click to change color)';
            advancedTarget.classList.remove('debounced');
        }, 1000);
    }, 500);
    
    document.getElementById('debounce-btn').addEventListener('click', debouncedFunction);

    // Templates (Placeholder)
    document.getElementById('templates-btn').addEventListener('click', () => {
        alert('Templates functionality not implemented in this demo.');
    });

    // Observer
    let observer;
    document.getElementById('observer-btn').addEventListener('click', () => {
        if (observer) {
            observer.disconnect();
            observer = null;
            advancedTarget.classList.remove('observer');
            advancedTarget.textContent = 'Observer disconnected.';
            return;
        }

        const options = {
            attributes: true,
            attributeFilter: ['style', 'class'],
        };

        const callback = (mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes') {
                    console.log(`Attribute changed: ${mutation.attributeName}`);
                    advancedTarget.textContent = `Attribute "${mutation.attributeName}" changed!`;
                    advancedTarget.classList.add('observer');
                }
            }
        };

        observer = new MutationObserver(callback);
        observer.observe(advancedTarget, options);
        advancedTarget.textContent = 'Observer is now active. Try changing my style or class!';
    });
});