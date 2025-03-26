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

### Intermediate Level (Completed)

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

    - Save progress: Users can resume the questionnaire from where they left off if they refresh the page.

    ***
