function runOperation(operationName) {
    let outputMessage = `--- ${operationName.toUpperCase()} ---\n\n`;

    // A placeholder for data sets
    const products = [
        { name: "Laptop", price: 999.99, category: "Electronics" },
        { name: "Smartphone", price: 699.99, category: "Electronics" },
        { name: "Headphones", price: 149.99, category: "Electronics" },
        { name: "Desk Chair", price: 199.99, category: "Furniture" },
        { name: "Coffee Mug", price: 9.99, category: "Kitchen" }
    ];

    const employees = [
        { name: "Jane Smith", salary: 80000, skills: ["JavaScript", "Python", "SQL"] },
        { name: "John Doe", salary: 75000, skills: ["Java", "C++", "Cloud"] },
        { name: "Mike Johnson", salary: 90000, skills: ["JavaScript", "Python", "SQL"] },
        { name: "Sarah Williams", salary: 65000, skills: ["JavaScript", "Python", "SQL"] }
    ];

    switch (operationName) {
        case 'Array Operations':
            const originalArray = [10, 20, 30, 40, 50];
            outputMessage += `Original array: [${originalArray}]\n`;

            originalArray.push(60);
            originalArray.shift();
            outputMessage += `After push(60) and shift(): [${originalArray}]\n`;

            const doubled = originalArray.map(num => num * 2);
            outputMessage += `Doubled values: [${doubled}]\n`;

            const filtered = originalArray.filter(num => num > 25);
            outputMessage += `Numbers > 25: [${filtered}]\n`;

            const sum = originalArray.reduce((acc, current) => acc + current, 0);
            outputMessage += `Sum of numbers: ${sum}\n`;

            const average = sum / originalArray.length;
            outputMessage += `Average of numbers: ${average.toFixed(2)}`;

            alert(outputMessage);
            break;

        case 'String Operations':
            const text = "The quick brown fox jumps over the lazy dog. JavaScript is awesome!";
            outputMessage += `Original string: "${text}"\n`;
            outputMessage += `Uppercase: "${text.toUpperCase()}"\n`;
            outputMessage += `Lowercase: "${text.toLowerCase()}"\n`;
            outputMessage += `Index of 'fox': ${text.indexOf("fox")}\n`;
            outputMessage += `Includes 'JavaScript': ${text.includes("JavaScript")}\n`;
            outputMessage += `Substring (4:19): "${text.substring(4, 19)}"\n`;
            outputMessage += `Split by spaces: [${text.split(" ").map(s => `"${s}"`).join(", ")}]\n`;
            outputMessage += `Replace 'fox' with 'cat': "${text.replace("fox", "cat")}"`;
            alert(outputMessage);
            break;

        case 'Object Operations':
            const originalObject = {
                name: "Alice",
                age: 30,
                address: {
                    street: "123 Main St",
                    city: "Techville"
                },
                hobbies: ["reading", "hiking"]
            };
            outputMessage += `Original object: ${JSON.stringify(originalObject, null, 2)}\n\n`;

            const modifiedObject = { ...originalObject, name: "Alice", age: 31 };
            modifiedObject.address.city = "Rockville";
            modifiedObject.hobbies.push("coding");
            outputMessage += `After modifications:\n${JSON.stringify(modifiedObject, null, 2)}`;
            alert(outputMessage);
            break;
        
        case 'Function Operations':
            function square(n) { return n * n; }
            const cube = n => n * n * n;
            const numbers = [1, 2, 3, 4];

            outputMessage += `--- FUNCTION OPERATIONS ---\n\n`;
            outputMessage += `square(5): ${square(5)}\n`;
            outputMessage += `cube(3): ${cube(3)}\n`;
            outputMessage += `map(square): [${numbers.map(square)}]\n`;
            outputMessage += `map(cube): [${numbers.map(cube)}]\n\n`;

            // Function composition
            const add5 = x => x + 5;
            const multiplyBy2 = x => x * 2;
            const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
            const doubleAndAdd5 = compose(add5, multiplyBy2);
            outputMessage += `Function composition (doubleAndAdd5): ${doubleAndAdd5(4)}\n\n`;

            // Promises simulation
            const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
            outputMessage += `Simulating promises (wait 1s)...\n`;
            alert(outputMessage);
            
            delay(1000).then(() => {
                alert("Promise resolved after 1 second!");
            });
            break;

        case 'Data Processing':
            outputMessage += `--- DATA PROCESSING ---\n\n`;
            outputMessage += `Total products: ${products.length}\n`;
            
            const totalInventoryValue = products.reduce((sum, item) => sum + item.price, 0);
            outputMessage += `Total inventory value: $${totalInventoryValue.toFixed(2)}\n`;

            const averagePrice = totalInventoryValue / products.length;
            outputMessage += `Average price: $${averagePrice.toFixed(2)}\n\n`;

            const productsByCategory = products.reduce((acc, product) => {
                acc[product.category] = (acc[product.category] || 0) + 1;
                return acc;
            }, {});
            outputMessage += "Products by category:\n";
            for (const category in productsByCategory) {
                outputMessage += `- ${category}: ${productsByCategory[category]}\n`;
            }

            const totalElectronics = products.filter(p => p.category === "Electronics").length;
            outputMessage += `\nTotal Electronics items: ${totalElectronics}`;

            alert(outputMessage);
            break;
            
        case 'Search Operations':
            outputMessage += `--- SEARCH OPERATIONS ---\n\n`;

            // Basic search
            const searchProducts = products.filter(p => p.price > 100);
            outputMessage += `Products with price > $100:\n`;
            searchProducts.forEach(p => outputMessage += `- ${p.name}: $${p.price.toFixed(2)}\n`);

            // Multi-criteria search (e.g., skill search)
            outputMessage += `\nEmployees with 'JavaScript' skill:\n`;
            const jsEmployees = employees.filter(e => e.skills.includes("JavaScript"));
            jsEmployees.forEach(e => outputMessage += `- ${e.name}\n`);
            
            alert(outputMessage);
            break;

        case 'Sort Operations':
            outputMessage += `--- SORT OPERATIONS ---\n\n`;
            
            // Sort products by price (low to high)
            const sortedProducts = [...products].sort((a, b) => a.price - b.price);
            outputMessage += `Products by price (high to low):\n`;
            sortedProducts.forEach(p => outputMessage += `- ${p.name}: $${p.price.toFixed(2)}\n`);

            // Sort employees by name
            const sortedEmployees = [...employees].sort((a, b) => a.name.localeCompare(b.name));
            outputMessage += `\nEmployees by name:\n`;
            sortedEmployees.forEach(e => outputMessage += `- ${e.name}\n`);
            
            alert(outputMessage);
            break;

        case 'Filter Operations':
            outputMessage += `--- FILTER OPERATIONS ---\n\n`;
            
            // Filter products between two prices
            const filteredByPrice = products.filter(p => p.price > 100 && p.price < 500);
            outputMessage += `Products between $100 and $500:\n`;
            filteredByPrice.forEach(p => outputMessage += `- ${p.name}: $${p.price.toFixed(2)}\n`);
            
            // Filter employees by department (simulated by skills)
            const itEmployees = employees.filter(e => e.skills.includes("JavaScript") || e.skills.includes("Python"));
            outputMessage += `\nIT Department Employees:\n`;
            itEmployees.forEach(e => outputMessage += `- ${e.name}\n`);
            
            alert(outputMessage);
            break;
            
        case 'Math Operations':
            const num1 = 20, num2 = 40;
            const PI = Math.PI;
            
            outputMessage += `--- MATH OPERATIONS ---\n\n`;
            outputMessage += `20 + 40 = ${num1 + num2}\n`;
            outputMessage += `20 - 40 = ${num1 - num2}\n`;
            outputMessage += `20 * 40 = ${num1 * num2}\n`;
            outputMessage += `20 / 40 = ${num1 / num2}\n\n`;
            outputMessage += `20^4 = ${Math.pow(num1, 4)}\n`;
            outputMessage += `Square root of 20: ${Math.sqrt(num1).toFixed(2)}\n\n`;
            
            const randomNum = Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
            outputMessage += `Random between 20 and 40: ${randomNum}\n`;

            alert(outputMessage);
            break;

        case 'Date Operations':
            const today = new Date();
            const christmas = new Date(today.getFullYear(), 11, 25);
            
            outputMessage += `--- DATE OPERATIONS ---\n\n`;
            outputMessage += `Current date/time: ${today.toLocaleDateString()} ${today.toLocaleTimeString()}\n`;
            outputMessage += `Christmas this year: ${christmas.toDateString()}\n`;

            const daysUntilChristmas = Math.ceil((christmas - today) / (1000 * 60 * 60 * 24));
            outputMessage += `\nDays until Christmas: ${daysUntilChristmas}\n\n`;
            
            outputMessage += "Date components:\n";
            outputMessage += `- Year: ${today.getFullYear()}\n`;
            outputMessage += `- Month: ${today.getMonth() + 1}\n`;
            outputMessage += `- Day: ${today.getDate()}\n`;
            outputMessage += `- Hours: ${today.getHours()}\n`;
            outputMessage += `- Minutes: ${today.getMinutes()}\n`;
            
            alert(outputMessage);
            break;

        case 'Advanced Functions':
            // Fibonacci recursive function
            function fibonacci(n) {
                if (n <= 1) return n;
                return fibonacci(n - 1) + fibonacci(n - 2);
            }
            
            // Currying
            const multiply = (a) => (b) => a * b;
            const multiplyBy10 = multiply(10);

            outputMessage += `--- ADVANCED FUNCTIONS ---\n\n`;
            outputMessage += `Factorial of 5: ${fibonacci(10)}\n`;
            outputMessage += `Fibonacci(10): ${fibonacci(10)}\n\n`;
            outputMessage += `Currying: multiply(5)(10) = ${multiply(5)(10)}\n`;
            outputMessage += `Double 5: ${multiplyBy10(5)}\n`;
            
            alert(outputMessage);
            break;

        case 'Exit Application':
            if (confirm("Are you sure you want to exit the application?")) {
                alert("Thank you for using the JavaScript Operations App. Goodbye!");
                window.close(); // Note: This may not work in all browsers due to security restrictions.
            }
            break;
    }
}