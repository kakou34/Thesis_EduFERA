import io
import json
import torch
from torch import nn
from facenet_pytorch import MTCNN
from torchvision import models
from torchvision import transforms
from PIL import Image


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

model = models.resnet34(pretrained=False)
model.conv1 = nn.Conv2d(1, 64, kernel_size=(3, 3), stride=(2, 2), padding=(3, 3), bias=False)
model.fc = nn.Linear(in_features=512, out_features=2, bias=True)

model.fc = torch.nn.Linear(model.fc.in_features, 2, True)
state = torch.load('C:/Users/99926527616etu/PycharmProjects/Thesis_EduFERA/models/resnet34.pth', map_location=torch.device('cpu'))
state = state['best_wts']
model.load_state_dict(state)
model.to(device)
model.eval()

face_detector = MTCNN(image_size=224,
                      thresholds=[0.6, 0.7, 0.7],
                      factor=0.709,
                      post_process=False,
                      device=device, keep_all=False)



def crop_image(image_bytes):
    my_transforms = transforms.Compose([transforms.Resize(255), transforms.CenterCrop(224)])
    image = Image.open(io.BytesIO(image_bytes))
    return my_transforms(image)

def transform_image(image):
    my_transforms = transforms.Compose([transforms.Grayscale(1),
                                        transforms.Resize(65),
                                        transforms.CenterCrop(64),
                                        transforms.Normalize([0.485, ], [0.229, ])
                                        ])
    return my_transforms(image).unsqueeze(0)


def get_prediction(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    face = face_detector(image)
    if face is None:
        return (-2, -2)
    face = transform_image(face).to(device)
    outputs = model.forward(face)

    return (outputs[0, 0].item(), outputs[0, 1].item())


def batch_prediction(image_bytes_batch):
    images = [crop_image(image_bytes) for image_bytes in image_bytes_batch]
    faces = face_detector(images)
    faces = [i for i in faces if i is not None]

    faces = [transform_image(face) for face in faces]
    inputs = torch.cat(faces).to(device)
    outputs = model.forward(inputs)
    return [[outputs[i, 0].item(), outputs[i, 1].item()] for i in range(len(outputs))]


if __name__ == "__main__":
    image_bytes_batch = []

    with open(r"img.jpg", 'rb') as f:
        image_bytes = f.read()
        image_bytes_batch.append(image_bytes)

    with open(r"giroud.jpg", 'rb') as f:
        image_bytes = f.read()
        image_bytes_batch.append(image_bytes)

    with open(r"giroud.jpg", 'rb') as f:
        image_bytes = f.read()
        image_bytes_batch.append(image_bytes)

    with open(r"giroud.jpg", 'rb') as f:
        image_bytes = f.read()
        image_bytes_batch.append(image_bytes)

    with open(r"img.jpg", 'rb') as f:
        image_bytes = f.read()
        image_bytes_batch.append(image_bytes)

    out = batch_prediction(image_bytes_batch)
    print(out)



