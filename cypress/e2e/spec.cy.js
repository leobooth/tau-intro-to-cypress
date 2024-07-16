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