import { Epg } from "_models/Epg";
import { Group } from "_models/Group";
import { Stream } from "_models/Stream";
import { Validation } from "_models/Validation";

export class Configuration{
    constructor(){
        
    }

    m3uPath: string = '';
    playlistCacheDuration: number = 0;
    outputPath: string = '';
    defaultGroup: string = '';
    outputFilename: string = '';
    
    epg: Epg;
    streams: Stream[];
    validation: Validation;
    groups: Group[] = [];
}

