import { baseUrl } from "../constants/constants";

describe('Тестирование routes', () => {
    beforeEach(() => {
        cy.visit(baseUrl);
    })

    it('Главная', () => {
        cy.get('h1').contains('МБОУ АЛГОСОШ');
    })

    it('Тест страницы строка', () => {
        cy.visit(`${baseUrl}/recursion`);
        cy.get('h3').contains('Строка');
    })

    it('Тест страницы Fibonacci', () => {
        cy.visit(`${baseUrl}/fibonacci`);
        cy.get('h3').contains('Последовательность Фибоначчи');
    })
    
    it('Тест страницы Сортировка', () => {
        cy.visit(`${baseUrl}/sorting`);
        cy.get('h3').contains('Сортировка массива');
    })
    
    it('Тест страницы Стек', () => {
        cy.visit(`${baseUrl}/stack`);
        cy.get('h3').contains('Стек');
    })
    
    it('Тест страницы Очередь', () => {
        cy.visit(`${baseUrl}/queue`);
        cy.get('h3').contains('Очередь');
    })
    
    it('Тест страницы Связный список', () => {
        cy.visit(`${baseUrl}/list`);
        cy.get('h3').contains('Связный список');
    })
})