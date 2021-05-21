from models import Meeting, User, Attendance, Emotion
from datetime import datetime as dt
import pandas as pd
from app import db
from random import seed
from random import randint
seed(1)


def generate_emotions(path):
    df = pd.read_csv(path)
    db.session.bulk_save_objects(
        [
            Emotion(
                user_id=row[1],
                meeting_id=2,
                time_stamp=dt.strptime(row['time'], '%a, %d %B %Y %H:%M:%S'),
                value=row['emotion']
            )
            for i, row in df.iterrows()
        ],
        return_defaults=True,
    )
    db.session.commit()


def generate():
    meeting = Meeting.start_meeting("204 255 17", dt.strptime('21/05/21 09:00:00', '%d/%m/%y %H:%M:%S'))
    meeting = Meeting.end_meeting(meeting, dt.strptime('21/05/21 11:00:00', '%d/%m/%y %H:%M:%S'))

    db.session.bulk_save_objects(
        [
            Attendance(
                user_id=i + 1,
                meeting_id=3,
                join_time=dt.strptime('21/05/21 09:00:00', '%d/%m/%y %H:%M:%S')
            )
            for i in range(18)
        ],
        return_defaults=True,
    )
    db.session.commit()

    db.session.bulk_save_objects(
        [
            Attendance(
                user_id=i,
                meeting_id=3,
                join_time=dt.strptime('21/05/21 09:02:00', '%d/%m/%y %H:%M:%S')
            )
            for i in [19, 20]
        ],
        return_defaults=True,
    )
    db.session.commit()

    db.session.bulk_save_objects(
        [
            Attendance(
                user_id=i,
                meeting_id=3,
                join_time=dt.strptime('21/05/21 09:05:00', '%d/%m/%y %H:%M:%S')
            )
            for i in [21, 22, 23, 24, 25]
        ],
        return_defaults=True,
    )
    db.session.commit()


if __name__ == "__main__":
    db.session.bulk_save_objects(
        [
            Emotion(
                user_id=i,
                meeting_id=2,
                time_stamp=dt.strptime(f'21/05/21 13:{j}:00', '%d/%m/%y %H:%M:%S'),
                value=randint(-1, 3)
            )
            for i in range(1, 11)
            for j in range(10, 10)
        ],
        return_defaults=True,
    )
    db.session.commit()
