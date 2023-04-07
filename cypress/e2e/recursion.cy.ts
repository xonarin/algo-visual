import { baseUrl, circle, elementStatesColors } from '../constants/constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Тестирование routes', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/recursion`);
    })

    it('Проверка на пустоту и дисаблед', () => {
        cy.get('input').clear();
        cy.get('button').should('be.disabled');
    })

    it('Проверка на разворот и изменение стилей анимации', () => {
        cy.get('input').type('123');
        cy.contains('Развернуть').click();
        
        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('3');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.changing).contains('1');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('3');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('1');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('3');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.modified).contains('2');
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('1');
        
    })

})