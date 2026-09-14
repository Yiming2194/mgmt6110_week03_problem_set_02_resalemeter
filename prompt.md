# PROMPTS.md - ResaleMeter
**Student:** Lee Yi Ming · **Course:** MGMT 6110 · **Problem Set 2**
**User sentence:** A HDB resale flat buyer in Singapore opens this screen to select town and flat type, and knows it worked when they see the historical HDB transactions price trends and range of the selected town and flat type.
**Live link:** https://mgmt6110week03problemset02resalemet.vercel.app/

---

## Prompt 1 - the master prompt
```
ROLE: You are a senior front-end developer building a React web app.

GOAL:
Build the front end of [ResaleMeter], a web product for HDB resale flat buyers in Singapore.
The product helps buyers understand how does the resale price of a flat compare with historical HDB resale transactions for similar flats in the selected town?
Screen 1: The buyer selects a town and flat type and sees the historical price range, and price trend over time.
Screen 2: The buyer can select up to three town + flat type combinations. Show the historical resale price trends and price range for the selected combinations in a comparison chart. The comparison should make it easy to see how historical prices differ between the selected town + flat type combinations.

OUTPUT: A running app. Keep every invented value in ONE data file of its own, with at least [10] rows, so the screen looks real. One component per screen or section. Move between screens without reloading the page. Readable on a phone at arm's length. When you are done, list the files you created and what each one holds. A README.md that states who the user is and what job the product does for them.

GUARDRAILS: Front end only. Do not implement the backend or data integration in this version. I will provide those requirements in a subsequent prompt. NO database, NO login, NO API keys yet, or live data. Do not add features or other user job that I did not list. Nothing confidential: Use clearly labelled fictional/mock transaction data to populate the prototype. Do not represent mock values as actual HDB transactions. no real company data, logo, or trademark.

CONTEXT: Individual Problem Set 2 for MGMT 6110 Human-AI Collaboration at SMU. Built in Google AI Studio, shared as a link, and opened on a phone by classmates in Week 4. I am not a programmer: when you make a choice I did not specify, say so in one line rather than burying it.

```
**What came back:** A running app, 10 files, preview loaded. It listed in screen 1 sample historical transactions containing other resales data e.g. remaining lease, floor area, etc. which I did not specify.  
**What I changed next and why:** Remove the sample historical transactions table entirely as the data of concern are flat type, town and resale prices only.

---

## Prompt 2 - remove the sample historical transactions table
```

remove the section. change nothing else.

```
**What came back:** correct, one file touched.  
**What I changed next and why:** made several edits to the section on historical range on screen 1 to the desired state as there are irrelevant and repetitive information presented to the user.

---

## Prompt 3 - edit the historical range section on screen 1
```

remove the selected elements entirely. add a drop-down filter list (with multiple selection) to the historical range section for user to select the timeframe of the historical range by year. change nothing else. Apply style changes to the selected element(s).

```
**What came back:** correct, one file touched.  
**What I changed next and why:** added a timeframe filter by quarter and year to the historical trend section on screen 1 for the user to decide the span of historical transactions data they would like to see.

---

## Prompt 4 - add a timeframe filter to historical trend section
```
Add a drop-down filter list (with multiple selection) to the historical trend section for user to select the timeframe of the resale price by quarter and year. change nothing else.
Apply style changes to the selected element(s).

```
**What came back:** correct, one file touched.  
**What I changed next and why:** removed historical range section on screen 1 entirely above as I realise now that it has become redundant.

---

## Prompt 5 - remove historical range section on screen 1
```

remove the historical range section entirely. change nothing else.
Apply style changes to the selected element(s).

```
**What came back:** correct, one file touched.  
**What I changed next and why:** similarly, added a timeframe filter by quarter and year to the comparative trend analysis on screen 2 for the user to decide the span of historical transactions data they would like to see.

---

## Prompt 6 - add a timeframe filter to comparative trend analysis on screen 2
```

Add a drop-down filter list (with multiple selection) to the historical trend section for user to select the timeframe of the resale price by quarter and year. change nothing else.
Apply style changes to the selected element(s).

```
**What came back:** correct, one file touched. I notice a change in the UI for flat type filter in screen 1 from drop-down to card.  
**What I changed next and why:** remove the bottom two sections on screen 2 as they are either duplicate information or contain other out-of-scope dataset.

