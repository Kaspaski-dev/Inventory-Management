📦 Inventory Management System

📖 Description

This is a simple web-based inventory management system built with Flask, SQLite, and Bootstrap. The application allows users to:

-Add new products to the inventory

Update stock for existing products

Delete products from the list

-Search products by name

-View inventory statistics (total products, stock, and value)

🚀 Features

-Dynamic product listing with real-time updates.

-Search functionality for quick product filtering.

-Automatic stock updating when adding an existing product.

-Simple UI with Bootstrap styling.

-SQLite Database for lightweight and efficient storage.

📂 Project Structure

project-folder/ │── static/ │ ├── style.css # Custom styles │ ├── inventory.js # Frontend logic │── templates/ │ ├── inventory.html # Main inventory page │── app.py # Flask backend │── products.db # SQLite database │── create_db.py # Script to initialize database │── README.md # Project documentation

⚙️ Installation & Setup

1️ Clone the Repository

git clone https://github.com/Kaspaski-dev/inventory-app.git cd inventory-app

2️ Create a Virtual Environment (Optional but Recommended)

python -m venv venv source venv/bin/activate # For macOS/Linux venv\Scripts\activate # For Windows

3️ Install Dependencies

pip install flask

4️ Initialize the Database

python create_db.py

5️ Run the Application

python app.py

The app will be available at: http://127.0.0.1:5000/

🛠️ Usage

Add a product by filling in the name, price, and stock, then clicking "Add Product".

Search for products using the search bar above the product table.

Click "Delete" to remove a product from inventory.

🤝 Contributing

Feel free to fork the repository and submit pull requests with improvements!

📜 License

This project is licensed under the MIT License.

🏆 Credits

Developed by Kaspaski-dev
