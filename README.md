# Questionnaire App

## Description

This web application allows users to create and fill out questionnaires. It includes three levels of functionality: Basic, Intermediate, and Advanced. The Basic level fulfills the minimum requirements for the test task, but completing additional features at higher levels will significantly increase the chances of acceptance into the school.

## Features

### Basic Level (Completed)

- **Questionnaire Catalog Page**:

  - Users can view a list of questionnaires with pagination.
  - Each questionnaire card includes:
    - Name of the questionnaire
    - Description
    - Number of questions
    - Number of submissions
    - Actions: Edit, Launch, Delete (The "Edit" button redirects to a page similar to the questionnaire creation page).

- **Questionnaire Builder Page**:

  - Users can create a questionnaire by adding multiple questions.
  - Supported question types:
    - Text Field – Free text input by the user.
    - Single Choice – Users can select only one answer (radio buttons).
    - Multiple Choice – Users can select multiple answers (checkboxes).
  - After submission, the questionnaire is saved in the database.

- **Interactive Questionnaire Page**:
  - Users can take the created questionnaires.
  - At the end of the questionnaire, the user can view:
    - All their answers
    - Time spent on the questionnaire
  - After submission, the answers are saved in the database.

### Intermediate Level (Partially Completed)

- **All Basic Features**
- **Additional Features**:

  - **Questionnaire Catalog Page**:

    - Sorting functionality for questionnaires by:
      - Name
      - Number of questions
      - Number of submissions (Implemented)

  - **Questionnaire Builder Page**:

    - Drag and Drop functionality to reorder questions and answers (Implemented).

  - **Interactive Questionnaire Page**:
    - Save progress: Users can resume the questionnaire from where they left off if they refresh the page (Not implemented).

### Advanced Level (Not Implemented)

- **All Intermediate Features**
- **Additional Features**:

  - **Questionnaire Catalog Page**:

    - Infinite Scroll – Questionnaires automatically load when the user scrolls to the bottom of the page (Not Implemented).

  - **Questionnaire Statistics Page**:

    - A page that displays overall statistics for each questionnaire (Not Implemented).

  - **Questionnaire Builder Page**:
    - Added "Image" question type: Users can upload images to questions while filling out the questionnaire (Not Implemented).

## Technology Stack

- **Frontend**:

  - HTML, CSS, JavaScript (React.js or Vanilla JS)
  - For the intermediate level: Drag & Drop functionality and sorting implemented using React libraries like `react-dnd` or custom solutions.

- **Backend**:
  - Node.js with Express (or any other framework)
  - Database: Can be relational (e.g., PostgreSQL, MySQL) or NoSQL (e.g., MongoDB)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed (version 14 or higher)
- npm or yarn package manager
- A code editor (e.g., VSCode)
