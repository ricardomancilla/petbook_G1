import { FilterimagesPipe } from './filterimages.pipe';
import { ImageService } from './image.service';

describe('FilterimagesPipe', () => {
  var service: ImageService;
  var pipe: FilterimagesPipe;

  var images: any;

  beforeAll(() => {
    service = new ImageService();
    pipe = new FilterimagesPipe();

    images = service.getImages();
  });

  it('create a FilterimagesPipe instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Will get all images', () => {
    expect(images).toEqual(pipe.transform(images, "all"));
  });

  it('Will get all cats images', () => {
    let imagesFilterByGato = images.filter(x => x.brand == "gato");

    expect(imagesFilterByGato).toEqual(pipe.transform(images, "gato"));
  });

  it('Will get all dogs images', () => {
    let imagesFilterByPerro = images.filter(x => x.brand == "perro");

    expect(imagesFilterByPerro).toEqual(pipe.transform(images, "perro"));
  });

  it('Will get an undefined when items is undefined', () => {
    expect(undefined).toBe(pipe.transform(undefined, "all"));
  });

  it('Will get an [ ] when laptop is undefined', () => {
    expect([]).toEqual(pipe.transform(images, undefined));
  });

  it('Will get an [ ] when laptop is an unknown value', () => {
    expect([]).toEqual(pipe.transform(images, "someUnknownValue"));
  });
});
