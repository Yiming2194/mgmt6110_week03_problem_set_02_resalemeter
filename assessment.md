# assessment.md - ResaleMeter
**Student Name:** Lee Yi Ming · **Course:** MGMT 6110 · **Problem Set 2**

## Front end criteria
---
1.**Purpose:** A first-time user opens the App and is able to tell what the App purpose does it serve right away without second guess.  
2.**Self-explanatory:** The user is able to select the flat type and town and reach the historical HDB resale prices of desired timeframe without requiring human intervention or additional instruction.  
3.**User Control:** The user is able to undo the steps and correct the selection to maintain control over the actions.  
4.**Mobile-friendly:** The screens should work well across devices on the user' laptop and mobile phone so that no part of the screens are hidden from them unknowingly or requiring them to scroll left-right.  
5.**Product claim support:** The user is able to distinguish between a live product supported by legitimate data source and a prototype with invented data so that they know whether a product is ready to use or still being tested or developed.  

---

## Back end criteria
---
1. **Handling missing values:** When no values are available for the selected town and flat type, the product say so and does not present misleading or self-invented values to the user.  
2. **Data refresh:** The backend retrieves and refresh the data in alignment with the upstream data source timely.  
3. **Service health status:** Service status information is available and explain clearly to anyone (user or product owner) whether the product is up, and if not, what is the issue, any action being taken, who are affected and when was it last updated to maintain the service reliability.  
4. **Protected credentials:** The API key or any other secrets are not exposed in the front-end and repository and are protected from unauthorized access.  
5. **Performance:** The backend response reliably to the front-end requests and able to maintain performance when the loads increase.

---
