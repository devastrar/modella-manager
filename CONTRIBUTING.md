### Getting Started
To contribute to Modella Manager, start by cloning the repository:
```bash
git clone https://github.com/yourusername/modella-manager.git
cd modella-manager
```
Set up the front-end by navigating to the `front-end` directory, installing dependencies with `npm install`, creating a `.env` file based on `.env.example`, and starting the development server with `npm start`. For the back-end, navigate to the `back-end` directory, install dependencies with `pip install -r requirements.txt`, set up environment variables for API keys and configurations, and run the Flask server with `python app.py`. This dual-component setup ensures both parts run simultaneously, a detail that might not be immediately obvious to new contributors, enhancing the contribution process by clarifying setup steps.

### Reporting Issues
Use the [issue tracker](https://github.com/devastrar/modella-manager/issues) to report bugs or suggest new features. Provide a clear description, including steps to reproduce, expected behavior, and any relevant logs or screenshots. This ensures issues are actionable and can be addressed efficiently, aligning with user stories for bug reporting and feature requests.

### Submitting Pull Requests
To contribute code:
1. Fork the repository on GitHub.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make changes, ensuring to follow coding standards and adding necessary tests.
4. Commit your changes with descriptive messages:
   ```bash
   git commit -m "Your commit message"
   ```
5. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a pull request from your branch to the main branch of the original repository, providing a clear description of your changes and their purpose. This process ensures collaboration is streamlined, with code reviews facilitating quality control.

### Coding Standards and Style Guides
- **Front-End (React):**
  - Use ES6+ syntax and follow standard React best practices.
  - Use meaningful variable names and keep code clean and readable.
  - Run `npx eslint .` to check for code quality, using the configuration in `.eslintrc.json`, which enforces rules like 2-space indentation and single quotes.
- **Back-End (Flask):**
  - Follow PEP 8 guidelines, ensuring clear and concise code with proper commenting.
  - Ensure all imports are necessary and no unused variables or functions exist, aligning with Python best practices.

These standards ensure consistency and maintainability, supporting user stories related to code quality and maintainability.

### Testing
- **Front-End:**
  - Use Jest for unit and integration tests, with tests colocated in `src/components/` using the `.test.js` suffix.
  - Run tests with:
    ```bash
    cd front-end
    npm test
    ```
- **Back-End:**
  - Use Pytest for testing Flask APIs and Celery tasks, with test files in `back-end/tests/` using the `test_` prefix.
  - Run tests with:
    ```bash
    cd back-end
    python -m pytest
    ```
Contributors should ensure all tests pass before submitting pull requests, enhancing reliability and aligning with user stories for automated testing.

### Documentation
Update the `README.md` or other documentation files as needed, ensuring any new features or changes are reflected. Translations are managed via JSON files in `src/locales/`. If you add new strings, update all language files accordingly or at least in the English file with a note to translate them, supporting internationalization user stories.

### License and Contributions
By contributing to this project, you agree to the terms of the [LICENSE](LICENSE) file, which is under the MIT License. All contributions are welcome, and we appreciate your time and effort, ensuring legal clarity and encouraging community involvement.
