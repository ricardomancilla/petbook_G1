import { noUndefined } from '@angular/compiler/src/util';
import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(() => {
    service = new ImageService();
  });

  it('service should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("#getImages", () => {
    it("should assign 5 images to #allImages variable", () => {
      service.getImages();
      expect(service.allImages.length).toBe(5);
    })
  })

  describe("#getImage", () => {
    it("should return the image 1", () => {
      let image = service.getImage(1);
      expect(image).not.toBeNull();
      expect(image.brand).toBe('perro');
      expect(image.url).toBe('assets/images/perro1.jpg');
    });

    it("should return undefined when it is call with 20", () => {
      let image = service.getImage(20);
      expect(image).toBe(undefined);
    });
  })
});
