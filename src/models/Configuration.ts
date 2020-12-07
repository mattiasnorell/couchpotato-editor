import { Epg } from "./Epg";
import { Group } from "./Group";
import { Stream } from "./Stream";

export class Configuration{
    m3uPath: string = '';
    outputPath: string = '';
    defaultGroup: string = '';
    
    epg: Epg;
    streams: Stream[];
    validation: Validation;
    groups: Group[] = [];
}

