beforeEach(() => {
  cy.visit("http://localhost:1234");
 });
 
 
//  describe('template spec', () => {
// it('passes', () => {})
//  })
 
describe('checks that html-elements existst', () => {
  it('should contain an input field', () => {
   cy.get("input#searchText").should("exist");
  })
  
  it('should be able to write in input', () => {
   cy.get("input#searchText").type("Harry Potter").should("have.value", "Harry Potter");
  })
  
  
  it('should have a search-button', () => {
   cy.get("button#search").should("exist");
  })
})

describe('testing against real API', () => {
   it('should display error message when searchfield is empty and button is clicked', () => {
    cy.get("button").contains("Sök").click()
    cy.get("p:first").should("contain", "Inga sökresultat att visa");
   })
   
   
   it('should find movie heading when button is clicked', () => {
    cy.get("input#searchText").type("Harry Potter").should("have.value", "Harry Potter");
    cy.get("button").contains("Sök").click()
    cy.get("h3:first").contains("Harry Potter").should("exist");
   })
 })

describe('check that mock-data works', () => {
  it("should request with correct mocked url", () => {
    cy.intercept("GET", "http://omdbapi.com/*", 
    { fixture: "movie"}).as("moviesCall");
    cy.get("input").type("hello").should("have.value", "hello");
    cy.get("button").contains("Sök").click();
    cy.wait("@moviesCall").its("request.url").should("contain", "hello");
  });

  it('should create resource correctly', () => {
    cy.intercept("GET", "http://omdbapi.com/*", 
    { fixture: "movie"}).as("moviesCall");
    cy.get("input#searchText").type("Matrix").should("have.value", "Matrix");
    cy.get("button").contains("Sök").click();
    cy.get("h3:first").should("contain", "Harry Potter")
  })


  
})

describe('checks that correct html is created, with mock data', () => {
  it('should find movie image when button is clicked', () => {
   cy.intercept("GET", "http://omdbapi.com/*", 
   { fixture: "movie" });
   cy.get("input#searchText").type("Harry Potter").should("have.value", "Harry Potter");
   cy.get("button").contains("Sök").click()
   cy.get("img:first").should("exist");
  })
 
 
  it('should find movie heading when enter is pushed', () => {
   cy.intercept("GET", "http://omdbapi.com/*", 
   { fixture: "movie" });
   cy.get("input#searchText").type("Harry Potter{enter}").should("have.value", "Harry Potter");
   cy.get("h3:first").contains("Harry Potter").should("exist");
  })
 
  it('should find movie image when enter is pushed', () => {
   cy.intercept("GET", "http://omdbapi.com/*", 
   { fixture: "movie" });
   cy.get("input#searchText").type("Harry Potter{enter}").should("have.value", "Harry Potter");
   cy.get("img:first").should("exist");
  })
 
  it('should display error message when searchfield is only nonsense and enter is pushed', () => {
   cy.intercept("GET", "http://omdbapi.com/*", 
   { fixture: "error"}).as("errorCall");
   cy.get("input#searchText").type(",khjgflsdkjfgh{enter}").should("have.value", ",khjgflsdkjfgh");
   cy.get("p:first").should("contain", "Inga sökresultat att visa");
  })

})
