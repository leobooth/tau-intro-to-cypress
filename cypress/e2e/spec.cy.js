function addTodo(todoText) {
    let todo1 = cy.get("[data-testid='text-input']");
    todo1.click();
    todo1.type(todoText);
    todo1.type("{enter}");
}

function removeTodo(todoText) {
    let todoItem = cy.get("[data-testid='todo-item-label']").contains(todoText);
    todoItem.trigger('mouseover');
    let todoItemRemoveButton = cy.get("[data-testid='todo-item-button']");
    todoItemRemoveButton.click({force: true});
}

it('add and remove a single todo item', () => {
    cy.visit('https://todomvc.com/examples/react/dist/');
    addTodo('todo1');
    removeTodo('todo1');
});

