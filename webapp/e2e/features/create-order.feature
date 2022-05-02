Feature: Adding a product to the cart

Scenario: User adds a product to the cart and decide to buy it
  Given A user adds a product
  When He goes to the cart and start procesing the order
  Then Order is created