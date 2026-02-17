# Contributing to JobTrackerr

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to JobTrackerr. These are just guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by the [JobTrackerr Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [kaysarulanasapurba@gmail.com](mailto:kaysarulanasapurba@gmail.com).

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for JobTrackerr. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

-   **Use a clear and descriptive title** for the issue to identify the problem.
-   **Describe the exact steps which reproduce the problem** in as much detail as possible.
-   **Provide specific examples** to demonstrate the steps. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples.
-   **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
-   **Explain which behavior you expected to see instead and why.**
-   **Include screenshots** which show you following the described steps and clearly demonstrate the problem.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for JobTrackerr, including completely new features and minor improvements to existing functionality.

-   **Use a clear and descriptive title** for the issue to identify the suggestion.
-   **Provide a step-by-step description of the suggested enhancement** in as much detail as possible.
-   **Provide specific examples** to demonstrate the steps.
-   **Describe the current behavior** and **explain which behavior you expected to see instead** and why.

### Pull Requests

The process described here has several goals:

-   Maintain JobTrackerr's quality
-   Fix problems that are important to users
-   Engage the community in working toward the best possible JobTrackerr
-   Enable a sustainable system for JobTrackerr's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1.  Follow all instructions in [the template](.github/PULL_REQUEST_TEMPLATE.md)
2.  Follow the [styleguides](#styleguides)
3.  After you submit your pull request, verify that all status checks are passing

## Styleguides

### Git Commit Messages

-   Use the present tense ("Add feature" not "Added feature")
-   Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
-   Limit the first line to 72 characters or less
-   Reference issues and pull requests liberally after the first line

### JavaScript Styleguide

-   All JavaScript must adhere to [Prettier](https://prettier.io/) default settings.
-   Prefer modern ES6+ syntax.

### Python Styleguide

-   All Python code must adhere to [PEP 8](https://www.python.org/dev/peps/pep-0008/).
-   Use [Black](https://github.com/psf/black) for formatting.

## Setting Up Development Environment

### Backend (Django)

1.  Navigate to the backend directory: `cd backend`
2.  Create a virtual environment: `python3 -m venv venv`
3.  Activate the virtual environment: `source venv/bin/activate`
4.  Install dependencies: `pip install -r requirements.txt`
5.  Run migrations: `python manage.py migrate`
6.  Start the server: `python manage.py runserver`

### Frontend (React)

1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start the development server: `npm run dev`

## Happy Hacking! 🚀
