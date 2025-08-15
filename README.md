# 🎯 Y-Axis Job Application Automation (Playwright + TypeScript)

## 📌 Overview
This project is a **Playwright-based automation script** written in TypeScript that logs into the [Y-Axis Jobs Portal](https://jobs.y-axis.com/) and **automatically searches and applies for jobs** based on given parameters.

It:
- Logs into the portal using credentials from environment variables.
- Searches for jobs by title (and optionally by country).
- Iterates through job listings and applies for suitable ones.
- Handles pagination automatically until all results are processed.

---

## 🛠 Tech Stack
- **Language**: TypeScript
- **Automation Framework**: [Playwright](https://playwright.dev/)
- **Runtime**: Node.js

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/y-axis-job-auto-apply.git
cd y-axis-job-auto-apply
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Environment Variables

Local Development:
Create a .env file to store sensitive values like API keys or phone numbers (if the code is extended for online tracking).

GitHub Actions:
A .env file is not needed — store secrets in GitHub Actions Secrets, which are injected automatically during CI/CD runs.


### Configure Environment Variables
Create a `.env` file in the project root:
```env
AUTH_USERNAME=your-email@example.com
AUTH_PASSWORD=your-secure-password
```

> ⚠ **Security Note**: Do not commit `.env` files to your repository. Use `.gitignore`.

---

## ⚙ Configuration
Inside the script, edit the `datafor` object to set:
```ts
const datafor = {
  job: "software engineer",  // Job title to search for
  // country: "Canada",       // Optional: Uncomment & set country
};
```

Supported countries (commented list in code):
```
Australia, Canada, Denmark, Germany, Hong Kong, Ireland, 
New Zealand, Singapore, South Africa, UAE, United Kingdom, USA
```

---

## 🚀 Running the Script

**Development Mode (Headed Browser)**
```bash
npx playwright test --headed
```

**Headless Mode (Faster)**
```bash
npx playwright test
```

---

## 📜 What the Script Does
1. Opens the Y-Axis software jobs page.
2. Logs in using credentials from `.env`.
3. Searches for the given job title (and optional country).
4. Applies to all found jobs across all pages.
5. Skips already applied jobs and continues.
6. Closes confirmation pop-ups after applying.

---

## 📂 File Structure
```
📁 project-root
 ├── tests/
 │    └── apply-jobs.spec.ts   # Main script
 ├── package.json
 ├── playwright.config.ts
 ├── .env
 └── README.md
```

---

## ⚠️ Notes & Limitations
- The script relies on current Y-Axis page structure; changes in UI may require updates.
- Ensure your account is active and has a resume uploaded.
- Some jobs may have restrictions that prevent auto-application.
- The `waitForLoaderToDisappear` helper is used extensively to avoid race conditions.

---

## 📄 License
This project is open source. The included code is released under the MIT License, while any third-party libraries used retain their respective original licenses.


---

## 📬 Contact

For questions, feedback, or collaboration, feel free to reach out:
Name: Nithyanandhan V
Email: nithyanandha.velliyangiri@gmail.com
GitHub: [your-github-profile](https://github.com/NickolusAlex)