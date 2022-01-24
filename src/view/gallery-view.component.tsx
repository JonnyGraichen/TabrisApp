import { Composite, ImageValue, ImageView, Properties, Popover} from 'tabris';
import { component, property, ListView, Cell, inject } from 'tabris-decorators';

import { DetailViewComponent } from './detail-view.component';

import { ImageService } from '../service/image.service';

@component
export class GalleryViewComponent extends Composite {

    public static placeholder = ['https://www.traumfotografen.de/wp/wp-content/uploads/2020/07/Katzenfoto-von-Outdoorpixl-Te%C3%9Fen-Tierfotografie-2.jpg',
];


    @property public images: string[];

    constructor(
        properties: Properties<GalleryViewComponent>,
        @inject private imageService: ImageService
    ) {
        super();
        this.set(properties);

        this.initImages();
        this.initView();

        this.listenToImageChanges();
    }

    private initImages(): void {
        const images = this.imageService.getImages();

        this.images = images.length ? this.imageService.getImages() : GalleryViewComponent.placeholder;
    }

    private initView(): void {

        this.append(
            <$>
                <ListView stretch bind-items='images' onSelect={({ item }: { item: string }) => this.toggleDetailView(item)}>
                    <Cell selectable>
                        <ImageView centerX width={250} height={250} cornerRadius={25} scaleMode='fill' bind-image='item'></ImageView>
                    </Cell>
                </ListView>
            </$>
        );
    }

    private listenToImageChanges(): void {
        this.imageService.onImagesChanged(() => {
        this.initImages();
        })
    }

    private toggleDetailView(image: ImageValue): void {
        const popover = Popover.open(
            <Popover>
                <DetailViewComponent stretch image={image} onDismissedChanged={() => popover.close()}></DetailViewComponent>
            </Popover>
        );
    }

}