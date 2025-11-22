# Document Approval Workflow Application

## Overview

This application provides a streamlined system for managing a multi-step document approval process. It's designed for teams where documents require sequential review and sign-off from different authority levels. The workflow ensures that a document is reviewed and approved by a "First Approver" before it can be reviewed and approved by a "Second Approver," creating a clear and auditable trail.

## Codebase Overview

This project is an Angular application with a clear separation of concerns.

### Application Structure (`src/app`)
*   **Core Application Files**:
    *   `app.config.ts`: Application-wide configuration.
    *   `app.css`: Global application styles.
    *   `app.html`: Main application template.
    *   `app.routes.ts`: Defines the application's routes.
    *   `app.ts`: Root component of the application.
*   **Components (`src/app/components`)**:
    *   `dashboard.component.ts/.html`: Displays the main dashboard for users.
    *   `document-list-item.component.ts/.html`: Renders a single document entry.
    *   `document-list.component.ts/.html`: Displays a list of documents.
    *   `document-submission.component.ts/.html`: Handles document submission.
    *   `theme-toggle.component.ts`: Component for switching themes.
    *   `toast.component.ts`: Displays toast notifications.
    *   `user-switcher.component.ts/.html`: Allows switching between user roles.
*   **Models (`src/app/models`)**:
    *   `data-service.interface.ts`: Interface for data services.
    *   `document-status.enum.ts`: Enum defining document approval statuses.
    *   `document.model.ts`: Interface/class for document data structure.
    *   `user.model.ts`: Interface/class for user data structure.
*   **Services (`src/app/services`)**:
    *   `api.service.ts`: Handles API interactions.
    *   `document.service.ts`: Manages document-related operations and state.
    *   `mock-api.service.ts`: Provides mock data for development/testing.
    *   `theme.service.ts`: Manages application themes.
    *   `toast.service.ts`: Manages toast notifications.

### Configuration Files
*   `angular.json`: Angular CLI configuration.
*   `jest.config.js`: Jest testing framework configuration.
*   `package.json`: Project dependencies and scripts.
*   `tsconfig.json`, `tsconfig.app.json`, `tsconfig.spec.json`: TypeScript configurations.
*   `tailwind.config.js`, `postcss.config.js`: Tailwind CSS and PostCSS configurations.


## Style, Design, and Features

### Core Roles
1.  **Submitter:** Any authenticated user who can submit a document for approval.
2.  **First Approver:** A user with the authority to perform the initial review and approval of a document.
3.  **Second Approver:** A user with the authority to give the final approval after the First Approver has signed off.

### Key Features
*   **Secure Document Submission:** Users can upload or create documents that enter the approval queue.
*   **Role-Based Dashboards:** The user interface adapts to the logged-in user's role, showing them only the documents and actions relevant to them.
*   **Sequential Approval Workflow:** A document submitted by a user must first be approved by a First Approver. Only after this first approval does it become available for the Second Approver.
*   **Clear Status Tracking:** All documents are clearly marked with their current status (e.g., "Pending First Approval," "Pending Second Approval," "Approved," "Rejected").
*   **Notifications (Future Scope):** Users will be notified when a document requires their attention or when a document they submitted has been processed.

### Visual Design
*   **Theme:** A modern, clean, and professional interface with a focus on clarity and ease of use.
*   **Color Palette:** A professional palette utilizing blues for primary actions, grays for text and backgrounds, green for "Approved" status, and red for "Rejected" status.
*   **Typography:** Clear, legible fonts like Roboto or Inter, with a strong hierarchy to distinguish headings, body text, and metadata.
*   **Layout:** A responsive, card-based layout where each document is a card in a list. The dashboard will feature clear sections for "My Submissions," "Awaiting My Approval," and "Recently Processed."
*   **Iconography:** Material Design icons will be used to provide clear visual cues for actions like "Approve," "Reject," "View," and "Submit."
*   **Interactivity:** Buttons and interactive elements will have subtle hover effects and "glow" shadows to feel responsive and modern.

## Phase 1: Setup and UI Foundation

This initial phase focuses on setting up the project structure and building the core user interface components with mock data.

### Steps for Current Request
1.  **Generate Core Components:**
    *   `DashboardComponent`: The main view that will conditionally render different lists based on user role.
    *   `DocumentListComponent`: A reusable component to display a list of documents.
    *   `DocumentListItemComponent`: A component for rendering a single document "card" with its status and available actions.
2.  **Create Data Models:** Define TypeScript interfaces for `Document` and `User` to ensure type safety.
3.  **Implement Mock Data Service:** Create a service that provides mock `Document` and `User` data to populate the UI without needing a backend. This service will simulate the different roles.
4.  **Build the Static UI:**
    *   Develop the template for the `DashboardComponent` to include sections for different document lists.
    *   Implement the `DocumentListComponent` and `DocumentListItemComponent` using the new `@for` control flow to render the list of mock documents.
    *   Apply modern CSS to style the components according to the visual design, focusing on a clean layout, typography, and color scheme.
5.  **Set up App Routing:** Configure the main application router to display the `DashboardComponent` as the default view.

## Phase 2: Interactivity and Workflow Logic

This phase focuses on "wiring up" the application. We will replace static mock data with a reactive state management system to handle document submission, role switching, and the sequential approval logic.

### Objectives
* Implement the logic to handle the lifecycle of a document (Submit -> 1st Approval -> 2nd Approval -> Final).
* Create a mechanism to simulate "logging in" as different roles to verify the dashboard views.
* Build the input forms for creating new documents.

### Steps for Phase 2

