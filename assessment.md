# assessment.md - ResaleMeter
**Student Name:** Lee Yi Ming · **Course:** MGMT 6110 · **Problem Set 2**

## Front end criteria
---
1.**Product purpose:** A first-time user opens ResaleMeter and can tell the App can be used to check historical HDB resale price trends.
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
I did not have to sketch the prototype of the desired App by hands, which could take half a day or more in the past to better communicate user requirements for a web/App development to IT department. I leave it to the agent to generate the first prototype and make the changes along the way. I did not have to do any coding as well, the agent did. The time I got back was spent on preparing the master prompt, and drafting the front end and back end criteria while waiting for the agent to work on the prompt.

**2. Where did it cost you time, and whose fault was that?**
However, I ended up spending most of the time on prompting, which was done over a few days. As I look through the prompt log now, the end product didn't quite match closely with the goal list I created for front end. I used six prompts just to simplify the front end, which could have been avoided had I firmed up the goal list and tightened the guardrails in Prompt 1.

**3. Did it ever hand you something that looked right and was not?**
The agent replaced the mock data for only the set of 8 town and 4 flat type it generated with live data. It did not replace the mock dataset with full dataset from HDB. I initially thought the issue is caused by connection issue to the source where the screen says "unable to establish a connection to data.gov.sg; the upstream service is currently unavailable." But it wouldn't make sense since a fraction of live data was fetched and displayed on the screens.

**4. What did you have to know in order to supervise it?**
I checked the live URL and saw a different message, that's when I realized I had skipped a step in creating environment variable to save the key. The dataset issue remained unresolved, so I asked the agent to debug for me since I was the one who instructed it to create invented data during the front end build. 

**5. Which decisions did you keep, and should you have kept more or fewer?**
- **What the product is for**: I decided the screens should show real data on the historical HDB resale price trend price by town and flat type. 
- **Data source:** I chose data.gov.sg HDB resale transaction data and provided the service name and URL
- **Caching:** I chose one-day caching with s-maxage=86400 and stale-while-revalidate=172800 as it is not crucial to have HDB resale data update live every second
- **Credential:** I specified that the credentials lives only in Vercel environment variable.
I now realise my prompt contained decision that I did not recognized as decisions previously. Specifically, I did not specify the exact sentences for the four cases: the data is loading, the data is empty, the upstream refused, and the upstream is unreachable. The agent therefore decided how the message should appear. I've now learned that decisions made ambigious can become an agent's decision that I could possibly not recognized at all.

**6. Now scale it up: what does this mean for a team of thirty?**
It would be hard for a team of thirty to see the decisions made across thirty boundaries, where one person's decision could become another person or team's dependency. I would set a regular review gate on every Monday morning and Friday afternoon before any development or moves into production, so that no assumptions made and no decisions left ambiguous. 
Besides that, I would never leave the decisions that involve security access, data access, compliance risk, or any irreversible actions that cost the company to the agent. Document all the decisions and assumptions made, make it clear whether each action was decided by a named human or agent, to provide audit trail, visibility and account for decision ownership. 
