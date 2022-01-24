import { Composite, Properties, ImageView, ImageValue, ChangeListeners } from "tabris";
import { component, event, property } from "tabris-decorators";

@component
export class DetailViewComponent extends Composite {

    @property public image: ImageValue;
    @property public dismissed: boolean;

    @event public onDismissedChanged: ChangeListeners<DetailViewComponent, 'dismissed'>;

    constructor(properties: Properties<DetailViewComponent>) {
        super();
        this.set(properties);

        this.initView();
    }

    private initView(): void {
        this.append(
            <$>
                <ImageView
                    stretch
                    background="black"
                    image={this.image}
                    scaleMode='fit'
                    zoomEnabled={true}
                    onTap={() => this.closeView()}
                ></ImageView>
            </$>
        );
    }

    private closeView(): void {
        this.dismissed = true;

        this.dispose();
    }
}