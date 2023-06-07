// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

//<reference types="Cypress" />
describe('Central e Atendimento ao Cliente TAT', function() {
    beforeEach(()=> {
        cy.visit('./src/index.html')
    })

    it('verifica o titulo da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.get('input[id="firstName"]')
            .type('Fulano')

        cy.get('input[id="lastName"]')
            .type('da Silva')
        
        cy.get('input[id="email"]')
            .type('Fulano@gmail.com')
        
        cy.get('textarea[id="open-text-area"]')
            .type('Qual é o sentida da vida?')

        cy.get('button[class="button"]')
            .click()

        cy.get('class="success"')
            .should('be.visible')
            .should('be.equal','Mensagem enviada com sucesso.')
        
    })
})