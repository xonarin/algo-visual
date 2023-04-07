import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { baseUrl, input, buttonAdd, elementStatesColors, circle, buttonClear, buttonRemove } from '../constants/constants';

describe('Тестирование очереди', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/queue`);
    })

    it('Проверка на пустоту и дисаблед', () => {
        cy.get(input).clear();
        cy.get(buttonAdd).should('be.disabled');
    })


    it('Добавление в очередь', () => {
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('1');
        cy.get(circle).eq(0).parent().contains('head');
        cy.get(circle).eq(0).parent().contains('tail');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');
        cy.get(circle).eq(1).parent().contains('tail');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
    })

    it('Удаление из очереди', () => {
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(buttonRemove).click();
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default);
        cy.get(circle).eq(0).children('p').first().should('not.have.value');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
        cy.get(circle).eq(1).parent().contains('head');
        cy.get(circle).eq(1).parent().contains('tail');

        cy.get(buttonRemove).click();
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(1).children('p').first().should('not.have.value');
    })


    it('Сброс всей очереди', () => {
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(input).type('3').should('have.value', '3');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(buttonClear).click();

        cy.get(circle).eq(0).children('p').first().should('not.have.value');
        cy.get(circle).eq(1).children('p').first().should('not.have.value');
    })

})
