# Portfolio CI/CD Project

## 1. Project Overview

This project demonstrates the implementation of a CI/CD pipeline for a personal portfolio website using GitHub Actions and GitHub Pages.

The existing portfolio website was used as the application, and GitHub Actions was configured to automatically validate the project and deploy changes to GitHub Pages.

---

## 2. Technologies Used

* HTML
* CSS
* JavaScript
* Git
* GitHub
* GitHub Actions
* GitHub Pages

---

## 3. Project Objective

The main objective of this project was to understand and implement the basic concepts of Continuous Integration (CI) and Continuous Deployment (CD) using a real-world portfolio website.

The pipeline was designed to:

1. Store the project code in GitHub.
2. Automatically validate the project using CI.
3. Automatically deploy the website using CD.
4. Update the live website whenever changes are pushed to the `main` branch.

---

## 4. CI/CD Concepts

### Continuous Integration (CI)

Continuous Integration is the practice of automatically checking and validating code whenever developers push changes to a shared repository.

In this project, GitHub Actions is used to perform CI checks whenever code is pushed to the `main` branch or when a pull request is created or updated for the `main` branch.

The CI workflow checks whether the required portfolio files are present:

* `index.html`
* `style.css`
* `script.js`

If the checks pass, the CI workflow is successful.

### Continuous Deployment (CD)

Continuous Deployment is the practice of automatically deploying application changes after they are pushed to the repository.

In this project, GitHub Actions deploys the portfolio website to GitHub Pages whenever changes are pushed to the `main` branch.

### CI vs CD

| CI                                 | CD                      |
| ---------------------------------- | ----------------------- |
| Checks and validates code          | Deploys the application |
| Runs automated checks              | Publishes the website   |
| Uses `ci.yml`                      | Uses `deploy.yml`       |
| Ensures required files are present | Deploys to GitHub Pages |

---

## 5. Project Architecture

The CI/CD workflows implemented in this project follow this process:

```text
Developer
    ↓
VS Code
    ↓
Git
    ↓
GitHub Repository
    ↓
GitHub Actions
    ↓
    ┌───────────────────────┐
    │                       │
    ▼                       ▼
Portfolio CI          Deploy Portfolio
  (ci.yml)              (deploy.yml)
    │                       │
    ▼                       ▼
Validate files        Upload website files
                            │
                            ▼
                      GitHub Pages
                            │
                            ▼
                   Live Portfolio Website
```

### Workflow Explanation

1. Changes are made to the portfolio code in VS Code.
2. The changes are staged using Git.
3. A Git commit is created.
4. The changes are pushed to the GitHub repository.
5. GitHub Actions automatically starts the configured workflows.
6. The CI workflow validates the required portfolio files.
7. The CD workflow deploys the website files to GitHub Pages.
8. The updated portfolio becomes available on the live website.

> **Note:** In the current implementation, the CI and CD workflows are separate workflows and are triggered independently by a push to the `main` branch. Configuring CD to wait for a successful CI run is listed as a future improvement.

---

## 6. Git and GitHub Workflow

Git was used as the version control system, while GitHub was used to remotely store and manage the project source code.

The local portfolio project was connected to the GitHub repository:

`portfolio-devops`

### Development Workflow

Whenever changes were made to the portfolio:

```text
Make changes in VS Code
        ↓
Stage changes using Git
        ↓
Create a commit
        ↓
Push changes to GitHub
        ↓
GitHub Actions starts automatically
```

### Git Commands Used

#### 1. Check Project Status

```bash
git status
```

This command was used to check which files were modified, staged, or committed.

#### 2. Stage Changes

```bash
git add .
```

This stages all modified and newly created files for the next commit.

#### 3. Create a Commit

```bash
git commit -m "message"
```

This records the staged changes in the local Git repository.

#### 4. Push Changes to GitHub

```bash
git push
```

This uploads the committed changes from the local repository to GitHub.

### Example

For one of our portfolio changes, we used:

```bash
git add .
git commit -m "trial"
git push
```

After the push, GitHub received the changes and the configured GitHub Actions workflows were triggered automatically.

---

## 7. Continuous Integration (CI) Implementation

Continuous Integration was implemented using GitHub Actions.

A workflow file named `ci.yml` was created inside:

```text
.github/workflows/ci.yml
```

### Purpose of the CI Workflow

The CI workflow automatically runs whenever:

* Changes are pushed to the `main` branch.
* A pull request is created or updated for the `main` branch.

The workflow validates that the required portfolio files exist before considering the CI process successful.

### CI Workflow

```yaml
name: Portfolio CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  validate:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Validate HTML
        run: |
          test -f index.html
          echo "HTML file found"

      - name: Validate CSS
        run: |
          test -f style.css
          echo "CSS file found"

      - name: Validate JavaScript
        run: |
          test -f script.js
          echo "JavaScript file found"
```

