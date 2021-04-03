from models.vgg16 import VGG_16

if __name__ == '__main__':

    model = VGG_16().double()
    model.load_weights()

    print("model created")