---

## Prompt 7 - remove bottom 2 sections on screen 2
```

remove both sections - historical price range comparison and the decision matrix from screen 2. change nothing else.
Apply style changes to the selected element(s).

```
**What came back:** correct, one file touched.  
**What I changed next and why:** Nothing. Move on to link the front end to a real back end.

---

## Prompt 8 - Put the real back end behind ResaleMeter
```
ROLE: You are a senior full-stack developer working in my existing project. Do not
rewrite what is already there; add to it.

GOAL: My screen currently shows resale price trends and price range by town, flat type, and transaction date in year and quarter as a hard-coded value. Replace it with
real data from Resale flat prices based on registration date from Jan-2017 onwards from the website "https://data.gov.sg/datasets/d_8b84c4ee58e3cfc0ece0d773c8ca6abc/view", fetched through a serverless function of my own.
 1) api/hdb-resale.js—calls "https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc", returns only the fields my screen needs, and nothing else.
 2) api/health.js—reports whether the credential is configured (keyConfigured) and
    whether the upstream answered, including the HTTP status it returned. It must
    never print the credential or any part of it.
 3) On the screen, replace the hard-coded value with the live one, and decide what
    the user sees in each of these four cases: the data is loading, the data is
    empty, the upstream refused, and the upstream is unreachable. I want four
    different sentences, not one spinner.

OUTPUT: Both functions at api/ in the PROJECT ROOT, siblings of package.json, never
 inside src/. If this project has a server entry file, register the same two routes there too,
 because that is the shape the preview can answer. If it has no server file, skip
 that and tell me so rather than inventing one.
 Make sure package.json contains "type": "module".
 BEFORE the fetch, if the credential is missing or empty, return 503 with a message
 naming the variable, and do not call the upstream at all. A missing variable is sent
 as the word "undefined" and looks exactly like a wrong credential, so stop it early.
 AFTER the fetch, check response.ok before reading the body. A refusal often has an
 empty body, so calling .json() on it throws and my function dies with a 500 instead
 of telling me what happened. On a non-2xx reply, return the upstream status and a
 one-line reason in your own JSON.
 Cache the response for one day with Cache-Control: s-maxage=86400,
 stale-while-revalidate=172800, matching how often the source actually changes.
 In the footer, credit the source in the exact form the provider's licence asks for.

GUARDRAILS: Never write the credential into any file, comment or README. Never create
 a variable whose name starts with VITE_. Never call the upstream from browser code;
 every call happens inside api/. Never print the credential, or any part of it, in a
 response or a log. No new npm packages. No database, no login. Leave every screen I
 already have working exactly as it is.

CONTEXT: Deployed on Vercel from GitHub. The credential lives only in a Vercel
 environment variable named HDB_RESALE_PRICE_API_KEY. A real response from the endpoint,
 called by hand just now, looks like this:
{"success":true,"result":{"resource_id":"d_8b84c4ee58e3cfc0ece0d773c8ca6abc","fields":[{"type":"text","id":"month"},{"type":"text","id":"town"},{"type":"text","id":"flat_type"},{"type":"text","id":"block"},{"type":"text","id":"street_name"},{"type":"text","id":"storey_range"},{"type":"text","id":"floor_area_sqm"},{"type":"text","id":"flat_model"},{"type":"text","id":"lease_commence_date"},{"type":"text","id":"remaining_lease"},{"type":"numeric","id":"resale_price"},{"type":"int4","id":"_id"}],"records":[{"_id":1,"month":"2017-01","town":"ANG MO KIO","flat_type":"2 ROOM","block":"406","street_name":"ANG MO KIO AVE 10","storey_range":"10 TO 12","floor_area_sqm":"44","flat_model":"Improved","lease_commence_date":"1979","remaining_lease":"61 years 04 months","resale_price":"232000"},{"_id":2,"month":"2017-01","town":"ANG MO KIO","flat_type":"3 ROOM","block":"108","street_name":"ANG MO KIO AVE 4","storey_range":"01 TO 03","floor_area_sqm":"67","flat_model":"New Generation","lease_commence_date":"1978","remaining_lease":"60 years 07 months","resale_price":"250000"},{"_id":3,"month":"2017-01","town":"ANG MO KIO","flat_type":"3 ROOM","block":"602","street_name":"ANG MO KIO AVE 5","storey_range":"01 TO 03","floor_area_sqm":"67","flat_model":"New Generation","lease_commence_date":"1980","remaining_lease":"62 years 05 months","resale_price":"262000"},{"_id":4,"month":"2017-01","town":"ANG MO KIO","flat_type":"3 ROOM","block":"465","street_name":"ANG MO KIO AVE 10","storey_range":"04 TO 06","floor_area_sqm":"68","flat_model":"New Generation","lease_commence_date":"1980","remaining_lease":"62 years 01 month","resale_price":"265000"},{"_id":5,"month":"2017-01","town":"ANG MO KIO","flat_type":"3 ROOM","block":"601","street_name":"ANG MO KIO AVE 5","storey_range":"01 TO 03","floor_area_sqm":"67","flat_model":"New Generation","lease_commence_date":"1980","remaining_lease":"62 years 05 months","resale_price":"265000"}],"_links":{"start":"/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=5","next":"/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&offset=5&limit=5"},"total":240345,"limit":5}}
```

