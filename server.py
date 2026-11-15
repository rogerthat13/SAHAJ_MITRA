import os
import sys
import random

# Ensure local lib directory is in sys.path if present
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
lib_path = os.path.join(BASE_DIR, "lib")
if os.path.isdir(lib_path) and lib_path not in sys.path:
    sys.path.insert(0, lib_path)

from flask import Flask, request, jsonify, render_template
import database

# Initialize the SQLite database on startup
database.init_db()

# Create Flask application instance
# 'app' is the standard variable expected by PythonAnywhere WSGI
app = Flask(
    __name__,
    static_folder=os.path.join(BASE_DIR, "static"),
    static_url_path="/static",
    template_folder=os.path.join(BASE_DIR, "templates")
)

@app.after_request
def add_cors_and_cache_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    if request.path.startswith("/api"):
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
    return response

# --------------------------------------------------------------------------
# Frontend Routes
# --------------------------------------------------------------------------

@app.route("/")
@app.route("/index.html")
def index():
    return render_template("index.html")

# --------------------------------------------------------------------------
# REST API Endpoints
# --------------------------------------------------------------------------

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "app": "Sahaj Mitra",
        "framework": "Flask",
        "version": "1.0"
    })

@app.route("/api/items", methods=["GET"])
def get_items():
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM items WHERE in_stock = 1 ORDER BY category, id")
    rows = cursor.fetchall()
    conn.close()

    items = []
    for r in rows:
        items.append({
            "id": r["id"],
            "category": r["category"],
            "name_en": r["name_en"],
            "name_hi": r["name_hi"],
            "description": r["description"],
            "price": r["price"],
            "unit_type": r["unit_type"],
            "unit_label": r["unit_label"],
            "image_url": r["image_url"],
            "piece_price": r["piece_price"],
            "in_stock": bool(r["in_stock"])
        })

    return jsonify({"success": True, "items": items})

@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json(silent=True) or {}
    customer_name = (data.get("customer_name") or "Festive Customer (ग्राहक)").strip()
    customer_phone = (data.get("customer_phone") or "Not Provided").strip()
    payment_method = data.get("payment_method", "cash")
    customer_note = data.get("customer_note", "")
    items = data.get("items", [])

    if not items:
        return jsonify({"success": False, "error": "Order must contain at least one item."}), 400

    # Calculate total and generate unique token
    total_amount = 0.0
    for item in items:
        total_amount += float(item.get("subtotal", 0.0))

    token_num = database.get_next_token()
    # Waiting time between 60s and 120s (1 to 2 minutes)
    estimated_wait_seconds = random.randint(70, 110)
    payment_status = "paid" if payment_method == "upi" else "pending_cash"

    conn = database.get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO orders (token_number, customer_name, customer_phone, total_amount, payment_method, payment_status, status, estimated_wait_seconds, customer_note)
    VALUES (?, ?, ?, ?, ?, ?, 'received', ?, ?)
    """, (token_num, customer_name, customer_phone, total_amount, payment_method, payment_status, estimated_wait_seconds, customer_note))

    order_id = cursor.lastrowid

    for it in items:
        cursor.execute("""
        INSERT INTO order_items (order_id, item_id, item_name, quantity, unit, unit_price, subtotal)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            order_id,
            it.get("item_id", ""),
            it.get("item_name", ""),
            float(it.get("quantity", 1)),
            it.get("unit", "pcs"),
            float(it.get("unit_price", 0)),
            float(it.get("subtotal", 0))
        ))

    conn.commit()
    conn.close()

    # Simulated SMS notification message
    sms_notification_message = (
        f"प्रिय {customer_name}, आपकी खरीदारी का टोकन नं: #{token_num} है। "
        f"कुल बिल राशि: ₹{total_amount:.2f}। कृपया काउंटर से 1-2 मिनट में प्राप्त करें। "
        f"सहज मित्र व दुकानदार की ओर से त्योहार की हार्दिक शुभकामनाएँ!"
    )

    return jsonify({
        "success": True,
        "order_id": order_id,
        "token_number": token_num,
        "total_amount": round(total_amount, 2),
        "payment_method": payment_method,
        "payment_status": payment_status,
        "estimated_wait_seconds": estimated_wait_seconds,
        "customer_phone": customer_phone,
        "customer_name": customer_name,
        "sms_dispatch": {
            "sent": True,
            "phone": customer_phone,
            "message": sms_notification_message
        }
    })

