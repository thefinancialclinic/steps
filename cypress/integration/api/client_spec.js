describe('API endpoints (accessed directly)', () => {
  let clientId, taskId, messageId, mediaId, requestId;

  // expected values
  const taskTitle = 'Title';
  const newTaskCategory = 'New category';
  const clientFirstName = 'Client first name';
  const newClientFirstName = 'New client first name';
  const newClientLastName = 'New client last name';
  const clientGoal = 'added goal';
  const messageText = 'Message text';
  const mediaTitle = 'Media title';
  const requestStatus = 'NEEDS_ASSISTANCE';
  const newRequestStatus = 'RESOLVED';

  before(() => {
    // org and coach aldready created
    cy.request('POST', 'http://localhost:3001/api/clients', {
      first_name: clientFirstName,
      last_name: 'Last',
      email: 'client@example.com',
      coach_id: 1,
      org_id: 1,
      color: 'blue',
      goals: [],
      status: 'AWAITING_HELP',
      fb_id: 'mzuckerberg123',
    }).then(resp => {
      clientId = resp.body.id;

      cy.request('POST', 'http://localhost:3001/api/tasks', {
        title: taskTitle,
        category: 'category',
        user_id: clientId,
        status: 'ACTIVE',
        date_created: new Date(),
      }).then(resp => {
        taskId = resp.body.id;

        cy.request('POST', 'http://localhost:3001/api/requests', {
          status: requestStatus,
          user_id: clientId,
          task_id: taskId,
        }).then(resp => {
          requestId = resp.body.id;

          cy.request('POST', 'http://localhost:3001/api/messages', {
            text: messageText,
            to_user: clientId,
            from_user: 1,
            request_id: requestId,
            timestamp: new Date(),
          }).then(resp => {
            messageId = resp.body.id;

            cy.request('POST', 'http://localhost:3001/api/media', {
              task_id: taskId,
              title: mediaTitle,
              category: 'Media category',
              published_by: 1,
              type: 'TASK_CONTENT',
            }).then(resp => {
              mediaId = resp.body.id;

              cy.request(
                'POST',
                `http://localhost:3001/api/clients/${clientId}/viewed_media/${mediaId}`,
              );
            });
          });
        });
      });
    });
  });

  after(() => {
    cy.request(
      'DELETE',
      `http://localhost:3001/api/clients/${clientId}/viewed_media/${mediaId}`,
    ).then(() =>
      cy
        .request('DELETE', 'http://localhost:3001/api/media/' + mediaId)
        .then(() =>
          cy
            .request(
              'DELETE',
              'http://localhost:3001/api/messages/' + messageId,
            )
            .then(() =>
              cy
                .request(
                  'DELETE',
                  'http://localhost:3001/api/requests/' + requestId,
                )
                .then(() =>
                  cy
                    .request(
                      'DELETE',
                      'http://localhost:3001/api/tasks/' + taskId,
                    )
                    .then(() =>
                      cy.request(
                        'DELETE',
                        'http://localhost:3001/api/clients/' + clientId,
                      ),
                    ),
                ),
            ),
        ),
    );
  });

  it('GET Clients (many, and related entities)', () => {
    cy.request('GET', 'http://localhost:3001/api/clients');
  });

  it('GET Client (single)', () => {
    cy.request('GET', 'http://localhost:3001/api/clients/' + clientId).then(
      response => {
        expect(response.body).to.have.property('first_name', clientFirstName);
      },
    );
  });

  it('PUT Client (update)', () => {
    cy.request('PUT', `http://localhost:3001/api/clients/${clientId}`, {
      first_name: newClientFirstName,
      last_name: 'Last',
      email: 'client@example.com',
      coach_id: 1,
      org_id: 1,
      color: 'blue',
      goals: [clientGoal],
      status: 'AWAITING_HELP',
    }).then(response => {
      expect(response.body).to.have.property('first_name', newClientFirstName);
      expect(response.body.goals[0]).to.equal(clientGoal);
    });
  });

  it('PUT Client (partial update)', () => {
    request('PUT', `http://localhost:3001/api/clients/${clientId}`, {
      last_name: newClientLastName,
    }).then(response => {
      expect(response.body).to.have.property('last_name', newClientLastName);
      expect(response.body).to.have.property('email', 'client@example.com'); // unchanged
    });
  });

  it('GET Task', () => {
    cy.request('GET', `http://localhost:3001/api/tasks/${taskId}`).then(
      response => {
        expect(response.body).to.have.property('title', taskTitle);
        expect(response.body.user_id).to.equal(clientId);
      },
    );
  });

  it('PUT Task (partial update)', () => {
    request('PUT', `http://localhost:3001/api/tasks/${taskId}`, {
      category: newTaskCategory,
    }).then(response => {
      expect(response.body).to.have.property('category', newTaskCategory);
      expect(response.body).to.have.property('status', 'ACTIVE'); // unchanged
    });
  });

  it('GET Client Tasks', () => {
    cy.request(
      'GET',
      `http://localhost:3001/api/clients/${clientId}/tasks`,
    ).then(response => {
      expect(response.body[0]).to.have.property('title', taskTitle);
    });
  });

  it('GET Client Messages', () => {
    cy.request(
      'GET',
      `http://localhost:3001/api/clients/${clientId}/messages`,
    ).then(response => {
      expect(response.body[0]).to.have.property('text', messageText);
    });
  });

  it('GET Client viewed media', () => {
    cy.request(
      'GET',
      `http://localhost:3001/api/clients/${clientId}/viewed_media`,
    ).then(response => {
      expect(response.body[0]).to.have.property('title', mediaTitle);
    });
  });

  it('GET Client Requests', () => {
    cy.request(
      'GET',
      `http://localhost:3001/api/clients/${clientId}/requests`,
    ).then(response => {
      expect(response.body[0]).to.have.property('status', requestStatus);
    });
  });

  it('PUT Request (update)', () => {
    cy.request('PUT', `http://localhost:3001/api/requests/${requestId}`, {
      status: newRequestStatus,
      user_id: clientId,
      task_id: taskId,
    }).then(response => {
      expect(response.body).to.have.property('status', newRequestStatus);
    });
  });
});
