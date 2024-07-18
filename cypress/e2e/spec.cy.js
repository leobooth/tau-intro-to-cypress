function addTodo(todoText) {
    let todo1 = cy.get("[data-testid='text-input']");
    todo1.click();
    todo1.type(todoText);
    todo1.type("{enter}");
}

function removeTodo(todoText) {
    let todoItem = cy.get("[data-testid='todo-item-label']").contains(todoText);
    todoItem.trigger('mouseover');
    let todoItemRemoveButton = 
        cy.get("[data-testid='todo-item-label']").contains(todoText)
          .siblings("[data-testid='todo-item-button']");
    todoItemRemoveButton.click({force: true});
}

function completeTodo(todoText) {
    let todoCheckbox = cy.get("[data-testid='todo-item-label']").contains(todoText)
                     .siblings("[data-testid='todo-item-toggle']");
    todoCheckbox.check();
}

function clearCompletedTodos() {
    let completedTodoButton = cy.get("button.clear-completed");
    completedTodoButton.click();
}

it('add and remove a single todo item using todo item remove button', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    let todo1 = cy.get("[data-testid='todo-item-label']").contains('todo1');
    todo1.should('be.visible');
    removeTodo('todo1');
});

it('should show two todo items', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    addTodo('todo2');
    
    cy.get("[data-testid='todo-item-label']").should('have.length', 2);
    removeTodo('todo1');
    removeTodo('todo2');
});

it('complete todo item', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    completeTodo('todo1');
    
    let todoCheckbox = cy.get("[data-testid='todo-item-label']").contains('todo1')
    .siblings("[data-testid='todo-item-toggle']");
    todoCheckbox.should('be.checked');

    clearCompletedTodos();
});

// computed styles version 1
it('completed todo item label has text decoration \'line-through\'', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    completeTodo('todo1');
    
    let todoLabel = cy.get("[data-testid='todo-item-label']").contains('todo1');
    const computedStyles = todoLabel.then( ($el) => {
         return window.getComputedStyle($el[0])
    });
    computedStyles.invoke('getPropertyValue','text-decoration-line').should('equal','line-through');
    clearCompletedTodos();
});

// computed styles version 2
it('completed todo item label has text decoration \'line-through\'', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    completeTodo('todo1');
    
    let computedStyle = cy.get("[data-testid='todo-item-label']").contains('todo1').filter( 
        (k, el) => {
         const computedStyle = window.getComputedStyle(el).textDecorationLine;
         console.log(computedStyle);
         return computedStyle === 'line-through';
        }
    ).should('have.length', 1);

    clearCompletedTodos();
});

// to change timeouts globally, set 'defaultCommandTimeout' key-value in cypress.config.js 
it('changes checkbox search timeout locally to 6 seconds', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    completeTodo('todo1');
    
    let todoCheckboxes = cy.get("[data-testid='todo-item-label']", {timeout: 6000});
    
    let todoCheckbox = todoCheckboxes.contains('todo1')
    .siblings("[data-testid='todo-item-toggle']");
    todoCheckbox.should('be.checked');

    clearCompletedTodos();
});

// create test that will always fail to demonstrate headless test results
it('this test should always fail (input toggle unchecked)', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    
    
    let todoCheckboxes = cy.get("[data-testid='todo-item-label']", {timeout: 6000});
    let todoCheckbox = todoCheckboxes.contains('todo1')
    .siblings("[data-testid='todo-item-toggle']");
    todoCheckbox.should('be.checked');

    removeTodo('todo1');
});