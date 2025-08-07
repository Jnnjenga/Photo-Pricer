### Photography Pricing App

This is a simple web application built with React to help photographers calculate pricing for their services and generate professional-looking PDF invoices.

#### **Features**

  * **Flexible Pricing Models**: The app supports two pricing models: a detailed hourly breakdown and a simple flat fee.
  * **Persistent Data**: Key business details like hourly rates, equipment costs, and business contact information are saved in the browser's local storage for future use.
  * **Detailed Cost Breakdown**: The app calculates and displays a detailed breakdown of costs, including time, equipment depreciation, and other expenses.
  * **Professional PDF Invoices**: Users can generate a professional, print-ready PDF invoice that includes project and client details, an automatically-generated invoice number, and a full pricing breakdown.
  * **Customizable Invoice Details**: The invoice can be personalized with your business name, contact number, and email.

#### **Technology Stack**

  * **React**: The core framework for building the user interface.
  * **React Router**: For managing navigation between the pricing form and the summary page.
  * **html2canvas**: A library used to take a screenshot of the HTML content, which is then used to create the PDF.
  * **jsPDF**: A client-side library for generating and saving PDF files.

#### **Getting Started**

To run this project locally, you will need to have Node.js and npm installed.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Jnnjenga/Photo-Pricer.git
    cd Photo-Pricer
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Start the development server**:
    ```bash
    npm start
    ```

The app will then be available at `http://localhost:3000` in your web browser.
