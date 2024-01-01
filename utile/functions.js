const imageTypes = ['image/jpeg', 'image/png', 'images/gif'];

function saveImage(vehicle, imageEncoded) {
  if (imageEncoded == null) return;

  const image = JSON.parse(imageEncoded);
  if (image != null && imageTypes.includes(image.type)) {
    vehicle.image = new Buffer.from(image.data, 'base64');
    vehicle.imageType = image.type;
  }
}

function filterData(input, data, modeleKey, makeKey) {
  let getData = [...data];
  let filtered = input
    ? [
        ...getData.filter(
          elem =>
            elem[modeleKey].includes(input) || elem[makeKey].includes(input)
        ),
      ]
    : getData;
  return filtered;
}

module.exports = { saveImage, filterData };
