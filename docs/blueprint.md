# Document Approval Workflow Application

## Overview

This application provides a streamlined system for managing a multi-step document approval process. It's designed for teams where documents require sequential review and sign-off from different authority levels. The workflow ensures that a document is reviewed and approved by a "First Approver" before it can be reviewed and approved by a "Second Approver," creating a clear and auditable trail.

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
    * **Fields:** Title, Description, and a File Input (simulated).
    * **Logic:** When submitted, this creates a new Document object with the status `PENDING_FIRST_APPROVAL` and pushes it to the `DocumentService` state.

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
