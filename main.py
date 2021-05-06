from socketIO_client import SocketIO, LoggingNamespace

def on_aaa_response(args):
    print('on_aaa_response', args['data'])

socketIO = SocketIO('localhost', 5000, LoggingNamespace)
socketIO.on('aaa_response', on_aaa_response)
print('I will emit')
socketIO.emit('aaa')
print('I did emit')

socketIO.wait(seconds=1)
