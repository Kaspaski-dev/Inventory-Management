from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect('products.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/')
def index():
    return render_template('inventory.html')


@app.route('/inventory')
def inventory():
    return render_template('inventory.html')


@app.route('/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    products = conn.execute('SELECT * FROM products').fetchall()
    conn.close()
    return jsonify([dict(row) for row in products])


@app.route('/add_product', methods=['POST'])
def add_product():
    data = request.json
    conn = get_db_connection()
    cursor = conn.execute('SELECT * FROM products WHERE name = ?', (data['name'],))
    existing_product = cursor.fetchone()

    if existing_product:
        new_stock = existing_product['stock'] + data['stock']
        conn.execute('UPDATE products SET stock = ? WHERE id = ?', (new_stock, existing_product['id']))
        message = "Stock updated successfully!"
    else:
        conn.execute('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
                     (data['name'], data['price'], data['stock']))
        message = "Product added successfully!"

    conn.commit()
    conn.close()

    return jsonify({'message': message})



@app.route('/delete_product/<int:id>', methods=['DELETE'])
def delete_product(id):
    conn = get_db_connection()
    cursor = conn.execute('DELETE FROM products WHERE id = ?', (id,))
    conn.commit()

    if cursor.rowcount == 0:
        conn.close()
        return jsonify({'error': 'Product not found'}), 404

    conn.close()
    return jsonify({'message': 'Product deleted successfully'})


if __name__ == '__main__':
    app.run(debug=True)