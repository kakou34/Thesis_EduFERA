import itertools
import operator
from dataclasses import dataclass
from datetime import datetime
from enum import Enum
from settings import app
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy(app)


class EmotionEnum(Enum):
    active_pleasant = 0
    active_unpleasant = 1
    inactive_unpleasant = 2
    inactive_pleasant = 3


@dataclass
class Attendance(db.Model):
    meeting_id: int
    user_id: int
    join_time: datetime

    __tablename__ = "attendance"
    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey('meeting.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    join_time = db.Column(db.DateTime(), nullable=False)  # when user joins the meeting

    def __init__(self, meeting_id, user_id, join_time):
        self.meeting_id = meeting_id
        self.user_id = user_id
        self.join_time = join_time.replace(microsecond=0)

    def __repr__(self):
        return f"{self.id}:{self.meeting_id}, {self.user_id}"

    @classmethod
    def get_attendance(cls, attendance_id):
        attendance = cls.query.get(attendance_id)
        return attendance

    @classmethod
    def create_attendance(cls, meeting_id, user_id, join_time=datetime.now()):
        attendance = cls(meeting_id, user_id, join_time.replace(microsecond=0))
        db.session.add(attendance)
        db.session.commit()
        return attendance

    @classmethod
    def get_attendance_by_meeting_id(cls, meeting_id):
        attendances = cls.query.filter_by(meeting_id=meeting_id).all()
        return attendances

    @classmethod
    def get_attendance_by_meeting_and_user(cls, meeting_id, user_id):
        user = User.get_user(user_id)
        meeting = Meeting.get_meeting(meeting_id)
        if meeting and user:
            return first(x for x in meeting.attendances if x.user_id == user.id)


@dataclass
class User(db.Model):
    __tablename__ = "user"

    user_id: str
    user_name: str
    attendances: Attendance

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(), unique=True, nullable=False)
    user_name = db.Column(db.String(), nullable=True)
    attendances = db.relationship("Attendance")
    emotions = db.relationship("Emotion")

    def __init__(self, user_id, user_name="Hidden"):
        self.user_id = user_id
        self.user_name = user_name

    def __repr__(self):
        return f"{self.user_id}:{self.user_name}"

    @classmethod
    def get_user(cls, user_id):
        user = cls.query.filter_by(user_id=user_id).first()
        return user

    @classmethod
    def add_user(cls, user_id, user_name="Hidden"):
        user = cls(user_id, user_name)
        db.session.add(user)
        db.session.commit()
        return user


@dataclass
class Emotion(db.Model):
    meeting_id: int
    user_id: int
    time_stamp: datetime
    value: int
    user: User

    __tablename__ = "emotion"
    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey('meeting.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship("User")
    time_stamp = db.Column(db.DateTime(), nullable=False)  # time of the frame received from the video conference
    value = db.Column(db.Integer, nullable=False)

    def __init__(self, meeting_id, user_id, value, time_stamp):
        self.meeting_id = meeting_id
        self.user_id = user_id
        self.value = value
        self.time_stamp = time_stamp.replace(microsecond=0)

    def __repr__(self):
        return f"{self.time_stamp}:{self.value}"

    @classmethod
    def get_emotion(cls, emotion_id):
        emotion = cls.query.get(emotion_id)
        return emotion

    @classmethod
    def save_emotion(cls, meeting_id, user_id, value, time_stamp=datetime.now()):
        emotion = cls(meeting_id, user_id, value, time_stamp.replace(microsecond=0))
        db.session.add(emotion)
        db.session.commit()
        return emotion

    @staticmethod
    def bulk_save_emotions(emotions):
        db.session.bulk_save_objects(emotions)
        db.session.commit()


@dataclass
class Meeting(db.Model):
    meeting_id: str
    start_time: datetime
    end_time: datetime
    attendances: Attendance
    emotions: Emotion

    __tablename__ = "meeting"
    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.String(), unique=True, nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False)  # when host starts the meeting
    end_time = db.Column(db.DateTime(), nullable=True)  # when host ends meeting
    attendances = db.relationship("Attendance")
    emotions = db.relationship("Emotion")

    def __init__(self, meeting_id, start_time, end_time=None):
        self.meeting_id = meeting_id
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
        return f"{self.id}:{self.meeting_id}"

    @classmethod
    def get_meeting(cls, meeting_id):
        meeting = cls.query.filter_by(meeting_id=meeting_id).first()
        return meeting

    @classmethod
    def start_meeting(cls, meeting_id, start_time=datetime.now().replace(microsecond=0)):
        meeting = cls(meeting_id, start_time)
        db.session.add(meeting)
        db.session.commit()

        return meeting

    def end_meeting(self, end_time=datetime.now()):
        self.end_time = end_time.replace(microsecond=0)
        db.session.commit()

    @classmethod
    def get_past_meetings(cls):
        current_time = datetime.now().replace(microsecond=0)
        meetings = cls.query.filter(cls.end_time < current_time).all()
        return meetings

    def get_meeting_analysis(self):
        emotions_list = [[], [], [], [], []]
        time_stamps = []
        get_attr = operator.attrgetter('time_stamp')
        time_stamp_list = [list(g) for k, g in itertools.groupby(sorted(self.emotions, key=get_attr), get_attr)]

        for time_list in time_stamp_list:
            time_stamps.append(datetime.strftime(time_list[0].time_stamp, "%H:%M:%S"))
            student_no = [0] * 5  # stores the number of students in each class at current time
            for emotion in time_list:
                student_no[int(emotion.value)] += 1
            for i in range(5):
                data = emotions_list[i]
                data.append(student_no[i])
        return time_stamps, emotions_list


def first(iterable, default=None):
    for item in iterable:
        return item
    return default




