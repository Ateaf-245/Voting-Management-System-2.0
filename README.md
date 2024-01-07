# Voting-Management-System-2.0

Welcome to Voting Management System 2.0, an upgraded web-based project that employs Spring Boot for the backend and Angular for the frontend.

**Improvements:**
- Conduct multiple elections simultaneously.
- Enhanced UI with Angular in the frontend.
- Improved security with Spring Security.

The system recognizes two main user types: Voters and Administrators. Each has its own tailored set of functionalities, catering to their specific needs in the voting process.

**Tools Used:**
- **IntelliJ IDEA:** Used as the primary development environment, ensuring a consistent and efficient coding practice.
- **VS Code:** Assists in designing intuitive user interfaces, enhancing the user experience.
- **MySQL Workbench:** Ensures stable database management and web services, allowing for secure data storage and retrieval.


**User Types:**
- **Voters:** Regular users with the privilege to cast votes.
- **Admin:** Responsible for managing the voting process, candidates, and voter verification.

## Functionalities:</br>

### Voter:
- **Election:** A clear and concise space where voters can quickly choose their preferred candidate and cast their vote in the election.
- **Voting Result:** Provides transparency, allowing voters to view real-time and final election results.
- **Profile:** A personalized space for each user:
  - Displays relevant personal details (e.g., name, location, etc).
  - Ensures security by allowing users to change their login credentials.

### Admin:
- **Election:** A place where you can manage the Elections. Admins can:
  - View and update election details.
  - Monitor live updates on election status.
  - Can see election result once the election ends.
  - Can conduct multiple elections at once.
- **Candidate Details:** A dedicated space to manage candidate profiles. Admins can:
  - Add fresh faces to the election.
  - Update candidate details as required.
  - Remove candidates if needed.
- **Voting Result:** A summarized view of the results, giving admins the data they need to ensure fair elections.
- **Voters Details:** Maintains voter integrity by showing a list of verified voters and relevant details.
- **Verify Voter:** Ensuring the legitimacy of the voting process:
  - Every new account undergoes admin scrutiny.
  - Accounts stay inactive until verified, ensuring only legitimate votes count.


This system is a step towards more transparent and efficient electoral processes, combining modern technology with the time-honored practice of voting.