### Explanation

#### `name`

```yaml
name: Portfolio CI
```

Defines the name of the GitHub Actions workflow.

#### `on`

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

Defines when the CI workflow should run.

In our project, CI runs when:

* Code is pushed to `main`.
* A pull request is created or updated for `main`.

#### `jobs`

```yaml
jobs:
  validate:
```

Defines the job that performs the CI validation.

#### `runs-on`

```yaml
runs-on: ubuntu-latest
```

Specifies that the job runs on a GitHub-hosted Ubuntu environment.

#### Checkout Code

```yaml
- name: Checkout code
  uses: actions/checkout@v4
```

Retrieves the repository code so that GitHub Actions can work with the project files.

#### Validate HTML

```yaml
- name: Validate HTML
  run: |
    test -f index.html
    echo "HTML file found"
```

Checks whether `index.html` exists.

#### Validate CSS

```yaml
- name: Validate CSS
  run: |
    test -f style.css
    echo "CSS file found"
```

Checks whether `style.css` exists.

#### Validate JavaScript

```yaml
- name: Validate JavaScript
  run: |
    test -f script.js
    echo "JavaScript file found"
```

Checks whether `script.js` exists.

### CI Result

After pushing the CI workflow to GitHub, the **Portfolio CI** workflow executed successfully and displayed a green check mark in GitHub Actions.

This confirmed that our CI workflow was working correctly.

---

## 8. Continuous Deployment (CD) Implementation

Continuous Deployment was implemented using GitHub Actions and GitHub Pages.

A workflow file named `deploy.yml` was created inside:

```text
.github/workflows/deploy.yml
```

### Purpose of the CD Workflow

The CD workflow automatically deploys the portfolio website to GitHub Pages whenever changes are pushed to the `main` branch.

This means that after making changes to the website and pushing them to GitHub, the updated website can be deployed automatically without manually uploading the files.

### CD Workflow

```yaml
name: Deploy Portfolio

on:
  push:
    branches:
      - main

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Setup GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload website files
        uses: actions/upload-pages-artifact@v4
        with:
          path: "."

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Explanation

#### Workflow Name

```yaml
name: Deploy Portfolio
```

Defines the name of the deployment workflow.

#### Trigger

```yaml
on:
  push:
    branches:
      - main
```

The deployment workflow runs automatically when changes are pushed to the `main` branch.

We also included:

```yaml
workflow_dispatch:
```

This allows the workflow to be started manually from GitHub Actions.

#### Permissions

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

These permissions allow the workflow to read the repository and deploy the website through GitHub Pages.

#### Checkout Repository

```yaml
- name: Checkout repository
  uses: actions/checkout@v6
```

Retrieves the latest version of the repository code so that it can be deployed.

#### Configure GitHub Pages

```yaml
- name: Setup GitHub Pages
  uses: actions/configure-pages@v5
```

Configures the GitHub Pages environment for deployment.

#### Upload Website Files

```yaml
- name: Upload website files
  uses: actions/upload-pages-artifact@v4
  with:
    path: "."
```

Packages the website files and prepares them for deployment.

The `.` represents the current repository directory.

#### Deploy to GitHub Pages

```yaml
- name: Deploy to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v4
```

Deploys the uploaded website files to GitHub Pages.

### GitHub Pages Configuration

Before deploying, we configured GitHub Pages from:

```text
Repository
    ↓
Settings
    ↓
Pages
    ↓
Source
    ↓
GitHub Actions
```

This allowed GitHub Actions to control the deployment.

### CD Result

After making changes to the portfolio and pushing them to GitHub, the **Deploy Portfolio** workflow executed successfully.

The workflow displayed a green check mark, confirming that the portfolio was successfully deployed through GitHub Actions to GitHub Pages.

---

## 9. Testing the CI/CD Pipeline

After configuring both CI and CD, the pipeline was tested using an actual change to the portfolio website.

### Test Process

1. A change was made to the portfolio website in VS Code.
2. The modified files were staged using Git.
3. A Git commit was created.
4. The changes were pushed to the `main` branch on GitHub.
5. GitHub Actions automatically detected the push.
6. The CI workflow was triggered.
7. The CI workflow completed successfully.
8. The CD workflow was triggered.
9. The portfolio was deployed to GitHub Pages.
10. The updated website was verified.

### Commands Used

```bash
git add .
git commit -m "trial"
git push
```

### Result

The test was successful.

Both GitHub Actions workflows showed a successful execution with a green check mark.

The updated portfolio was also successfully deployed to GitHub Pages.

Therefore, the CI and CD workflows were confirmed to be working.

### Verified Workflow

```text
Change in VS Code
       ↓