@app.route("/api/orders", methods=["GET"])
def get_orders():
    status_filter = request.args.get("status")

    conn = database.get_db_connection()
    cursor = conn.cursor()

    if status_filter and status_filter != "all":
        cursor.execute("SELECT * FROM orders WHERE status = ? ORDER BY id DESC", (status_filter,))
    else:
        cursor.execute("SELECT * FROM orders ORDER BY id DESC LIMIT 50")
    orders_rows = cursor.fetchall()

    orders = []
    for ord_row in orders_rows:
        ord_id = ord_row["id"]
        cursor.execute("SELECT * FROM order_items WHERE order_id = ?", (ord_id,))
        item_rows = cursor.fetchall()
        order_items = [{
            "id": ir["id"],
            "item_name": ir["item_name"],
            "quantity": ir["quantity"],
            "unit": ir["unit"],
            "unit_price": ir["unit_price"],
            "subtotal": ir["subtotal"]
        } for ir in item_rows]

        orders.append({
            "id": ord_row["id"],
            "token_number": ord_row["token_number"],
            "customer_name": ord_row["customer_name"],
            "customer_phone": ord_row["customer_phone"],
            "total_amount": ord_row["total_amount"],
            "payment_method": ord_row["payment_method"],
            "payment_status": ord_row["payment_status"],
            "status": ord_row["status"],
            "estimated_wait_seconds": ord_row["estimated_wait_seconds"],
            "created_at": ord_row["created_at"],
            "customer_note": ord_row["customer_note"],
            "items": order_items
        })

    conn.close()
    return jsonify({"success": True, "orders": orders})

@app.route("/api/orders/<order_id>", methods=["GET"])
def get_single_order(order_id):
    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM orders WHERE id = ? OR token_number = ?", (order_id, order_id))
    ord_row = cursor.fetchone()

    if not ord_row:
        conn.close()
        return jsonify({"success": False, "error": "Order not found"}), 404

    cursor.execute("SELECT * FROM order_items WHERE order_id = ?", (ord_row["id"],))
    item_rows = cursor.fetchall()
    order_items = [{
        "id": ir["id"],
        "item_name": ir["item_name"],
        "quantity": ir["quantity"],
        "unit": ir["unit"],
        "unit_price": ir["unit_price"],
        "subtotal": ir["subtotal"]
    } for ir in item_rows]

    order_data = {
        "id": ord_row["id"],
        "token_number": ord_row["token_number"],
        "customer_name": ord_row["customer_name"],
        "customer_phone": ord_row["customer_phone"],
        "total_amount": ord_row["total_amount"],
        "payment_method": ord_row["payment_method"],
        "payment_status": ord_row["payment_status"],
        "status": ord_row["status"],
        "estimated_wait_seconds": ord_row["estimated_wait_seconds"],
        "created_at": ord_row["created_at"],
        "items": order_items
    }
    conn.close()
    return jsonify({"success": True, "order": order_data})

@app.route("/api/orders/<order_id>", methods=["PATCH"])
def patch_order(order_id):
    data = request.get_json(silent=True) or {}
    fields_to_update = []
    params = []
    if "status" in data:
        fields_to_update.append("status = ?")
        params.append(data["status"])
    if "payment_status" in data:
        fields_to_update.append("payment_status = ?")
        params.append(data["payment_status"])

    if not fields_to_update:
        return jsonify({"success": False, "error": "No valid fields to update"}), 400

    params.append(order_id)
    conn = database.get_db_connection()
    cursor = conn.cursor()
    query = f"UPDATE orders SET {', '.join(fields_to_update)} WHERE id = ?"
    cursor.execute(query, params)
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": "Order updated successfully"})

@app.route("/api/items/update_price", methods=["POST"])
def update_item_price():
    data = request.get_json(silent=True) or {}
    item_id = data.get("item_id")
    new_price = float(data.get("price", 0))

    conn = database.get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE items SET price = ? WHERE id = ?", (new_price, item_id))
    conn.commit()
    conn.close()

    return jsonify({"success": True, "message": f"Price updated to ₹{new_price}"})

@app.route("/api/stats", methods=["GET"])
def get_stats():
    conn = database.get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*), COALESCE(SUM(total_amount), 0) FROM orders")
    total_orders, total_revenue = cursor.fetchone()

    cursor.execute("SELECT COUNT(*) FROM orders WHERE status IN ('received', 'packing')")
    pending_orders = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM orders WHERE payment_method = 'upi'")
    upi_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM orders WHERE payment_method = 'cash'")
    cash_count = cursor.fetchone()[0]

    conn.close()

    return jsonify({
        "success": True,
        "total_orders": total_orders,
        "total_revenue": round(total_revenue, 2),
        "pending_orders": pending_orders,
        "upi_count": upi_count,
        "cash_count": cash_count
    })

# --------------------------------------------------------------------------
# Main Execution (for local running)
# --------------------------------------------------------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    print("===============================================================")
    print("  SAHAJ MITRA (सहज मित्र) - Festive Street Vendor Assistant")
    print("  Running with Flask | PythonAnywhere WSGI ready (app variable)")
    print(f"  Local URL: http://localhost:{port}")
    print("===============================================================")
    app.run(host="0.0.0.0", port=port, debug=True)
