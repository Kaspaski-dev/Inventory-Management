import sqlite3

# Conectar a la base de datos (crea el archivo si no existe)
conn = sqlite3.connect('products.db')
cursor = conn.cursor()

# Crear la tabla 'products' si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        stock INTEGER NOT NULL
    )
''')

# Insertar datos de prueba opcionales
cursor.execute("INSERT INTO products (name, price, stock) VALUES ('Laptop', 1200.99, 5);")
cursor.execute("INSERT INTO products (name, price, stock) VALUES ('Mouse', 25.50, 50);")
cursor.execute("INSERT INTO products (name, price, stock) VALUES ('Keyboard', 45.00, 30);")

# Guardar cambios y cerrar la conexión
conn.commit()
conn.close()

print("✅ Database initialized successfully!")
