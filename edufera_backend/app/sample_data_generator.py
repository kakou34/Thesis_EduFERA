from edufera_backend.app.models import Meeting, User, Attendance, Emotion
from datetime import datetime as dt
import pandas as pd


def generate_data(path):
    #meeting = Meeting.start_meeting("204 255 15", dt.strptime('18/09/19 01:00:00', '%d/%m/%y %H:%M:%S'))
    meeting = Meeting.end_meeting("204 255 15", dt.strptime('18/09/19 01:00:00', '%d/%m/%y %H:%M:%S'))

    df = pd.read_csv(path)

    for i, row in df.iterrows():
        # Wed, 27 July 2016 13:30:00
        time_stamp = dt.strptime(row[0], '%a, %d %B %Y %H:%M:%S')
        user_id = row[1]
        valence = row[2]
        arousal = row[3]

        user = User.get_user(user_id)
        if user is None:
            user = User.add_user(user_id)
        attendance = Attendance.get_attendance_by_meeting_and_user(meeting.meeting_id, user_id)
        if attendance is None:
            attendance = Attendance.create_attendance(meeting.meeting_id, user_id, dt.now())
        emotion = Emotion.save_emotion(meeting.meeting_id, user_id, valence, arousal, time_stamp)

        print('done')