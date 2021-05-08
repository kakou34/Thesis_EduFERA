import itertools
import operator

from flask import jsonify, request, make_response
from flask_socketio import *
from flask_cors import CORS, cross_origin
from models import *
from settings import *
from datetime import datetime as dt
from ml_model import batch_prediction
from service_streamer import ThreadedStreamer


socketio = SocketIO(app, cors_allowed_origins="*", engineio_logger=True)
streamer = ThreadedStreamer(batch_prediction, batch_size=64)
CORS(app)


# SocketIO Events
@socketio.on('connect')
def connected():
    print('Connected')


@socketio.on('disconnect')
def disconnected():
    print('Disconnected')


@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    print('A user has joined room ' + room)
    send('You have entered the room.', to=room)


@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    print('A user has left room ' + room)
    send('You have left the room.', to=room)


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
        time_stamp = time_stamp.replace(microsecond=0)
        socketio.emit('emotion_predicted', {'time_stamp': str(time_stamp), 'value': emotion}, to=meeting_id)
        Emotion.save_emotion(meeting.id, user.id, emotion, time_stamp)
        return {'emotion': emotion}
    else:
        return make_response(
            'An error happened! Please make sure to provide the correct parameters.'
        )

#TODO post
@app.route('/start_meeting', methods=['GET'])
def start_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        existing_meeting = Meeting.get_meeting(meeting_id)
        if existing_meeting:
            socketio.emit('meeting_started', {'data': 'Started'}, broadcast=True, to=meeting_id)
            return make_response(
                f'Meeting: {meeting_id} already started!'
            )
        new_meeting = Meeting.start_meeting(meeting_id=meeting_id)
        socketio.emit('meeting_started', {'data': f'Meeting {meeting_id} Started!'}, broadcast=True, to=meeting_id)
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


@app.route('/get_meeting_status')
def get_meeting_status():
    meeting_id = request.args.get('meeting_id')
    message = 'Not Started'
    if meeting_id:
        existing_meeting = Meeting.get_meeting(meeting_id)
        if existing_meeting:
            if existing_meeting.end_time:
                message = 'Ended'
            else:
                message = 'Started'
        response = jsonify(message=message)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response

#TODO post
@app.route('/end_meeting', methods=['GET'])
def end_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        the_meeting = Meeting.get_meeting(meeting_id)
        if the_meeting:
            socketio.emit('meeting_ended', {'data': 'Ended'}, broadcast=True, to=meeting_id)
            the_meeting.end_meeting()
            return make_response(
                f'Meeting: {meeting_id} ended!'
            )
        return make_response(
            f'Meeting: {meeting_id} does not exsist!'
        )

#TODO
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


@app.route('/meeting_analysis', methods=['GET'])
def analyse_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        meeting = Meeting.get_meeting(meeting_id)
        if meeting:
            emotions = meeting.get_meeting_analysis()
            return jsonify(emotions)

    return make_response('Invalid Meeting ID')


#TODO create user if user no
@app.route('/join_meeting', methods=['POST'])
def join_meeting():
    meeting_id = request.form.get('meeting_id')
    user_id = request.form.get('user_id')
    join_time = request.form.get('join_time')
    user_name = request.form.get('user_name ')

    if meeting_id:
        the_meeting = Meeting.get_meeting(meeting_id)
    if user_id:
        the_user = User.get_user(user_id)
    if the_meeting and the_user:
        attendance = Attendance.query.filter_by(user_id=the_user.id, meeting_id=the_meeting.id).first()
        if attendance:
            return jsonify(attendance)
        else:
            if not the_meeting:
                return f'meeting with id {meeting_id} does not exist!'
            else:
                if not the_user:
                    if not user_name:
                        user_name = 'hidden'
                    User.add_user(user_id, user_name)
                    joinTime = datetime.fromisoformat(join_time)
                    Attendance.create_attendance(the_meeting.id, the_user.id, joinTime)
                    return f'attendance created!'
                else:
                    # "2012-12-12 10:10:10" format
                    joinTime = datetime.fromisoformat(join_time)
                    Attendance.create_attendance(the_meeting.id, the_user.id, joinTime)
                    return f'attendance created!'


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


@app.route('/test')
def test():
    return jsonify({'message': 'Hello'})


# ===================
# USER ROUTES
@app.route('/create_user', methods=['POST'])
def create_user():
    user_id = request.form.get('user_id')
    user_name = request.form.get('user_name')
    if user_id:
        if user_name:
            User.add_user(user_id, user_name)
        User.add_user(user_id)

        return f'user with id {user_id} is added!'


@app.route('/get_user', methods=['GET'])
def get_user():
    user_id = request.args.get('user_id')
    if user_id:
        the_user = User.get_user(user_id)
        if the_user:
            return jsonify(the_user)

        return f'user with id {user_id} does not exist!'


# EMOTION ROUTES
@app.route('/get_emotion', methods=['GET'])  # get emotion by user and meeting
def get_emotion():
    user_id = request.args.get('user_id')
    meeting_id = request.args.get('meeting_id')

    if user_id and meeting_id:
        the_user = User.get_user(user_id)
        the_meeting = Meeting.get_meeting(meeting_id)
        if the_meeting and the_user:
            the_emotion = Emotion.query.filter_by(meeting_id=the_meeting.id, user_id=the_user.id).first()
            return jsonify(the_emotion)
        else:
            return f'invalid user or meeting id'
    else:
        return f'user id and meeting id missing'


@app.route('/save_emotion', methods=['POST'])  # get emotion by user and meeting
def save_emotion():
    user_id = request.form.get('user_id')
    meeting_id = request.form.get('meeting_id')
    value = request.form.get('value')
    time_stamp = request.args.get('time')
    if user_id and meeting_id:
        the_user = User.get_user(user_id)
        the_meeting = Meeting.get_meeting(meeting_id)
        if the_meeting and the_user:
            if time_stamp:
                time_stamp = datetime.strptime(time_stamp)
                Emotion.save_emotion(meeting_id=the_meeting.id, user_id=the_user.id, value=value, time_stamp=time_stamp)
            Emotion.save_emotion(meeting_id=the_meeting.id, user_id=the_user.id, value=value)

            return f'Emotion Saved'
        else:
            return f'invalid user or meeting id'
    else:
        return f'user id and meeting id missing'


if __name__ == '__main__':
    socketio.run(app, debug=True)