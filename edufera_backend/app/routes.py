import itertools
import operator
from datetime import datetime as dt
from flask import request, make_response, jsonify
from flask import current_app as app
from edufera_backend.wsgi import socketio
from .models import Meeting, Attendance, User, Emotion
from edufera_backend.app.sample_data_generator import generate_data, generate_attendances, generate_emotions
from edufera_backend.app.ml_model import batch_prediction
from service_streamer import ThreadedStreamer
from flask_socketio import emit, join_room, send
from flask_cors import cross_origin

streamer = ThreadedStreamer(batch_prediction, batch_size=64)


@app.route('/stream_predict', methods=['POST'])
def stream_predict():
    frame = request.files['frame']
    meeting_id = request.form.get('meeting_id')
    user_id = request.form.get('user_id')
    time_stamp = request.form.get('time_stamp')
    user = User.get_user(user_id)
    meeting = Meeting.get_meeting(meeting_id)
    if not time_stamp:
        time_stamp = dt.now()
    if user and meeting and frame:
        img_bytes = frame.read()
        emotion = streamer.predict([img_bytes])[0]
        time_stamp.replace(microsecond=0)
        Emotion.save_emotion(meeting.id, user.id, emotion, time_stamp)
        return {'emotion': emotion}
    else:
        return make_response(
            'An error happened! Please make sure to provide the correct parameters.'
        )


@app.route('/start_meeting', methods=['GET'])
def start_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        existing_meeting = Meeting.get_meeting(meeting_id)
        if existing_meeting:
            return make_response(
                f'Meeting: {meeting_id} already started!'
            )
        new_meeting = Meeting.start_meeting(meeting_id=meeting_id)
        return {'id': new_meeting.id,
                'meeting_id': new_meeting.meeting_id,
                'start_time': new_meeting.start_time}


@app.route('/get_meeting', methods=['GET'])
def get_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        existing_meeting = Meeting.get_meeting(meeting_id)
        if existing_meeting:
            return jsonify(existing_meeting)
        return make_response(
                f'Meeting: {meeting_id} does not exist!'
            )


@app.route('/end_meeting', methods=['GET'])
def end_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        the_meeting = Meeting.get_meeting(meeting_id)
        if the_meeting:
            the_meeting.end_meeting()
            return make_response(
                f'Meeting: {meeting_id} ended!'
            )
        return make_response(
                f'Meeting: {meeting_id} does not exsist!'
            )


@app.route('/past_meetings', methods=['GET'])
def past_meetings():
    result_dic = {}
    past_meetings = Meeting.get_past_meetings()

    for meeting in past_meetings:
        emotions_dict = {}
        get_attr = operator.attrgetter('time_stamp')
        time_stamp_list = [list(g) for k, g in itertools.groupby(sorted(meeting.emotions, key=get_attr), get_attr)]

        for time_list in time_stamp_list:
            student_no = [0]*5  # stores the number of students in each class at current time

            for emotion in time_list:
                student_no[int(emotion.value)] += 1
            emotions_dict[str(time_list[0].time_stamp)] = student_no

        result_dic[meeting.meeting_id] = emotions_dict

    return result_dic


@app.route('/join_meeting', methods=['GET'])
def join_meeting():
    meeting_id = request.args.get('meeting_id')
    user_id = request.args.get('user_id')
    join_time = request.args.get('join_time')
    user_name = request.args.get('user_name ')

    attendance = Attendance.query.filter_by(user_id=user_id, meeting_id=meeting_id)
    if attendance:
        return f'attendace : User previously joined a meeting with meeting id {attendance.meeting_id}'
    meeting = Meeting.get_meeting(meeting_id)
    if meeting:
        user = User.get_user(user_id)
        if user:
            new_attendance = Attendance.create_attendance(meeting_id, user_id, join_time)
            return new_attendance
        else:
            return f'User with is {user_id} does not exist'
    else:
        return f'metting with id {meeting_id} does not exist!'


@app.route('/user_by_meeting', methods=['GET'])
def user_by_meeting():
    meeting_id = request.args.get('meeting_id')
    result_dic = []
    for meeting in past_meetings:
        get_attr = operator.attrgetter('time_stamp')
        time_stamp_list = [list(g) for k, g in itertools.groupby(sorted(meeting.emotions, key=get_attr), get_attr)]
        result_dic[meeting.meeting_id] = time_stamp_list

    return result_dic


@app.route('/attendances', methods=['GET'])
def attendances():
    meeting_id = request.args.get('meeting_id')
    attendances = Attendance.get_attendance_by_meeting_id(meeting_id)
    if attendances:
        return jsonify(attendances)
    else:
        make_response(
            'Attendances not found!'
        )


# Socket routes
@cross_origin()
@socketio.on('join_room')
def on_join(data):
    room = data['room']
    join_room(room)
    send('You joined ' + str(data['room']), to=room)


@socketio.on('send_data')
def on_data_sent(data):
    room = data['room']
    emit('data_sent', data, room=room)


# Routes to generate dummy data
@app.route('/generate_data', methods=['GET'])
def generate():
    generate_data()
    return make_response('done')


@app.route('/generate_attendances', methods=['GET'])
def generate_attend():
    generate_attendances()
    return make_response('done')


@app.route('/generate_emotions', methods=['GET'])
def generate_emo():
    generate_emotions('C:/Users/99926527616etu/PycharmProjects/Thesis_EduFERA/edufera_backend/app/dummy.csv')
    return make_response('done')

