describe('User Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('allows the user to log in with valid credentials and log out', () => {
    // Step 1: Log in
    cy.get('button[data-auth="login"]').first().click({ force: true });
    cy.get('#loginModal input[name="email"]')
      .first()
      .type('smartuser@noroff.no', { force: true });
    cy.get('#loginModal input[name="password"]')
      .first()
      .type('12345678', { force: true });
    cy.get('#loginModal button[type="submit"]')
      .contains('Login')
      .click({ force: true });
    cy.get('button[data-auth="logout"]')
      .should('be.visible')
      .and('contain', 'Logout');

    // Step 2: Log out
    // After confirming the user is logged in by checking for the logout button, proceed to click it
    cy.get('button[data-auth="logout"]').click();

    // Step 3: Verify logout
    // Verify that the user is logged out by checking for the login button again
    // You may need to adjust the selector if your login button is different when logged out
    cy.get('button[data-auth="login"]')
      .should('be.visible')
      .and('contain', 'Login');

    // If the application redirects to a login page or does some other UI update, check for that
    // For example:
    // cy.url().should('include', '/login'); // If there's a redirection to a login page
    // cy.get('.user-profile').should('not.exist'); // If user profile should disappear
  });
});
