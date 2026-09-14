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

## Collaboration

**1. Where did the agent make you faster, and by how much?**  
I did not have to sketch the prototype of the desired App by hands, which could take half a day or more in the past to better communicate user requirements to IT department. I leave it to the agent to generate the first prototype and make the changes along the way. I did not have to do any coding as well, the agent did. The time I got back was spent on preparing the master prompt, and drafting the front end and back end criteria while waiting for the agent to work on the prompt.

**2. Where did it cost you time, and whose fault was that?**
I ended up spending most of the time on this assignment on prompting, which was done over several days. As I look through the prompt log now, the end product didn't quite match closely with the goal list I created for front end. I used six prompts just to simplify the front end, which could have been avoided had I firmed up the goal list and tightened the guardrails in Prompt 1.

**3. Did it ever hand you something that looked right and was not?**
I accepted the first front end prototype that was built with mock dataset, thinking the agent will follow goal #3 in prompt 8 (put the real back end behind) by replacing the hard-coded value with live one. I was caught off guard when I see that it replaced only the data for set of town and flat type it generated, which is not the exhaustive list.

**4. What did you have to know in order to supervise it?**

**5. Which decisions did you keep, and should you have kept more or fewer?**

**6. Now scale it up: what does this mean for a team of thirty?**


