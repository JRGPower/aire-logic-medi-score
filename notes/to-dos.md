## TODO

In no particular order:

- Abstract DB connection out of app.js
- Find a better way to handle alerts other than just changing CSS styling
- Re-evaluate conditions for alerts to show

- Medi-scor-calc function to pass some kind of error visable in front end to warn if a Mediscore is calculated with incomplete data. eg observation is missing temperature.

- Improve medi-score-calc function to avoid using if-else chaining - evaluate if there is a better pattern / method

- Record pagination: "load more" / "load all"
  - Get x to y numbered records endpoint
- Add user login and logout page, user Auth BE, session tokens
- Implement a basic chart to display medi-score and obs data on the details page
- Work out better handling of Date data:
  - Data generation function and DB-seeding method produces different date-type records than adding data from the input form front end.
- Improve CSS styling and simplify where possible , try to reuse classes more
- Find out how often measurements of each type are recorded for patients and develop data model to suit data recorded at different times and frequencies.
  - CBG score for example is likely not measured as often as SpO2, CVPU etc.
  - Implement proper HTTP error handing and status codes
