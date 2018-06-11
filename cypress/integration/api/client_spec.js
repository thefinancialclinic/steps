describe('Index', () => {
  it('can see the correct links', () => {
    cy.request('GET', 'http://localhost:3001/api/clients');
  });
});