1.  **Refactor Service for State Management:**
    * Upgrade the `MockDataService` to a stateful `DocumentService`.
    * Use **Signals** or **BehaviorSubjects** to manage the current state of the document list and the currently logged-in user.
    * Implement logic functions: `addDocument()`, `firstApprove()`, `secondApprove()`, and `rejectDocument()`.

2.  **Implement Role Simulation (Auth Mock):**
    * Create a simple **User Switcher** (e.g., a dropdown in the navbar) that allows you to instantly switch between "Submitter," "First Approver," and "Second Approver" roles.
    * This ensures you can test how the dashboard adapts to different permissions without setting up a complex backend authentication system yet.

3.  **Build the Submission Feature:**
    * Create a `DocumentSubmissionComponent` containing a reactive form.
    * **Fields:** Title (optional if files are selected), Description, and a File Input (simulated, supports multiple files).
    * **Logic:** When submitted, this creates a new Document object for each selected file (or single document if no file is selected, using Title) with the status `PENDING_FIRST_APPROVAL` and pushes them to the `DocumentService` state as a batch.

4.  **Implement Sequential Workflow Logic:**
    * **Connect Dashboard Actions:** Wire the "Approve" and "Reject" buttons in the `DocumentListItemComponent` to the service logic.
    * **Logic Gate:** Ensure the "Approve" button for a Second Approver is *only* enabled/visible if the document status is `PENDING_SECOND_APPROVAL`.
    * **Rejection Logic:** If a document is rejected at any stage, update the status to `REJECTED` and disable further approval actions.

5.  **Dynamic Filtering & Status Styling:**
    * **Dashboard Logic:** Update `DashboardComponent` to filter the main document list based on the `currentUser`.
        * *First Approver* sees only documents with status `PENDING_FIRST_APPROVAL`.
        * *Second Approver* sees only documents with status `PENDING_SECOND_APPROVAL`.
        * *Submitter* sees their own history.
    * **Visual Status:** Implement dynamic CSS class binding to change the status badge color (e.g., Yellow for Pending, Green for Approved, Red for Rejected) automatically as the state changes.

### Technical Considerations for Phase 2
* **State Immutability:** Ensure that when a document status changes, a new copy of the document list is emitted to trigger change detection in the UI.
* **Enum Usage:** Define a strict TypeScript Enum for statuses:
    ```typescript
    export enum DocumentStatus {
      PENDING_FIRST = 'PENDING_FIRST_APPROVAL',
      PENDING_SECOND = 'PENDING_SECOND_APPROVAL',
      APPROVED = 'APPROVED',
      REJECTED = 'REJECTED'
    }
    ```

## Phase 3: End-to-End Workflow Simulation

This phase focuses on the user journey. We will implement the UI mechanisms that allow a single developer/user to simulate the entire multi-user process. This involves creating a robust "Role Switcher" and ensuring the views update instantly as the document moves through the pipeline.

### Objectives
* Validate the sequential logic: Submitter $\rightarrow$ Approver 1 $\rightarrow$ Approver 2.
* Implement a "Role Switcher" to act as different users without re-logging.
* Provide visual feedback when a document moves from one stage to the next.

### Steps for Phase 3

1.  **Implement the Role Switcher Component:**
    * Create a global component (e.g., in the Navbar) containing a dropdown menu.
    * **Options:** "Log in as Alice (Submitter)", "Log in as Bob (Approver 1)", "Log in as Charlie (Approver 2)".
    * **Logic:** When an option is selected, update the `currentUser` state in the `DocumentService` and trigger a refresh of the Dashboard view.

2.  **Step A: The Submitter Experience (Creation):**
    * **Action:** User selects "Alice (Submitter)" via the Role Switcher.
    * **View:** Access the `DocumentSubmissionComponent`.
    * **Process:** Fill out the form and click "Submit."
    * **Result:**
        * The document is added to the central store.
        * Status is set to `PENDING_FIRST_APPROVAL`.
        * The user is redirected to "My Submissions" list where the new card appears with a yellow "Pending" badge.

3.  **Step B: The First Approver Experience (Transition):**
    * **Action:** User switches role to "Bob (Approver 1)."
    * **View:** The Dashboard automatically filters to show only documents with status `PENDING_FIRST_APPROVAL`.
    * **Process:** Locate the document created by Alice. Click the "Approve" button.
    * **Result:**
        * Status updates to `PENDING_SECOND_APPROVAL`.
        * **Visual Feedback:** The card vanishes from Bob's "Pending" list and moves to his "Processed History" list (or simply disappears from the active view).

4.  **Step C: The Second Approver Experience (Finalization):**
    * **Action:** User switches role to "Charlie (Approver 2)."
    * **View:** The Dashboard filters to show documents with status `PENDING_SECOND_APPROVAL`.
    * **Process:** Locate the document. Click the "Final Approve" button.
    * **Result:**
        * Status updates to `APPROVED`.
        * **Visual Feedback:** The badge turns Green.
        * If Alice (Submitter) logs back in, she now sees her document marked as "Approved."

5.  **Enhance Visual Feedback (Toasts/Alerts):**
    * Implement a simple notification service (or use a library like `ngx-toastr`).
    * Show success messages upon state changes:
        * "Document submitted successfully."
        * "Document approved. Sent to Second Approver."
        * "Final Approval granted."

### Technical Checklist
* [ ] `RoleSwitcherComponent` created and embedded in the layout.
* [ ] Dashboard `computed` signals or RxJS `selectors` properly filtering based on the active mock user.
* [ ] Buttons in `DocumentListItem` utilize `ngIf` or `@if` to only show "Approve" when the user has the correct role for the current status.
