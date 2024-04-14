describe('User Login and Logout Flow', () => {
  beforeEach(() => {
    // Visit the main page where the login modal is triggered
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('allows the user to log in with valid credentials through the modal and shows logout button', () => {
    // Click the login button to open the modal
    cy.get('button[data-auth="login"]').click();

    // Fill in the login form fields and submit
    cy.get('input[name="email"]').type('smartuser@noroff.no');
    cy.get('input[name="password"]').type('12345678');
    cy.get('button[type="submit"]').click();

    // Verify successful login by checking for the logout button
    // Ensure that the logout button is visible and has the correct attributes
    cy.get('button[data-auth="logout"]')
      .should('be.visible')
      .and('have.class', 'btn btn-outline-warning me-2')
      .and('contain', 'Logout');

    // Click the logout button to ensure it properly logs the user out
    // Checks that the login button reappears or the user is redirected to the login page
    cy.get('button[data-auth="logout"]').click();
    cy.get('button[data-auth="login"]').should('be.visible');
  });
});
