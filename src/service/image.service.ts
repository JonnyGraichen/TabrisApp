import { ChangeListeners } from "tabris";
import { shared, property, event, inject } from "tabris-decorators";
import { StorageService } from "./storage.service";

@shared
export class ImageService {

    @property public images: string[];
    
    @event public onImagesChanged: ChangeListeners<ImageService, 'images'>;

    constructor(
        @inject private storageService: StorageService
    ) {
        this.initImages();
    }

    public getImages(): string[] {
        return this.images;
    }

    public addImage(image: Blob): void {
        this.storageService.storeImage(image)
            .then(imageUrl => this.updateImageUrls(imageUrl))
            .then(() => this.storageService.cacheImageUrls(this.images));

    }

    private initImages(): void {
        this.images = this.storageService.loadCachedImageUrls() || [];
    }


    private updateImageUrls(imageUrl: string): void {
        this.images = this.images = [...this.images, imageUrl];
    }

}