import { Constraint, contentView, TextView, Button, Popover } from 'tabris';

import { GalleryViewComponent } from './view/gallery-view.component';
import { CameraViewComponent } from './view/camera-view.component';

export class App {

  public start() {
    
    contentView.append(
      <$>
        <TextView padding={15} font='bold 24px monospace' centerX>My Photo Gallery</TextView>
        <GalleryViewComponent top={Constraint.prev} stretch />
        <Button centerX bottom={15} height={50} width={150} cornerRadius={15} style='elevate' onSelect={() => this.toggleCameraView()}>
          Open Camera
        </Button>
      </$>
    );
  }

  private toggleCameraView(): void {
    const popover = Popover.open(
      <Popover>
        <CameraViewComponent stretch onDismissedChanged={() => popover.close()}></CameraViewComponent>
      </Popover>
    );
  }
}

