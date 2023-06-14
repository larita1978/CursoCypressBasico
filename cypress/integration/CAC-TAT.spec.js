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
        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('da Silva')        
        cy.get('#email').type('Fulano@gmail.com')
        cy.get('#open-text-area').type('Qual é o sentida da vida?', { delay : 0})

        cy.get('button[type="submit"]').click()

        cy.get('.success')
            .should('be.visible')
            //.should('be.equal','Mensagem enviada com sucesso.')
        
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('da Silva')        
        cy.get('#email').type('Fulanogmail.com')
        cy.get('#open-text-area').type('Teste se apresenta mensagem de erro', { delay : 0})

        cy.get('button[type="submit"]').click()

        cy.get('.error')
            .should('be.visible')
    })
})