import os
import psycopg2
import uuid
from dotenv import load_dotenv

load_dotenv()

db_params = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST')
}

def fetch_uuid_by_name(cursor, table, column, name):
    cursor.execute(f"SELECT {table}_id FROM {table}s WHERE {column} = %s", (name,))
    result = cursor.fetchone()
    return result[0] if result else None

def main():
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    email = 'Frank'
    dorm_name = 'Kusch House'

    author_uuid = fetch_uuid_by_name(cursor, 'user', 'email', email)
    dorm_uuid = fetch_uuid_by_name(cursor, 'dorm', 'name', dorm_name)

    random_uuid = uuid.uuid4()

    if author_uuid and dorm_uuid:
        review_content = 'This is the review text.'
        sql = "INSERT INTO reviews (review_id, body, star_rating, user_id, dorm_id) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute(sql, (str(random_uuid), review_content, 4, author_uuid, dorm_uuid))
        conn.commit()

    cursor.close()
    conn.close()

if __name__ == '__main__':
    main()
