const tasks = [
  { id: 1, title: 'Complete project proposal', priority: 'HIGH', status: 'Pending' },
  { id: 2, title: 'Team meeting preparation', priority: 'MEDIUM', status: 'Pending' }
];

const recipes = [
  { title: 'Spaghetti Carbonara', cuisine: 'Italian', cookingTime: '20 minutes', ingredients: 'Spaghetti, Eggs, pancetta, parmesan, black pepper', instructions: '1. Cook pasta. 2. Fry pancetta. 3. Combine with other ingredients.' },
  { title: 'Chicken Curry', cuisine: 'Indian', cookingTime: '45 minutes', ingredients: 'Chicken, curry powder, coconut milk, onion, garlic', instructions: '1. Saute onions. 2. Add chicken. 3. Add spices. 4. Simmer in coconut milk.' }
];

// Select the modal and its content elements
const modal = document.getElementById('myModal');
const modalBody = document.getElementById('modal-body');
const okBtn = modal.querySelector('.ok-btn');
const cancelBtn = modal.querySelector('.cancel-btn');

// This function handles showing the modal with specific content
function showModal(content, showButtons = true) {
  modalBody.innerHTML = content;
  modal.style.display = 'flex'; // This makes the modal visible

  if (showButtons) {
    okBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'inline-block';
  } else {
    okBtn.style.display = 'inline-block';
    cancelBtn.style.display = 'none';
  }

  // Returns a promise that resolves when the user clicks "OK" or rejects on "Cancel"
  return new Promise((resolve, reject) => {
    okBtn.onclick = () => {
      modal.style.display = 'none';
      const inputs = modalBody.querySelectorAll('input');
      const values = Array.from(inputs).map(input => input.value);
      resolve(values);
    };
    cancelBtn.onclick = () => {
      modal.style.display = 'none';
      reject(new Error('Canceled'));
    };
  });
}

// This function shows a simple alert message with only an "OK" button
function showAlert(message) {
  showModal(`<p>${message}</p>`, false);
  okBtn.onclick = () => modal.style.display = 'none';
}

// All the other functions (viewTasks, addTask, etc.) remain the same
// as they are already designed to use the showModal and showAlert functions.

function viewTasks() {
  let content = '<h3>--- YOUR TASKS ---</h3>';
  tasks.forEach(task => {
    content += `
      <p><b>ID:</b> ${task.id}</p>
      <p><b>Title:</b> ${task.title}</p>
      <p><b>Priority:</b> ${task.priority}</p>
      <p><b>Status:</b> ${task.status}</p>
      <hr>
    `;
  });
  showAlert(content);
}

function addTask() {
  showModal(`
    <p>Enter task title:</p>
    <input type="text" id="taskTitle">
    <p>Enter priority (low/medium/high):</p>
    <input type="text" id="taskPriority">
  `).then(values => {
    const [title, priority] = values;
    if (title && priority) {
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      tasks.push({ id: newId, title, priority: priority.toUpperCase(), status: 'Pending' });
      showAlert(`Task '${title}' added successfully!`);
    } else {
      showAlert('Task not added. All fields are required.');
    }
  }).catch(() => {});
}

function completeTask() {
  showModal(`
    <p>Enter the ID of the task to complete:</p>
    <input type="text" id="taskId">
  `).then(values => {
    const taskId = parseInt(values[0]);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.status = 'Completed';
      showAlert(`Task '${task.title}' marked as complete!`);
    } else {
      showAlert('Task not found.');
    }
  }).catch(() => {});
}

function deleteTask() {
  showModal(`
    <p>Enter the ID of the task to delete:</p>
    <input type="text" id="taskId">
  `).then(values => {
    const taskId = parseInt(values[0]);
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      const taskTitle = tasks[index].title;
      tasks.splice(index, 1);
      showAlert(`Task '${taskTitle}' deleted successfully!`);
    } else {
      showAlert('Task not found.');
    }
  }).catch(() => {});
}

function taskStatistics() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const highPriority = tasks.filter(t => t.priority === 'HIGH').length;

  showAlert(`
    <h3>--- TASK STATISTICS ---</h3>
    <p><b>Total Tasks:</b> ${total}</p>
    <p><b>Completed:</b> ${completed} (${((completed / total) * 100).toFixed(0)}%)</p>
    <p><b>Pending:</b> ${pending}</p>
    <p><b>High Priority:</b> ${highPriority}</p>
  `);
}

function viewRecipes() {
  let content = '<h3>--- RECIPES ---</h3>';
  recipes.forEach(recipe => {
    content += `
      <p><b>Title:</b> ${recipe.title}</p>
      <p><b>Cuisine:</b> ${recipe.cuisine}</p>
      <p><b>Cooking Time:</b> ${recipe.cookingTime}</p>
      <p><b>Ingredients:</b> ${recipe.ingredients}</p>
      <p><b>Instructions:</b></p>
      <ol>
        ${recipe.instructions.split('. ').map(inst => `<li>${inst}</li>`).join('')}
      </ol>
      <hr>
    `;
  });
  showAlert(content);
}

function addRecipe() {
  showModal(`
    <p>Enter recipe name:</p>
    <input type="text" id="recipeName">
    <p>Enter cuisine type:</p>
    <input type="text" id="cuisineType">
    <p>Enter ingredients (comma separated):</p>
    <input type="text" id="ingredients">
    <p>Enter cooking instructions:</p>
    <input type="text" id="instructions">
    <p>Enter cooking time in minutes:</p>
    <input type="text" id="cookingTime">
  `).then(values => {
    const [title, cuisine, ingredients, instructions, cookingTime] = values;
    if (title && cuisine && ingredients && instructions && cookingTime) {
      recipes.push({ title, cuisine, ingredients, instructions, cookingTime: `${cookingTime} minutes` });
      showAlert(`Recipe '${title}' added successfully!`);
    } else {
      showAlert('Recipe not added. All fields are required.');
    }
  }).catch(() => {});
}

function searchRecipe() {
  showModal(`
    <p>Enter recipe name to search:</p>
    <input type="text" id="searchName">
  `).then(values => {
    const searchName = values[0];
    const foundRecipe = recipes.find(r => r.title.toLowerCase().includes(searchName.toLowerCase()));
    if (foundRecipe) {
      const content = `
        <h3>--- RECIPE FOUND ---</h3>
        <p><b>Title:</b> ${foundRecipe.title}</p>
        <p><b>Cuisine:</b> ${foundRecipe.cuisine}</p>
        <p><b>Cooking Time:</b> ${foundRecipe.cookingTime}</p>
        <p><b>Ingredients:</b> ${foundRecipe.ingredients}</p>
        <p><b>Instructions:</b></p>
        <ol>
          ${foundRecipe.instructions.split('. ').map(inst => `<li>${inst}</li>`).join('')}
        </ol>
      `;
      showAlert(content);
    } else {
      showAlert('Recipe not found.');
    }
  }).catch(() => {});
}

function randomRecipe() {
  if (recipes.length > 0) {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const random = recipes[randomIndex];
    const content = `
      <h3>--- RANDOM RECIPE ---</h3>
      <p><b>Title:</b> ${random.title}</p>
      <p><b>Cuisine:</b> ${random.cuisine}</p>
      <p><b>Cooking Time:</b> ${random.cookingTime}</p>
      <p><b>Ingredients:</b> ${random.ingredients}</p>
      <p><b>Instructions:</b></p>
      <ol>
        ${random.instructions.split('. ').map(inst => `<li>${inst}</li>`).join('')}
      </ol>
    `;
    showAlert(content);
  } else {
    showAlert('No recipes available.');
  }
}