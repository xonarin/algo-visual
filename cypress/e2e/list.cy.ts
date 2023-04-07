import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { 
    baseUrl, 
    elementStatesColors, 
    circle, 
    circleSmall,
    listTextInput, 
    listIndexInput,
    listAddHead,
    listAddTail,
    listAddIndex,
    listRemoveHead,
    listRemoveIndex,
    listRemoveTail
} from '../constants/constants';

describe('Тестирование списка', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/list`);
    })

    it('Проверка на пустоту и дисаблед', () => {
        cy.get(listTextInput).clear();
        cy.get(listAddHead).should('be.disabled');
        cy.get(listAddTail).should('be.disabled');
        cy.get(listAddIndex).should('be.disabled');

        cy.get(listIndexInput).clear();
        cy.get(listAddIndex).should('be.disabled');
        cy.get(listRemoveIndex).should('be.disabled');
    })

    it('Тест на отрисовку дефолтного списка', () => {
        cy.get(circle).eq(0).contains('1');
        cy.get(circle).eq(0).parent().contains('head');

        cy.get(circle).eq(1).contains('2');
        cy.get(circle).eq(2).contains('3');

        cy.get(circle).eq(3).contains('4');
        cy.get(circle).eq(3).parent().contains('tail');
    })

    it('Тест на добавления элемента в head.', () => {
        cy.get(listTextInput).type('55').should('have.value', '55');
        cy.get(circle).should('have.length', 4);
        cy.get(listAddHead).click();

        cy.get(circle).eq(0).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('55');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 5);
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.modified).contains('55');
        cy.get(circle).eq(0).parent().contains('head');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('55');
    })

    it('Тест на добавления элемента в tail.', () => {
        cy.get(listTextInput).type('66').should('have.value', '66');
        cy.get(circle).should('have.length', 4);
        cy.get(listAddTail).click();


        cy.get(circle).eq(3).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('66');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 5);
        cy.get(circle).eq(4).should('have.css', 'border-color', elementStatesColors.modified).contains('66');
        cy.get(circle).eq(4).parent().contains('tail');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(4).should('have.css', 'border-color', elementStatesColors.default).contains('66');
    })

    it('Тест на добавления элемента по индексу.', () => {
        cy.get(listTextInput).type('77').should('have.value', '77');
        cy.get(listIndexInput).type('2').should('have.value', '2');
        cy.get(circle).should('have.length', 4);
        cy.get(listAddIndex).click();


        cy.get(circle).eq(0).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('77');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(1).parent().find(circleSmall);
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(2).parent().find(circleSmall);
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 5);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.modified).contains('77');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default);
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.default).contains('77');
    })

    it('Тест на удаления элемента из head.', () => {
        cy.get(circle).should('have.length', 4);
        cy.get(listRemoveHead).click();

        cy.get(circle).eq(0).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('1');
        cy.get(circle).eq(0).children('p').first().should('not.have.value');
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 3);
        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('2');
        cy.get(circle).eq(0).parent().contains('head');
    })

    it('Тест на удаления элемента из tail.', () => {
        cy.get(circle).should('have.length', 4);
        cy.get(listRemoveTail).click();


        cy.get(circle).eq(3).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('4');
        cy.get(circle).eq(3).children('p').first().should('not.have.value');
        cy.get(circle).eq(3).should('have.css', 'border-color', elementStatesColors.changing);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 3);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.default).contains('3');
        cy.get(circle).eq(2).parent().contains('tail');
    })

    it('Тест на удаления элемента по индексу.', () => {
        cy.get(listIndexInput).type('2').should('have.value', '2');
        cy.get(circle).should('have.length', 4);
        cy.get(listRemoveIndex).click();


        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.changing);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.changing);

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(2).parent().find(circleSmall);
        cy.get(circleSmall).should('have.css', 'border-color', elementStatesColors.changing).contains('3');
        cy.get(circle).eq(2).children('p').first().should('not.have.value');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 3);
        cy.get(circle).eq(2).should('have.css', 'border-color', elementStatesColors.default).contains('4');
    })
})