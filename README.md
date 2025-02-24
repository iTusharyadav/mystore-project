
<h1 align="center" style="margin-bottom: 0;">MyStore E-Commerce Project 🌐</h1>
## Overview 🎉

Welcome to **MyStore**! This is a simple React-based e-commerce website where users can browse products, search by category, view detailed product information, and simulate a shopping experience. The app fetches data from the **FakeStore API** to display products, handle user searches, and allow interaction with a product modal for detailed views. 🛍️

## Features 🚀

- **Product Search** 🔍: Search for products by category (e.g., Electronics, Jewelry).
- **Responsive Design** 📱💻: The app adapts seamlessly across mobile, tablet, and desktop devices.
- **Product Cards** 🏷️: Display product cards with images, prices, and ratings.
- **Product Modal** 🛒: Click on any product card to view more details in a modal window.
- **Cart Counter** 🛍️: Add products to the cart (local state-based cart functionality).
- **Show More/Show Less** ⬇️: Control the number of products displayed at once with a "Show More" button.

## Getting Started 🚀

### Prerequisites 📦

- **Node.js** installed
- **npm** (or yarn)

### Installation 💻

1. Clone the repository:

   ```bash
   git clone https://github.com/iTusharyadav/mystore-project.git
   ```

2. Navigate to the project directory:

   ```bash
   cd mystore-project
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Project 🔥

To run the project locally, use the following command:

```bash
npm start
```

The app will launch in your browser at [http://localhost:3000](http://localhost:3000). 🚀

## Technologies Used 🛠️

- **ReactJS** for building the front-end.
- **TailwindCSS** for styling and responsive design.
- **React Hooks** for state management (`useState`, `useEffect`).
- **FakeStore API** for fetching product data.

## Design Decisions 💡

I used **TailwindCSS** for styling the app, ensuring a clean, responsive, and customizable layout. 🌟

Key features added:
- **Show More/Less** feature: By default, 8 products are shown, and users can click "Show More" to view more products. This helps with a better user experience when dealing with large sets of products. 📈
- **Search Bar**: Users can filter products by category, dynamically fetched from the FakeStore API. 🔍
- **Product Modal**: Clicking on a product card opens a modal displaying the product's description, price, image, and an "Add to Cart" button. 🛍️

## Areas of Improvement & Struggles 💪

While developing this project, I faced minimal challenges and successfully implemented all required features. 😊 The primary challenge was ensuring the app's **responsiveness** and handling **dynamic data**, especially when integrating the **Show More/Less** functionality with the product list. 🖥️

Given more time, I would focus on:
- **Enhancing the Cart**: Adding more robust state management and cart functionality, along with the possibility to track products.
- **Checkout Flow**: Implementing a full checkout flow and integrating a real cart API. 💳
- **Error Handling**: Improving error handling for failed API calls. 🛑

## Conclusion 🎉

**MyStore** is a simple and engaging e-commerce app that provides an immersive shopping experience. It features product browsing, modal details, and a simulated cart. It's fully responsive and optimized for a seamless user experience across mobile, tablet, and desktop devices. 🛍️


