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

        cy.contains('button', 'Enviar').click()

        cy.get('.success')
            .should('be.visible')
            //.should('be.equal','Mensagem enviada com sucesso.')
        
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('da Silva')        
        cy.get('#email').type('Fulanogmail.com')
        cy.get('#open-text-area').type('Teste se apresenta mensagem de erro', { delay : 0})

        cy.contains('button', 'Enviar').click()

        cy.get('.error')
            .should('be.visible')
    })

    it('valida se campo telefone fica vazio ao submeter um valor inválido no formulário ', function(){
        cy.get('#phone')
            .type('ahbahdbw')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('da Silva')        
        cy.get('#email').type('Fulano@gmail.com')
        cy.get('#open-text-area').type('Qual é o sentida da vida?', { delay : 0})
        cy.get('#phone-checkbox').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong')
            .should('be.visible')
            .should('have.text', 'Valide os campos obrigatórios!')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Fulano')
            .should('have.value', 'Fulano')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('da Silva')   
            .should('have.value', 'da Silva')
            .clear()
            .should('have.value', '')

        cy.get('#email')
            .type('Fulano@gmail.com')
            .should('have.value', 'Fulano@gmail.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('999999999')
            .should('have.value', '999999999')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong')
            .should('be.visible')
            .should('have.text', 'Valide os campos obrigatórios!')
    })
    it ('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    //inicio sessão 4

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    it.only('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')

    })
})