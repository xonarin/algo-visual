import { baseUrl } from "../constants/constants";

describe('service is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit(baseUrl);
  });
}); 