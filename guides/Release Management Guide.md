
---

## Guide to Managing the devstrar/modella-manager Git Repository

This guide outlines the Git workflow for the `devstrar/modella-manager` repository, ensuring a structured process for development, integration, and release. It includes branch usage, versioning practices, and specific commands for each step.

---

### Branches Overview

- **main**: The stable, production-ready branch deployed to the live environment. Only thoroughly tested code resides here.
- **development**: The integration branch for ongoing work. New features are merged here before preparing a release.
- **`release/<version>`**: Temporary branches for preparing a specific release (e.g., `release/1.0.0`). Used for final testing and bug fixes.
- **`feature/<feature-name>`**: Branches for developing new features (e.g., `feature/add-login`). Created from **development**.
- **`hotfix/<version>`**: Branches for urgent fixes to the **main** branch (e.g., `hotfix/1.0.1`).  Created from **main**.


---

### Versioning

- **Format**: Use **semantic versioning** in the form `MAJOR.MINOR.PATCH` (e.g., `1.0.0`).
  - **MAJOR**: Increment for significant, potentially incompatible changes (e.g., `2.0.0`).
  - **MINOR**: Increment for new features or enhancements (e.g., `1.1.0`).
  - **PATCH**: Increment for bug fixes (e.g., `1.0.1`).
- **Implementation**: Update the version number in the code (e.g., in a `VERSION` file or a constant like `__version__`) on **release** or **hotfix** branches before merging.

---

### Workflow Steps

#### 1. Setting Up the Repository

If the repository is new or lacks the required branches, initialize it as follows:

- Ensure the **main** branch exists (typically the default branch in a new repository).
- Create the **development** branch from **main**:
  ```bash
  git checkout main
  git checkout -b development
  git push origin development
  ```

This establishes **main** as the stable base and **development** as the working branch.

---

#### 2. Developing a New Feature

New features are developed in isolated branches off **development**:

- **Create a Feature Branch**:
  ```bash
  git checkout development
  git checkout -b feature/<feature-name>  # e.g., feature/add-login
  ```
- **Work on the Feature**:
  - Make changes and commit them:
    ```bash
    git add .
    git commit -m "Implement <feature-name>"
    ```
- **Push the Feature Branch**:
  ```bash
  git push origin feature/<feature-name>
  ```
- **Submit a Pull Request**:
  - On GitHub, create a pull request to merge `feature/<feature-name>` into **development**.
  - Team members review the code and approve the merge.
- **Merge the Pull Request**:
  - Once approved, merge the pull request via GitHub’s interface.

---

#### 3. Preparing a Release

When **development** has sufficient features for a release:

- **Create a Release Branch**:
  ```bash
  git checkout development
  git checkout -b release/<version>  # e.g., release/1.0.0
  git push origin release/<version>
  ```
- **Update the Version Number**:
  - Edit the version in the code (e.g., change `__version__ = "1.0.0"`).
  - Commit the change:
    ```bash
    git add .
    git commit -m "Bump version to <version>"
    ```
- **Test and Fix Bugs**:
  - Perform final testing on the release branch.
  - Commit any bug fixes (no new features allowed).
- **Merge into main**:
  ```bash
  git checkout main
  git merge release/<version>
  ```
- **Tag the Release**:
  ```bash
  git tag -a v<version> -m "Release version <version>"  # e.g., v1.0.0
  git push origin v<version>
  ```
- **Merge Back into development**:
  - Incorporate any release fixes into **development**:
    ```bash
    git checkout development
    git merge release/<version>
    git push origin development
    ```
- **(Optional) Delete the Release Branch**:
  ```bash
  git branch -d release/<version>
  git push origin --delete release/<version>
  ```

---

#### 4. Handling Hotfixes

For critical bugs in production:

- **Create a Hotfix Branch**:
  ```bash
  git checkout main
  git checkout -b hotfix/<version>  # e.g., hotfix/1.0.1
  ```
- **Update the Version Number**:
  - Update the version in the code (e.g., `__version__ = "1.0.1"`).
- **Fix the Bug**:
  - Make changes and commit:
    ```bash
    git add .
    git commit -m "Fix critical bug for <version>"
    ```
- **Merge into main**:
  ```bash
  git checkout main
  git merge hotfix/<version>
  ```
- **Tag the Hotfix Release**:
  ```bash
  git tag -a v<version> -m "Hotfix version <version>"  # e.g., v1.0.1
  git push origin v<version>
  ```
- **Merge into development**:
  ```bash
  git checkout development
  git merge hotfix/<version>
  git push origin development
  ```
- **(Optional) Delete the Hotfix Branch**:
  ```bash
  git branch -d hotfix/<version>
  git push origin --delete hotfix/<version>
  ```

---

### Additional Notes

- **Pull Requests**: Use pull requests for merging feature branches into **development** to ensure code reviews and quality checks.
- **Version Consistency**: Update the version number in the code before merging **release** or **hotfix** branches to reflect the tagged version.
- **Conflict Resolution**: If merging into **development** results in conflicts (e.g., due to parallel development), resolve them manually and test the result.
- **Branch Protection**: On GitHub, set **main** and **development** as protected branches to require pull requests and passing status checks before merging.
- **Testing**: Run tests after each merge to verify stability, especially when integrating **release** or **hotfix** branches into **development**.
- **Team Decisions**: Agree as a team on when to increment **MAJOR**, **MINOR**, or **PATCH** versions based on the scope of changes.

---

This guide provides a robust framework for managing the `devstrar/modella-manager` repository, balancing development flexibility with release reliability. Follow these steps to maintain a clean and organized Git history while delivering stable software updates.