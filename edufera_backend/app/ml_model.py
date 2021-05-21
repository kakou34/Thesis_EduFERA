import io
import torch
from facenet_pytorch import MTCNN
from torchvision import transforms
from PIL import Image
from vgg_m_face_bn_fer_dag import vgg_m_face_bn_fer_dag


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model = vgg_m_face_bn_fer_dag('C:/EduFERA/Thesis_EduFERA/checkpoints/vgg16_fin_upd.pth')
model.to(device)
model.eval()

face_detector = MTCNN(image_size=48,
                      thresholds=[0.6, 0.7, 0.7],
                      factor=0.709,
                      post_process=False,
                      device=device, keep_all=False)


def fixed_image_standardization(image_tensor):
    processed_tensor = (image_tensor - 127.5) / 128.0
    return processed_tensor


def transform_image(image):
    my_transforms = transforms.Compose([transforms.Grayscale(3),
                                        transforms.Resize(256),
                                        transforms.CenterCrop(224),
                                        fixed_image_standardization
                                        ])
    return my_transforms(image).unsqueeze(0)


def get_prediction(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).resize((256, 256))
    face = face_detector(image)
    if face is None:
        return -1
    face = transform_image(face).to(device)
    outputs = model.forward(face)
    _, y_hat = outputs.max(1)
    predicted_idx = y_hat.item()
    return predicted_idx


def batch_prediction(image_bytes_batch):
    size = len(image_bytes_batch)
    results = [None] * size
    images = [Image.open(io.BytesIO(image_bytes)).resize((256, 256))
              for image_bytes in image_bytes_batch]
    faces = face_detector(images)
    for j in range(size):
        if faces[j] is None:
            results[j] = -1
    faces = [transform_image(face) for face in faces if face is not None]
    if len(faces) != 0:
        inputs = torch.cat(faces).to(device)
        outputs = model.forward(inputs)
        _, y_hat = outputs.max(1)
        predicted_ids = y_hat.tolist()
        for j in range(size):
            if results[j] is None:
                results[j] = predicted_ids[0]
                del predicted_ids[0]

    return results


if __name__ == "__main__":
    image_bytes_batch = []

    with open(r"giroud.jpg", 'rb') as f:
        image_bytes = f.read()
        image_bytes_batch.append(image_bytes)

    with open(r"giroud.jpg", 'rb') as f:
        image_bytes = f.read()
        image_bytes_batch.append(image_bytes)

    with open(r"img.jpg", 'rb') as f:
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
