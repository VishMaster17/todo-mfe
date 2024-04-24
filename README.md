# TodoApp

## Overview

TodoApp is a simple yet powerful application designed to help users manage their daily tasks efficiently. The application allows users to add tasks, mark tasks as completed, and filter tasks based on their completion status.

## Design and Architectural Choices

### Frontend Framework

- **React:** Chosen for its component-based architecture, which helps in building reusable UI components. React's use of a virtual DOM allows for efficient updates and rendering of components, making it ideal for applications with dynamic interfaces like TodoApp.

### State Management

- **useState and useEffect Hooks:** To manage the state and lifecycle of the Todo items. This approach keeps the component logic clear and concise, avoiding the overhead of more complex state management solutions like Redux, which might be overkill for this scale of application.

### UI Components and Styling

- **Tailwind CSS:** Utilized for its utility-first approach, allowing rapid styling directly in JSX without switching between CSS files. This accelerates development speed and enhances CSS maintainability.
- **Responsive Design:** Ensures that TodoApp works well on both mobile and desktop environments, adapting layout and content based on the screen size.

### Persistence

- **Local Storage:** Used for storing todo items locally within the browser. This choice offers simplicity and quick access without requiring server-side integration, making the app usable offline and immediately responsive to user input.

### Accessibility

- **Semantic HTML and ARIA Labels:** Ensured that all interactive elements are accessible, including form elements and interactive lists, which are crucial for users relying on screen readers.

## Features

- **Add Todos:** Users can add new todos using a text input field.
- **Complete Todos:** Todos can be marked as completed by checking off the box next to each todo.
- **Filter Todos:** Users can filter the visible todos based on their status (All, Active, Completed).

## Installation

To get started with TodoApp, install the dependencies:

```bash
npm install
```

## Usage

To run TodoApp locally:

```bash
npm run dev
```
Open http://localhost:5173 to view it in the browser.

## Testing

To run jest unit test cases:

```bash
npm run test
```
