import { baseUrl, circle } from '../constants/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Тест Fibonacci', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/fibonacci`);
    })

    it('Проверка инпута на пустоту и кнопки на дисаблед', () => {
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })

    it('Тест алгоритма', () => {
        cy.get('input').type('4').should('have.value', '4');
        cy.get('button').contains('Рассчитать').click();

        cy.get(circle).should('have.length', 1).eq(0).contains('1');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 2).eq(1).contains('1');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 3).eq(2).contains('2');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 4).eq(3).contains('3');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 5).eq(4).contains('5');
    })
})
