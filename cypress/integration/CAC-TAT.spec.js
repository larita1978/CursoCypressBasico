// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

const { expect } = require("chai")

//<reference types="Cypress" />
describe('Central e Atendimento ao Cliente TAT', function() {
    const THREE_SECONDS_IN_MS = 3000

    beforeEach(()=> {
        cy.visit('./src/index.html')
    })

    it('verifica o titulo da aplicação', function(){
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function(){
        cy.clock()

        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('da Silva')        
        cy.get('#email').type('Fulano@gmail.com')
        cy.get('#open-text-area').type('Qual é o sentida da vida?', { delay : 0})

        cy.contains('button', 'Enviar').click()
        cy.get('.success')
            .should('be.visible')
            //.should('be.equal','Mensagem enviada com sucesso.')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success')
            .should('not.be.visible')
        
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.clock()

        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('da Silva')        
        cy.get('#email').type('Fulanogmail.com')
        cy.get('#open-text-area').type('Teste se apresenta mensagem de erro', { delay : 0})

        cy.contains('button', 'Enviar').click()
        cy.get('.error')
            .should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success')
            .should('not.be.visible')
    })

    Cypress._.times(6, function(){
        it('valida se campo telefone fica vazio ao submeter um valor inválido no formulário ', function(){
            cy.get('#phone')
                .type('ahbahdbw')
                .should('have.value', '')
        })
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.clock()

        cy.get('#firstName').type('Fulano')
        cy.get('#lastName').type('da Silva')        
        cy.get('#email').type('Fulano@gmail.com')
        cy.get('#open-text-area').type('Qual é o sentida da vida?', { delay : 0})
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong')
            .should('be.visible')
            .should('have.text', 'Valide os campos obrigatórios!')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error > strong')
        .should('not.be.visible')

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
        cy.clock()

        cy.contains('button', 'Enviar').click()
        cy.get('.error > strong')
            .should('be.visible')
            .should('have.text', 'Valide os campos obrigatórios!')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error > strong')
            .should('not.be.visible')
    })
    it ('envia o formuário com sucesso usando um comando customizado', function(){
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success')
            .should('not.be.visible')
    })

    //inicio sessão 4

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')

    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')

    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')

    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')

    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
            .should('have.length',3)
            .each(function($radio){
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures',function(){
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    it('seleciona um arquivo simulando um drag-and-drop',function(){
        cy.get('#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })
    
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target')
        .click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('valida se mensagem não está mais visivel', function(){
        cy.clock()

        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

    it.only('preenche a area de texto usando o comando invoke', function(){ 
        const longText = Cypress._.repeat('ola mundo',10)
        cy.get('#open-text-area')
        .invoke('val', longText)
        .should('have.value',longText)
    })

    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const {status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it.only('Desafio: Encontre o gato', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text', 'CAT TAT')
        cy.get('#subtitle')
        .invoke('text', 'I love cats!')
    })
})