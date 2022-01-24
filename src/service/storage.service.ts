import { fs } from "tabris";
import { shared } from "tabris-decorators";

@shared
export class StorageService {

    private static directory = `${fs.cacheDir}/images`;

    constructor() { }
    
    public storeImage(data: Blob): Promise<string> {
        const timeStamp = Date.now();

        const fileName = `${StorageService.directory}/${timeStamp}.png`;

        return fs.appendToFile(fileName, data)
            .then(() => fileName);
    }

    public clearImages(): Promise<void> {
        localStorage.clear();
        return fs.removeDir(StorageService.directory);
    }

    public cacheImageUrls(imageUrls: string[]): void {
        localStorage.setItem('image_urls', JSON.stringify(imageUrls));
    }

    public loadCachedImageUrls(): string[] {
        const imageUrls = localStorage.getItem('image_urls');

        return JSON.parse(imageUrls);
    }
}