import {Vue, Options } from 'vue-class-component';
import { Prop, Ref } from 'vue-property-decorator';

@Options({
    name: 'InputFileUpload',
    template: require('./inputFileUpload.pug'),
    components: {}
})
export class InputFileUpload extends Vue {
    @Ref()
    public fileUploadInput: HTMLInputElement;

    
    @Ref()
    public fileUploadDropArea: HTMLInputElement;

    @Prop({ default: '' })
    public id: string;

    @Prop({ default: '' })
    public label: string;

    @Prop({ default: '' })
    public classes: string;

    @Prop({default:  false})
    public disabled: boolean;

    @Prop({default: ''})
    public placeholder: string;

    private onFilesHover: boolean = false;

    public mounted() {
        if (!this.dropArea) {
            return;
        }

        'drag drop dragover dragstart dragend dragenter dragleave'.split(' ').forEach((eventName: string) => {
            this.dropArea.addEventListener(eventName, (evt) => {
                evt.preventDefault();
                evt.stopPropagation();
            });
        });

        'dragover dragenter'.split(' ').forEach((eventName: string) => {
            this.dropArea.addEventListener(eventName, (evt) => {
                this.onFilesHover = true;
            });
        });

        'dragleave dragend drop'.split(' ').forEach((eventName: string) => {
            this.dropArea.addEventListener(eventName, (evt) => {
                this.onFilesHover = false;
            });
        });

        this.dropArea.addEventListener('drop', (evt: DragEvent) => {
            const files = evt.dataTransfer?.files;
            this.$emit('onChange', files);
        });
    }

    private onFileChange(): void {
        this.$emit('onChange', this.upload.files);
    }

    private onOpenFileUploadClick(): void {
        this.upload.click();
    }

    private get upload(): HTMLInputElement {
        return this.$refs.fileUploadInput as HTMLInputElement;
    }

    private get dropArea(): HTMLInputElement {
        return this.$refs.fileUploadDropArea as HTMLInputElement;
    }
}
