import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ImageService } from '../image.service';

import { ImageDetailComponent } from './image-details.component';

describe('ImageDetailsComponent', () => {
  const paramId: any = 1;
  let component: ImageDetailComponent;
  let fixture: ComponentFixture<ImageDetailComponent>;
  let element: HTMLElement;
  
  var fakeActivatedRoute = {
    snapshot: { params: { 'id': paramId } }
  } as unknown as ActivatedRoute;

  it('ImageDetailComponent should be created', () => {
    setFakeActivatedRouteValues(1);
    
    TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      providers: [ImageDetailComponent, ImageService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('.img-container');
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it("When an image is clicked, it is shown in this component", () => {
    setFakeActivatedRouteValues(1);
    
    TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      providers: [ImageDetailComponent, ImageService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('.img-container');
    fixture.detectChanges();
    
    expect(element.style.getPropertyValue("background-image")).toBe(`url("assets/images/perro1.jpg")`);
  });

  it("When the browser url is changed and the imageId provided does not exist", () => {
    setFakeActivatedRouteValues(10);
    
    TestBed.configureTestingModule({
      declarations: [ ImageDetailComponent ],
      providers: [ImageDetailComponent, ImageService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement.querySelector('.img-container');
    fixture.detectChanges();

    expect(element.style.getPropertyValue("background-image")).toBe(`url("null")`);
  });

  var setFakeActivatedRouteValues = (value) => {
    fakeActivatedRoute = {
      snapshot: { params: { 'id': value } }
    } as unknown as ActivatedRoute;
  }
});

describe('ImageDetailsComponent (class only)', () => {
  const paramId: any = 1;
  let component: ImageDetailComponent;
  let service: ImageService;

  var fakeActivatedRoute = {
    snapshot: { params: { 'id': paramId } }
  } as unknown as ActivatedRoute;

  it('should get allImages after Angular calls ngOnChanges', () => {
    setFakeActivatedRouteValues(1);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ImageDetailComponent, ImageService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    });

    component = TestBed.inject(ImageDetailComponent);
    service = TestBed.inject(ImageService);
    
    component.ngOnInit();
    let expectedImages = service.getImage(paramId);
    expect(component.image).toEqual(expectedImages);
  });

  it('should get undefined when filtering by a none existing id after Angular calls ngOnChanges', () => {
    setFakeActivatedRouteValues(10);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ImageDetailComponent, ImageService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    });

    component = TestBed.inject(ImageDetailComponent);
    service = TestBed.inject(ImageService);

    component.ngOnInit();
    expect(component.image).toBe(undefined);
  });

  it('should get undefined when filtering by undefined id after Angular calls ngOnChanges', () => {
    setFakeActivatedRouteValues(undefined);

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ImageDetailComponent, ImageService, {provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    });

    component = TestBed.inject(ImageDetailComponent);
    service = TestBed.inject(ImageService);

    component.ngOnInit();
    expect(component.image).toBe(undefined);
  });

  var setFakeActivatedRouteValues = function(value) {
    fakeActivatedRoute = {
      snapshot: { params: { 'id': value } }
    } as unknown as ActivatedRoute;
  }
});