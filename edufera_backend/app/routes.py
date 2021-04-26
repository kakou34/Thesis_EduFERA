import itertools
import operator
from flask import request, make_response, jsonify
from flask import current_app as app
from .models import Meeting, Attendance
from edufera_backend.app.sample_data_generator import generate_data, generate_attendances, generate_emotions


@app.route('/start_meeting', methods=['GET'])
def start_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        existing_meeting = Meeting.get_meeting(meeting_id)
        if existing_meeting:
            return make_response(
                f'Meeting: {meeting_id} already exists!'
            )
        new_meeting = Meeting.start_meeting(meeting_id=meeting_id)  # Create an instance of the User class
        return {'id': new_meeting.id,
                'meeting_id': new_meeting.meeting_id,
                'start_time': new_meeting.start_time}


@app.route('/get_meeting', methods=['GET'])
def get_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        existing_meeting = Meeting.get_meeting(meeting_id)
        if existing_meeting:
            return {'id': existing_meeting.id,
                    'meeting_id': existing_meeting.meeting_id,
                    'start_time': existing_meeting.start_time}
        return make_response(
                f'Meeting: {meeting_id} does not exist!'
            )

@app.route('/end_meeting', methods=['GET'])
def end_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        the_meeting = MeetingModel.get_meeting(meeting_id)
        the_meeting.end_meeting()
        if the_meeting:
            return {'ended_meeting' : the_meeting}
        return make_response(
                f'Meeting: {meeting_id} does not exsist!'
            )


@app.route('/past_meetings', methods=['GET'])
def past_meetings():
    result_dic = []
    past_meetings = Meeting.get_past_meetings()
    for meeting in past_meetings:
        get_attr = operator.attrgetter('time_stamp')
        time_stamp_list = [list(g) for k, g in itertools.groupby(sorted(meeting.emotions, key=get_attr), get_attr)]
        result_dic[meeting.meeting_id] = time_stamp_list

    return result_dic


@app.route('/attendances', methods=['GET'])
def attendances():
    meeting_id = request.args.get('meeting_id')
    attendances = Attendance.get_attendance_by_meeting_id(meeting_id)

    return jsonify(attendances)


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
    generate_emotions('C:/Users/99926527616etu/PycharmProjects/Thesis_EduFERA/edufera_backend/app/dummy_data.csv')
    return make_response('done')

