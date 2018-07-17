const { API_URL, AUTH0_BEARER_TOKEN } = Cypress.env();
let user, org, coach, task, client, superadmin, request, incomeTask, creditTask;
let tokens;

const taskTitle = 'The ultra awesome task';
const COACH_EMAIL = 'connor+steps-cypress-coach@8thlight.com';
const COACH_AUTH0_ID = '5b3307d352e65360e5e0e13b';

Cypress.Commands.add('cleanCoach', () => {
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/coaches/${coach}`,
    headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
  });
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/orgs/${org}`,
    headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
  });
});

Cypress.Commands.add('clearJohnDoe', () => {
  cy.log('Clean up test data');

  cy.request({
    method: 'GET',
    url: `${API_URL}/clients`,
    headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
  }).then(({ body: clients }) => {
    const testClients = clients.filter(c => c.email === 'client@example.com');
    testClients.forEach(c => {
      console.log({ c });
      cy.request({
        method: 'GET',
        url: `${API_URL}/clients/${c.id}/tasks`,
        headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
      }).then(({ body: tasks }) => {
        console.log(tasks);
        tasks.forEach(t => {
          cy.request({
            method: 'DELETE',
            url: `${API_URL}/tasks/${t.id}`,
            headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
          });
        });
      });
      cy.request({
        method: 'GET',
        url: `${API_URL}/clients/${c.id}/messages`,
        headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
      }).then(({ body: messages }) => {
        console.log(messages);
        messages.forEach(m => {
          cy.request({
            method: 'DELETE',
            url: `${API_URL}/messages/${m.id}`,
            headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
          });
        });
        cy.request({
          method: 'GET',
          url: `${API_URL}/clients/${c.id}/requests`,
          headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
        }).then(({ body: requests }) => {
          console.log(requests);
          requests.forEach(r => {
            cy.request({
              method: 'DELETE',
              url: `${API_URL}/requests/${r.id}`,
              headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
            });
          });
        });
        cy.request({
          method: 'DELETE',
          url: `${API_URL}/clients/${c.id}`,
          headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
        });
      });
    });
  });
});

Cypress.Commands.add('logIn', email => {
  cy.visit('http://localhost:3000?auth0');

  cy.get('input[name=email]').type(email);
  cy.get('input[name=password]').type('password1!@');
  cy.contains('button', 'Log In')
    .trigger('click')
    .click();
});

Cypress.Commands.add('storeTokens', () => {
  cy.visit('http://localhost:3000');
  cy.window().then(win => {
    const access_token = win.localStorage.getItem('access_token');
    const id_token = win.localStorage.getItem('id_token');
    const expires_at = win.localStorage.getItem('expires_at');
    tokens = {
      access_token,
      id_token,
      expires_at,
    };
  });
});

Cypress.Commands.add('loadTokens', tokens => {
  cy.window().then(win => {
    const { access_token, id_token, expires_at } = tokens;
    win.localStorage.setItem('access_token', access_token);
    win.localStorage.setItem('id_token', id_token);
    win.localStorage.setItem('expires_at', expires_at);
  });
  cy.visit('http://localhost:3000');
});

describe('Auth', () => {
  it('can see the login page', () => {
    cy.visit('http://localhost:3000?auth0');
    cy.contains('Log In');
  });

  it('can see the admin signup page', () => {
    cy.visit('http://localhost:3000/signup');
    cy.contains('Sign Up');
  });

  it('can see the coach signup page', () => {
    cy.visit('http://localhost:3000/signup/1');
    cy.contains('Sign Up');
  });

  it('can see the client login page', () => {
    cy.visit('http://localhost:3000/my-tasks');
    cy.contains('Continue');
  });
});

