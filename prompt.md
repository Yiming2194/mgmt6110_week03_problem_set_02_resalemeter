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
**What I changed next and why:** 
