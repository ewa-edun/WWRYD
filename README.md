## **WWYRD (What Would Your Role Model Do?)**

### **Description**

WWYRD is an interactive decision-making assistant inspired by iconic role models such as Tony Stark, Jensen Huang, Manmohan Singh, Hedy Lamarr, Marie Curie, and Princess Diana (Princess of Wales). The app provides witty, personality-driven responses to help users make decisions, set goals, and stay on track with their resolutions. Whether you're trying to solve a problem or need guidance, WWYRD channels the wisdom and humor of your favorite role models to help you navigate life's challenges.

### **Features**

1. **Role Model Selector**
    
    Users can choose from a variety of role models such as Tony Stark, Hedy Lamarr, and Marie Curie. Each role model brings their own personality and approach to decision-making.
    
2. **Ask a Question**
    
    Users can type a question or a challenge they're facing, like "Should I take this opportunity?" or "How can I be more productive?"
    
3. **Role Model-Inspired Responses**
    
    Depending on the chosen role model, the app generates witty, inspiring, or snarky responses that reflect their unique personalities and outlooks on life.
    
4. **Resolution Suggestions**
    
    Based on the role model's persona, the app suggests resolutions such as "Invent a new tech gadget" or "Start a groundbreaking scientific experiment," with helpful breakdowns to guide users on how to achieve them.
    
5. **Simple, Intuitive UI**
    
    A sleek, user-friendly interface that allows for easy navigation and interaction. It features cards for role model selection and an interactive input box for questions.
    
6. **Backed by Technology**
    
    The app integrates with AI to generate creative responses, powered by Gemini API for natural language generation.
    
---

### Pages

1. Home: Introduces WWYRD and has card components of 6 people(3 men, 3 women): Tony Stark, Hedy Lamarr, Marie Curie, Manmoman Singh, Jensen Huang, and Princess Diana.

2. Role-Model page: 6 different role model pages which will have a color scheme similar to them. Tony stark with iron man colors, Hedy Lamarr with withe and Gold (from that picture) etc

3. Authentication page: A sign up and login page.
---

### **Technologies Used**

- **Frontend**:
    - **React**: A JavaScript library for building user interfaces.
    - **CSS**: Used for styling, including hover effects, animations, and responsiveness.
- **Backend**:
    - **Firebase**: For user authentication and for database to store users previous chats.
- **Natural Language Generation API**:
    - Gemini 2.0 flash
        
---

### **Setup Instructions**

### 1. **Clone the Repository**

First, clone the repository to your local machine:

```bash
bash
CopyEdit
git clone https://github.com/ewa-edun/WWYRD.git
cd WWRYD

```

### 2. **Install Frontend Dependencies**

- Navigate to the React project folder:
    
    ```bash
    bash
    CopyEdit
    npm install
    
    ```
    

### 3. **Install Backend Dependencies**

- Navigate to the backend folder (if different from frontend) and install Flask:
    
    ```bash
    bash
    CopyEdit
    pip install flask
    
    ```
    

### 4. **Configure the API Key**

- For the language generation API (Gemini), sign up for an API key and replace the placeholder in the `gemini.js` with your actual key.

### 5. **Run the Application**

- Start the Flask server:
    
    ```bash
    bash
    CopyEdit
    python app.py
    
    ```
    
- Run the React frontend:
    
    ```bash
    bash
    CopyEdit
    npm run dev
    
    ```
    

Open your browser and go to `http://localhost:5173`.

---

### **App Workflow**

1. **Choose Your Role Model**:
    - Users select a role model (e.g., Tony Stark, Marie Curie, etc.) via a card-based interface.
2. **Ask a Question**:
    - Users type in a decision or challenge they’re facing. For example, "Should I try a new hobby?" or "What career path should I follow?"
3. **Get Response**:
    - The app uses the Gemini API to generate a witty or insightful response based on the role model’s persona.
4. **Resolution Suggestions**:
    - Based on the response, users receive a resolution suggestion (e.g., "Learn to build something cool" or "Take a bold step in your career") with a breakdown on how to achieve it.

---

