from socketIO_client import SocketIO, LoggingNamespace


def on_aaa_response(args):
    print('Notification: ', args['data'])


socketIO = SocketIO('localhost', 5000, LoggingNamespace)

socketIO.on('meeting_started', on_aaa_response)
print('I will connect')
socketIO.emit('connect')
print('I did connect')
socketIO.emit('join')

socketIO.wait(seconds=60)

socketIO.emit('disconnect')
