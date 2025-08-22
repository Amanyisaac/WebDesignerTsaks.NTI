let arr1 = [
    ['#ID1','complete project proposal', 'high', 'x-pending'],
    ['#ID2','cooking recipe', 'medium', 'x-pending'],
    ['#ID3','project1', 'low', 'x-pending']
];

let addtitle;
let addpriority;

function view() {
    let names = "\n";
    for (let i = 0; i < arr1.length; i++) {
        names += "\n" + arr1[i].join("\n") + "\n" + "---------------------" + '\n';
    }
    alert(names);
}

function add() {
    addtitle = prompt("Enter the title you want to be added");
    addpriority = prompt("Enter the priority (low, high, medium)");
    arr1.push(["#ID" + (arr1.length + 1), addtitle, addpriority, "x-pending"]);
    alert("Task added successfully ✅");
}

function complete() {
    view();
    let comp = prompt("Enter the task ID to be completed (e.g., #ID2)");
    let task = arr1.find(i => i[0] === comp);

    if (task) {
        task[3] = "completed";
        alert(`${comp} has been completed ✅`);
    } else {
        alert("Task not found ❌");
    }
}

function delet() {
    view();
    let dlt = prompt("Enter ID to be deleted (e.g., #ID3)");
    let index = arr1.findIndex(i => i[0] === dlt);

    if (index !== -1) {
        arr1.splice(index, 1);
        alert(`${dlt} has been deleted successfully ✅`);
    } else {
        alert("Task not found ❌");
    }
}

function statict() {
    let cnt = 0;
    let high = 0;
    let pending = 0;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i][3] === 'completed')
            cnt++;
        if (arr1[i][2] === "high")
            high++;
        if (arr1[i][3] === "x-pending")
            pending++;
    }
    alert(
        "Total tasks# " + arr1.length + "\n" +
        "Completed# " + cnt + "\n" +
        "High Priority# " + high + "\n" +
        "Pending# " + pending
    );
}


// ========================== Recipes ==========================

let arr2 = [
  [
   '#Recipe1', 'Scrambled Eggs',
    '🥚 2 Eggs → 2 min',
    '🧈 1 tbsp Butter → 1 min',
    '🧂 Salt & Pepper → 30 sec',
    '🔥 Cook on low heat → 5 min'
  ],
  [
    '#Recipe2','🥗 Greek Salad',
    '🥒 Cucumber (chopped) → 5 min',
    '🍅 Tomato (diced) → 5 min',
    '🧅 Red Onion (sliced) → 2 min',
    '🧀 Feta Cheese → 2 min',
    '🫒 Olives → 1 min',
    '🥗 Mix all ingredients → 3 min'
  ],
  [
  '#Recipe3' , '🍲 Chicken Soup',
    '🍗 Chicken pieces → 10 min prep',
    '🧅 Onion & Garlic → 5 min',
    '🥕 Carrots → 5 min',
    '🥔 Potatoes → 5 min',
    '💧 Add Water/Broth → 2 min',
    '🔥 Simmer until chicken is tender → 30 min'
  ]
];

function cook() {
    let recipes = "\n";
    for (let i = 0; i < arr2.length; i++) {
        recipes += arr2[i].join("\n") + "\n" + "---------------------" + '\n';
    }
    alert(recipes);
}

function addrecipe() {
    let id = "#Recipe" + (arr2.length + 1);
    let title = prompt("Enter recipe title (e.g., 🍝 Pasta)");
    let steps = [];

    while (true) {
        let step = prompt("Enter step (or leave blank to finish)");
        if (!step) break;
        steps.push(step);
    }

    arr2.push([id, title, ...steps]);
    alert(`Recipe "${title}" has been saved successfully ✅`);
}

function sear() {
    let ser = prompt("Enter recipe to search").toLowerCase();
    let result = arr2.find(i => i[0].toLowerCase().includes(ser) || i[1].toLowerCase().includes(ser));

    if (result) {
        alert(result.join("\n"));
    } else {
        alert("Recipe not found ❌");
    }
}

function randomRecipe() {
    if (arr2.length === 0) {
        alert("No recipes available ❌");
        return;
    }
    let index = Math.floor(Math.random() * arr2.length);
    let recipe = arr2[index];

    alert("Random Recipe:\n" + recipe.join("\n"));
}
