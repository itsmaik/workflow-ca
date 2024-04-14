describe('User Authentication Flow', () => {
  beforeEach(() => {
    // Assume the modal is automatically open on page load
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('allows the user to log in with valid credentials and shows the logout button', () => {
    // Click the button to navigate to the login form within the modal
    // Use force: true to click the button even if it's covered by another element
    cy.get('button[data-auth="login"]').first().click({ force: true });

    // Fill in the login form fields
    cy.get('input[name="email"]').type('smartuser@noroff.no');
    cy.get('input[name="password"]').type('12345678');

    // Click the login button to submit the form, also with force if necessary
    cy.get('button[type="submit"]').contains('Login').click({ force: true });

    // Verify successful login by checking for the logout button
    cy.get('button[data-auth="logout"]')
      .should('be.visible')
      .and('contain', 'Logout');
  });
});
