const { API_URL } = Cypress.env();

let superAdminId = null;
let request = null;
let requestWithFail = null;

describe('Authorization', () => {
  let orgId1, orgId2;
  let adminId1,
    adminId2,
    clientId1,
    clientId2,
    coachId1,
    coachId2,
    coachId3,
    clientId3; // users
  let templateTaskId,
    taskId1,
    taskId2,
    taskId3,
    mediaId1,
    mediaId2,
    mediaId3,
    messageId1,
    messageId2,
    messageId3;

  before(() => {
    cy.request({
      method: 'POST',
      url: `${API_URL}/users`,
      body: {
        first_name: 'Superadmin',
        last_name: 'Superadmin last name',
        email: 'superadmin@example.com',
        org_id: 1,
        color: 'red',
        goals: [],
        status: 'AWAITING_HELP',
        type: 'Superadmin',
        updated: new Date(),
      },
      headers: { 'X-UserId': 1 },
    }).then(resp => {
      superAdminId = resp.body.id;

      // define request helper function with Superadmin privs.
      request = (method, path, body, headers) => {
        return cy.request({
          method,
          url: `${API_URL}${path}`,
          body,
          headers: headers || { 'X-UserId': superAdminId },
          failOnStatusCode: false, // we're going to check 403s
        });
      };

      // request helper function that *does* fail on bad status codes
      requestWithFail = (method, path, body, headers) => {
        return cy.request({
          method,
          url: `${API_URL}${path}`,
          body,
          headers: headers || { 'X-UserId': superAdminId },
          failOnStatusCode: true,
        });
      };

      //////////////////////////////////////////////////////////////////////////
      // Global

      requestWithFail('POST', '/tasks', {
        title: 'TEMPLATETASK1',
        category: 'Global',
        status: 'ACTIVE',
        date_created: new Date(),
      }).then(resp => {
        templateTaskId = resp.body.id;
      });

      //////////////////////////////////////////////////////////////////////////
      // Org 1
      requestWithFail('POST', '/orgs', {
        name: 'Org1 name',
        sms_number: '555-5555',
      }).then(resp => {
        orgId1 = resp.body.id;

        // Admin 1
        requestWithFail('POST', '/users', {
          first_name: 'Admin',
          last_name: 'Org1',
          email: 'admin1@example.com',
          org_id: orgId1,
          color: 'green',
          goals: [],
          status: 'AWAITING_HELP',
          type: 'Admin',
          updated: new Date(),
        }).then(resp => {
          adminId1 = resp.body.id;
        }); // admin 1

        // Coach 1
        requestWithFail('POST', '/users', {
          first_name: 'Coach',
          last_name: 'Org1',
          email: 'coach1@example.com',
          org_id: orgId1,
          color: 'green',
          goals: [],
          status: 'AWAITING_HELP',
          type: 'Coach',
          updated: new Date(),
        }).then(resp => {
          coachId1 = resp.body.id;

          // Client 1
          requestWithFail('POST', '/users', {
            first_name: 'Client',
            last_name: 'Org1',
            email: 'client1@example.com',
            org_id: orgId1,
            coach_id: coachId1,
            color: 'green',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
            updated: new Date(),
          }).then(resp => {
            clientId1 = resp.body.id;

            requestWithFail('POST', '/tasks', {
              title: 'TASK1',
              category: 'Org1',
              status: 'ACTIVE',
              created_by: orgId1,
              user_id: clientId1,
              date_created: new Date(),
            }).then(resp => {
              taskId1 = resp.body.id;

              requestWithFail('POST', '/media', {
                task_id: taskId1,
                title: 'Media1',
                category: 'Org1',
                published_by: orgId1,
                type: 'TASK_CONTENT',
              }).then(resp => {
                mediaId1 = resp.body.id;

                requestWithFail('POST', '/messages', {
                  text: 'Message1',
                  to_user: clientId1,
                  from_user: coachId1,
                  timestamp: new Date(),
                  responses: {},
                }).then(resp => {
                  messageId1 = resp.body.id;
                }); // message 1
              }); // media 1
            }); // task 1
          }); // client 1
        }); // coach 1

        // Coach 3
        requestWithFail('POST', '/users', {
          first_name: 'Coach',
          last_name: 'Org1',
          email: 'coach1@example.com',
          org_id: orgId1,
          color: 'green',
          goals: [],
          status: 'AWAITING_HELP',
          type: 'Coach',
          updated: new Date(),
        }).then(resp => {
          coachId3 = resp.body.id;

          // Client 3
          requestWithFail('POST', '/users', {
            first_name: 'Client',
            last_name: 'Org1',
            email: 'client1@example.com',
            org_id: orgId1,
            coach_id: coachId3,
            color: 'green',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
            updated: new Date(),
          }).then(resp => {
            clientId3 = resp.body.id;

            requestWithFail('POST', '/tasks', {
              title: 'TASK1',
              category: 'Org1',
              status: 'ACTIVE',
              created_by: orgId1,
              user_id: clientId3,
              date_created: new Date(),
            }).then(resp => {
              taskId3 = resp.body.id;

              requestWithFail('POST', '/media', {
                task_id: taskId3,
                title: 'Media1',
                category: 'Org1',
                published_by: orgId1,
                type: 'TASK_CONTENT',
              }).then(resp => {
                mediaId3 = resp.body.id;

                requestWithFail('POST', '/messages', {
                  text: 'Message1',
                  to_user: clientId3,
                  from_user: coachId3,
                  timestamp: new Date(),
                  responses: {},
                }).then(resp => {
                  messageId3 = resp.body.id;
                }); // message 3
              }); // media 3
            }); // task 3
          }); // client 3
        }); // coach 3
      }); // org 1

      //////////////////////////////////////////////////////////////////////////
      // Org 2
      requestWithFail('POST', '/orgs', {
        name: 'Org2 name',
        sms_number: '555-5555',
      }).then(resp => {
        orgId2 = resp.body.id;

        // Admin 2
        requestWithFail('POST', '/users', {
          first_name: 'Admin',
          last_name: 'Org2',
          email: 'admin2@example.com',
          org_id: orgId2,
          color: 'green',
          goals: [],
          status: 'AWAITING_HELP',
          type: 'Admin',
          updated: new Date(),
        }).then(resp => {
          adminId2 = resp.body.id;
        });

        // Coach 2
        requestWithFail('POST', '/users', {
          first_name: 'Coach',
          last_name: 'Org2',
          email: 'coach2@example.com',
          org_id: orgId2,
          color: 'red',
          goals: [],
          status: 'AWAITING_HELP',
          type: 'Coach',
          updated: new Date(),
        }).then(resp => {
          coachId2 = resp.body.id;

          // Client 2
          requestWithFail('POST', '/users', {
            first_name: 'Client',
            last_name: 'Org2',
            email: 'client2@example.com',
            org_id: orgId2,
            coach_id: coachId2,
            color: 'green',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
            updated: new Date(),
          }).then(resp => {
            clientId2 = resp.body.id;

            requestWithFail('POST', '/tasks', {
              title: 'TASK',
              category: 'Org1',
              status: 'ACTIVE',
              created_by: orgId2,
              user_id: clientId2,
              date_created: new Date(),
            }).then(resp => {
              taskId2 = resp.body.id;

              requestWithFail('POST', '/media', {
                task_id: taskId2,
                title: 'Media1',
                category: 'Org1',
                published_by: orgId2,
                type: 'TASK_CONTENT',
              }).then(resp => {
                mediaId2 = resp.body.id;
                requestWithFail('POST', '/messages', {
                  text: 'Message2',
                  to_user: clientId2,
                  from_user: coachId2,
                  timestamp: new Date(),
                  responses: {},
                }).then(resp => {
                  messageId2 = resp.body.id;
                }); // message 2
              }); // media 2
            }); // task 2
          }); // client 2
        }); // coach 2
      }); // org 2
    }); // End Superadmin block
  }); // End before()

  after(() => {
    requestWithFail('DELETE', `/messages/${messageId1}`);
    requestWithFail('DELETE', `/messages/${messageId2}`);
    requestWithFail('DELETE', `/messages/${messageId3}`);
    requestWithFail('DELETE', `/media/${mediaId1}`);
    requestWithFail('DELETE', `/media/${mediaId2}`);
    requestWithFail('DELETE', `/media/${mediaId3}`);
    requestWithFail('DELETE', `/tasks/${templateTaskId}`);
    requestWithFail('DELETE', `/tasks/${taskId1}`);
    requestWithFail('DELETE', `/tasks/${taskId2}`);
    requestWithFail('DELETE', `/tasks/${taskId3}`);
    requestWithFail('DELETE', `/users/${clientId1}`);
    requestWithFail('DELETE', `/users/${clientId2}`);
    requestWithFail('DELETE', `/users/${clientId3}`);
    requestWithFail('DELETE', `/users/${coachId1}`);
    requestWithFail('DELETE', `/users/${coachId2}`);
    requestWithFail('DELETE', `/users/${coachId3}`);
    requestWithFail('DELETE', `/users/${adminId1}`);
    requestWithFail('DELETE', `/users/${adminId2}`);
    requestWithFail('DELETE', `/orgs/${orgId1}`);
    requestWithFail('DELETE', `/orgs/${orgId2}`);
    requestWithFail('DELETE', `/users/${superAdminId}`);
  });

  it('All resources created', () => {
    requestWithFail('GET', `/orgs/${orgId1}`);
    requestWithFail('GET', `/orgs/${orgId2}`);
    requestWithFail('GET', `/users/${superAdminId}`);
    requestWithFail('GET', `/users/${adminId1}`);
    requestWithFail('GET', `/users/${adminId2}`);
    requestWithFail('GET', `/users/${coachId1}`);
    requestWithFail('GET', `/users/${coachId2}`);
    requestWithFail('GET', `/users/${coachId3}`);
    requestWithFail('GET', `/users/${clientId1}`);
    requestWithFail('GET', `/users/${clientId2}`);
    requestWithFail('GET', `/users/${clientId3}`);
    requestWithFail('GET', `/tasks/${templateTaskId}`);
    requestWithFail('GET', `/tasks/${taskId1}`);
    requestWithFail('GET', `/tasks/${taskId2}`);
    requestWithFail('GET', `/tasks/${taskId3}`);
    requestWithFail('GET', `/messages/${messageId1}`);
    requestWithFail('GET', `/messages/${messageId2}`);
    requestWithFail('GET', `/messages/${messageId3}`);
  });

  describe('Superadmin capabilities', () => {
    describe('/postgraphile/graphql', () => {
      it('Superadmin can access GraphQL', () => {
        request(
          'POST',
          `/postgraphile/graphql`,
          {
            query: '{userById(id:1) {id}}',
            variables: null,
            operationName: null,
          },
          {
            'X-UserId': superAdminId,
          },
        ).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });
    });
  });

  describe('Admin capabilities', () => {
    describe('/postgraphile/graphql', () => {
      it('Admin cannot access GraphQL', () => {
        request(
          'POST',
          `/postgraphile/graphql`,
          {
            query: '{userById(id:1) {id}}',
            variables: null,
            operationName: null,
          },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/clients', () => {
      it('Admin 1 views clients in own org', () => {
        request('GET', `/clients`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(2);
          expect(resp.body.filter(c => c.id === clientId1).length).to.equal(1);
          expect(resp.body.filter(c => c.id === clientId3).length).to.equal(1);
        });
      });

      it('Admin 1 creates client in own org', () => {
        request(
          'POST',
          `/clients`,
          {
            first_name: 'Client',
            last_name: 'Org1',
            email: 'client1@example.com',
            org_id: orgId1,
            coach_id: coachId1,
            color: 'green',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
            updated: new Date(),
          },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(201);
          requestWithFail('DELETE', `/users/${resp.body.id}`);
        });
      });

      it('Admin 1 creates client in other org', () => {
        request(
          'POST',
          `/clients`,
          {
            first_name: 'Client',
            last_name: 'Org1',
            email: 'client1@example.com',
            org_id: orgId2,
            coach_id: coachId1,
            color: 'green',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
            updated: new Date(),
          },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 views own client', () => {
        request('GET', `/clients/${clientId1}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(clientId1);
        });
      });

      it('Admin 2 views other org client (forbidden)', () => {
        request('GET', `/clients/${clientId1}`, null, {
          'X-UserId': adminId2,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 updates own client', () => {
        request(
          'PUT',
          `/clients/${clientId1}`,
          { first_name: 'Client1' },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(clientId1);
        });
      });

      it('Admin 1 updates other org client', () => {
        request(
          'PUT',
          `/clients/${clientId2}`,
          { first_name: 'Forbidden' },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 deletes client in own org', () => {
        request(
          'POST',
          `/clients`,
          {
            first_name: 'Client',
            last_name: 'Org1',
            email: 'client1@example.com',
            org_id: orgId1,
            coach_id: coachId1,
            color: 'green',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
            updated: new Date(),
          },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          request('DELETE', `/clients/${resp.body.id}`, null, {
            'X-UserId': adminId1,
          }).then(resp => {
            expect(resp.status).to.equal(200);
          });
        });
      });

      it('Admin 1 deletes client in other org', () => {
        request('DELETE', `/clients/${clientId2}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 views tasks for client in own org', () => {
        request('GET', `/clients/${clientId1}/tasks`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Admin 1 views tasks for client in other org', () => {
        request('GET', `/clients/${clientId2}/tasks`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 views messages for client in own org', () => {
        request('GET', `/clients/${clientId1}/messages`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Admin 1 views messages for client in other org', () => {
        request('GET', `/clients/${clientId2}/messages`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 views requests for client in own org', () => {
        request('GET', `/clients/${clientId1}/requests`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Admin 1 views requests for client in other org', () => {
        request('GET', `/clients/${clientId2}/requests`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 views viewed media for client in own org', () => {
        request('GET', `/clients/${clientId1}/viewed_media`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Admin 1 views viewed media for client in other org', () => {
        request('GET', `/clients/${clientId2}/viewed_media`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/coaches', () => {
      it('Admin 1 views all coaches', () => {
        request('GET', `/coaches`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(2);
          expect(resp.body.filter(c => c.id === coachId1).length).to.equal(1);
          expect(resp.body.filter(c => c.id === coachId3).length).to.equal(1);
        });
      });

      it('Admin 1 creates coach in own org', () => {
        request(
          'POST',
          `/coaches`,
          {
            first_name: 'Coach',
            last_name: 'Org1',
            email: 'coach1@example.com',
            org_id: orgId1,
            color: 'red',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Coach',
            updated: new Date(),
          },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(201);
          requestWithFail('DELETE', `/users/${resp.body.id}`);
        });
      });

      it('Admin 1 creates coach in other org', () => {
        request(
          'POST',
          `/coaches`,
          {
            first_name: 'Coach',
            last_name: 'Org1',
            email: 'coach1@example.com',
            org_id: orgId2,
            color: 'red',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Coach',
            updated: new Date(),
          },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 views coach in same org', () => {
        request('GET', `/coaches/${coachId1}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(coachId1);
        });
      });

      it('Admin 1 views coach in other org', () => {
        request('GET', `/coaches/${coachId2}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 updates coach in same org (unimplemented)', () => {
        request(
          'PUT',
          `/coaches/${coachId1}`,
          { name: 'Coach1' },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });

      it('Admin 1 updates coach in other org (unimplemented)', () => {
        request(
          'PUT',
          `/coaches/${coachId2}`,
          { name: 'Forbidden' },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });

      it('Admin 1 deletes coach in same org ', () => {
        request(
          'POST',
          `/coaches`,
          {
            first_name: 'Coach',
            last_name: 'Org1',
            email: 'coach1@example.com',
            org_id: orgId1,
            color: 'red',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Coach',
            updated: new Date(),
          },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          request('DELETE', `/coaches/${resp.body.id}`, null, {
            'X-UserId': adminId1,
          }).then(resp => {
            expect(resp.status).to.equal(200);
          });
        });
      });

      it('Admin 1 deletes coach in other org', () => {
        request('DELETE', `/coaches/${coachId2}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/orgs', () => {
      it('Admin 1 views all orgs', () => {
        request('GET', `/orgs`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(1);
          expect(resp.body[0].id).to.equal(orgId1);
        });
      });

      it('Admin 1 creates an org', () => {
        request(
          'POST',
          `/orgs`,
          { name: 'forbidden' },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 gets own org', () => {
        request('GET', `/orgs/${orgId1}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(orgId1);
        });
      });

      it('Admin 1 gets other org', () => {
        request('GET', `/orgs/${orgId2}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Admin 1 deletes own org', () => {
        request('DELETE', `/orgs/${orgId1}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 deletes other org', () => {
        request('DELETE', `/orgs/${orgId2}`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Admin 1 updates own org (unimplemented)', () => {
        request(
          'PUT',
          `/orgs/${orgId1}`,
          { name: 'forbidden' },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });

      it('Admin 1 updates other org (unimplemented)', () => {
        request(
          'PUT',
          `/orgs/${orgId2}`,
          { name: 'forbidden' },
          {
            'X-UserId': adminId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });
    });

    describe('/tasks', () => {
      it('Admin 1 views all tasks', () => {
        request('GET', `/tasks`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(3);
          expect(
            resp.body.filter(t => t.id === templateTaskId).length,
          ).to.equal(1);
          expect(resp.body.filter(t => t.id === taskId1).length).to.equal(1);
          expect(resp.body.filter(t => t.id === taskId3).length).to.equal(1);
        });
      });
    });
  }); // Admin capabilities

  describe('Coach capabilities', () => {
    describe('/postgraphile/graphql', () => {
      it('Coach cannot access GraphQL', () => {
        request(
          'POST',
          `/postgraphile/graphql`,
          {
            query: '{userById(id:1) {id}}',
            variables: null,
            operationName: null,
          },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/clients', () => {
      it('Coach 1 views all clients', () => {
        request('GET', `/clients`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(1);
          expect(resp.body[0].id).to.equal(clientId1);
        });
      });

      it('Coach 1 views own client', () => {
        request('GET', `/clients/${clientId1}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(clientId1);
        });
      });

      it('Coach 1 views other coach client in same org', () => {
        request('Get', `/clients/${clientId3}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views other coach client (forbidden)', () => {
        request('GET', `/clients/${clientId2}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 lists clients, sees client 1 and not client 2 or 3', () => {
        request('GET', `/clients`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(
            resp.body.filter(client => client.id === clientId1).length,
          ).to.equal(1);
          expect(
            resp.body.filter(client => client.id === clientId2).length,
          ).to.equal(0);
          expect(
            resp.body.filter(client => client.id === clientId3).length,
          ).to.equal(0);
        });
      });

      it('Coach 2 lists clients, sees client 2 and not client 1 or 3', () => {
        request('GET', `/clients`, null, {
          'X-UserId': coachId2,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(
            resp.body.filter(client => client.id === clientId2).length,
          ).to.equal(1);
          expect(
            resp.body.filter(client => client.id === clientId1).length,
          ).to.equal(0);
          expect(
            resp.body.filter(client => client.id === clientId3).length,
          ).to.equal(0);
        });
      });

      it('Coach 1 creates a client for coach 2, but it assigns to org 1 coach 1', () => {
        request(
          'POST',
          `/clients`,
          {
            first_name: 'Client',
            last_name: 'Org2',
            email: 'client2@example.com',
            org_id: orgId2,
            coach_id: coachId2,
            color: 'purple',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
          },
          { 'X-UserId': coachId1 },
        ).then(resp => {
          expect(resp.status).to.equal(201);
          expect(resp.body.org_id).to.equal(orgId1);
          expect(resp.body.coach_id).to.equal(coachId1);
          requestWithFail('DELETE', `/users/${resp.body.id}`);
        });
      });

      it('Coach 2 updates client 1 (forbidden)', () => {
        request(
          'PUT',
          `/clients/${clientId1}`,
          { last_name: 'BARF' },
          { 'X-UserId': coachId2 },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 updates other coach client in same org (forbidden)', () => {
        request(
          'PUT',
          `/clients/${clientId3}`,
          { last_name: 'BARF' },
          { 'X-UserId': coachId1 },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 deletes own client', () => {
        request(
          'POST',
          `/clients`,
          {
            first_name: 'Client',
            last_name: 'Org1',
            email: 'client1@example.com',
            org_id: orgId1,
            coach_id: coachId1,
            color: 'green',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Client',
            updated: new Date(),
          },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          request('DELETE', `/clients/${resp.body.id}`, null, {
            'X-UserId': coachId1,
          }).then(resp => {
            expect(resp.status).to.equal(200);
          });
        });
      });

      it('Coach 1 deletes other coach client in same org', () => {
        request('DELETE', `/clients/${clientId3}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 deletes client in other org', () => {
        request('DELETE', `/clients/${clientId2}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views tasks for own client', () => {
        request('GET', `/clients/${clientId1}/tasks`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Coach 1 views tasks for other coach client in same org', () => {
        request('GET', `/clients/${clientId3}/tasks`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views tasks for client in other org', () => {
        request('GET', `/clients/${clientId2}/tasks`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views messages for own client', () => {
        request('GET', `/clients/${clientId1}/messages`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Coach 1 views messages for other coach client in same org', () => {
        request('GET', `/clients/${clientId3}/messages`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views messages for client in other org', () => {
        request('GET', `/clients/${clientId2}/messages`, null, {
          'X-UserId': adminId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views requests for own client', () => {
        request('GET', `/clients/${clientId1}/requests`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Coach 1 views requests for other coach client in same org', () => {
        request('GET', `/clients/${clientId3}/requests`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views requests for client in other org', () => {
        request('GET', `/clients/${clientId2}/requests`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views viewed media for own client', () => {
        request('GET', `/clients/${clientId1}/viewed_media`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Coach 1 views viewed media for other coach client in same org', () => {
        request('GET', `/clients/${clientId3}/viewed_media`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views viewed media for client in other org', () => {
        request('GET', `/clients/${clientId2}/viewed_media`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/tasks', () => {
      it('Coach 1 views all tasks', () => {
        request('GET', `/tasks`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(2);
          expect(
            resp.body.filter(t => t.id === templateTaskId).length,
          ).to.equal(1);
          expect(resp.body.filter(t => t.id === taskId1).length).to.equal(1);
        });
      });

      it('Coach 1 views own task', () => {
        request('GET', `/tasks/${taskId1}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Coach 1 views coach 2 task (forbidden)', () => {
        request('GET', `/tasks/${taskId2}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/coaches', () => {
      it('Coach 1 views all coaches', () => {
        request('GET', `/coaches`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(1);
          expect(resp.body[0].id).to.equal(coachId1);
        });
      });

      it('Coach 1 creates a coach', () => {
        request(
          'POST',
          `/coaches`,
          {
            first_name: 'Coach',
            last_name: 'Org1',
            email: 'coach1@example.com',
            org_id: orgId1,
            color: 'red',
            goals: [],
            status: 'AWAITING_HELP',
            type: 'Coach',
            updated: new Date(),
          },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views self', () => {
        request('GET', `/coaches/${coachId1}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(coachId1);
        });
      });

      it('Coach 1 views coach in same org', () => {
        request('GET', `/coaches/${coachId3}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 views coach in other org', () => {
        request('GET', `/coaches/${coachId2}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 updates self (unimplemented)', () => {
        request(
          'PUT',
          `/coaches/${coachId1}`,
          { first_name: 'Coach1' },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });

      it('Coach 1 updates coach in same org (unimplemented)', () => {
        request(
          'PUT',
          `/coaches/${coachId3}`,
          { first_name: 'Coach3' },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });

      it('Coach 1 updates coach in other org (unimplemented)', () => {
        request(
          'PUT',
          `/coaches/${coachId2}`,
          { first_name: 'Coach2' },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });

      it('Coach 1 deletes self', () => {
        request('DELETE', `/coaches/${coachId1}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 deletes coach in same org', () => {
        request('DELETE', `/coaches/${coachId3}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 deletes coach in other org', () => {
        request('DELETE', `/coaches/${coachId2}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/orgs', () => {
      it('Coach 1 views all orgs', () => {
        request('GET', `/orgs`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(1);
          expect(resp.body[0].id).to.equal(orgId1);
        });
      });

      it('Coach 1 creates an org', () => {
        request(
          'POST',
          `/orgs`,
          { name: 'forbidden' },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 gets own org', () => {
        request('GET', `/orgs/${orgId1}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(orgId1);
        });
      });

      it('Coach 1 gets other org', () => {
        request('GET', `/orgs/${orgId2}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Coach 1 deletes own org', () => {
        request('DELETE', `/orgs/${orgId1}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 deletes other org', () => {
        request('DELETE', `/orgs/${orgId2}`, null, {
          'X-UserId': coachId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Coach 1 updates own org', () => {
        request(
          'PUT',
          `/orgs/${orgId1}`,
          { name: 'forbidden' },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });

      it('Coach 1 updates other org', () => {
        request(
          'PUT',
          `/orgs/${orgId2}`,
          { name: 'forbidden' },
          {
            'X-UserId': coachId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(404);
        });
      });
    });
  }); // Coach capabilities

  describe('Client capabilities', () => {
    describe('/postgraphile/graphql', () => {
      it('Client cannot access GraphQL', () => {
        request(
          'POST',
          `/postgraphile/graphql`,
          {
            query: '{userById(id:1) {id}}',
            variables: null,
            operationName: null,
          },
          {
            'X-UserId': clientId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/clients', () => {
      it('Client 1 views self', () => {
        request('GET', `/clients/${clientId1}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.id).to.equal(clientId1);
        });
      });

      it('Client 1 views another client (forbidden)', () => {
        request('GET', `/clients/${clientId2}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Client 1 deletes self (forbidden)', () => {
        request('DELETE', `/clients/${clientId1}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Client 1 deletes client 2 (forbidden)', () => {
        request('DELETE', `/clients/${clientId2}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });

      it('Client 1 modifies self', () => {
        request(
          'PUT',
          `/clients/${clientId1}`,
          { last_name: 'MODIFIED' },
          {
            'X-UserId': clientId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.last_name).to.equal('MODIFIED');
        });
      });

      it('Client 1 modifies client 2 (forbidden)', () => {
        request(
          'PUT',
          `/clients/${clientId2}`,
          { last_name: 'MODIFIED' },
          {
            'X-UserId': clientId1,
          },
        ).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/tasks', () => {
      it('Client 1 views all tasks', () => {
        request('GET', `/tasks`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
          expect(resp.body.length).to.equal(1);
          expect(resp.body[0].id).to.equal(taskId1);
        });
      });

      it('Client 1 views own task', () => {
        request('GET', `/tasks/${taskId1}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Client 1 views client 2 task (forbidden)', () => {
        request('GET', `/tasks/${taskId2}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });

    describe('/media', () => {
      it('Client 1 views own media', () => {
        request('GET', `/media/${mediaId1}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(200);
        });
      });

      it('Client 1 views client 2 media (forbidden)', () => {
        request('GET', `/media/${mediaId2}`, null, {
          'X-UserId': clientId1,
        }).then(resp => {
          expect(resp.status).to.equal(403);
        });
      });
    });
  }); // Client capabilities
});
