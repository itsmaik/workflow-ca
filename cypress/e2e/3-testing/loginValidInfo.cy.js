describe('User Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('allows the user to log in with valid credentials and shows the logout button', () => {
    // Click the button to navigate to the login form within the modal, using force
    cy.get('button[data-auth="login"]').first().click({ force: true });

    // Fill in the login form fields
    cy.get('#loginModal input[name="email"]')
      .first()
      .type('smartuser@noroff.no', { force: true });
    cy.get('#loginModal input[name="password"]')
      .first()
      .type('12345678', { force: true });

    // Click the login button to submit the form, use force if necessary
    cy.get('#loginModal button[type="submit"]')
      .contains('Login')
      .click({ force: true });

    // Verify successful login by checking for the logout button
    cy.get('button[data-auth="logout"]')
      .should('be.visible')
      .and('contain', 'Logout');
  });
});
