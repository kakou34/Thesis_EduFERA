from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from flask import jsonify
from datetime import datetime

db = SQLAlchemy()


class MeetingModel(db.Model):
    __tablename__ = "meeting"

    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.String(), unique=True, nullable=False)
    start_time = db.Column(db.DateTime(), nullable=False)  # when host starts the meeting
    end_time = db.Column(db.DateTime(), nullable=True)  # when host ends meeting
    attendances = relationship("attendance")

    def __init__(self, meeting_id, start_time, end_time=None):
        self.meeting_id = meeting_id
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
        return f"{self.id}:{self.meeting_id}"


class AttendanceModel(db.Model):
    __tablename__ = "attendance"

    id = db.Column(db.Integer, primary_key=True)
    meeting_id = db.Column(db.Integer, db.ForeignKey('meeting.id'))
    user_id = db.Column(db.String(), unique=True, nullable=False)
    user_name = db.Column(db.String(), nullable=True)  # Optional
    join_time = db.Column(db.DateTime(), nullable=False)  # when user joins the meeting
    emotions = relationship("emotion")

    def __init__(self, meeting_id, user_id, join_time, user_name="Hidden"):
        self.meeting_id = meeting_id
        self.user_id = user_id
        self.join_time = join_time
        self.user_name = user_name

    def __repr__(self):
        return f"{self.id}:{self.meeting_id}, {self.user_id}"


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

#----------------------------------------------------
def get_meetting(meetingId):
    mtg = MeetingModel.query.get(meetingId)
    return jsonify(mtg)

def start_meeting(meeting_id, start_time=datetime.now):
    mtg = MeetingModel(meeting_id, start_time)
    db.session.add(mtg)
    db.session.commit()

    return jsonify(mtg)

def end_metting(meeting_id, end_time=datetime.now):
    mtg = MeetingModel.query.get(meeting_id)
    mtg.end_time = end_time
    db.session.commit()

    return jsonify(mtg)

#----------------------------------------------------
def get_attendace(attendance_id):
    attndce = AttendanceModel.query.get(attendance_id)
    return jsonify(attndce)

def get_attendaceByMeetingId(meeting_id):
    attndce = db.session.query(User).filter(meeting_id=meeting_id)
    return jsonify(attndce)

def create_attendace(meeting_id, user_id, join_time=datetime.now, user_name="Hidden"):
    attndce = AttendanceModel(meeting_id, user_id, join_time, user_name)
    db.session.add(attndce)
    db.session.commit()
    return jsonify(attndce)


#---------------------------------------------------------
def get_emotion(emotion_id):
    emotion = EmotionModel.query.get(emotion_id)
    return jsonify(emotion)

def save_emotion(attendance_id, time_stamp=datetime.now, valence, arousal):
    emotion = EmotionModel(attendance_id, time_stamp, valence, arousal)
    db.session.add(emotion)
    db.commit()
    return jsonify(emotion)

