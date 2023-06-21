Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Fulano')
    cy.get('#lastName').type('da Silva')        
    cy.get('#email').type('Fulano@gmail.com')
    cy.get('#open-text-area').type('Qual é o sentida da vida?', { delay : 0})
    cy.contains('button', 'Enviar').click()
})