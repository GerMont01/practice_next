# Super Mobile - Full-Stack E-commerce for Mobile Devices

Welcome to **Super Mobile**, a full-stack e-commerce platform designed for purchasing mobile devices.

---

## 🌟 Features

### 1. **Dynamic Product Filtering**  
   - The products page includes a **powerful and dynamic filter system**:
     - Filters can be combined dynamically (e.g., filter by brand, price, and operating system simultaneously).  
     - As you apply filters, the other filter options **automatically adjust** to display only options relevant to the current filter.  
     - This ensures that you will **never encounter a "no match" result**, providing a seamless and frustration-free shopping experience.

### 2. **Persistent Shopping Cart**  
   - The shopping cart functionality is implemented using **cookies**:
     - Items in the cart are **persisted across sessions** so users can leave the site and return to find their cart intact.

### 3. **Full-Stack Architecture**  
   - Backend API logic is built using **Next.js API Routes**, which handle:
     - Cart management.
     - Dynamic product filtering.
     - Data processing for the frontend.

### 4. **Responsive Design**  
   - Fully responsive across different screen sizes, providing an optimized shopping experience for mobile, tablet, and desktop users.

### 5. **Intuitive UI/UX**  
   - A modern and clean user interface designed for easy navigation.
   - User-friendly interactions, including hover effects, loading states, and smooth page transitions.

---

## ⚙️ Technologies Used

This project is built using the following frameworks, libraries, and tools:

- **[Next.js](https://nextjs.org/)**
- **NextUI**
- **TailwindCSS**
- **Redux Toolkit**
- **React-Redux** 
- **HeroIcons**

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1. Clone the repository:  
   ```bash
   git clone https://github.com/GerMont01/practice_next.git

2. Navigate to the project folder:
    ```bash
    cd practice_next

3. Install dependencies:
    ```bash
    npm install

4. Start the development server:
    ```bash
    npm run dev

5. Open your browser and navigate to:
    ```bash
    http://localhost:3000

---

## 📂 Folder Structure
Here's an overview of the folder structure for the project:

project-root/
├── public/                    # Static assets (e.g., images, icons)
├── src/
│   ├── app/                   # Next.js App Router (API routes and pages)
│   │   ├── api/
│   │   │   └── contact/
│   │   │   └── get_all_devices/
│   │   │   └── product_description/
│   │   │   └── products/
│   │   │   └── cart/ 
│   │   ├── about/ 
│   │   ├── cart/ 
│   │   ├── contact/ 
│   │   ├── products/ 
│   │   │   └── [id]/
│   │   └── layout.js
│   │   └── page.js
│   ├── components/            # Reusable UI components
│   ├── styles/                # Tailwind and global styles
│   ├── store/                 # Redux state management (cart logic)
├── next.config.js             # Next.js configuration
└── package.json               # Project dependencies

## 🌍 Live Demo
You can access the live version of the project here:
https://super-mobile-m6yer0wy3-germont01s-projects.vercel.app/

Thank you for checking out Super Mobile!