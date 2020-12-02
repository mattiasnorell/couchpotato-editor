import { EpgConfig } from "../components/epg/epg-config/epgConfig";
import { Epg } from "./Epg";
import { Stream } from "./Stream";

export class Configuration{
    m3uPath: string = '';
    outputPath: string = '';
    defaultGroup: string = '';
    
    epg: Epg;
    streams: Stream[];
    validation: Validation;
}