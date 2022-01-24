import { permission, device, Camera } from "tabris";
import { inject, shared } from "tabris-decorators";
import { ImageService } from "./image.service";

@shared
export class CameraService {

    private camera = device.cameras[0];

    constructor(
        @inject private imageService: ImageService
    ) { }

    public getCamera(): Camera {
        return this.camera;
    }

    public activateCamera(): Promise<string | boolean> {
        return permission.requestAuthorization(
            'camera'
        )
            .then(() => this.camera.active = true);
    }

    public deactiveCamera(): void {
        this.camera.active = false;
    }

    public async captureImage(activeFlash?: boolean) {
        const { image } = await this.camera.captureImage({ flash: activeFlash ? 'on' : 'off' });
   
        this.imageService.addImage(image);
    }

    public switchCamera(): Promise<Camera> {
        this.deactiveCamera();

        this.camera = this.camera === device.cameras[0] ? device.cameras[1] : device.cameras[0];

        return this.activateCamera()
            .then(() => this.camera);
    }
}