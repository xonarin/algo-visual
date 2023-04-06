import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { baseUrl, input, buttonAdd, elementStatesColors, circle, buttonClear, buttonRemove } from '../constants/constants';

describe('stack tests', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/stack`);
    })

    it('button disabled', () => {
        cy.get(input).clear();
        cy.get(buttonAdd).should('be.disabled');
    })

    it('add to stack', () => {
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();
        cy.get(circle).should('have.length', 1).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('1');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.get(circle).should('have.length', 2).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.default).contains('2');
    })

    it('delete from stack', () => {
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(buttonRemove).click();
        cy.get(circle).should('have.length', 2).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(circle).eq(1).should('have.css', 'border-color', elementStatesColors.changing).contains('2');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 1).eq(0).should('have.css', 'border-color', elementStatesColors.default).contains('1');
        cy.get(buttonRemove).click();
        cy.get(circle).should('have.length', 1).eq(0).should('have.css', 'border-color', elementStatesColors.changing).contains('1');

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 0);
    })

    it('reset stack', () => {
        cy.get(input).type('1').should('have.value', '1');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(input).type('2').should('have.value', '2');
        cy.get(buttonAdd).click();

        cy.wait(SHORT_DELAY_IN_MS);

        cy.get(circle).should('have.length', 2);
        cy.get(buttonClear).click();
        cy.get(circle).should('have.length', 0);
    })
})