import logging
import sqlite3

table_schema = '''
CREATE TABLE record(
    uid INTEGER PRIMARY KEY,
    product_id INTEGER UNIQUE,
    quantity INTEGER
);
'''.strip()

conn = None
try:
    conn = sqlite3.connect('records.db')
    conn.row_factory = sqlite3.Row
except Exception as e:
    logging.error("Can't find DB")
    logging.exception(e)


def create_table():
    cur = conn.cursor()
    try:
        cur.execute(table_schema)
    except Exception as e:
        logging.exception(e)


if __name__ == '__main__':
    create_table()
