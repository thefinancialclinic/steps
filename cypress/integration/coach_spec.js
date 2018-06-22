const { API_URL } = Cypress.env();
let user, org, coach, task;

const taskTitle = 'The ultra awesome task';

Cypress.Commands.add('setUser', u => {
  cy.visit('http://localhost:3000')
    .window()
    .should(win => {
      win.localStorage.setItem('USER', JSON.stringify(u));
      win.localStorage.setItem('AUTHENTICATED', 'true');
    });

  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('cleanCoach', () => {
  cy.request('DELETE', `${API_URL}/coaches/${coach.id}`);
  cy.request('DELETE', `${API_URL}/orgs/${org.id}`);
});

Cypress.Commands.add('clearJohnDoe', () => {
  cy.log('Clean up test data');

  cy.request('GET', `${API_URL}/clients`).then(({ body: clients }) => {
    const johns = clients.filter(
      c => c.first_name === 'John' && c.last_name === 'Doe',
    );
    johns.forEach(j =>
      cy
        .request('GET', `${API_URL}/clients/${j.id}/tasks`)
        .then(({ body: tasks }) => {
          tasks.forEach(t => {
            cy.request('DELETE', `${API_URL}/tasks/${t.id}`);
          });
          cy.request('DELETE', `${API_URL}/clients/${j.id}`);
        }),
    );
  });
});

describe('Coach', () => {
  before(() => {
    cy.request('POST', `${API_URL}/orgs`, {
      name: 'My Org',
      sms_number: '1234567890',
    }).then(resp => {
      org = resp.body.id;
      cy.request('POST', `${API_URL}/coaches`, {
        first_name: 'Coach',
        last_name: 'Bob',
        email: 'coach@bob.com',
        org_id: org.id,
        color: 'red',
        goals: [],
        status: 'AWAITING_HELP',
        checkin_times: [],
      }).then(r => {
        coach = r.body.id;
      });
    });

    cy.request('POST', `${API_URL}/tasks`, {
      title: taskTitle,
      category: 'category',
      user_id: null,
      status: 'ACTIVE',
      date_created: new Date(),
    }).then(r => {
      task = r.body.id;
    });

    cy.clearLocalStorage();
    cy.clearJohnDoe();
  });

  after(() => {
    cy.clearJohnDoe();
    cy.cleanCoach();
  });

  it('can see the login page', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Log In');
  });

  it('Logs in as a coach', () => {
    cy.visit('http://localhost:3000');
    cy.get('form')
      .find('input[type=radio][value=Coach]')
      .check({ force: true })
      .trigger('change')
      .should('be.checked');

    cy.contains('button', 'Submit')
      .trigger('click')
      .click();

    cy.url().should('equal', 'http://localhost:3000/');

    cy.window().should(win => {
      user = JSON.parse(win.localStorage.getItem('USER'));
      expect(user).to.have.all.keys([
        'checkin_times',
        'coach_id',
        'color',
        'email',
        'fb_id',
        'first_name',
        'follow_up_date',
        'goals',
        'id',
        'image',
        'last_name',
        'org',
        'org_id',
        'phone',
        'plan_url',
        'platform',
        'status',
        'temp_help_response',
        'topic',
        'type',
        'updated',
      ]);
      expect(win.localStorage.getItem('AUTHENTICATED')).to.eq('true');
    });
  });

  it('Creates a new client', () => {
    cy.setUser(user);

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
    cy.setUser(user);

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('Next').click();
    cy.contains('Add New Task').click();
    cy.contains(taskTitle).click();
    cy.contains('SAVE TO WORKPLAN').click();
    cy.contains(taskTitle);

    cy.contains('View Steps');
    cy.contains('Add New Task');
  });

  it('Edit task content', () => {
    cy.setUser(user);

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('View Steps').click();
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

  it('Adds a new task step', () => {
    cy.setUser(user);

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('View Steps').click();
    cy.contains('Edit').click();
    cy.get('.add-step-link').click();
    cy.get('textarea[name="steps[0].text"]')
      .clear()
      .type('My first step');
    cy.contains('SAVE TO WORKPLAN').click();

    cy.contains('Edit');
    cy.contains('Delete');
    cy.contains('My first step');
  });

  it('Edit task steps', () => {
    cy.setUser(user);

    cy.contains('My Clients').click();
    cy.get('div[title="John Doe"]').click();
    cy.contains('View Steps').click();
    cy.contains('Edit').click();
    cy.get('textarea[name="steps[0].text"]')
      .clear()
      .type('My first step (edited)');
    cy.contains('SAVE TO WORKPLAN').click();

    cy.contains('Edit');
    cy.contains('Delete');
    cy.contains('My first step (edited)');
  });
});
