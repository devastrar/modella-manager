### Project Overview
Modella Manager is designed to assist users in managing AI image generation models from platforms like Civatai and Hugging Face. Its primary purpose is to provide an intuitive, secure, and efficient interface for artists, researchers, and developers to search, download, organize, and monitor models. Recent updates include support for multiple languages, custom themes, and performance optimizations, making it accessible and usable by a diverse global audience.

### Features
The application offers a range of features to enhance user experience:
- **Model Searching and Filtering**: Users can search models by keywords and apply filters such as type or source, aligning with user stories 1, 2, and 3.
- **Model Details**: View comprehensive metadata including name, description, creator, and creation date, supporting user story 3.
- **Model Downloading**: Download models from external platforms directly to local storage, with visual feedback like loading indicators, as per user story 4.
- **Local Model Management**: Organize, rename, and delete locally stored models, covering user stories 5, 6, and 7.
- **Model Lists**: Create and manage custom lists for better organization, aligning with user stories 8 and 9.
- **Disk Usage Monitoring**: Track disk space usage with breakdowns by source or category, supporting user story 10.
- **Settings Configuration**: Customize API keys, storage paths, and language preferences, with input validation, as per user stories 11 and 12.
- **Internationalization**: Support for multiple languages including English, French, Spanish, German, Russian, Chinese, and Japanese, enhancing global accessibility (user story 13).
- **Custom Themes**: Choose between light and dark themes for a personalized experience, a new feature added for user personalization (user story 14).
- **Visual Feedback**: Include loading indicators, notifications, and animations for an engaging user experience, supporting user story 15.

### Installation
To install and set up Modella Manager, follow these steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/modella-manager.git
   cd modella-manager
   ```
2. **Set Up the Front-End**:
   - Navigate to the front-end directory:
     ```bash
     cd front-end
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file based on `.env.example` and fill in your API keys and URLs, ensuring secure configuration as per user story 16.
   - Start the development server:
     ```bash
     npm start
     ```
3. **Set Up the Back-End**:
   - Navigate to the back-end directory:
     ```bash
     cd ../back-end
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Set up environment variables for API keys and other configurations, aligning with user story 17.
   - Start the Flask server:
     ```bash
     python app.py
     ```
The application requires both front-end and back-end to be running simultaneously for full functionality, a detail that might not be immediately obvious to users.

### Pre-release Updates
Recent enhancements include:
- Added support for multiple languages to enhance global accessibility, as per user story 13.
- Introduced custom themes (light and dark modes) for user personalization, a new feature added in user story 14.
- Implemented lazy loading and pagination for improved performance with large datasets, supporting user story 18.
- Enhanced security with input validation and HTTPS enforcement, aligning with user stories 19 and 20.
- Integrated ESLint for code quality and consistency in the front-end, ensuring maintainability (user story 21).

### Contributing
We welcome contributions to the Modella Manager project! Please refer to the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines on how to contribute, including coding standards and the process for submitting pull requests, as per user story 22.

### Support
If you encounter any issues or have questions, please check the [issue tracker](https://github.com/devastrar/modella-manager/issues) or reach out to our community forums for assistance, ensuring users have clear channels for support.

An unexpected detail is the emphasis on both front-end and back-end setup, ensuring users understand the dual-component nature of the application, which might not be immediately obvious. This detail enhances the README’s utility by addressing potential confusion.

