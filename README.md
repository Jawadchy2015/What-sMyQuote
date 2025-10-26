# What-sMyQuote

## 🚀 Project Goal

The primary objective of the **What-sMyQuote** application is to streamline key activities for Bell Mobility Sales Representatives, enabling more efficient customer interactions and performance tracking.

## 🎯 Target Audience

**Bell Mobility Sales Representatives**

This tool is designed to serve as a central hub for generating quotes, managing customer follow-ups, and tracking sales progress.

## ✨ Key Features & Functionality

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Mobile Plan Quote Generation** | Allows Sales Reps to quickly and accurately generate mobile plan quotes based on specific customer needs and current promotions. | In Progress |
| **Quote Sharing & Saving** | Provides functionality to save generated quotes and easily share them with customers via email or SMS for follow-up. | Planned |
| **MTD Attainment Metric Visibility** | Displays a real-time view of Month-To-Date (MTD) sales attainment metrics to help reps track their performance against goals. | Planned |
| **Lucky-to-Postpaid Reminders** | Generates automated reminders for "Lucky Mobile" prepaid customers nearing the end of their plan, identifying prime candidates for postpaid conversion. | Planned |

## 🛠️ Technology Stack

| Component | Technology | Notes |
| :--- | :--- | :--- |
| **Frontend (Client)** | HTML, CSS, JavaScript | Interactive user interface for quote generation and data viewing. |
| **Backend (Server)** | Node.js (Express) | Handles business logic, API routing, and data interaction. |
| **Database** | MongoDB | Stores customer quotes, sales data, and reminder tracking information. |

***

### ⚙️ Getting Started (For Developers)

To run the project locally, ensure you have Node.js and npm installed, and a running instance of MongoDB.

1.  **Clone the Repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd What-sMyQuote
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Start the Server (Development Mode):**
    ```bash
    # Uses nodemon (if installed) for automatic restarts
    npm run dev
    ```
    The server will typically run on `http://localhost:3000` (or the port defined in `server.js`).