git add .
       ↓
git commit
       ↓
git push
       ↓
GitHub Repository
       ↓
   ┌───┴────┐
   ↓        ↓
   CI       CD
   ↓        ↓
Validate   Deploy
   ↓        ↓
Success   GitHub Pages
            ↓
    Updated Portfolio
```

---

## 10. Problems Encountered and Solutions

During the implementation of the CI/CD pipeline, we encountered a few issues.

### 1. Git Push Rejected

While pushing changes to GitHub, the push was rejected with:

```text
! [rejected] main -> main (fetch first)
```

#### Reason

The remote GitHub repository contained changes that were not present in the local repository.

#### Solution

We first updated the local branch using:

```bash
git pull origin main --rebase
```

After the rebase completed successfully, we pushed the changes again:

```bash
git push
```

The push was successful.

---

### 2. GitHub Actions Node.js Warning

The deployment workflow displayed a warning indicating that some actions were using Node.js 20 and were being forced to run on Node.js 24.

#### Result

This was only a warning and did not cause the workflow to fail.

The deployment completed successfully, so no changes were made to the working deployment configuration.

---

### 3. Understanding CI and CD

During the project, we clarified the individual responsibilities of CI and CD:

```text
CI → Check and validate the code

CD → Deploy the application
```

For this project:

```text
ci.yml     → Continuous Integration

deploy.yml → Continuous Deployment
```

Both workflows were successfully tested.

---

## 11. Final Project Structure

The final project structure is:

```text
portfolio-devops/
│
├── index.html
├── style.css
├── script.js
├── README.md
│
└── .github/
    └── workflows/
        ├── ci.yml
        └── deploy.yml
```

### File Description

| File         | Purpose                            |
| ------------ | ---------------------------------- |
| `index.html` | Portfolio website structure        |
| `style.css`  | Portfolio styling                  |
| `script.js`  | Portfolio JavaScript functionality |
| `README.md`  | Project documentation              |
| `ci.yml`     | Continuous Integration workflow    |
| `deploy.yml` | Continuous Deployment workflow     |

---

## 12. Complete CI/CD Workflow

The complete workflow implemented in this project is:

```text
                    Developer
                        │
                        ▼
                     VS Code
                        │
                  Make changes
                        │
                        ▼
                       Git
                        │
                 git add / commit
                        │
                        ▼
                    git push
                        │
                        ▼
               GitHub Repository
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
       Portfolio CI          Deploy Portfolio
        (ci.yml)               (deploy.yml)
             │                     │
             ▼                     ▼
       Validate files        Upload website files
                                   │
                                   ▼
                             GitHub Pages
                                   │
                                   ▼
                         Updated Portfolio
```

### Final Result

The portfolio project now has an automated CI/CD workflow using GitHub Actions.

Whenever changes are pushed to the `main` branch:

* The CI workflow validates the required project files.
* The CD workflow deploys the portfolio.
* GitHub Pages hosts the updated website.

No manual website deployment is required.

---

## 13. What I Learned

Through this project, I learned:

* How Git is used for version control.
* How to connect a local project with GitHub.
* How to create GitHub Actions workflows.
* The difference between Continuous Integration and Continuous Deployment.
* How CI workflows can automatically validate project files.
* How CD workflows can automatically deploy a website.
* How GitHub Pages can be used to host a static website.
* How GitHub Actions can automate repetitive development and deployment tasks.
* How to troubleshoot Git push and workflow-related issues.
* How CI and CD workflows work as part of a DevOps process.

---

## 14. Future Improvements

The current project demonstrates the basic CI/CD process successfully.

Possible future improvements include:

* Add proper HTML validation.
* Add CSS validation.
* Add JavaScript linting.
* Add automated tests.
* Add a build process.
* Configure CD to deploy only after CI passes successfully.
* Add separate development and production environments.
* Add automated notifications for workflow failures.

---

## 15. Interview Explanation

### How I Explain This Project

I used my personal portfolio website as a practical CI/CD project.

I hosted the source code on GitHub and implemented GitHub Actions for Continuous Integration and Continuous Deployment.

For CI, I created a workflow that automatically validates the required portfolio files whenever code is pushed to the `main` branch or a pull request is created or updated.

For CD, I created a separate GitHub Actions workflow that automatically deploys the website to GitHub Pages whenever changes are pushed to the `main` branch.

I tested the pipeline by modifying the portfolio in VS Code, committing the changes using Git, and pushing them to GitHub. The GitHub Actions workflows executed successfully and the updated portfolio was deployed automatically.

This project helped me understand how source control, CI, automated workflows, and deployment work together in a DevOps pipeline.
