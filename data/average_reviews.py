import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def calculate_average_rating(reviews):
    if reviews:
        return sum(reviews) / len(reviews)
    return 0

def update_dorm_ratings(conn):
    cursor = conn.cursor()

    cursor.execute("SELECT dorm_id FROM dorms")
    dorms = cursor.fetchall()

    for dorm_id, in dorms:
        cursor.execute("SELECT star_rating FROM reviews WHERE dorm_id = %s", (dorm_id,))
        reviews = [r[0] for r in cursor.fetchall()]

        average_rating = calculate_average_rating(reviews)

        cursor.execute("UPDATE dorms SET average_rating = %s WHERE dorm_id = %s", (average_rating, dorm_id))

    conn.commit()
    cursor.close()

db_name = os.getenv("DB_NAME")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_host = os.getenv("DB_HOST")

conn = psycopg2.connect(
    dbname=db_name,
    user=db_user,
    password=db_password,
    host=db_host
)

update_dorm_ratings(conn)
conn.close()
