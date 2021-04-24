from datetime import datetime
from . import db


class MeetingModel(db.Model):
    __tablename__ = "meeting"

    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.String(), unique=True, nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False)  # when host starts the meeting
    end_time = db.Column(db.DateTime(), nullable=True)  # when host ends meeting
    attendances = db.relationship("AttendanceModel")

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
    def start_meeting(cls, meeting_id, start_time=datetime.now()):
        meeting = cls(meeting_id, start_time)
        db.session.add(meeting)
        db.session.commit()

        return meeting

    @classmethod
    def end_meeting(cls, meeting_id, end_time=datetime.now()):
        meeting = cls.query.get(meeting_id)
        meeting.end_time = end_time
        db.session.commit()

        return meeting


class AttendanceModel(db.Model):
    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey('meeting.id'))
    user_id = db.Column(db.String(), unique=True, nullable=False)
    user_name = db.Column(db.String(), nullable=True)  # Optional
    join_time = db.Column(db.DateTime(), nullable=False)  # when user joins the meeting
    emotions = db.relationship("EmotionModel")

    def __init__(self, meeting_id, user_id, join_time, user_name="Hidden"):
        self.meeting_id = meeting_id
        self.user_id = user_id
        self.join_time = join_time
        self.user_name = user_name

    def __repr__(self):
        return f"{self.id}:{self.meeting_id}, {self.user_id}"
    
    @classmethod
    def get_attendance(cls, attendance_id):
        attendance = cls.query.get(attendance_id)

        return attendance

    @classmethod
    def create_attendance(cls, meeting_id, user_id, join_time=datetime.now, user_name="Hidden"):
        attendance = cls(meeting_id, user_id, join_time, user_name)
        db.session.add(attendance)
        db.session.commit()

        return attendance
    
    @classmethod
    def get_attendance_by_meeting_id(cls, meeting_id):
        meeting = cls.query.get(meeting_id)
        attendances = meeting.attendances

        return attendances


    



class EmotionModel(db.Model):
    __tablename__ = "emotion"

    id = db.Column(db.Integer, primary_key=True)
    attendance_id = db.Column(db.Integer, db.ForeignKey('attendance.id'))   # here we will get meeting_id and user_id
    time_stamp = db.Column(db.DateTime(), nullable=False)  # time of the frame received from the video conference
    valence = db.Column(db.Float(), nullable=False)  # model result for valence
    arousal = db.Column(db.Float(), nullable=False)  # model result for arousal

    def __init__(self, attendance_id, time_stamp, valence, arousal):
        self.attendance_id = attendance_id
        self.valence = valence
        self.arousal = arousal
        self.time_stamp = time_stamp

    def __repr__(self):
        return f"{self.time_stamp}:{self.valence}, {self.arousal}"
    
    @classmethod
    def get_emotion(cls, emotion_id):
        emotion = cls.query.get(emotion_id)

        return emotion

    @classmethod
    def save_emotion(cls, attendance_id, valence, arousal, time_stamp=datetime.now):
        emotion = cls(attendance_id, time_stamp, valence, arousal)
        db.session.add(emotion)
        db.session.commit()

        return emotion
    
    



