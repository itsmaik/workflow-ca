describe('User Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('does not allow the user to log in with invalid credentials and shows an error message', () => {
    // Click the button to navigate to the login form within the modal, using force
    cy.get('button[data-auth="login"]').first().click({ force: true });

    // Fill in the login form fields with invalid credentials
    cy.get('#loginModal input[name="email"]')
      .first()
      .type('wrong@example.com', { force: true });
    cy.get('#loginModal input[name="password"]')
      .first()
      .type('wrongpassword', { force: true });

    // Click the login button to submit the form
    cy.get('#loginModal button[type="submit"]')
      .contains('Login')
      .click({ force: true });

    // Check for the presence of an error message
    cy.get('#loginModal .error-message')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
