describe('Realizando requisições para a API', () => {

    context('Testes API RESTful', ()=>{

        it('Deve retornar uma lista de posts', () => {
            cy.request('GET', 'http://jsonplaceholder.typicode.com/posts').then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).length.to.be.greaterThan(1)
            })
        })
        it('Deve retornar um único post', ()=>{
            cy.request({
               method: 'GET',
               url: 'http://jsonplaceholder.typicode.com/posts/1'
              }).then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('title');
            })
        })
        it('Deve retornar um erro quando o post for inválido', ()=>{
            cy.request({
                   method: 'GET',
                   url: 'http://jsonplaceholder.typicode.com/posts/0',
                   failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(404);
            })
        })
        it('Deve cadastrar um post ao fazer um POST em /posts', () => {
            cy.request({
                method: 'POST',
                url: 'http://jsonplaceholder.typicode.com/posts',
                body: {
                    userId: 1,
                    id: 1,
                    title: "Teste - sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    body: "Teste - quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
              }).then((response) => {
                expect(response.status).to.equal(201);
                expect(response.body).to.have.property('title');
                expect(response.body).to.not.have.property('password');
            });
        })

        it('Deve alterar todo o post ao fazer um PUT em /posts/1', () => {
            cy.request({
                method: 'PUT',
                url: 'http://jsonplaceholder.typicode.com/posts/1',
                body: {
                    userId: 2,
                    id: 2,
                    title: "Teste 2 - sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    body: "Teste 2 - quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
              }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('title');
                expect(response.body).to.not.have.property('password');
            });
        })
        it('Deve alterar o body do post de ID 1 ao fazer um PATCH em /posts/1', () => {
            cy.request({
                method: 'PATCH',
                url: 'http://jsonplaceholder.typicode.com/posts/1',
                body: {
                    userId: 1,
                    id: 1,
                    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    body: "Teste 2 - quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
              }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.have.property('title');
                expect(response.body).to.not.have.property('password');
            });
        })
        it('Deve deletar um POST com id 1 em /posts/1', () => {
            cy.request({
                method: 'DELETE',
                url: 'http://jsonplaceholder.typicode.com/posts/1',
                body: {
                    userId: 1,
                    id: 1,
                    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    body: "Teste 2 - quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }
              }).then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body).to.not.have.property('title');
                expect(response.body).to.not.have.property('body');
            });
        })
    })
})