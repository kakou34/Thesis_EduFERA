import io
import torch
import numpy as np
from facenet_pytorch import MTCNN
from torchvision import transforms
from PIL import Image
from ml_models.resnet50_ferplus_dag import resnet50_ferplus_dag


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

model = resnet50_ferplus_dag('C:/Users/99926527616etu/PycharmProjects/Thesis_EduFERA/checkpoints/resnet50.pth')

model.to(device)
model.eval()

face_detector = MTCNN(image_size=48,
                      thresholds=[0.6, 0.7, 0.7],
                      factor=0.709,
                      post_process=False,
                      device=device, keep_all=False)


def crop_image(image_bytes):
    my_transforms = transforms.Compose([transforms.Grayscale(3), transforms.Resize(256), transforms.CenterCrop(224)])
    image = Image.open(io.BytesIO(image_bytes))
    return my_transforms(image)


def transform_image(image):
    my_transforms = transforms.Compose([
                                        transforms.Resize(256),
                                        transforms.CenterCrop(224),
                                        ])
    return my_transforms(image).unsqueeze(0)


def get_prediction(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    face = face_detector(image)
    if face is None:
        return -1
    face = transform_image(face).to(device)
    print(face)
    outputs = model.forward(face)
    # _, y_hat = outputs.max(1)
    # predicted_idx = y_hat.item()
    return outputs.toList()


def batch_prediction(image_bytes_batch):
    images = [crop_image(image_bytes) for image_bytes in image_bytes_batch]
    faces = face_detector(images)
    faces = [i for i in faces if i is not None]
    faces = [transform_image(face) for face in faces]
    inputs = torch.cat(faces).to(device)
    outputs = model.forward(inputs)

    _, y_hat = outputs.max(1)
    predicted_ids = y_hat.tolist()
    return predicted_ids


if __name__ == "__main__":
    image_bytes_batch = []

    with open(r"giroud.jpg", 'rb') as f:
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



