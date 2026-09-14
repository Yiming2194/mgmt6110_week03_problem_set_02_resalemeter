# assessment.md - ResaleMeter
**Student Name:** Lee Yi Ming · **Course:** MGMT 6110 · **Problem Set 2**

## Front end criteria
---
1.**Purpose:** A first-time user opens ResaleMeter and can roughly tell the App can be used to check historical HDB resale price trends.
2.**Self-explanatory:** The user is able to see the quarterly HDB resale price trends for the selected town and flat type from 2017 to present without requiring human intervention or additional instruction.   
3.**Mobile-friendly:** The user can open the App on mobile phone and the screens stay within the width; no part of the screens is hidden from them unknowingly or requiring them to scroll left-right.  
4.**Product claim support:** The user is able to see that live data is being called from legitimate source data.gov.sg when they make the selections of town and flat type.  

---

## Back end criteria
---
1. **Handling missing values:** When no values are available for the selected town and flat type (e.g., Tampines, 1-Room), the App say so and does not present misleading or self-invented values to the user.  
2. **Data refresh:** The backend retrieves and refresh the data every time when the user make selection of town and flat type.  
3. **Protected credentials:** The API key or any other secrets are not exposed in the front-end and repository and are protected from unauthorized access.  
5. **Response Time:** The backend is relatively responsive to the frontend request, but took 1-2 seconds longer whether the number of selected transactions increase. 

---
