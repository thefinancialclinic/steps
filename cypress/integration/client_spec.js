describe('Index', () => {
  it('can see the correct links', () => {
    cy.visit('http://localhost:3000');

    cy.contains('My Clients');
    cy.contains('New Client');
  });

  it('can follow the My Clients link', () =>{
    cy.visit('http://localhost:3000');

    cy.contains('My Clients')
      .click();
  });

  it('can follow the New Client link', () =>{
    cy.visit('http://localhost:3000');

    cy.contains('New Client')
      .click();
  });

  it('can add a task to a user', () => {
    cy.visit('http://localhost:3000/clients');
    cy.get('.clients > a:first-child').click();
    cy.contains('New Task').click();
    cy.get('input').type('NEW_TASK');
    cy.get('form').submit();
  });
})
