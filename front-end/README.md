# Modella Manager Front-End

This directory contains the React-based front-end for Modella Manager, a tool for managing AI image generation models.

## Directory Structure
- `src/`
  - `components/`: UI components (e.g., `ModelBrowser.js`, `DownloadQueue.js`)
  - `services/`: API utilities (e.g., `api.js`)
  - `translations/`: Language files for i18n
  - `tests/`: Unit tests

## Setup
1. **Install Dependencies**: Run `npm install` to install all required packages.
2. **Configure Environment**: Copy `.env.example` to `.env` and fill in values (e.g., API keys).
3. **Start the App**: Run `npm start` to launch the development server.

## Testing
Run tests with `npm test` to execute the Jest test suite.

## Key Components
- **`ModelBrowser.js`**: Browse and filter models with infinite scrolling and search functionality.
- **`DownloadQueue.js`**: Monitor download progress with real-time updates and cancellation options.
- **`ModelDetails.js`**: View detailed model info and manage versions/files.
- **`DiskUsage.js`**: Visualize storage usage by source with a refresh option.
- **`Onboarding.js`**: Provides a guided tour for new users.

## User Guide
- **Model Browsing**: Use the search bar in `ModelBrowser` to find models. Scroll to load more results automatically.
- **Download Queue**: Track ongoing downloads in `DownloadQueue`. Cancel tasks if needed.
- **Disk Usage**: View storage breakdown in `DiskUsage`. Click "Refresh" to update data.
- **Model Details**: Explore model versions and files in `ModelDetails`. Copy trained words or download specific files.
- **Onboarding**: First-time users see a tutorial highlighting key features.

For additional help, access the in-app "Help" section from the dashboard.

## Development Notes
- **Dependencies**: Ensure all packages in `package.json` are installed.
- **Environment Variables**: Set `REACT_APP_CIVITAI_API_KEY` and other variables in `.env`.
- **Testing**: Expand test coverage in `tests/` for edge cases.