**What came back:** 6 files touched. Live data fetched from source, but Screen 1 says unable to establish a connection to data.gov.sg; the upstream service is currently unreachable. The "Retry Connection" does not work.  
**Action:** Check the deployed App and saw different message. Value for API key is missing. Create variable for the API in Vercel and redeployed.

---

## 9. API is working but not all data was called. Prompt to check the cause of issue.
```

ROLE: You are debugging a serverless function with me. Do not rewrite it yet.
WHAT I AM SEEING:
1) there are only 8 town to select from the both screens; What I expected to see instead is 26 towns in the town filter in both screens.
2) there are only 4 types of flat type select from both screen; What I expected to see instead is 7 types of flat type filter in both screens.
3) there are only 8 quarters of resale flat price on the historical trend chart and quarter & year filters on both screens; what I expected to see instead is 39 quarterly transactions from year 2017 to 2026 for both historical trend chart and quarter & year filter.
4) on the mobile phone screen is there is a left-right scroll bar for the historical trend chart on both screens; what I expected to see instead is historical trend line chart that fit within the mobile phone screen.

WHAT I HAVE ALREADY RULED OUT:
I have already checked that the HDB API is working.

WHAT I WANT FROM YOU, in this order and nothing else:
Name the SINGLE most likely cause given the evidence above, and say which piece of the evidence points at it. If two causes fit equally, say so rather than picking.
Give me ONE thing to check that would tell those causes apart, and tell me what each possible result would mean. I will run it and come back.
Only after I confirm the cause, give me the smallest change that fixes it.

GUARDRAILS: Do not rewrite my function. Do not add a library. Do not suggest that I check whether the key is correct unless keyConfigured above is true, because if it is false the value is not the problem. Do not tell me to clear the cache or redeploy unless you can say from the evidence why that would matter. If the evidence above is not enough to name a cause, tell me exactly which line of it is missing and stop.
```

**Came back with:** static dataset in src/data/mockHdbData.ts was rendered rather than dataset from HDB resale.  
**Action:** Checked the src/data/mockHdbData.ts to confirm.

---

## 10. Replace mock dataset with live data
```
I do not want to use the mock HDB data anymore. Use the live data from HDB API instead.
```

**Came back with:** 6 files touched. Full dataset from HDB resale fetched and updated live.  
**What I changed next and why:** Remove the disclaimer on the use of mock data displayed above App as live data are now being called.

---

## 11. Remove the disclaimer header
```
I am still seeing the disclaimer above the App that says the data are synthetic mock data. Remove it and change nothing else.

```
**Came back with:** Correct, 1 file touched.  
**What I changed next and why:** Nothing. I stopped prompting here.






