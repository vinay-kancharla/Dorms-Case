import json
import random
import uuid
import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

db_params = {
    'dbname': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'host': os.getenv('DB_HOST')
}

json_file_path = './data/dummy_data/reviews.json'

def fetch_uuid_by_name(cursor, table, column, name):
    cursor.execute(f"SELECT {table}_id FROM {table}s WHERE {column} = %s", (name,))
    result = cursor.fetchone()
    return result[0] if result else None

def insert_review(review, author_uuid, dorm_uuid, cursor):
    random_uuid = uuid.uuid4()
    sql = "INSERT INTO reviews (review_id, body, star_rating, dislikes, likes, user_id, dorm_id) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    cursor.execute(sql, (str(random_uuid), review["review"], int(round(float(review["starrating"]))), int(review["dislike"]), int(review["like"]), author_uuid, dorm_uuid))

def main():
    with open(json_file_path, 'r') as file:
        reviews_data = json.load(file)

    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    cursor.execute("SELECT email FROM users")
    usernames = cursor.fetchall()

    for dorm_name, reviews in reviews_data.items():
        dorm_uuid = fetch_uuid_by_name(cursor, 'dorm', 'name', dorm_name)
        if dorm_uuid:
            for review in reviews:
                email = random.choice(usernames)[0]
                author_uuid = fetch_uuid_by_name(cursor, 'user', 'email', email)
                if author_uuid:
                    insert_review(review, author_uuid, dorm_uuid, cursor)

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == '__main__':
    main()