from flask import request, make_response, jsonify

from flask import current_app as app
from .models import MeetingModel


@app.route('/start_meeting', methods=['GET'])
def start_meeting():
    meeting_id = request.args.get('meeting_id')
    if meeting_id:
        existing_meeting = MeetingModel.get_meeting(meeting_id)
        if existing_meeting:
            return make_response(
                f'Meeting: {meeting_id} already created!'
            )
        new_meeting = MeetingModel.start_meeting(meeting_id=meeting_id)  # Create an instance of the User class
        return {'id': new_meeting.id,
                'meeting_id': new_meeting.meeting_id,
                'start_time': new_meeting.start_time}
