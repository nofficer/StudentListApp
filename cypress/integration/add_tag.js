

describe('AddTag', () => {
  it('User can add a tag and have it show in the list', () => {
    cy.visit('http://localhost:3000')
    const newTag = 'Hello'
    cy.get(':nth-child(3) > .testScoresCard > .infoHolder > :nth-child(2) > .addTagForm > .addTagInput').type(newTag)
    cy.get(':nth-child(3) > .testScoresCard > .infoHolder > :nth-child(2) > .addTagForm').submit()
    cy.get(':nth-child(1) > .Centered').should('have.text',newTag)
  })
})
