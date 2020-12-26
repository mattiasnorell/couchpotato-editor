import { Epg } from "./Epg";
import { Group } from "./Group";
import { Stream } from "./Stream";
import { Validation } from "./Validation";

export class Configuration{
    constructor(){
        
    }

    m3uPath: string = '';
    outputPath: string = '';
    defaultGroup: string = '';
    
    epg: Epg;
    streams: Stream[];
    validation: Validation;
    groups: Group[] = [];
}