describe('Coach', () => {
  before(() => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/orgs`,
      body: {
        name: 'My Org',
        sms_number: '1234567890',
      },
      headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
    }).then(resp => {
      org = resp.body.id;
      console.log({ org });

      cy.request({
        method: 'POST',
        url: `${API_URL}/coaches`,
        body: {
          first_name: 'Coach',
          last_name: 'Bob',
          email: COACH_EMAIL,
          org_id: org,
          color: 'red',
          goals: [],
          status: 'AWAITING_HELP',
          checkin_times: [],
          auth0_id: COACH_AUTH0_ID,
        },
        headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
      }).then(r => {
        coach = r.body.id;
        console.log({ coach });
      });
    });

    cy.request({
      method: 'POST',
      url: `${API_URL}/tasks`,
      body: {
        title: taskTitle,
        category: 'category',
        user_id: null,
        status: 'ACTIVE',
        date_created: new Date(),
      },
      headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
    }).then(r => {
      task = r.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${API_URL}/tasks`,
      body: {
        title: 'Debt task',
        category: 'Debt',
        user_id: null,
        status: 'ACTIVE',
        date_created: new Date(),
      },
      headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
    }).then(r => {
      incomeTask = r.body.id;
    });

    cy.request({
      method: 'POST',
      url: `${API_URL}/tasks`,
      body: {
        title: 'Credit task',
        category: 'Credit',
        user_id: null,
        status: 'ACTIVE',
        date_created: new Date(),
      },
      headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
    }).then(r => {
      creditTask = r.body.id;
    });

    cy.clearLocalStorage();
    cy.clearJohnDoe();
  });

  after(() => {
    cy.clearJohnDoe();
    cy.cleanCoach();
  });

  describe('Login', () => {
    it('Logs in as a coach', () => {
      cy.logIn(COACH_EMAIL);

      cy.url().should('equal', 'http://localhost:3000/');

      cy.contains('My Clients');
      cy.contains('New Client');
      cy.storeTokens(tokens);
    });
  });

  describe('New Client', () => {
    it('Creates a new client', () => {
      console.log(tokens);
      cy.loadTokens(tokens);

      cy.contains('New Client').click();
      cy.contains('Add New Client');

      cy.get('input[name=first_name]').type('John');
      cy.get('input[name=last_name]').type('Doe');
      cy.get('input[name=email]').type('client@example.com');
      cy.get('input[name=phone]').type('1234567890');
      cy.contains('Save').click();
      cy.contains('Text START to (646) 798-8004 to get started.');
    });
  });

  describe('My Clients', () => {
    it('Shows clients who need assistance', () => {
      console.log(tokens);
      cy.request({
        method: 'POST',
        url: `${API_URL}/clients`,
        body: {
          first_name: 'Needs',
          last_name: 'Help',
          email: 'client@example.com',
          status: 'AWAITING_HELP',
          org_id: org,
          coach_id: coach,
          goals: [],
        },
        headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
      }).then(resp => {
        client = resp.body.id;
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.contains('Awaiting Help (1)');
        cy.contains('Everyone Else (1)');
      });
    });

    it('Shows when a client ceases to need help', () => {
      cy.request({
        method: 'POST',
        url: `${API_URL}/requests`,
        body: {
          status: 'RESOLVED',
          user_id: client,
          task_id: task,
        },
        headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
      }).then(resp => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        // Awaiting Help is not displayed by design
        cy.contains('Everyone Else (2)');
      });
    });

    it('Shows when a client begins to need assistance', () => {
      cy.request({
        method: 'POST',
        url: `${API_URL}/requests`,
        body: {
          status: 'NEEDS_ASSISTANCE',
          user_id: client,
          task_id: task,
        },
        headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
      }).then(resp => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.contains('Awaiting Help (1)');
        cy.contains('Everyone Else (1)');
      });
    });
  });

  describe('Client Profile', () => {
    describe('Tasks', () => {
      it('Adds a new task for a client', () => {
        cy.loadTokens(tokens);

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

      it('Filters tasks', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('Add New Task').click();
        cy.contains('Credit').click();
        cy.get('.add-tasks-list')
          .invoke('text')
          .should('contain', 'Credit task');
        cy.get('.add-tasks-list')
          .invoke('text')
          .should('not.contain', 'Debt task');
        cy.contains('Debt').click();
        cy.get('.add-tasks-list')
          .invoke('text')
          .should('contain', 'Debt task');
      });

      it('Edit task content', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('View Steps').click();
        cy.get('div.content')
          .contains('Edit')
          .click();
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
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('View Steps').click();
        cy.get('div.content')
          .contains('Edit')
          .click();
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
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('View Steps').click();
        cy.get('div.content')
          .contains('Edit')
          .click();
        cy.get('textarea[name="steps[0].text"]')
          .clear()
          .type('My first step (edited)');
        cy.contains('SAVE TO WORKPLAN').click();

        cy.contains('Edit');
        cy.contains('Delete');
        cy.contains('My first step (edited)');
      });

      it('Completes tasks', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('This is an awesome task');
        cy.get('.task-completed > .material-icons').contains(
          'check_circle_outline',
        );
        cy.get('.task-completed').click();
        cy.get('.task-completed > .material-icons').contains('check_circle');

        cy.visit('http://localhost:3000');
        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('This is an awesome task');
        cy.get('.task-completed > .material-icons').contains('check_circle');
      });
    });

    describe('Goals', () => {
      it('Adds a goal', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('Goals').click();
        cy.contains('Add Goal').click();

        cy.get('textarea[name="goal"]')
          .clear()
          .type('My first goal');
        cy.contains('Save').click();

        cy.contains('Success!');
        cy.contains('Edit Goal');
        cy.contains('My first goal');
      });

      it('Edits a goal', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('Goals').click();
        cy.contains('Edit Goal').click();

        cy.get('textarea[name="goal"]')
          .clear()
          .type('My first goal (edited)');
        cy.contains('Save').click();

        cy.contains('Success!');
        cy.contains('Edit Goal');
        cy.contains('My first goal (edited)');
      });

      it('Adds a new goal', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('Goals').click();
        cy.contains('New Goal').click();

        cy.get('textarea[name="goal"]')
          .clear()
          .type('My second goal');
        cy.contains('Save').click();

        cy.contains('Success!');
        cy.contains('Edit Goal');
        cy.contains('My second goal');
      });
    });

    describe('Chat', () => {
      before(() => {
        cy.request({
          method: 'GET',
          url: `${API_URL}/user`,
          headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
        }).then(resp => {
          superadmin = resp.body.id;
          cy.request({
            method: 'POST',
            url: `${API_URL}/messages`,
            body: {
              text: 'From Coach to Client',
              to_user: client,
              from_user: coach,
              timestamp: new Date(),
            },
            headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
          })
            .then(() => {
              cy.request({
                method: 'POST',
                url: `${API_URL}/messages`,
                body: {
                  text: 'From Client to Coach',
                  to_user: coach,
                  from_user: client,
                  timestamp: new Date(),
                },
                headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
              });
            })
            .then(() => {
              cy.request({
                method: 'POST',
                url: `${API_URL}/messages`,
                body: {
                  text: 'From Other to Client',
                  to_user: client,
                  from_user: superadmin,
                  timestamp: new Date(),
                },
                headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
              });
            });
        });
      });

      it('Views chat messages', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="Needs Help"]').click();
        cy.contains('Next').click();
        cy.contains('Chat').click();
        cy.contains('log');
        cy.contains('help');
        cy.contains('From Coach to Client');
        cy.contains('From Client to Coach');
        cy.contains('From Other to Client');
      });

      describe('Chat Help', () => {
        before(() => {
          cy.request({
            method: 'POST',
            url: `${API_URL}/requests`,
            body: {
              status: 'NEEDS_ASSISTANCE',
              task_id: task,
              user_id: client,
            },
            headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
          }).then(resp => {
            request = resp.body.id;
            cy.request({
              method: 'POST',
              url: `${API_URL}/messages`,
              body: {
                text: 'Help Message from Client to Coach',
                to_user: coach,
                from_user: client,
                timestamp: new Date(),
                request_id: request,
              },
              headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
            });
          });
        });

        it('Shows help', () => {
          cy.loadTokens(tokens);

          cy.contains('My Clients').click();
          cy.get('div[title="Needs Help"]').click();
          cy.contains('Next').click();
          cy.contains('Chat').click();
          cy.contains('log').click();
          cy.contains('Help Message from Client to Coach');

          cy.contains('help').click();
          cy.contains('Needs assistance');
          cy.contains('Help Message from Client to Coach');
        });

        it('Replies', () => {
          cy.loadTokens(tokens);

          cy.contains('My Clients').click();
          cy.get('div[title="Needs Help"]').click();
          cy.contains('Next').click();
          cy.contains('Chat').click();
          cy.contains('help').click();

          cy.contains('Needs assistance').click();
          cy.contains('Reply');
          cy.get('textarea[name="reply"]')
            .clear()
            .type('Help Reply from Coach to Client');
          cy.get('button')
            .contains('Reply')
            .click();
          cy.contains('Help Reply from Coach to Client');
          cy.contains('Back').click();
          cy.contains('log').click();
          cy.contains('Help Reply from Coach to Client');

          cy.loadTokens(tokens);

          cy.contains('My Clients').click();
          cy.get('div[title="Needs Help"]').click();
          cy.contains('Next').click();
          cy.contains('Chat').click();
          cy.contains('help').click();
          cy.contains('Replied');
          cy.contains('Help Message from Client to Coach').click();

          cy.contains('Replied').click();
          cy.contains('Reply');
          cy.get('textarea[name="reply"]')
            .clear()
            .type('Second Help Reply from Coach to Client');
          cy.get('button')
            .contains('Reply')
            .click();
          cy.contains('Second Help Reply from Coach to Client');
          cy.contains('Back').click();
          cy.contains('log').click();
          cy.contains('Second Help Reply from Coach to Client');

          cy.request({
            method: 'PUT',
            url: `${API_URL}/requests/${request}`,
            body: {
              status: 'RESOLVED',
              task_id: task,
              user_id: client,
            },
            headers: { Authorization: `Bearer ${AUTH0_BEARER_TOKEN}` },
          }).then(() => {
            cy.loadTokens(tokens);

            cy.contains('My Clients').click();
            cy.get('div[title="Needs Help"]').click();
            cy.contains('Next').click();
            cy.contains('Chat').click();
            cy.contains('help').click();
            cy.contains('Resolved');
            cy.contains('Help Message from Client to Coach').click();

            cy.contains('Your response helped resolve the problem');
          });
        });
      });
    });

    describe('Follow up', () => {
      it('Sets follow up', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('Follow Up').click();
        cy.contains("Let's follow up");

        cy.get('input[name="weeks"]')
          .clear()
          .type('2');
        cy.contains('Save').click();

        cy.contains('Saved!');
        cy.contains("Let's follow up in");
        cy.get('input[name="weeks"]').should('have.value', '2');
        cy.contains('weeks.');
      });

      it('Updates follow up', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('Follow Up').click();
        cy.contains("Let's follow up");

        cy.get('input[name="weeks"]')
          .clear()
          .type('3');
        cy.contains('Save').click();

        cy.contains('Saved!');
        cy.contains("Let's follow up in");
        cy.get('input[name="weeks"]').should('have.value', '3');
        cy.contains('weeks.');
      });
    });

    describe('Profile', () => {
      it('Edits client profile', () => {
        cy.loadTokens(tokens);

        cy.contains('My Clients').click();
        cy.get('div[title="John Doe"]').click();
        cy.contains('Edit').click();
        cy.contains('Edit Profile');

        cy.get('input[name="first_name"]')
          .clear()
          .type('Jane');
        cy.get('input[name="last_name"]')
          .clear()
          .type('Dough');
        cy.get('input[name="email"]')
          .clear()
          .type('jane@dough.com');
        cy.get('input[name="phone"]')
          .clear()
          .type('5551234567');
        cy.contains('Save').click();

        cy.contains('Successfully updated client');
        cy.contains('Jane Dough');

        cy.contains('Edit').click();
        cy.contains('Edit Profile');

        cy.get('input[name="first_name"]')
          .clear()
          .type('John');
        cy.get('input[name="last_name"]')
          .clear()
          .type('Doe');
        cy.get('input[name="email"]')
          .clear()
          .type('client@example.com');
        cy.get('input[name="phone"]')
          .clear()
          .type('1234567890');
        cy.contains('Save').click();

        cy.contains('Successfully updated client');
        cy.contains('John Doe');
      });
    });
  });
});
