# Title
Academic World exploration by Mustafa Sadiq

# Purpose
Explore Academic World dataset. Be able to apply CRUD operations. Visualize and analyze.

# Demo
Give the link to your video demo. Read the video demo section below to understand what contents are expected in your demo.

# Installation

1. Set up MySQL, MongoDb and Neo4j databases following MP3 assignment instructions
2. Run all scripts in `initial-scripts/`
3. Update connection configs in `app/.env` file and add OpenAI key
4. install nodejs v20.11.1 +
5. cd to `/app`
6. `npm install`
7. `npm run dev`


# Usage

### Widget 1

![Image](static/widget1.png)

This widget displays a live count of the records. Click `Refresh` to update counts. It is useful to track what and how many records do hold. This widget sources data from MySQL.

### Widget 2

![Image](static/widget2.png)

This widget displays the top 10 keywords that have the most publications by year. The number of publications by keyword is in blue. Change `year` to update data accordingly. It is useful how research changed over the years e.g. in 2004 it used to be about 'internet' and in 2021 its about 'deep-learning'. This widget sources data from MySQL.


### Widget 3

![Image](static/widget3.png)

This widget displays the top 10 keywords that have the most publications by university. The number of publications by keyword is in blue. Change `university` to update data accordingly. It is useful to know a university focus and see how research focus changes from university to university e.g. Yeshiva University focus on medical research and Carnegie Mellon University focuses on computer science. This widget sources data from Neo4j including the dropdown values.

### Widget 4

![Image](static/widget4.png)

This widget allows to Create/Read/Update/Delete any `faculty` record. This widget sources and updates data from and to MySQL including the dropdown values.

- Create: Press + icon to create a new record. Enter details and then click `Create`
- Read: Select any faculty from dropdown to read its attributes
- Update: Select any faculty from dropdown to read its attributes. Update any values and click `Update` to update its record.
- Delete: Select any faculty from dropdown. Click `Delete` to delete its record.

### Widget 5

![Image](static/widget5.png)

This widget allows to Create/Read/Update/Delete any `university` record. This widget sources and updates data from and to MySQL including the dropdown values.

- Create: Press + icon to create a new record. Enter details and then click `Create`
- Read: Select any university from dropdown to read its attributes
- Update: Select any university from dropdown to read its attributes. Update any values and click `Update` to update its record.
- Delete: Select any university from dropdown. Click `Delete` to delete its record.

### Widget 6

![Image](static/widget6.png)

This widget displays the top 10 keywords that have the most aggregate score (sum of scores) by faculty. The score by keyword is in blue. Change `faculty` to update data accordingly. It is useful to know a faculty focus and see how research focus changes from faculty to faculty. This widget sources data from MongoDB including the dropdown values.

### Widget 7

![Image](static/widget7.png)

This widget displays a summary about the selected faculty including a summary about their research focus. It also provides a link to their profile or portfolio page. Enter a `faculty` id to get more information about them. You can get a faculty id from the faculty CRUD widget. It is useful to quickly know more about a faculty member.

This widget sources data from MySQL to get faculty.name and faculty.University.name and then calls OpenAI API to get a summary.


# Design
This is a NextJS application for frontend and backend. The frontend interacts with backend using Rest APIs developed in NextJS /api/ routes. The backend interacts with MySQL, MongoDB and Neo4j databases. The backend also interacts with OpenAI for extra credit capabilities.

![Image](static/design.drawio.png)


# Implementation
I used NextJS to implement both backend and frontend. The frontend is pure client side components which interact with backend using REST APIs.
Libraries that I used, installed using npm:

- bootstrap (for styling)
- dotenv (to manage environment variables)
- mongodb
- mysql2
- neo4j-driver
- next
- openai (for extra credit)
- react
- react-dom
- react-icons (for external link icon on photo_urls)
- react-select (for various dropdowns)



# Database Techniques
I have implemented the following database techniques:

### Prepared statements
I have used prepared statements i.e. ? and then passing in values as argument to query interface. This improves readibility and security, by separating out SQL statements from values, and preventing SQL Injections.

### Triggers
I have used a trigger `/initial-scripts/mysql.sql` to uppercase all University.name on insert.

### REST APIs
I have used REST APIs through which the frontend interacts with backend and which wraps the databases.


# Extra-Credit Capabilities
I have developed an extra credit capability. Given a faculty Id, I use OpenAI to extract information regarding the faculty memeber including

- A summary about them
- A summary related to their research
- A link to their portfolio or public page

# Contributions
I chose to work individually.

# Requirement tracking

- [X] R1: Code repo setup
- [X] R2: Report/Readme setup
- [ ] R3: Video demo recorded and uploaded
- [X] R4: Useful and beneficial insights
- [X] R5: Cool!
- [X] R6: MySQL used
- [X] R7: MongoDB used
- [X] R8: Neo4j used
- [X] R9: 6 widgets
- [X] R10: two widgets that manipulate database
- [X] R11: four widgets that take input from users
- [X] R12: visual layout using grids and bootstrap
- [X] R13: Prepared statement used 
- [X] R14: REST API used for accessing database
- [X] R15: Trigger used


