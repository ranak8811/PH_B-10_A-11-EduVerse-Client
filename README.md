# **EduVerse**

Welcome to **EduVerse** – a dynamic and feature-packed educational platform where users can explore, book, and manage courses effortlessly. Whether you're a learner or a provider, EduVerse ensures a seamless and enjoyable experience with modern features and responsive design.

## **Live Site URL**

Check out the live version of EduVerse [EduVerse](https://eduverse-ph-a-11.web.app/)

---

## **Features**

### **1. User Course Management**

- **Add, Update, Delete Courses:** Users can easily manage courses using the platform's intuitive interface.
- **Book Courses:** Learners can book courses of their choice.
- **Status Updates:** Providers can change the status of a booked course to _Pending_, _Working_, or _Completed_ to track progress.

### **2. Home Page Features**

- **User Reviews:** The home page showcases reviews from users for transparency and trust.
- **FAQ Section:** Includes frequently asked questions to help users understand the platform better.
- **Animations:** Interactive animations using **Framer Motion** and smooth auto-typing text effects using **react-simple-typewriter**.

### **3. Theme Customization**

- Users can toggle between **light** and **dark** themes for a personalized experience.
- **Persistent Theme:** The selected theme is stored in **local storage**, ensuring the preference is retained across sessions.

### **4. Security and Verification**

- **JWT Authentication:** Ensures secure user activity. If any user attempts illegal activity, they will be logged out immediately.
- **Secure API Calls:** Custom Axios hooks are implemented for secure data fetching and restricted access to private pages.

### **5. Enhanced User Experience**

- **Loading States:** Beautiful animations to handle loading states, enhancing the user experience.
- **Search and Pagination:** The **All Services** page allows users to search for specific courses and navigate through them using pagination for better usability.

---

## **Technologies Used**

- **Frontend:**
  - **React.js**
  - **Tailwind CSS** for responsive design and theming.
  - **Framer Motion** for advanced animations.
  - **react-simple-typewriter** for auto-typing effects.
- **Backend:**
  - **Node.js** and **Express.js**
  - **JWT (JSON Web Tokens)** for authentication and authorization.
- **Database:**
  - **MongoDB** for storing courses, users, and other application data.
- **Data Fetching:**
  - **Axios** for efficient and clean API calls.

---

## **How to Run Locally**

1. Clone the repository:
   ```bash
   git clone https://github.com/programming-hero-web-course2/b10a11-client-side-ranak8811
   ```
2. Navigate to the project directory:
   ```bash
   cd eduverse
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open your browser and go to:
   ```
   http://localhost:4000
   ```

---

## **Key Highlights**

1. **Secure Platform:** With JWT, unauthorized users are logged out automatically, ensuring a safe environment.
2. **Interactive Design:** Animations powered by **Framer Motion** and responsive design using **Tailwind CSS**.
3. **Persistence:** User theme preferences are saved in local storage for consistent experiences.
4. **Smooth Data Handling:** Axios is used for all data fetching with error handling and custom hooks for secure API calls.
5. **Provider and Learner Features:** The platform caters to both course providers and learners with a full suite of management tools.

---

## 📞 Contact:

- **Email**: ranakrphone@gmail.com
- **Developer**: [Md. Anwar Hossain](https://github.com/ranak8811)

---

## **Contributors**

This platform was designed and developed by the **EduVerse Team**.

Feel free to contribute to this repository by submitting issues or creating pull requests. 🚀

---

Server Side code: https://github.com/ranak8811/PH_B-10_A-11-EduVerse-Server
