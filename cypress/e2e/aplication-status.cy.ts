import { baseUrl } from "../constants/constants";

///Этот просто коммит

describe('service is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit(baseUrl);
  });
}); 