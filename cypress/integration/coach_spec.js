describe('Coach', () => {
  before(() => {
    cy.clearLocalStorage();
  });

  after(() => {
    cy.log('Clean up test data');
    cy.request('GET', 'http://localhost:3001/api/clients').then(
      ({ body: clients }) => {
        const johns = clients.filter(
          c => c.first_name === 'John' && c.last_name === 'Doe',
        );
        johns.forEach(j =>
          cy
            .request('GET', `http://localhost:3001/api/clients/${j.id}/tasks`)
            .then(({ body: tasks }) => {
              tasks.forEach(t => {
                cy.request('DELETE', `http://localhost:3001/api/tasks/${t.id}`);
              });
              cy.request('DELETE', `http://localhost:3001/api/clients/${j.id}`);
            }),
        );
      },
    );
  });

  it('can see the login page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Log In');
  });

  it('Logs in as a coach', () => {
    cy.loginAsCoach();
  });

  it('Creates a new client', () => {
    cy.loginAsCoach();

    cy.contains('New Client').click();
    cy.contains('Add New Client');

    cy.get('input[name=first_name]').type('John');
    cy.get('input[name=last_name]').type('Doe');
    cy.get('input[name=email]').type('john@doe.com');
    cy.get('input[name=phone]').type('1234567890');
    cy.contains('Save').click();
    cy.contains('Text (646) 798-8004 to get started.');
  });

  it('Adds a new task for a client', () => {
    cy.loginAsCoach();

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('Next').click();
    cy.contains('Add New Task').click();
    cy.contains('string dude').click();
    cy.contains('SAVE TO WORKPLAN').click();
    cy.contains('string dude');

    cy.contains('View Details');
    cy.contains('Add New Task');
  });

  it('Edit task content', () => {
    cy.loginAsCoach();

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('View Details').click();
    cy.contains('Edit').click();
    cy.get('input[name=title]')
      .clear()
      .type('This is an awesome task');
    cy.get('input[name=description]')
      .clear()
      .type('And it has an awesome description');
    cy.contains('SAVE TO WORKPLAN').click();

    cy.contains('Edit');
    cy.contains('Delete');
    cy.contains('This is an awesome task');
    cy.contains('And it has an awesome description');
  });

  it('Edit task steps', () => {
    cy.loginAsCoach();

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('View Details').click();
    cy.contains('Edit').click();
    cy.get('textarea[name="steps[0].text"]')
      .clear()
      .type('My first step');
    cy.contains('SAVE TO WORKPLAN').click();

    cy.contains('Edit');
    cy.contains('Delete');
    cy.contains('My first step');
  });

  it('Adds a new task step', () => {
    cy.loginAsCoach();

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('View Details').click();
    cy.contains('Edit').click();
    cy.get('.add-step-link').click();
    cy.get('textarea[name="steps[1].text"]')
      .clear()
      .type('My second step');
    cy.contains('SAVE TO WORKPLAN').click();

    cy.contains('Edit');
    cy.contains('Delete');
    cy.contains('My second step');
  });
});
