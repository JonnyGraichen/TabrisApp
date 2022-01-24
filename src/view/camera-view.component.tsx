import { Camera, Composite, Properties, CameraView, Button, ChangeListeners, TextView, Constraint, Switch } from "tabris";
import { component, event, inject, property } from "tabris-decorators";

import { CameraService } from "../service/camera.service";

@component
export class CameraViewComponent extends Composite {

    @property public camera: Camera;
    @property public dismissed: boolean;

    @event public onDismissedChanged: ChangeListeners<CameraViewComponent, 'dismissed'>;

    private activeFlash = false;

    constructor(
        properties: Properties<CameraViewComponent>,
        @inject private cameraService: CameraService
    ) {
        super();
        this.set(properties);

        this.initView();
    }

    private initView(): void {
        this.startCamera();

        this.append(
            <$>
                <CameraView stretch bind-camera='camera'></CameraView>
                <Button left={5} height={50} cornerRadius={15} style='text'
                    onSelect={() => this.changeCamera()}
                >
                    Switch Camera
                </Button>
                <Button right={5} height={50} cornerRadius={15} style='text'
                    onSelect={() => this.closeView()}
                >
                    Cancel
                </Button>
                <Button centerX bottom={75} height={50} cornerRadius={15} style='elevate'
                    onSelect={() => this.captureImage()}
                >
                    Take A Picture
                </Button>
                <TextView left={10} bottom={20}>Enable Flash</TextView>
                <Switch left={Constraint.prev} padding={10} bottom={5}
                    onSelect={({ checked }) => this.toggleFlash(checked)}
                ></Switch>
            </$>
        );
    }

    private startCamera(): void {
        this.cameraService.activateCamera();

        this.camera = this.cameraService.getCamera();
    }

    private changeCamera(): void {
        this.cameraService.switchCamera()
            .then(camera => this.camera = camera);
    }

    private toggleFlash(active: boolean): void {
        this.activeFlash = active;
    }

    private captureImage(): void {
        this.cameraService.captureImage(this.activeFlash)
            .then(() => this.closeView());
    }

    private closeView(): void {
        this.dismissed = true;

        this.cameraService.deactiveCamera();

        this.dispose();
    }


}
