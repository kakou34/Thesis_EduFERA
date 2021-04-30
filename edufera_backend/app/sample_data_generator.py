from edufera_backend.app.models import Meeting, User, Attendance, Emotion
from datetime import datetime as dt
import pandas as pd
from . import db


def generate_data():
    meeting = Meeting.start_meeting("204 255 15", dt.strptime('18/09/19 01:00:00', '%d/%m/%y %H:%M:%S'))
    meeting = Meeting.end_meeting("204 255 15", dt.strptime('18/09/19 01:00:00', '%d/%m/%y %H:%M:%S'))

    db.session.bulk_save_objects(
        [
            User(
                user_id=f"{i+1}",
                user_name=f"User{i+1}",
            )
            for i in range(25)
        ],
        return_defaults=True,
    )
    db.session.commit()


def generate_attendances():
    db.session.bulk_save_objects(
        [
            Attendance(
                user_id=f"{i+1}",
                meeting_id="204 255 15",
                join_time= dt.strptime("Wed, 27 July 2016 13:30:00", '%a, %d %B %Y %H:%M:%S')
            )
            for i in range(18)
        ],
        return_defaults=True,
    )
    db.session.commit()

    db.session.bulk_save_objects(
        [
            Attendance(
                user_id=f"{i}",
                meeting_id="204 255 15",
                join_time=dt.strptime("Wed, 27 July 2016 13:30:01", '%a, %d %B %Y %H:%M:%S')
            )
            for i in [19, 20]
        ],
        return_defaults=True,
    )
    db.session.commit()

    db.session.bulk_save_objects(
        [
            Attendance(
                user_id=f"{i}",
                meeting_id="204 255 15",
                join_time=dt.strptime("Wed, 27 July 2016 13:30:02", '%a, %d %B %Y %H:%M:%S')
            )
            for i in [21, 22, 23, 24, 25]
        ],
        return_defaults=True,
    )
    db.session.commit()


def generate_emotions(path):
    df = pd.read_csv(path)
    db.session.bulk_save_objects(
        [
            Emotion(
                user_id=row[1],
                meeting_id="204 255 15",
                time_stamp=dt.strptime(row['time'], '%a, %d %B %Y %H:%M:%S'),
                value=row['emotion']
            )
            for i, row in df.iterrows()
        ],
        return_defaults=True,
    )
    db.session.commit()


if __name__ == "__main__":
    df = pd.read_csv('dummy_data.csv')
    emotions = []
    for i, row in df.iterrows():
        if row['valence'] > 0 and row['arousal'] > 0:
            emotions.append(0)
        elif row['valence'] < 0 and row['arousal'] > 0:
            emotions.append(1)
        elif row['valence'] < 0 and row['arousal'] < 0:
            emotions.append(2)
        else:
            emotions.append(3)

    df.drop(columns=['valence', 'arousal'])

    df['emotion'] = emotions

    df.to_csv('dummy.csv')
