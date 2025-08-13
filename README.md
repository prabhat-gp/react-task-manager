# README.md
# React Task Manager

A simple task management application built with React and deployed using GitHub Actions to Azure Static Web Apps.

## Features

- Add, complete, and delete tasks
- Filter tasks by status (All, Active, Completed)
- Local storage persistence
- Responsive design
- Environment-based configuration

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Environment Variables

- `REACT_APP_ENVIRONMENT`: Current environment (development, staging, production)
- `REACT_APP_VERSION`: Application version

## Deployment

This app is automatically deployed to Azure Static Web Apps using GitHub Actions when code is pushed to the main branch.